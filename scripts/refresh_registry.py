#!/usr/bin/env python3
"""Create public-only JSON from official Canadian fish & aquaculture registers.

Source A: CFIA export-approved fish/seafood establishment CSV (HTML fallback).
Source B: DFO BC shellfish, marine finfish, landbased aquaculture licence CSVs.

No scraping of jobs, contact details, user data, SIN, resumes or tracking.
Missing / unrecognized sources are reported; stale information isn't called 'fresh'.
Requires Python 3.11+ standard library only.
"""
from __future__ import annotations
import argparse
import csv
import io
import json
import re
import sys
import unicodedata
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse
from urllib.request import Request, urlopen

CFIA_PAGE = 'https://apps.inspection.canada.ca/webapps/FishList/?lang=en'
CFIA_CSV = 'https://apps.inspection.canada.ca/webapps/FishList/Home/GetCSV'
BC_BASE = 'https://api-proxy.edh-cde.dfo-mpo.gc.ca/catalogue/records/522d1b67-30d8-4a34-9b62-5da99b1035e6/attachments/'
BC_PAGE = 'https://open.canada.ca/data/dataset/522d1b67-30d8-4a34-9b62-5da99b1035e6'
BC_FILES = {
 'BC shellfish': 'licence-permis-shell-conch-rpt-pac-dfo-mpo-aquaculture-eng.csv',
 'BC marine finfish': 'license-permis-mer-mar-rpt-pac-dfo-mpo-aquaculture-eng.csv',
 'BC landbased': 'licence-permis-landbased-terre-rpt-pac-dfo-mpo-aquaculture-eng.csv',
}
ALLOWED = {'apps.inspection.canada.ca','api-proxy.edh-cde.dfo-mpo.gc.ca'}
LIMIT=15_000_000
VALID_PROVINCES={'QC','NB','NS','NL','PE','BC','ON','AB','SK','MB','YT','NT','NU'}


def get(url: str) -> bytes:
    if urlparse(url).scheme != 'https' or urlparse(url).hostname not in ALLOWED:
        raise ValueError('Unapproved download URL')
    req=Request(url,headers={'User-Agent':'qexus-lab-fisheries-canada/1.0 (+https://github.com/qexus)', 'Accept':'text/html,text/csv,*/*'})
    with urlopen(req,timeout=32) as res:
        if urlparse(res.geturl()).hostname not in ALLOWED:
            raise ValueError('Unapproved redirect')
        payload=res.read(LIMIT+1)
    if len(payload)>LIMIT: raise ValueError('Source exceeds maximum file size')
    return payload


def decode(payload: bytes) -> str:
    for codec in ('utf-8-sig','utf-16','cp1252'):
        try:
            val=payload.decode(codec)
            if '\x00' not in val[:300]: return val
        except UnicodeError: pass
    raise ValueError('Cannot decode source text')


def normalize(value: str) -> str:
    value=unicodedata.normalize('NFKD',str(value or ''))
    return re.sub(r'[^a-z0-9]','', ''.join(c for c in value if not unicodedata.combining(c)).lower())


def parse_csv(payload: bytes) -> list[dict]:
    text=decode(payload)
    if text.lstrip().lower().startswith(('<!doctype','<html')): raise ValueError('Received HTML not CSV')
    sample=text[:8192]
    try: delim=csv.Sniffer().sniff(sample,delimiters=',;\t').delimiter
    except csv.Error:
        first=sample.splitlines()[0]
        delim=max(',;\t',key=first.count)
    reader=csv.DictReader(io.StringIO(text),delimiter=delim)
    if not reader.fieldnames: raise ValueError('No header row')
    records=[]
    for row in reader:
        records.append({normalize(k): (str(v or '').strip()) for k,v in row.items() if k is not None})
    return records


def choose(row: dict, *names: str) -> str:
    for name in names:
        val=row.get(normalize(name),'')
        if val: return val
    return ''


def clean(text: str, limit: int=150) -> str:
    return re.sub(r'[\x00-\x1f\x7f]',' ',str(text)).strip()[:limit]


class CFIAParser(HTMLParser):
    """Read table rows from CFIA public HTML if CSV endpoint changes."""
    def __init__(self):
        super().__init__();self.rows=[];self.current=None;self.cell=None;self.depth=0;self.tag=None
    def handle_starttag(self,tag,attrs):
        if tag=='tr':self.current=[]
        if tag in ('td','th') and self.current is not None:self.cell=[];self.tag=tag
    def handle_data(self,data):
        if self.cell is not None:self.cell.append(data)
    def handle_endtag(self,tag):
        if tag in ('td','th') and self.cell is not None and tag==self.tag:
            self.current.append(' '.join(''.join(self.cell).split()));self.cell=None;self.tag=None
        if tag=='tr' and self.current is not None:
            if len(self.current)>=6:self.rows.append(self.current)
            self.current=None


def parse_cfia_html(payload: bytes) -> list[dict]:
    p=CFIAParser();p.feed(decode(payload))
    records=[]
    for cols in p.rows:
        if normalize(cols[0]) in ('name','nom') and ('province' in normalize(cols[4])): continue
        records.append({'name':cols[0], 'reference':cols[1], 'address':cols[2],'city':cols[3],'province':cols[4],'postalcode':cols[5]})
    return records


