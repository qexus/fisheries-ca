#!/usr/bin/env python3
"""Static security guardrails for public qexus Fisheries GitHub Pages assets.

Not a penetration test. No external network or third-party dependencies.
"""
from pathlib import Path
import json
import re
import sys

ROOT=Path(__file__).resolve().parents[1]/"public"
SECRETS={
 "private-key":re.compile(r"-----BEGIN (?:RSA|EC|OPENSSH|DSA)? ?PRIVATE KEY-----"),
 "github-personal-token":re.compile(r"\bgh[pousr]_[A-Za-z0-9_]{35,}\b"),
 "aws-access-id":re.compile(r"\bAKIA[0-9A-Z]{16}\b"),
 "openai-style-key":re.compile(r"\bsk-[A-Za-z0-9]{28,}\b"),
 "credential-in-url":re.compile(r"https?://[^/\s]+:[^/@\s]+@")
}
ALLOWED={".html",".js",".css",".json",".svg"}
def audit(root=ROOT):
 errors=[];warnings=[]
 html=(root/"index.html").read_text(encoding="utf-8")
 if 'http-equiv="Content-Security-Policy"' not in html:
    errors.append("Missing CSP in main HTML")
 if re.search(r"<script(?:\s[^>]*)?>\s*[^<\s][\s\S]*?</script>",html,re.I):
    errors.append("Inline executable script prevents strict script CSP")
 if "noindex,nofollow" in html:
    warnings.append("Public pages are noindexed")
 if "fisheries-core.js" not in html:
    errors.append("Missing shared first-party enhancement")
 for p in root.rglob("*"):
    if not p.is_file():continue
    if p.suffix.lower() in {".pem",".key",".p12",".pfx",".env",".sqlite",".db"}:
        errors.append("Prohibited public file type: "+str(p.relative_to(root)))
    if p.suffix.lower() not in ALLOWED:continue
    if p.stat().st_size>2_000_000:
        warnings.append("Large public file: "+str(p.relative_to(root)))
        continue
    source=p.read_text(encoding="utf-8",errors="replace")
    for key,pattern in SECRETS.items():
        if pattern.search(source):
            errors.append("Possible "+key+" in "+str(p.relative_to(root)))
 for name in ("registry.json","jobs.json"):
    p=root/"generated"/name
    if not p.exists():errors.append("Missing "+name);continue
    try:json.loads(p.read_text(encoding="utf-8"))
    except json.JSONDecodeError:errors.append("Invalid JSON "+name)
 jobs=root/"generated"/"jobs.json"
 if jobs.exists():
    data=json.loads(jobs.read_text(encoding="utf-8"))
    if not isinstance(data.get("verified_live"),list):
        errors.append("Verified jobs must be an array")
    for item in data.get("verified_live",[]):
        if any(k in item for k in ("email","phone","contactList","description","html")):
            errors.append("Jobs export contains personal/contact or raw HTML fields")
 return errors,warnings

if __name__=="__main__":
 errors,warnings=audit()
 for item in warnings:print("::warning::"+item)
 for item in errors:print("::error::"+item)
 print("Security guardrail: "+str(len(errors))+" errors, "+str(len(warnings))+" warnings")
 sys.exit(1 if errors else 0)
