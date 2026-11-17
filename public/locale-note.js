/* Honest localization notice for untranslated long-form technical materials. */
(()=>{'use strict';
document.addEventListener('DOMContentLoaded',()=>{
 const lang=document.documentElement.lang;
 if(!['fr','uk'].includes(lang))return;
 const note=document.createElement('aside');
 note.className='locale-note';
 note.setAttribute('role','note');
 note.textContent=lang==='fr'
   ?'Navigation en français. Les longs articles techniques et certains modules restent en russe; vérifiez les exigences dans les sources officielles.'
   :'Навігація українською. Великі технічні статті й частина навчальних модулів поки доступні російською; перевіряйте вимоги в офіційних джерелах.';
 const main=document.querySelector('main');
 if(main&&main.parentElement)main.parentElement.insertBefore(note,main);
},{once:true});
})();
