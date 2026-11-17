import datetime as dt
import sys
import tempfile
import unittest
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))
from refresh_jobs import compile_feed, build, UTC

NOW=dt.datetime(2026,11,16,12,tzinfo=UTC)
def entry(**kw):
    val={"id":"job-42","title":"Aquaculture technician","employer":"Example Seafood",
         "location":"Canada","url":"https://example.org/careers/42","source":"Authorized feed",
         "status":"ACTIVE","verified_at":NOW.isoformat(),
         "expires_at":(NOW+dt.timedelta(days=4)).isoformat()}
    val.update(kw);return val
class JobsTests(unittest.TestCase):
    def test_no_feed_means_no_claims(self):
        x=build(now=NOW)
        self.assertEqual(x["status"],"not_connected")
        self.assertEqual(x["verified_live"],[])
    def test_accept_recent_active_verified_entry(self):
        x,problems=compile_feed([entry()],now=NOW)
        self.assertEqual(len(x),1);self.assertEqual(x[0]["id"],"job-42")
        self.assertNotIn("email",x[0])
    def test_remove_expired_inactive_or_stale_entries(self):
        rows=[entry(status="INACTIVE"),entry(expires_at=(NOW-dt.timedelta(seconds=1)).isoformat()),
              entry(verified_at=(NOW-dt.timedelta(hours=40)).isoformat())]
        self.assertEqual(compile_feed(rows,now=NOW)[0],[])
    def test_reject_unsafe_links_and_missing_fields(self):
        rows=[entry(url="javascript:alert(1)"),entry(url="http://evil.invalid"),
              entry(url="https://user:password@example.com/x"),entry(title="")]
        self.assertEqual(compile_feed(rows,now=NOW)[0],[])
    def test_deduplication_latest_verification(self):
        rows=[entry(verified_at=(NOW-dt.timedelta(hours=1)).isoformat()),entry()]
        x,_=compile_feed(rows,now=NOW)
        self.assertEqual(len(x),1)
        self.assertEqual(x[0]["verified_at"],NOW.isoformat())
    def test_requires_redistribution_authorization(self):
        with tempfile.TemporaryDirectory() as td:
            path=Path(td)/"feed.json"
            path.write_text('{"jobs":[],"distribution_authorized":false}')
            x=build(path,now=NOW)
            self.assertEqual(x["status"],"source_error")
            self.assertFalse(x["verified_live"])
if __name__=="__main__":unittest.main()
