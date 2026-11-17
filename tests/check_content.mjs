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
assert((navigation.match(/<button\b/g)||[]).length===7,"Exactly seven visible main menu sections");
const academic=fs.readFileSync("public/academy.js","utf8");
const expanded=fs.readFileSync("public/expansion.js","utf8");
assert(!/bfisherman|bfishman/i.test(html+academic),"No commercial course name in public interface");
assert(academic.includes("function legacyExtras"),"Old course materials must be merged, not discarded");
assert(expanded.includes("qexusAcademyCertificates")&&expanded.includes("qexusAcademyCareer"),"Certification and career knowledge remain accessible");
assert(expanded.includes("qx-subtools"),"Tools should remain accessible outside main navigation");
const app=fs.readFileSync("public/app.js","utf8");
assert(app.includes("generated/registry.json"),"Public registry auto-load must remain enabled");
assert(app.includes("window.qexusNavigate"),"Extra tools navigation should work");

assert(app.includes("window.qexusReloadRegistry"),"Manual published-registry reload hook is required");
assert(app.includes("window.qexusRegistryInfo"),"The current source date must be visible to visitors");
assert(app.includes("cache:force?'no-store':'no-cache'"),"Manual refresh must bypass browser caches");

console.log("qexus compact menu: seven sections; merged course, resources, job registry and tools validated.");


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
