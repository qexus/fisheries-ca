/* qexus lab Fisheries Academy extended interactive content (no backend).
 * Career leads are vetted company web pages, not guaranteed current vacancies.
 * Scores and favorites persist only in the local browser.
 */
(()=>{
"use strict";
const isCA=location.pathname.includes("/fisheries-ca/");
const country=isCA?"canada":"norway";
const lessons=window.qexusAcademyLessons||[];
const refs=window.qexusFisheriesReference||{};
const roles=(refs.roles||{})[country]||[];
const employers=(refs.employers||{})[country]||[];
const escape=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const safeURL=s=>/^https:\/\//.test(String(s))?escape(s):"#";
const getStore=(key,otherwise={})=>{try{return JSON.parse(localStorage.getItem("qx-expanded-"+country+"-"+key)||"null")||otherwise}catch{return otherwise}};
const saveStore=(key,value)=>{try{localStorage.setItem("qx-expanded-"+country+"-"+key,JSON.stringify(value))}catch{}};
const makeLink=(url,label)=>'<a href="'+safeURL(url)+'" target="_blank" rel="noopener noreferrer">'+escape(label)+' ↗</a>';
const checkDate=refs.checked||"2026-11-17";
window.qexusExpansionLesson=id=>{
 const info=lessons.find(l=>l.id===id);if(!info)return "";
 const note=isCA?info.caseCA:info.caseNO;
 const header='<section class="qx-expanded" aria-label="Подробный урок"><div class="qx-lesson-tag">РАСШИРЕННЫЙ УРОК · QEXUS LAB</div><h3>'+escape(info.title)+'</h3>';
 const sections=info.sections.map(([h,t])=>'<section><h4>'+escape(h)+'</h4><p>'+escape(t)+'</p></section>').join("");
 const caseNote='<aside class="qx-case"><b>'+(isCA?"🇨🇦 Канада":"🇳🇴 Норвегия")+'</b><p>'+escape(note)+'</p></aside>';
 const quiz='<div class="qx-quiz"><h4>Проверка знаний · '+info.questions.length+' вопроса</h4>'+info.questions.map(([q,opts,ans,explain],i)=>'<fieldset class="qx-question"><legend>'+(i+1)+'. '+escape(q)+'</legend>'+opts.map((opt,j)=>'<label><input name="qx_'+country+'_'+id+'_'+i+'" type="radio" value="'+j+'"> '+escape(opt)+'</label>').join('')+'</fieldset>').join('')+'<button class="qx-grade" data-qx-grade="'+escape(id)+'">Проверить ответы</button><div class="qx-feedback" role="status" aria-live="polite"></div></div>';
 return header+sections+caseNote+quiz+'</section>';
};
function grade(id,button){
 const info=lessons.find(l=>l.id===id);if(!info)return;
 const root=button.closest(".qx-expanded"),feedback=root?.querySelector(".qx-feedback");if(!feedback)return;
 let correct=0,answered=0;
 const rows=info.questions.map(([q,opts,ans,why],i)=>{
  const selected=root.querySelector('input[name="qx_'+country+'_'+id+'_'+i+'"]:checked');
  if(selected){answered++;if(+selected.value===ans)correct++}
  return '<li>'+(i+1)+'. '+escape(why)+'</li>';
 });
 feedback.innerHTML='<strong>Результат: '+correct+' / '+info.questions.length+'. '+(answered<info.questions.length?'Ответь на все вопросы.':correct===info.questions.length?'Отлично!':'Попробуй повторить урок.')+'</strong><ol>'+rows.join("")+'</ol>';
 if(correct===info.questions.length){const passed=getStore("passed");passed[id]=true;saveStore("passed",passed)}
}
function matrix(){
 return '<div class="qx-intro"><div class="qx-overline">ДОКУМЕНТЫ · КВАЛИФИКАЦИИ · БЮДЖЕТ</div><h1>Матрица профессий</h1><p>Выбирай конкретную должность, смотри обязательные условия и только затем примерную цену. Правила меняются в зависимости от судна, района плавания и обязанностей; таблица — не юридическое заключение.</p></div>'+
 '<div class="qx-panel qx-warning">Главная экономия: для работы на береговой рыбной фабрике морской сертификат не нужен автоматически. Для судна сначала уточняй тип, маршрут и роль. Примеры учебных цен не являются универсальной обязательной стоимостью.</div>'+
 '<div class="qx-filter-row"><label for="qx-role-filter">Отрасль</label><select id="qx-role-filter"><option value="all">Все направления</option><option>Береговая фабрика</option><option>Аквакультура</option><option>Судно</option></select></div>'+
 '<div class="qx-role-grid">'+roles.map(r=>'<article class="qx-role" data-qx-sector="'+escape(r.sector)+'"><div class="qx-role-top"><span>'+escape(r.sector)+'</span><span>'+escape(r.level)+'</span></div><h3>'+escape(r.role)+'</h3><details><summary>Документы, обучение и стоимость <span>⌄</span></summary><div class="qx-role-body"><h4>Обязательные условия / что уточнить</h4><ul>'+r.paper.map(x=>'<li>'+escape(x)+'</li>').join("")+'</ul><h4>Дополнительное обучение</h4><ul>'+r.optional.map(x=>'<li>'+escape(x)+'</li>').join("")+'</ul><h4>Сколько закладывать</h4><p class="qx-money">'+escape(r.budget)+'</p><p><b>Где:</b> '+escape(r.location)+'</p><div class="qx-links">'+makeLink(r.source,"Официальные требования")+(r.training?makeLink(r.training,"Учебный провайдер"):"")+'</div></div></details></article>').join("")+'</div>'+
 '<p class="qx-small">Обновлено вручную: '+escape(checkDate)+'. Матрица показывает ориентиры и примеры, а не гарантию действующей цены, регистрации или трудоустройства.</p>'+
 '<details class="qx-subsection"><summary>Стоимость сертификатов и учебные центры <span>⌄</span></summary><div class="qx-subsection-content">'+(window.qexusAcademyCertificates?.()||"")+'</div></details>';
}
function employer(){
 return '<div class="qx-intro"><div class="qx-overline">КАРЬЕРА · ПРОВЕРЕННЫЕ ОФИЦИАЛЬНЫЕ КАНАЛЫ</div><h1>Работодатели и контакты</h1><p>Прямые карьерные страницы и только публичные служебные контакты. Включение в список не означает, что компания сейчас нанимает. По ссылкам проверяй вакансии и отправляй CV только по инструкции работодателя.</p></div>'+
 '<div class="qx-filter-row"><input id="qx-employer-search" type="search" placeholder="Название, провинция, отрасль, техника..."><label class="qx-fav-toggle"><input id="qx-only-fav" type="checkbox"> Только избранные</label></div>'+
 '<div class="qx-employer-stats" id="qx-employer-count"></div><div class="qx-employer-grid" id="qx-employer-grid"></div>'+
 '<p class="qx-small">Карьерные каналы проверены: '+escape(checkDate)+'. Вакансии могут закрываться; отслеживание новых объявлений здесь пока не автоматизировано. Не отправляй паспортные данные случайным посредникам.</p>'+
 '<details class="qx-subsection"><summary>Резюме, документы, собеседование и контракт <span>⌄</span></summary><div class="qx-subsection-content">'+(window.qexusAcademyCareer?.()||"")+'</div></details>'+
 '<details class="qx-subsection"><summary>Официальные источники и библиотека <span>⌄</span></summary><div class="qx-subsection-content">'+(window.qexusAcademySources?.()||"")+'</div></details>'+
 '<div class="qx-subtools"><h3>Дополнительные инструменты</h3><button data-view="salary">Калькулятор зарплаты</button><button data-view="glossary">Словарь</button><button data-view="documents">Список документов</button><button data-view="'+(isCA?"sources":"import")+'">Источники и импорт</button></div>';
}
function employerCard(e,index){
 const favorites=getStore("favorites");
 const active=!!favorites[e.name];
 return '<article class="qx-employer" data-qx-employer="'+index+'"><div class="qx-e-top"><span>'+escape(e.place)+'</span><button class="qx-favorite" title="Сохранить в избранное на этом устройстве" aria-label="Избранное" aria-pressed="'+active+'" data-qx-favorite="'+escape(e.name)+'">'+(active?"★":"☆")+'</button></div><h3>'+escape(e.name)+'</h3><div class="qx-label">'+escape(e.field)+'</div><p><b>Что искать:</b> '+escape(e.jobs)+'</p><p class="qx-subtle">'+escape(e.note)+'</p><div class="qx-links">'+makeLink(e.url,"Карьерная страница / объявление")+(e.contact?'<a href="mailto:'+escape(e.contact)+'">✉ '+escape(e.contact)+'</a>':"")+'</div><div class="qx-verified">Источник: официальная карьера'+(e.url.includes("guichetemplois.gc.ca")?" / вакансия через Job Bank":"")+' · не гарантия вакансии</div></article>';
}
function filteredEmployers(){
 const grid=document.getElementById("qx-employer-grid");if(!grid)return;
 const search=(document.getElementById("qx-employer-search")?.value||"").toLowerCase();
 const only=document.getElementById("qx-only-fav")?.checked;
 const fav=getStore("favorites");
 let n=0;grid.innerHTML=employers.map((x,i)=>{
  if(search&&!((x.name+" "+x.place+" "+x.field+" "+x.jobs).toLowerCase().includes(search)))return "";
  if(only&&!fav[x.name])return "";
  n++;return employerCard(x,i);
 }).join("")||'<div class="qx-panel">Ничего не найдено. Измени фильтры или открой весь список.</div>';
 const count=document.getElementById("qx-employer-count");if(count)count.textContent="Показано "+n+" из "+employers.length+" карьерных каналов";
}
function show(view){
 const main=document.getElementById("main");if(!main)return;
 main.innerHTML='<div class="qa-wrap qx-wrap">'+(view==="matrix"?matrix():employer())+'</div>';
 document.querySelectorAll(".nav-item[data-view],.qa-side-link[data-qa-view]").forEach(b=>b.classList.remove("active"));
 document.querySelectorAll("[data-qx-view]").forEach(b=>b.classList.toggle("active",b.dataset.qxView===view));
 const crumb=document.getElementById("crumb")||document.getElementById("viewName");if(crumb)crumb.textContent=view==="matrix"?"Матрица профессий":"Работодатели";
 document.getElementById("sidebar")?.classList.remove("open");
 document.getElementById("menuToggle")?.setAttribute("aria-expanded","false");
 if(view==="employers")filteredEmployers();
 window.scrollTo({top:0,behavior:"instant"});
}
document.addEventListener("click",e=>{
 const tool=e.target.closest(".qx-subtools button[data-view]");
 if(tool){e.preventDefault();window.qexusNavigate?.(tool.dataset.view);document.querySelectorAll("[data-qx-view]").forEach(b=>b.classList.remove("active"));return}
 const btn=e.target.closest("[data-qx-view]");
 if(btn){e.preventDefault();show(btn.dataset.qxView);return}
 if(e.target.closest("[data-view],[data-qa-view]"))document.querySelectorAll("[data-qx-view]").forEach(b=>b.classList.remove("active"));
 const quiz=e.target.closest("[data-qx-grade]");if(quiz){e.preventDefault();grade(quiz.dataset.qxGrade,quiz);return}
 const favorite=e.target.closest("[data-qx-favorite]");
 if(favorite){const data=getStore("favorites");data[favorite.dataset.qxFavorite]=!data[favorite.dataset.qxFavorite];saveStore("favorites",data);filteredEmployers();}
});
document.addEventListener("change",e=>{if(e.target.id==="qx-role-filter"){const s=e.target.value;document.querySelectorAll(".qx-role").forEach(el=>{el.hidden=!(s==="all"||el.dataset.qxSector===s)})}if(e.target.id==="qx-only-fav")filteredEmployers();});
document.addEventListener("input",e=>{if(e.target.id==="qx-employer-search")filteredEmployers()});
})();
