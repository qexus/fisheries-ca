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
 def test_reject_unexpected_public_files(self):
    with tempfile.TemporaryDirectory() as name:
        root=Path(name);fixture(root)
        (root/"internal-notes.md").write_text("Not deployable.")
        errors,_=audit(root)
        self.assertTrue(any("Unexpected public file type" in item for item in errors))
 def test_large_file_is_still_scanned_for_secrets(self):
    with tempfile.TemporaryDirectory() as name:
        root=Path(name);fixture(root)
        (root/"other.js").write_text("x"*2_000_010 + "\n-----BEGIN PRIVATE KEY-----")
        errors,warnings=audit(root)
        self.assertTrue(any("private-key" in item for item in errors))
        self.assertTrue(any("Large public file" in item for item in warnings))
if __name__=="__main__":unittest.main()
