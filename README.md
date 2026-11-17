# qexus lab · Canada Fisheries 🇨🇦

Independent **public information and self-study project** about jobs in the Canadian fisheries, seafood processing and aquaculture sectors. Built for GitHub Pages and Python-powered GitHub Actions. Prototype **v1.0 — 16 November 2026**.

**Demo site (after publication):** `https://qexus.github.io/fisheries-canada/` (example; only works after creating and deploying the repository).  
**Repository name suggestion:** `qexus/fisheries-canada` (separate from Norwegian `qexus/fisheries`).

## Included

- Responsive no-build HTML/CSS/JS app, safe for GitHub Pages.
- Seed data: **37** CFIA-listed export-approved fish/seafood establishments (not confirmed vacancies), **18** Job Bank search-result snapshots (not guaranteed still open), 10 study lessons, 56 terms, official sources.
- Region filter, search, favorites, local browser notes and progress, 10 quizzes, gross-CAD calculator.
- Import CSV locally in the browser (not sent to any server), export/restore a local JSON backup.
- Python-only standard-library ingestion of the **CFIA fish/seafood export-approved establishments** public registry (CSV with HTML table fallback), plus DFO BC aquaculture licence CSVs.
- GitHub Actions weekly sync and Pages deployment; retains prior snapshot if official sources fail. **Does not scrape Job Bank automatically**.
- Tests for parser validation, source fallback, BC fields, retention, and basic data hygiene.

## Deploy to GitHub Pages

1. Create **public** repository `qexus/fisheries-canada` with no initial README.
2. Upload **all files and folders preserving structure**, including `.github/workflows/deploy.yml`. Via a local terminal: `git init`, `git add .`, `git commit`, `git branch -M main`, `git remote add origin https://github.com/qexus/fisheries-canada.git`, `git push -u origin main`. Alternatively an assistant with write access can upload these files after you create the repository.
3. In repository **Settings → Pages → Build and deployment → Source**, select **GitHub Actions**.
4. In **Actions**, open **Canada fisheries — refresh registry and deploy Pages**, use **Run workflow**, and monitor `build` + `deploy` jobs.
5. After successful deployment: `https://qexus.github.io/fisheries-canada/`.

Pages does not execute Python in a web request. Python executes **during build** inside GitHub Actions and emits JSON. The site loads this generated JSON from its own origin. For repeated scheduled runs, Actions may start later than planned, and sources may change columns/paths. Source warnings will be visible in the app.

## Run locally

```bash
python3 -m http.server 8080 --directory public
# open http://localhost:8080
python3 -m unittest discover -s tests -v
python3 scripts/refresh_registry.py --out public/generated/registry.json
```

Opening `public/index.html` directly works with seed data, but browser security may block fetching the optional generated JSON on `file://`. Use a local HTTP server for proper testing.

## Data reliability / important boundaries

- **CFIA export-approved list ≠ list of jobs.** Presence means listed by CFIA for the specified purpose; it does not imply a company is hiring. Source: https://apps.inspection.canada.ca/webapps/FishList/?lang=en.
- **DFO BC aquaculture licence sites ≠ hiring employers.** These are published licence/establishment records. Source: https://open.canada.ca/data/dataset/522d1b67-30d8-4a34-9b62-5da99b1035e6.
- **Job Bank entries** were observed on 2026-11-16 and deliberately remain a dated snapshot. Verify every job number on Job Bank before applying. Source: https://www.jobbank.gc.ca/jobsearch/jobsearch?searchstring=fish+processing.
- **DFO Atlantic vessel statistics** are aggregate numbers, not an open directory of captains or guaranteed hiring contacts.
- The wage example is a **2025 Job Bank median** for NOC 95107, not the current legal minimum in every province.
- Open work permits and CUAET extension eligibility depend on IRCC rules and **individual document restrictions/expiry**. Do not post permit numbers, SIN, passport, address, resumes, applications, or private contact notes to this public repository.
- This is an educational research tool, not a recruiter, certified training program or immigration advice.

## Copyright, attribution and source validation

Contains references and aggregated/public information from Government of Canada / CFIA / Fisheries and Oceans Canada under publicly available government terms, and factual Job Bank search snapshots (no copied full advertisement texts). For government open-data conditions, consult the [Open Government Licence — Canada](https://open.canada.ca/en/open-government-licence-canada). No affiliation or endorsement is implied.

## Roadmap

- Verify live schema of CFIA CSV and BC DFO CSVs after first Actions run; refine per-source mapping as needed.
- Add employer websites and public HR channels after manual verification.
- Add regional fishing vessel data where legitimately available in reusable public form.
- Add province-specific safety training and more technical roles.
- Develop optional private sync only if authentication and a secure backend are added (GitHub Pages alone is public static hosting).
