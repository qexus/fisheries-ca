import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const window={};
const ctx={window,URL,URLSearchParams,location:{pathname:'/fisheries/',search:'?lang=fr'},document:{documentElement:{lang:'fr'},addEventListener(){}},localStorage:{getItem(){return null}}};
for(const file of ['lessons-extended.js','reference-data.js','reference-i18n.js','quiz-i18n.js','expansion.js'])vm.runInNewContext(fs.readFileSync('public/'+file,'utf8'),ctx,{filename:file});
const original=window.qexusAcademyLessons;
for(const lang of ['fr','uk']){
 const quizzes=window.QX_LOCALIZED_QUIZZES[lang];
 assert.equal(Object.keys(quizzes).length,12);
 assert.deepEqual(JSON.parse(JSON.stringify(quizzes)),JSON.parse(fs.readFileSync('translations/quizzes-'+lang+'.json','utf8')),'Compiled quiz and translation source must agree');
 for(const lesson of original){
  const qs=quizzes[lesson.id];assert.equal(qs.length,lesson.questions.length);
  qs.forEach((q,i)=>{
   assert.equal(q[2],lesson.questions[i][2],'A translation must preserve the correct answer index');
   assert.equal(q[1].length,lesson.questions[i][1].length);
   assert(q[0].length>10&&q[3].length>15);
   if(lang==='fr')assert(!/[А-Яа-яЁё]/.test(JSON.stringify(q)),'French quiz must not retain Russian text');
  });
 }
 const localized=window.QX_LOCALIZED_REFERENCE[lang],base=window.qexusFisheriesReference;
 for(const country of ['norway','canada']){
  assert.equal(localized.roles[country].length,base.roles[country].length);
  localized.roles[country].forEach((r,i)=>{
   const src=base.roles[country][i];
   for(const key of ['source','training'])assert.equal(r[key],src[key],'Official links must remain unchanged');
   assert.equal(r.sectorKey,src.sector,'Sector IDs must not depend on display language');
  });
  localized.employers[country].forEach((e,i)=>{
   const src=base.employers[country][i];
   for(const key of ['name','url','contact'])assert.equal(e[key],src[key],'Employer identity, contact and favorites keys must remain unchanged');
  });
 }
}
assert(window.qexusExpansionQuiz('01').includes('Vérifier les réponses'));
assert.equal(window.qexusExpansionQuiz('unknown'),'');
window.QX_LOCALIZED_QUIZZES.fr['01'][0][0]='<img src=x onerror=alert(1)>';
window.QX_LOCALIZED_QUIZZES.fr['01'][0][1][0]='</label><script>alert(1)</script>';
const rendered=window.qexusExpansionQuiz('01');
assert(!rendered.includes('<img')&&!rendered.includes('<script>'),'Untrusted quiz strings must be escaped');
assert(rendered.includes('&lt;img'));
const html=fs.readFileSync('public/index.html','utf8');
for(const src of ['reference-i18n.js','quiz-i18n.js']){
 assert(html.indexOf('src="'+src+'"')<html.indexOf('src="expansion.js"'),'Locale data must load before the renderer');
 const tag=html.match(new RegExp('<script[^>]*src="'+src.replaceAll('.','\\.')+'"[^>]*>'))?.[0];
 assert(tag&&!/\b(?:defer|async)\b/.test(tag),'Locale data cannot be deferred behind a synchronous renderer');
}
console.log('Passed: 120 translated questions, original answer keys, stable employer IDs, official URLs, safe rendering and script order.');
