import json
import sys
import tempfile
import unittest
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parents[1]/"scripts"))
from security_audit import audit

CSP="""<meta http-equiv="Content-Security-Policy" content="script-src 'self'">"""
def fixture(root,extra=""):
 (root/"generated").mkdir()
 (root/"index.html").write_text('<!doctype html><head>'+CSP+'</head><body><script src="https://qexus.github.io/shared/fisheries-core.js"></script></body>')
 (root/"generated"/"registry.json").write_text('{"companies":[]}')
 (root/"generated"/"jobs.json").write_text('{"verified_live":[]}')
 if extra:(root/"other.js").write_text(extra)
class SecurityTests(unittest.TestCase):
 def test_clean_files(self):
    with tempfile.TemporaryDirectory() as name:
        root=Path(name);fixture(root)
        self.assertEqual(audit(root)[0],[])
 def test_secret_detection(self):
    with tempfile.TemporaryDirectory() as name:
        root=Path(name);fixture(root,'const x="-----BEGIN PRIVATE KEY-----";')
        self.assertTrue(audit(root)[0])
 def test_reject_contact_data_in_live_jobs(self):
    with tempfile.TemporaryDirectory() as name:
        root=Path(name);fixture(root)
        (root/"generated"/"jobs.json").write_text(json.dumps({"verified_live":[{"id":"1","email":"private@example.com"}]}))
        self.assertTrue(audit(root)[0])
if __name__=="__main__":unittest.main()
