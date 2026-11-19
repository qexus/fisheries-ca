import assert from 'node:assert/strict';
import fs from 'node:fs';
const pages=['index.html','guides/index.html','guides/employers.html','guides/glossary.html','guides/professions.html','guides/registries.html',
  ...Array.from({length:12},(_,i)=>'guides/lesson-'+String(i+1).padStart(2,'0')+'.html')];
let count=0;
for(const lang of ['fr','uk'])for(const page of pages){
  const file='public/'+lang+'/'+page;
  const html=fs.readFileSync(file,'utf8');
  const navs=[...html.matchAll(/<nav\b[^>]*class="[^"]*translated-languages[^"]*"[^>]*>[\s\S]*?<\/nav>/g)];
  assert.equal(navs.length,1,file+': language menu must be present');
  const links=[...navs[0][0].matchAll(/<a\b[^>]*hreflang="uk"[^>]*>([\s\S]*?)<\/a>/g)];
  assert.equal(links.length,1,file+': only one Ukrainian language option');
  assert.equal(links[0][1].trim(),'UA',file+': display UA, not UK');
  assert.match(links[0][0],/\/uk\//,file+': keep canonical uk language URLs');
  count++;
}
assert.equal(count,36);
assert(fs.readFileSync('public/index.html','utf8').includes('src="https://qexus.github.io/shared/site-i18n.js" defer'), 'Shared, centrally versioned localization must load');
console.log('Verified '+count+' static Canadian Fisheries language menus plus dynamic label.');
