import assert from 'node:assert/strict';
import fs from 'node:fs';
const read = p => fs.readFileSync(p,'utf8');
const main=read('public/index.html'), css=read('public/styles.css');
assert(main.includes('https://qexus.github.io/shared/qx-footer.css'),'Shared footer stylesheet must load');
assert(main.includes('class="footer qx-footer"'),'Interactive page needs unified footer');
assert(main.includes('class="qx-footer__links"')&&main.includes('class="qx-footer__note"'),'Footer needs explicit links and disclosure');
assert(main.includes('href="https://qexus.github.io/privacy.html"'),'Privacy link is mandatory');
assert(main.includes('href="https://qexus.github.io/work.html"'),'Career-hub link is mandatory');
assert(main.includes('class="seo-static-guides"')&&css.includes('.seo-static-guides{display:flex'),'Study-link spacing must remain present');
assert(css.includes('.body>.header{display:grid'),'Mobile topbar must use stable two-row grid');
assert(css.includes('height:auto!important'),'Mobile topbar cannot have fixed height');
assert(css.includes('grid-row:2')&&css.includes('grid-column:1/-1'),'Country switch must occupy its own row');
assert(main.includes('class="region-nav"'),'Country switch navigation missing');
for(const lang of ['fr','uk']){
 const localized=read('public/'+lang+'/index.html');
 assert(localized.includes('class="qx-footer"')&&localized.includes('class="qx-footer__links"'),'Translated '+lang+' footer must be unified');
 assert(localized.includes('https://qexus.github.io/shared/qx-footer.css'),'Translated '+lang+' footer CSS missing');
 assert(localized.includes('https://qexus.github.io/'+lang+'/privacy.html'),'Localized privacy link missing: '+lang);
}
console.log('Passed: stable mobile grid, country navigation, footer disclosures, localized links and guide spacing.');
