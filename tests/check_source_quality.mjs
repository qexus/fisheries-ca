import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const referenceCode=fs.readFileSync('public/reference-data.js','utf8');
const expansionCode=fs.readFileSync('public/expansion.js','utf8');
const appCode=fs.readFileSync('public/app.js','utf8');
const country='canada';
const now=Date.UTC(2026,10,18);
const DateClass=class extends Date {static now(){return now}};
const records=vm.runInNewContext(referenceCode+';window.qexusFisheriesReference',{window:{}}); // below, use separate context to read.
function contextFor(lang,simulateStale=false){
 const state={main:{innerHTML:''},grid:{innerHTML:''},count:{textContent:''},crumb:{textContent:''}};
 const handlers={};
 const el=(id)=>({main:state.main,'qx-employer-grid':state.grid,'qx-employer-count':state.count,crumb:state.crumb}[id]||null);
 const document={
  documentElement:{lang},
  getElementById(id){return el(id)},
  querySelectorAll(){return[]},
  addEventListener(type,fn){handlers[type]=fn}
 };
 const params='?lang='+lang;
 const window={scrollTo(){},QX_LOCALIZED_REFERENCE:null};
 const session={getItem(){return null},setItem(){}};
 const localStorage={getItem(){return null},setItem(){}};
 const context=vm.createContext({window,document,location:{pathname:country==='canada'?'/fisheries-ca/':'/fisheries/',search:params},
   URL,URLSearchParams,Date:simulateStale?class extends Date{static now(){return Date.UTC(2027,2,1)}}:DateClass,localStorage,sessionStorage:session});
 vm.runInContext(referenceCode,context);
 vm.runInContext(expansionCode,context);
 return {state,handlers,context};
}
const snapshot=contextFor('ru').context.window.qexusFisheriesReference;
assert(/^2026-\d{2}-\d{2}$/.test(snapshot.checked));
for(const c of ['norway','canada']){
 assert(snapshot.roles[c].length>=6&&snapshot.employers[c].length>=6,'Country sector coverage required');
 for(const role of snapshot.roles[c]){
  assert(/^2026-11-(17|18)$/.test(role.checked),'Each role requires a truthful manual source check date');
  assert(['public_authority','employer_information'].includes(role.sourceKind));
  assert(['shore','farm','maintenance','fisher','factoryvessel','master','engineer','deck','offshore','svop','qa'].includes(role.roleScope));
  assert(/^https:\/\//.test(role.source)&&!role.source.includes('@'),'Role sources must be HTTPS with no credentials');
 }
 for(const e of snapshot.employers[c]){
  assert(['company_career','government_search'].includes(e.sourceKind));
  assert(/^2026-11-(17|18)$/.test(e.checked),'Every employer needs a per-record check date');
  assert(e.hiringStatus==='not_verified'&&e.vacancyLanguage==='not_verified','Unknown hiring and working language must never be invented');
  assert(e.source===e.url&&/^https:\/\//.test(e.source),'Career source must link to observed URL');
  if(e.sourceKind==='government_search')assert(e.name==='Unipêche MDM','Only verified public search is a government search, not a company careers page');
 }
}
assert(snapshot.roles.norway.find(x=>x.id==='shore').source.includes('arbeidstilsynet.no'),'Shore role must not point to vessel-only qualifications');
assert(snapshot.roles.norway.find(x=>x.id==='shore').checked==='2026-11-18','Rechecked shore safety source has review date');
assert(snapshot.roles.canada.find(x=>x.id==='maintenance').source.includes('marketreport/requirements/17095'),'Maintenance role uses Job Bank occupation requirements');
assert(appCode.includes('Архивный снимок')||appCode.includes('Архив Job Bank'),'Old ads must be visibly archived');
for(const lang of ['ru','fr','uk']){
 const x=contextFor(lang);
 x.handlers.click({target:{closest(sel){
   if(sel==='[data-qx-view]')return {dataset:{qxView:'employers'}};
   return null;}},
   preventDefault(){}
 });
 assert(x.state.grid.innerHTML.includes('qx-source-evidence'),'Every career card must show provenance');
 assert(x.state.grid.innerHTML.includes('2026-11-18'),'Recently rechecked source dates must be displayed');
 assert(x.state.grid.innerHTML.includes(lang==='fr'?'recrutement non confirmé':lang==='uk'?'наявність вакансій не підтверджена':'наличие вакансий не подтверждено')||
   x.state.grid.innerHTML.includes(lang==='fr'?'langue de travail':lang==='uk'?'робоча мова':'рабочий язык'),'Hiring must not be implied');
 assert(!x.state.grid.innerHTML.includes('<script'),'Escaping source cards prevents injected scripts');
 const y=contextFor(lang);
 y.handlers.click({target:{closest(sel){if(sel==='[data-qx-view]')return {dataset:{qxView:'matrix'}};return null}},preventDefault(){}});
 assert(y.state.main.innerHTML.includes(lang==='fr'?'Applicabilité au poste':lang==='uk'?'Застосовність до посади':'Применимость к роли'),'Explain role applicability');
 assert(y.state.main.innerHTML.includes(lang==='fr'?'Date de vérification du profil':lang==='uk'?'Дата перевірки профілю':'Дата проверки профиля'),'Reveal requirements review date');
 const old=contextFor(lang,true);
 old.handlers.click({target:{closest(sel){if(sel==='[data-qx-view]')return {dataset:{qxView:'employers'}};return null}},preventDefault(){}});
 assert(old.state.grid.innerHTML.includes('qx-source-stale'),'A stale source must show explicit warning');
}
console.log('Source quality: both catalogues, 3 languages, archive warnings, per-record provenance, role scope, and expiry rule validated.');
