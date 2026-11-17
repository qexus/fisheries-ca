/* Honest localization notice for untranslated long-form technical materials. */
(()=>{'use strict';
document.addEventListener('DOMContentLoaded',()=>{
 const lang=document.documentElement.lang;
 if(!['fr','uk'].includes(lang))return;
 const note=document.createElement('aside');
 note.className='locale-note';
 note.setAttribute('role','note');
 note.textContent=lang==='fr'
   ?'Les 12 leçons, leurs tests, les métiers et les employeurs sont disponibles en français. Certains anciens outils et textes d’archives restent en russe; vérifiez toujours les exigences officielles.'
   :'Усі 12 уроків, тести, професії та роботодавці доступні українською. Деякі старі інструменти й архівні описи ще російською; завжди звіряйте офіційні вимоги.';
 const main=document.querySelector('main');
 if(main&&main.parentElement)main.parentElement.insertBefore(note,main);
},{once:true});
})();
