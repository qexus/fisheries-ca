/* Honest localization notice for untranslated long-form technical materials. */
(()=>{'use strict';
document.addEventListener('DOMContentLoaded',()=>{
 const lang=document.documentElement.lang;
 if(!['fr','uk'].includes(lang))return;
 const note=document.createElement('aside');
 note.className='locale-note';
 note.setAttribute('role','note');
 note.textContent=lang==='fr'
   ?'Les 12 leçons et les quatre guides de référence sont disponibles en français. Certains outils interactifs et anciens compléments de formation restent en russe; vérifiez toujours les exigences officielles.'
   :'Усі 12 уроків і чотири довідники доступні українською. Деякі інтерактивні інструменти та додаткові старі матеріали ще російською; завжди звіряйте офіційні вимоги.';
 const main=document.querySelector('main');
 if(main&&main.parentElement)main.parentElement.insertBefore(note,main);
},{once:true});
})();
