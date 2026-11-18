/* Validate local backup structure before changing saved user data. No networking. */
(()=>{'use strict';
const object=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
const fail=()=>{throw Error('Invalid backup structure')};
const recordList=(value,field)=>{
 if(!Array.isArray(value)||value.length>10000)fail();
 for(const row of value){
  if(!object(row)||typeof row[field]!=='string'||!row[field].trim())fail();
  if(Object.values(row).some(v=>v!==null&&!['string','number','boolean'].includes(typeof v)))fail();
 }
};
const map=(value,allowed)=>{
 if(value===undefined)return;
 if(!object(value)||Object.keys(value).length>20000||Object.values(value).some(v=>!allowed.includes(typeof v)))fail();
};
window.qxValidateBackup=(snapshot,country)=>{
 let visited=0;
 function walk(value,depth){
  if(++visited>150000||depth>8)fail();
  if(typeof value==='string'&&value.length>500000)fail();
  if(value&&typeof value==='object')for(const key of Object.keys(value)){
   if(['__proto__','prototype','constructor'].includes(key))fail();
   walk(value[key],depth+1);
  }
 }
 if(!object(snapshot))fail();walk(snapshot,0);
 if(country==='norway'){
  if(snapshot.app!=='qexus-fishing')fail();
  recordList(snapshot.companies,'name');recordList(snapshot.vessels,'ship');
  map(snapshot.statuses,['string']);map(snapshot.lessons,['boolean']);map(snapshot.checks,['boolean']);
 }else if(country==='canada'){
  if(snapshot.app!=='qexus-fisheries-canada'||!object(snapshot.data))fail();
  const d=snapshot.data;
  recordList(d.imported||[],'name');map(d.notes,['string']);
  for(const key of ['completed','favorites'])if(d[key]!==undefined&&(!Array.isArray(d[key])||d[key].length>20000||d[key].some(x=>typeof x!=='string')))fail();
 }else fail();
 map(snapshot.academy,['string']);
 return true;
};
})();
