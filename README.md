# Fisheries Canada · QEXUS Lab

Independent Canadian seafood processing, fisheries and aquaculture reference and training site.

Public website: https://qexus.github.io/fisheries-ca/
Repository: https://github.com/qexus/fisheries-ca
Languages: Russian, French, Ukrainian (RU/FR/UA visible selector; locale code uk).

## What is published

- Current published CFIA establishment and DFO BC aquaculture record snapshots plus manual reference records, province search and filters. Counts do NOT represent open job postings.
- Eighteen historical Job Bank announcements from the November 2026 reference snapshot; always recheck the job number and current employer listing.
- Twelve Academy lessons (RU/FR/UA reading editions), qualification references, work situations, a candidate journey and a local CV and application tracker.
- Local CSV import, offline browser notes, favorites, quiz progress and JSON export/restore. No server-side account or CV submission.

## Accuracy and safety

Official records are not evidence of current vacancies or eligibility for a job. Data may be delayed, duplicated or incomplete; look at the reported snapshot date and source warnings. Salary examples are historical and before taxes. Work-permit and provincial rules must be checked with IRCC, the regulator and the employer.
Primary data: CFIA https://apps.inspection.canada.ca/webapps/FishList/?lang=en ; DFO BC https://open.canada.ca/data/dataset/522d1b67-30d8-4a34-9b62-5da99b1035e6 ; Job Bank https://www.jobbank.gc.ca/ ; IRCC https://www.canada.ca/en/immigration-refugees-citizenship.html.
Applications, notes and CV drafts stay exclusively in localStorage on the visitor's device. Exported JSON can contain sensitive information; never upload it to GitHub. The site is neither a recruiter nor a certified training provider.

## Deployment

Only public/ is uploaded by the Canada GitHub Pages workflow. Development scripts, translation sources and tests remain in this public repository, but not on the published website.
GitHub Actions deploy.yml runs content/security checks, tries official registry refresh, preserves available snapshots when sources fail, and deploys; the Monday schedule is weekly. Jobs are not fetched automatically without a permitted source.
After each successful deployment, visual-qa.yml verifies live browser flows on desktop Chromium and mobile WebKit. The common translation script is https://qexus.github.io/shared/site-i18n.js, reused across sites rather than duplicated.

## Development

    python3 -m unittest discover -s tests -v
    node tests/check_content.mjs
    node tests/check_switch_labels.mjs
    python3 -m http.server 8080 --directory public

See SOURCES_AND_LIMITATIONS.md for published source licensing and provenance constraints. Historical job snapshots are not a live vacancy feed. No on-demand public data refresh has been added.
