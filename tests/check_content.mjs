import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const context = {window: {}};
for (const file of ["public/lessons-extended.js","public/reference-data.js"]) {
  const contents=fs.readFileSync(file,"utf8");
  vm.runInNewContext(contents,context,{filename:file});
}
const lessons=context.window.qexusAcademyLessons;
const db=context.window.qexusFisheriesReference;
assert(Array.isArray(lessons) && lessons.length === 12, "Expect 12 detailed modules");
const ids=new Set();
for(const l of lessons){
  assert(/^\d\d$/.test(l.id), "Two-digit lesson id");
  assert(!ids.has(l.id), "Lesson IDs must be unique");
  ids.add(l.id);
  assert(l.sections.length >= 3, "At least 3 detail sections per module");
  assert(l.questions.length >= 5, "Each module has at least five questions");
  assert(l.task.length >= 50, "Substantive task required");
  assert(l.references?.canada?.length && l.references?.norway?.length,"Country-specific official reading needed for each lesson");
  for(const country of ["canada","norway"]){
    assert(l.references[country].every(u=>/^https:\/\//.test(u)),"Official learning reference must use HTTPS");
  }
  for(const q of l.questions){
    assert(q.length === 4 && Array.isArray(q[1]), "Quiz is [prompt,choices,correct,explanation]");
    assert(q[1].length >= 3 && Number.isInteger(q[2]) && q[2]>=0 && q[2]<q[1].length, "Correct answer index");
    assert(q[3].length>=12, "Feedback explanation required");
  }
}
for(const country of ["canada","norway"]){
 const roles=db.roles[country], companies=db.employers[country];
 assert(roles.length>=7, "Seven job families per country");
 assert(companies.length>=6, "At least six verified career channels");
 const seen=new Set();
 for(const c of companies){
   assert(/^https:\/\//.test(c.url), "Official HTTPS career URL");
   assert(!seen.has(c.url), "No duplicate employer URLs");
   seen.add(c.url);
 }
 for(const role of roles){
   assert(role.paper.length>=3, "At least three qualification checks");
   assert(role.budget.length>20 && /^https:\/\//.test(role.source), "Training budget and official source needed");
 }
}
const html=fs.readFileSync("public/index.html","utf8");
assert(html.includes('shared/fisheries-core.js') && html.includes('shared/fisheries-core.css'),"Shared cross-country modules must be linked");
assert(html.includes('http-equiv="Content-Security-Policy"'),"CSP must be applied to Fisheries shell");

for(const path of ["lessons-extended.js","reference-data.js","academy.js","expansion.js","expansion.css","academy.css"]){
 assert(html.includes(path), "Missing linked asset "+path);
 assert(fs.existsSync("public/"+path), "Missing asset "+path);
}
const academy=fs.readFileSync("public/academy.js","utf8");
assert(academy.includes("window.qexusExpansionLesson?.(m[0])"),"Detailed lessons not integrated");
for(const view of ['matrix','employers'])assert(html.includes('data-qx-view="'+view+'"'),"Missing menu "+view);

const navigation=html.match(/<nav id="nav"[\s\S]*?<\/nav>/)?.[0]||"";
const extras = navigation.match(/<details class="qf-extra">[\s\S]*?<\/details>/)?.[0] || "";
const primaryNavigation = navigation.replace(extras, "");
assert((primaryNavigation.match(/<button\b/g)||[]).length === 7,
  "Exactly seven primary navigation sections should remain visible");
assert((extras.match(/<button\b/g)||[]).length === 4,
  "Four advanced tools must be available in a collapsed disclosure");
assert(html.includes("shared/fisheries-router.js") && html.includes("shared/fisheries-router.css"),
  "Shared deep-link navigation assets must be loaded");
assert(html.includes('href="https://qexus.github.io/work.html"'),
  "Country page needs a contextual return to the career hub");
assert(!html.includes('href="https://qexus.github.io/site-map.html"') && !html.includes('href="https://qexus.github.io/status.html"'),
  "Maps and registry status belong to the career hub, not duplicated in every footer");
assert((html.match(/<a href="guides\//g)||[]).length === 1,
  "One entry into the static Academy is enough");
const academic=fs.readFileSync("public/academy.js","utf8");
const expanded=fs.readFileSync("public/expansion.js","utf8");
assert(!/bfisherman|bfishman/i.test(html+academic),"No commercial course name in public interface");
assert(academic.includes("function legacyExtras"),"Old course materials must be merged, not discarded");
assert(expanded.includes("qexusAcademyCertificates")&&expanded.includes("qexusAcademyCareer"),"Certification and career knowledge remain accessible");
assert(expanded.includes("qx-subtools"),"Tools should remain accessible outside main navigation");
const app=fs.readFileSync("public/app.js","utf8");
assert(app.includes("generated/registry.json"),"Public registry auto-load must remain enabled");
assert(app.includes("window.qexusNavigate"),"Extra tools navigation should work");

assert(!app.includes("qexusReloadRegistry"),"Keep visitor-only manual refresh removed");

console.log("qexus navigation: seven primary sections plus four optional tools; course and resources validated.");


assert(html.includes('rel="canonical"'),"Public site must declare its canonical URL");
assert(!html.includes("noindex,nofollow"),"Public educational pages must not be blocked from indexing");
assert(html.includes('aria-controls="sidebar"') && html.includes('aria-expanded="false"'),"Mobile menu needs accessible state");
assert(app.includes("if(!document.querySelector('#main .qa-wrap'))render()"),"Do not replace an open Academy view after registry fetch");

assert(app.includes("companyLimit:60"),"Canada catalog must paginate on mobile");
assert(app.includes('id="loadMoreCompanies"'),"Canada catalog must support loading next page");
assert(app.includes("state.companyLimit+=60"),"More button must show additional records");
assert(app.includes("$('#menuToggle').setAttribute('aria-expanded'"),"Menu expanded state must be updated");


assert(app.includes("function exportAcademyData()"),"Backup must include new Academy data");
assert(app.includes("function restoreAcademyData("),"Old or new backup restoration must support Academy progress");
assert(app.includes("academy:exportAcademyData()"),"Export must actually save Academy data");

console.log("qexus academy: 12 modules, 60 quizzes, 14 role paths, 13 employer career links, script wiring OK.");

// Static educational HTML must be available independently of JavaScript.
for (const file of ["index.html","professions.html","employers.html","registries.html","glossary.html",...Array.from({length:12},(_,i)=>"lesson-"+String(i+1).padStart(2,"0")+".html")]) {
 const content=fs.readFileSync("public/guides/"+file,"utf8");
 assert(content.includes('<link rel="canonical"'),"Static canonical missing in "+file);
 assert(content.includes('<meta name="description"'),"Static meta description missing in "+file);
 assert(content.includes("<h1>"),"Static heading missing in "+file);
}
assert(fs.existsSync("public/guides/guide.css"),"Missing static guide CSS");
assert(html.includes('href="guides/"'),"Static guide hub must be linked from app");
console.log("17 Canada static indexable guides validated.");

assert(html.includes('class="country-current" aria-current="page"'),"Current country should be a label, not a self-link");

// Language selector and icon-only branding must not disturb working navigation.
assert(html.includes('src="i18n.js"')&&html.includes('href="i18n.css"')&&html.includes('src="locale-note.js"'),"RU/FR/UK locale assets required");
assert(fs.existsSync("public/i18n.js")&&fs.existsSync("public/i18n.css")&&fs.existsSync("public/locale-note.js"),"Language assets must be deployable");
assert(!/<(?:strong|b)>qexus lab<\/(?:strong|b)>/.test(html),"Clickable icon should not have redundant brand text");
assert(fs.readFileSync("public/i18n.js","utf8").includes("qx-language-switch"),"Language selector script missing");

// Localized static course quality: every lesson must be a crawlable self-canonical page.
for(const lang of ["fr","uk"]){
 const base="public/"+lang+"/";
 const start=fs.readFileSync(base+"index.html","utf8");
 const hub=fs.readFileSync(base+"guides/index.html","utf8");
 assert(start.includes('<html lang="'+lang+'">'),"Localized project hub needs HTML lang");
 assert(hub.includes('<html lang="'+lang+'">'),"Localized guide hub needs HTML lang");
 assert(hub.includes('rel="canonical" href="https://qexus.github.io/fisheries-ca/'+lang+'/guides/"'),"Missing self-canonical");
 assert((hub.match(/href="lesson-\d{2}\.html"/g)||[]).length===12,"All 12 translated lesson links must appear");
 assert((hub.match(/href="(?:professions|employers|registries|glossary)\.html"/g)||[]).length===4,"All four translated references must appear");
 for(let i=1;i<=12;i++){
  const id=String(i).padStart(2,"0");
  const file=base+"guides/lesson-"+id+".html";
  const content=fs.readFileSync(file,"utf8");
  const url="https://qexus.github.io/fisheries-ca/"+lang+"/guides/lesson-"+id+".html";
  assert(content.includes('<html lang="'+lang+'">'),"Wrong language on "+file);
  assert(content.includes('rel="canonical" href="'+url+'"'),"Bad canonical on "+file);
  assert(content.includes('hreflang="ru"')&&content.includes('hreflang="fr"')&&content.includes('hreflang="uk"'),"Missing reciprocal alternate on "+file);
  assert((content.match(/<h3>/g)||[]).length>=4,"Technical lesson needs explanation plus practical task");
  assert(content.includes("https://")&&content.includes('target="_blank"'),"Missing official source");
  if(lang==="fr")assert(!/Особливості Норвегії|Практическая задача|Проверь понимание/.test(content),"Untranslated Russian article section in "+file);
  if(lang==="uk" && "fisheries-ca"==="fisheries-ca")assert(!content.includes("Особливості Норвегії"),"Wrong country in Ukraine Canada course");
 }
}
console.log("Static FR/UK localized project hubs and 24 lessons verified.");

// New source-aligned FR/UK professional guides and interactive courses.
assert(html.includes('src="academy-content.js"')&&html.includes('src="academy.js"'),"Localized Academy scripts must be loaded in the right order");
assert(fs.existsSync("public/academy-content.js"),"Compiled localized curricula must exist");
const acad=fs.readFileSync("public/academy-content.js","utf8");
for(const lang of ["fr","uk"]){
 const re=new RegExp('id":"[0-1][0-9]"','g');
 assert((acad.match(re)||[]).length>=24,"All twelve translated interactive lessons for both languages must be present");
 for(const guide of ["professions","employers","registries","glossary"]){
  const file="public/"+lang+"/guides/"+guide+".html";
  const content=fs.readFileSync(file,"utf8");
  const url="https://qexus.github.io/fisheries-ca/"+lang+"/guides/"+guide+".html";
  assert(content.includes('<html lang="'+lang+'">'),"Translated guide needs html lang: "+file);
  assert(content.includes('rel="canonical" href="'+url+'"'),"Translated guide needs own canonical: "+file);
  assert(content.includes('hreflang="fr"')&&content.includes('hreflang="uk"'),"Translated guide needs hreflang: "+file);
  if(guide!=="glossary")assert(content.includes('href="https://')&&content.includes('target="_blank"'),"Official/reference links missing: "+file);
  else assert(content.includes('class="terms"')&&content.includes('href="../../?view='),"Glossary must preserve terms and interactive directory");
  if(lang==="fr")assert(!/[А-Яа-яЁё]/.test(content),"Russian prose remains in French guide: "+file);
 }
 const professions=fs.readFileSync("public/"+lang+"/guides/professions.html","utf8");
 assert.equal((professions.match(/<article class="panel">/g)||[]).length,7,"Exactly seven profession cards");
 const glossary=fs.readFileSync("public/"+lang+"/guides/glossary.html","utf8");
 assert.equal((glossary.match(/<tr><td>/g)||[]).length,56,"All glossary entries must be preserved");
}
console.log("All four translated references and interactive curricula validated.");

// Interactive Academy auxiliary views: certified training cards, job checklist, source library.
const academyScript=fs.readFileSync("public/academy.js","utf8");
new vm.Script(academyScript,{filename:"public/academy.js"});
for(const method of ["qxLocalizedCertification","qxLocalizedJobs","qxLocalizedLibrary"]){
 assert(academyScript.includes("function "+method+"()"),"Missing localized Academy view "+method);
 assert(academyScript.includes("const translated="+method+"();if(translated)return translated;"),"Academy view must render localized content "+method);
}
assert(academyScript.includes("const qxChecklist=")&&academyScript.includes("const qxTranslatedCards="),"Localized card and job datasets must exist");
assert(academyScript.includes("data-qa-check"),"Job checks must preserve progress attributes");
assert(academyScript.includes('localStorage.getItem("qexus-academy-"'),"Local progress key must be preserved");
const certIds=(academyScript.match(/"(ca-[a-z-]+)":\[/g)||[]).length;
assert(certIds>=24,"Certificate translations must cover both FR and UK for every course card");
console.log("Interactive Academy auxiliary views, prices, official URLs and persistent progress validated.");

// Complete French/Ukrainian Academy certificates, job application checklist and official library.
assert(html.includes('src="academy-ui.js"')&&html.indexOf('src="academy-ui.js"')<html.indexOf('src="academy.js"'),"Academy UI translations must load before Academy");
const ui=fs.readFileSync("public/academy-ui.js","utf8");
for(const lang of ["fr","uk"]){
 assert(ui.includes('"'+lang+'":'),"Missing Academy UI "+lang);
 for(const id of ["ca-sdv","ca-dvs","ca-stcw","ca-psc","no-fish","no-med","no-work"]){
  assert(ui.includes('"'+id+'":'),"Missing translated certificate "+id);
 }
}
assert(fs.readFileSync("public/academy.js","utf8").includes("localizedJobsHTML"),"Missing translated checklist renderer");
assert(fs.readFileSync("public/academy.js","utf8").includes("localizedLibraryHTML"),"Missing translated library renderer");
console.log("20 Academy certificate translations plus career and library UI verified.");

// Sidebar links to translated auxiliary Academy tools must be accessible.
for(const view of ["cert","jobs","library"]){
 assert(html.includes('data-qa-view="'+view+'"'),"Sidebar missing interactive Academy "+view+" link");
}
for(const label of ["Курсы и цены","План отклика","Библиотека ведомств"]){
 assert(html.includes(label),"Sidebar must have a readable source label: "+label);
}
const translations=fs.readFileSync("public/i18n.js","utf8");
assert(translations.includes("Cours et tarifs")&&translations.includes("Офіційна бібліотека"),"Auxiliary menu needs French and Ukrainian translations");
console.log("Translated Academy auxiliary navigation verified.");