def cfia_companies(rows: list[dict]) -> list[dict]:
    output=[];seen=set()
    for r in rows:
        name=choose(r,'estName','Name','Legal Name','Establishment Name')
        ref=choose(r,'Ref #','Ref. #','Reference Number','Reference','Ref','Reference #','Number','estRefNum')
        city=choose(r,'estCity','City','Ville')
        province=choose(r,'estProvince','Province','Prov').upper().strip()
        address=choose(r,'estAddress','Address','Street address')
        if not name or province not in VALID_PROVINCES or len(name)<3:continue
        key=(normalize(ref),normalize(name),normalize(city))
        if key in seen:continue
        seen.add(key)
        # Reference is a public establishment ID, not a personal identifier.
        output.append({'id':'cfia-'+str(len(output))+'-'+(normalize(ref) or normalize(name)[:14]),'name':clean(name,180),'city':clean(city,100),'province':province,'registration':clean(ref,45),'category':'Рыбопереработка / экспортный реестр','source':CFIA_PAGE,'registry':'CFIA export approved','notes':'Есть в открытом реестре CFIA; вакансия и контакт не подтверждены.','imported':True})
    if len(output)<20:raise ValueError('Too few valid CFIA entries; possible format change')
    return sorted(output,key=lambda x:(x['province'],x['name'].lower()))


def bc_sites(rows: list[dict], category: str) -> list[dict]:
    output=[];seen=set()
    for r in rows:
        holder=choose(r,'Licence holder','License holder','Licence Holder Name','Licensee','License Holder Name','Company name','Legal name','Owner','Licencee','Holder')
        site=choose(r,'Site name','Site','Facility name','Site Name (EN)','Aquaculture site name','Site Name')
        reg=choose(r,'Licence number','License number','Licence ID','Site ID','Facility ID','DFO site number','Licence No')
        city=choose(r,'Nearest community','Community','Municipality','City','Site location','Location')
        if not holder or len(holder)<3: continue
        key=(normalize(holder),normalize(site),normalize(reg))
        if key in seen: continue
        seen.add(key)
        name=holder if not site else (holder+' · '+site)
        output.append({'id':'bc-'+normalize(category)[:12]+'-'+str(len(output)), 'name':clean(name,190),'city':clean(city,90),'province':'BC','registration':clean(reg,55),'category':category,'source':BC_PAGE,'registry':'DFO BC aquaculture','notes':'Включено в реестр лицензированных объектов BC; наличие найма не подтверждено.','imported':True})
    if not output:raise ValueError('Unrecognized BC CSV headers (no licence-holder field)')
    return output


def build(previous: dict|None=None,fetch=get) -> dict:
    previous=previous or {}
    result={'status':'unavailable','generated_at':datetime.now(timezone.utc).isoformat(),'sources':{},'companies':[],'aquaculture':[],'warnings':[]}
    try:
        try: rows=parse_csv(fetch(CFIA_CSV))
        except Exception as e:
            result['warnings'].append('CFIA CSV не обработан ('+clean(str(e),160)+'); пробуем HTML.')
            rows=parse_cfia_html(fetch(CFIA_PAGE))
        result['companies']=cfia_companies(rows)
        result['sources']['CFIA']='ok'
    except Exception as e:
        result['warnings'].append('CFIA unavailable: '+clean(str(e),220))
        result['sources']['CFIA']='unavailable'
    for name,filename in BC_FILES.items():
        try:
            entries=bc_sites(parse_csv(fetch(BC_BASE+filename)),name)
            result['aquaculture'].extend(entries)
            result['sources'][name]='ok'
        except Exception as e:
            result['warnings'].append(name+' unavailable: '+clean(str(e),160))
            result['sources'][name]='unavailable'
    # Preserve a *specific* last good dataset if only that source fails.
    # Never label retained records as freshly downloaded.
    if result['sources'].get('CFIA')!='ok' and isinstance(previous.get('companies'),list) and previous['companies']:
        result['companies']=previous['companies']
        result['sources']['CFIA']='stale'
        result['warnings'].append('CFIA download failed: keeping prior CFIA company records (stale).')
    for label in BC_FILES:
        if result['sources'].get(label)!='ok':
            old_records=[x for x in previous.get('aquaculture',[]) if isinstance(x,dict) and x.get('category')==label]
            if old_records:
                result['aquaculture'].extend(old_records)
                result['sources'][label]='stale'
                result['warnings'].append(label+' download failed: keeping '+str(len(old_records))+' prior records (stale).')
    if any(v=='ok' for v in result['sources'].values()):
        result['status']='fresh' if all(v=='ok' for v in result['sources'].values()) else 'partial'
    elif result['companies'] or result['aquaculture']:
        result['status']='stale'
    else:
        result['status']='unavailable'
    return result


def main(argv=None):
    ap=argparse.ArgumentParser();ap.add_argument('--out',default='public/generated/registry.json');ap.add_argument('--strict',action='store_true',help='Fail if no official data was downloaded')
    args=ap.parse_args(argv)
    path=Path(args.out)
    previous={}
    if path.exists():
        try: previous=json.loads(path.read_text(encoding='utf8'))
        except (ValueError,OSError): pass
    data=build(previous)
    path.parent.mkdir(parents=True,exist_ok=True)
    # Save snapshot atomically.
    temp=path.with_suffix(path.suffix+'.tmp')
    temp.write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf8');temp.replace(path)
    print(json.dumps({'status':data['status'],'companies':len(data['companies']),'aquaculture':len(data['aquaculture']),'sources':data['sources'],'warnings':data['warnings'][:4]},ensure_ascii=False))
    if args.strict and data['status'] in {'unavailable','stale'}:return 2
    return 0

if __name__=='__main__':sys.exit(main())
