#!/usr/bin/env python3
"""Build a privacy-safe, verified-vacancy snapshot from an AUTHORIZED feed export.

No scraping and no implied validity of archived listings. The importer accepts
only caller-provided JSON snapshots from sources whose redistribution is allowed.
An empty/unconfigured state is published until a permitted feed is connected.
"""
import argparse
import datetime as dt
import json
from pathlib import Path
from urllib.parse import urlparse

MAX_ROWS = 250
MAX_AGE_HOURS = 36
UTC = dt.timezone.utc
def utc_parse(value):
    if not isinstance(value, str):
        return None
    try:
        d=dt.datetime.fromisoformat(value.strip().replace("Z", "+00:00"))
        return d.astimezone(UTC) if d.tzinfo else None
    except ValueError:
        return None

def safe_https(value):
    if not isinstance(value, str) or len(value)>800:
        return False
    x=urlparse(value)
    return x.scheme=="https" and bool(x.hostname) and not x.username and not x.password

def compile_feed(rows, now=None, provenance=""):
    now=now or dt.datetime.now(UTC)
    found={}
    errors=[]
    if not isinstance(rows, list):
        raise ValueError("Authorized feed must contain an array of vacancy objects")
    for i, item in enumerate(rows[:5000]):
        if not isinstance(item, dict):
            errors.append("Skipped non-object record "+str(i))
            continue
        status=str(item.get("status","")).upper()
        if status!="ACTIVE":
            continue
        checked=utc_parse(item.get("verified_at"))
        expires=utc_parse(item.get("expires_at"))
        if not checked or not expires or (now-checked).total_seconds()>MAX_AGE_HOURS*3600 or checked>now+dt.timedelta(minutes=5) or expires<=now:
            continue
        if not safe_https(item.get("url")):
            continue
        vid=str(item.get("id","")).strip()[:100]
        title=str(item.get("title","")).strip()[:140]
        company=str(item.get("employer","")).strip()[:140]
        if not (vid and title and company):
            continue
        # Keep no direct personal contacts, descriptions, salaries or raw HTML.
        record={
            "id":vid,
            "title":title,
            "employer":company,
            "location":str(item.get("location",""))[:120],
            "url":item["url"],
            "source":str(item.get("source",provenance))[:70],
            "verified_at":checked.isoformat(),
            "expires_at":expires.isoformat(),
            "status":"verified"
        }
        found[vid]=record
    active=sorted(found.values(), key=lambda x:x["verified_at"], reverse=True)[:MAX_ROWS]
    return active,errors

def build(input_path=None, now=None):
    now=now or dt.datetime.now(UTC)
    result={
        "schema_version":1,"generated_at":now.isoformat(),"status":"not_connected",
        "source":"No authorized vacancy feed configured",
        "verified_live":[],"warnings":[
            "Government registries and archived ads are NOT live vacancies.",
            "Use official NAV/Job Bank searches until a permitted vacancy feed is connected."
        ],
        "max_verification_age_hours":MAX_AGE_HOURS
    }
    if not input_path:
        return result
    try:
        data=json.loads(Path(input_path).read_text(encoding="utf-8"))
        if not isinstance(data,dict) or not data.get("distribution_authorized") is True:
            raise ValueError("Source must explicitly document redistribution permission")
        jobs,problems=compile_feed(data.get("jobs"),now=now,provenance=str(data.get("source","")))
        result["verified_live"]=jobs
        result["status"]="verified" if jobs else "no_current_vacancies"
        result["source"]=str(data.get("source","Authorized supplier"))[:120]
        result["warnings"]=problems[:12]
    except (OSError,ValueError,TypeError,json.JSONDecodeError) as exc:
        result["status"]="source_error"
        result["warnings"]=["Feed invalid or unavailable; not showing any as verified: "+str(exc)[:200]]
    return result

def main(argv=None):
    p=argparse.ArgumentParser()
    p.add_argument("--input",type=Path,help="JSON export from explicitly authorized, licensed data source")
    p.add_argument("--out",type=Path,default=Path("public/generated/jobs.json"))
    args=p.parse_args(argv)
    value=build(args.input)
    args.out.parent.mkdir(parents=True,exist_ok=True)
    args.out.write_text(json.dumps(value,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    print("Vacancy feed: "+value["status"]+", verified live: "+str(len(value["verified_live"])))
    return 0

if __name__=="__main__":
    raise SystemExit(main())
