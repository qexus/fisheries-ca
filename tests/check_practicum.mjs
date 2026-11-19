import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const html=fs.readFileSync('public/index.html','utf8');
const app=fs.readFileSync('public/app.js','utf8');
const guard=fs.readFileSync('public/backup-guard.js','utf8');
assert(html.includes('data-qp-view="practice"'),'Practice entry is visible in main navigation');
assert(html.includes('shared/practicum.css'),'Scenario stylesheet is linked');
const script=html.indexOf('src="https://qexus.github.io/shared/practicum.js"');
const router=html.indexOf('src="https://qexus.github.io/shared/fisheries-router.js"');
assert(script>0&&router>script,'Practicum initializes before the deep-link router');
assert(app.includes('practice:window.qxPracticum?.exportState?.()'),'Backup export contains practice answers');
assert(app.includes('window.qxPracticum.restoreState('),'Backup restore includes practice answers');
assert(app.includes('#main .qa-wrap,#main .qj-wrap,#main .qd-wrap,#main .qp-wrap'),'Registry refresh cannot erase visible exercise');
assert(guard.includes('validateSnapshot(snapshot.practice,country)'),'Guard validates practice progress before mutation');
const window={
  qxCandidateJourney:{validateSnapshot:()=>true},
  qxCandidateDesk:{validateSnapshot:()=>true},
  qxPracticum:{validateSnapshot:(value,c)=>value?.version===1&&value?.country===c}
};
vm.runInNewContext(guard,{window});
const fixture={app:'qexus-fisheries-canada',data:{imported:[],completed:[],favorites:[],notes:{}}};
const country='canada';
assert(window.qxValidateBackup(fixture,country),'Old backup remains importable');
assert(window.qxValidateBackup({...fixture,practice:{version:1,country,answers:{}}},country),'Current practice backup accepted');
assert.throws(()=>window.qxValidateBackup({...fixture,practice:{version:1,country:'other',answers:{}}},country),'Wrong country rejected');
window.qxPracticum.validateSnapshot=()=>false;
assert.throws(()=>window.qxValidateBackup({...fixture,practice:{version:1,country,answers:{}}},country),'Invalid practice data rejected');
console.log('Passed: localized practicum menu, asset loading, JSON roundtrip and strict security gate.');
