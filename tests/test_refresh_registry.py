import sys
import unittest
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parents[1]/'scripts'))
from refresh_registry import parse_csv,parse_cfia_html,cfia_companies,bc_sites,build,CFIA_CSV,CFIA_PAGE,BC_BASE,BC_FILES

class RegistryTests(unittest.TestCase):
    def test_cfia_csv(self):
        rows=parse_csv('Name,Ref. #,Address,City,Province,Postal Code\n"A, B Fisheries",123,"9 Road",Moncton,NB,A1B2C3\n'.encode())
        self.assertEqual(rows[0]['name'],'A, B Fisheries')
        self.assertEqual(rows[0]['ref'],'123')
    def test_cfia_live_csv_headers(self):
        # CFIA's official GetCSV endpoint uses estName/estRefNum/... fields.
        data='estName,estRefNum,estAddress,estCity,estProvince,estPostalCode\n'
        data+=''.join(f'Fishery {i},00{i},Port Road,Gaspé,QC,G0A0A0\n' for i in range(26))
        rows=parse_csv(data.encode('utf-8'))
        out=cfia_companies(rows)
        self.assertEqual(len(out),26)
        self.assertEqual(out[0]['province'],'QC')
        self.assertTrue(out[0]['registration'])
        self.assertIn('Fishery',out[0]['name'])

    def test_cfia_html(self):
        html=b'<table><tr><th>Name</th><th>Ref #</th><th>Address</th><th>City</th><th>Province</th><th>Postal Code</th></tr><tr><td>AB Fisheries</td><td>005</td><td>Road</td><td>Gasp&eacute;</td><td>QC</td><td>ABC</td></tr></table>'
        records=parse_cfia_html(html)
        self.assertEqual(len(records),1)
        self.assertEqual(records[0]['province'],'QC')
    def test_bc(self):
        rows=parse_csv(b'Licence Holder,Site Name,Licence Number,Community\nABC Aquaculture,Harbour 4,456,Tofino\n')
        out=bc_sites(rows,'BC shellfish')
        self.assertEqual(out[0]['province'],'BC')
        self.assertIn('ABC Aquaculture',out[0]['name'])
    def test_wrong_fields(self):
        with self.assertRaises(ValueError):bc_sites([{'something':'foo'}],'BC shellfish')
    def test_fallback(self):
        html=b'<table>'+b''.join((f'<tr><td>Fish Plant {i}</td><td>000{i}</td><td>Road</td><td>Gasp&eacute;</td><td>QC</td><td>XYZ</td></tr>').encode() for i in range(25))+b'</table>'
        def fetch(url):
            if url==CFIA_CSV:raise ConnectionError('temporary CSV failure')
            if url==CFIA_PAGE:return html
            return b'Licence Holder,Site Name,Licence Number,Community\nXYZ Farms,A1,445,Nanaimo\n'
        result=build(fetch=fetch)
        self.assertEqual(len(result['companies']),25)
        self.assertEqual(len(result['aquaculture']),3)
        self.assertEqual(result['status'],'partial' if False else 'fresh')
        self.assertEqual(result['companies'][0]['province'],'QC')
    def test_dont_lose_previous(self):
        def fail(url):raise ConnectionError('bad')
        result=build(previous={'companies':[{'name':'Existing'}]},fetch=fail)
        self.assertEqual(result['status'],'stale')
        self.assertEqual(result['companies'][0]['name'],'Existing')
    def test_partial_cfia_failure_preserves_older_companies(self):
        old={'companies':[{'name':'Older CFIA business','province':'QC'}],
             'aquaculture':[{'name':'Older BC site','category':'BC shellfish'}]}
        def fetch(url):
            if url in (CFIA_CSV,CFIA_PAGE): raise ConnectionError('offline CFIA')
            return b'Licence Holder,Site Name,Licence Number,Community\nNew Farms,Bay A,445,Nanaimo\n'
        result=build(previous=old,fetch=fetch)
        self.assertEqual(result['status'],'partial')
        self.assertEqual(result['sources']['CFIA'],'stale')
        self.assertEqual(result['companies'][0]['name'],'Older CFIA business')
        self.assertEqual(len(result['aquaculture']),3) # 3 fresh BC sources

    def test_partial_bc_failure_preserves_only_missing_bc_source(self):
        old={'companies':[], 'aquaculture':[
            {'name':'Old shellfish','category':'BC shellfish'},
            {'name':'Old marine finfish','category':'BC marine finfish'}]}
        cfia=('estName,estRefNum,estAddress,estCity,estProvince,estPostalCode\n'
             + ''.join(f'Fishery {i},00{i},Port Road,Quebec,QC,G0A0A0\n' for i in range(26))).encode()
        def fetch(url):
            if url==CFIA_CSV:return cfia
            if url==BC_BASE+BC_FILES['BC shellfish']: raise ConnectionError('offline shellfish')
            return b'Licence Holder,Site Name,Licence Number,Community\nFresh Farms,Bay B,566,Nanaimo\n'
        result=build(previous=old,fetch=fetch)
        self.assertEqual(result['status'],'partial')
        self.assertEqual(result['sources']['CFIA'],'ok')
        self.assertEqual(result['sources']['BC shellfish'],'stale')
        self.assertEqual(len(result['companies']),26)
        self.assertEqual(len(result['aquaculture']),3)
        self.assertTrue(any(x['name']=='Old shellfish' for x in result['aquaculture']))
        self.assertFalse(any(x['name']=='Old marine finfish' for x in result['aquaculture']))

    def test_no_private_identifiers(self):
        csv_text='Name,Ref #,Address,City,Province,Postal Code\n'+''.join(f'Fish Plant {i},{i},Road,Town,NB,X0X0X0\n' for i in range(26))
        result=cfia_companies(parse_csv(csv_text.encode()))
        self.assertNotIn('email',result[0]);self.assertNotIn('phone',result[0]);self.assertEqual(len(result),26)
if __name__=='__main__':unittest.main()
