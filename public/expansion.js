/* qexus lab Fisheries Academy extended interactive content (no backend).
 * Career leads are vetted company web pages, not guaranteed current vacancies.
 * Scores and favorites persist only in the local browser.
 */
(()=>{
"use strict";
const isCA=location.pathname.includes("/fisheries-ca/");
const country=isCA?"canada":"norway";
const lessons=window.qexusAcademyLessons||[];
const language=new URLSearchParams(location.search).get("lang")||document.documentElement.lang||"ru";
const refs=window.QX_LOCALIZED_REFERENCE?.[language]||window.qexusFisheriesReference||{};
const LABELS={"matrixTitle":["Матрица профессий","Métiers et certificats","Матриця професій"],"matrixOverline":["ДОКУМЕНТЫ · КВАЛИФИКАЦИИ · БЮДЖЕТ","DOCUMENTS · QUALIFICATIONS · BUDGET","ДОКУМЕНТИ · КВАЛІФІКАЦІЇ · БЮДЖЕТ"],"matrixIntro":["Выбирай конкретную должность, смотри обязательные условия и только затем примерную цену. Правила зависят от судна, района плавания и обязанностей.","Choisissez un poste, vérifiez ses exigences, puis estimez les frais. Les règles dépendent du navire, de la zone de navigation et des fonctions.","Оберіть посаду, перевірте обов’язкові вимоги, а потім орієнтовну вартість. Правила залежать від судна, району плавання й обов’язків."],"matrixWarning":["Для работы на береговой фабрике морской сертификат не нужен автоматически. Для судна сначала уточни тип, маршрут и роль. Примеры цен не являются универсальной обязательной стоимостью.","Un certificat maritime n’est pas automatiquement requis en usine à terre. Pour un navire, précisez d’abord son type, ses voyages et votre rôle. Les tarifs présentés sont des exemples, pas un coût obligatoire universel.","Для роботи на береговому заводі морський сертифікат не потрібен автоматично. Для судна спочатку уточніть тип, маршрут і роль. Приклади цін не є універсальною обов’язковою вартістю."],"sector":["Отрасль","Secteur","Галузь"],"all":["Все направления","Tous les secteurs","Усі напрями"],"shore":["Береговая фабрика","Usine à terre","Береговий завод"],"aqua":["Аквакультура","Aquaculture","Аквакультура"],"vessel":["Судно","Navire","Судно"],"details":["Документы, обучение и стоимость","Documents, formation et frais","Документи, навчання й вартість"],"requirements":["Обязательные условия / что уточнить","Exigences et points à vérifier","Обов’язкові умови / що уточнити"],"optional":["Дополнительное обучение","Formation complémentaire","Додаткове навчання"],"budget":["Сколько закладывать","Budget à prévoir","Скільки закладати"],"where":["Где:","Où :","Де:"],"official":["Официальные требования","Exigences officielles","Офіційні вимоги"],"provider":["Учебный провайдер","Organisme de formation","Навчальний заклад"],"manualDate":["Обновлено вручную:","Vérification manuelle :","Оновлено вручну:"],"matrixNote":["Ориентиры и примеры, без гарантии действующей цены, регистрации или трудоустройства.","Repères et exemples, sans garantie de tarif actuel, d’inscription ou d’embauche.","Орієнтири й приклади, без гарантії чинної ціни, реєстрації чи працевлаштування."],"certs":["Стоимость сертификатов и учебные центры","Tarifs des certificats et centres de formation","Вартість сертифікатів і навчальні центри"],"employerOverline":["КАРЬЕРА · ОФИЦИАЛЬНЫЕ КАНАЛЫ","CARRIÈRES · CANAUX OFFICIELS","КАР’ЄРА · ОФІЦІЙНІ КАНАЛИ"],"employerTitle":["Работодатели и контакты","Employeurs et contacts","Роботодавці й контакти"],"employerIntro":["Прямые карьерные страницы и публичные служебные контакты. Включение в список не означает, что компания сейчас нанимает. Проверяй вакансии и отправляй CV по инструкции работодателя.","Pages carrières directes et coordonnées professionnelles publiques. Une entreprise répertoriée ne recrute pas nécessairement. Vérifiez les offres et suivez les consignes de l’employeur pour envoyer votre CV.","Прямі кар’єрні сторінки й публічні службові контакти. Наявність у списку не означає, що компанія зараз наймає. Перевіряйте вакансії й надсилайте CV за інструкцією роботодавця."],"search":["Название, регион, отрасль, техника…","Nom, région, secteur, équipement…","Назва, регіон, галузь, техніка…"],"favoritesOnly":["Только избранные","Favoris seulement","Лише обрані"],"employerDate":["Карьерные каналы проверены:","Pages carrières vérifiées :","Кар’єрні сторінки перевірено:"],"employerNote":["Вакансии могут закрываться; новые объявления здесь не отслеживаются автоматически. Не отправляй паспортные данные случайным посредникам.","Les postes peuvent être pourvus; les nouvelles annonces ne sont pas suivies automatiquement ici. Ne transmettez pas votre passeport à un intermédiaire inconnu.","Вакансії можуть закриватися; нові оголошення тут не відстежуються автоматично. Не надсилайте паспортні дані випадковим посередникам."],"application":["Резюме, документы, собеседование и контракт","CV, documents, entrevue et contrat","Резюме, документи, співбесіда й контракт"],"library":["Официальные источники и библиотека","Sources officielles et bibliothèque","Офіційні джерела й бібліотека"],"tools":["Дополнительные инструменты","Outils complémentaires","Додаткові інструменти"],"salary":["Калькулятор зарплаты","Calculateur de salaire","Калькулятор зарплати"],"glossary":["Словарь","Glossaire","Словник"],"documents":["Список документов","Liste des documents","Перелік документів"],"sources":["Источники и импорт","Sources et importation","Джерела й імпорт"],"saveFavorite":["Сохранить в избранное на этом устройстве","Enregistrer dans les favoris sur cet appareil","Зберегти в обраному на цьому пристрої"],"favorite":["Избранное","Favori","Обране"],"jobs":["Что искать:","Postes à rechercher :","Що шукати:"],"careerLink":["Карьерная страница / объявление","Page carrières / offre","Кар’єрна сторінка / оголошення"],"verified":["Источник: официальная карьера · не гарантия вакансии","Source : page carrières officielle · poste non garanti","Джерело: офіційна кар’єрна сторінка · без гарантії вакансії"],"empty":["Ничего не найдено. Измени фильтры или открой весь список.","Aucun résultat. Modifiez les filtres ou affichez toute la liste.","Нічого не знайдено. Змініть фільтри або відкрийте весь список."],"count":["Показано {n} из {total} карьерных каналов","{n} pages carrières sur {total}","Показано {n} із {total} кар’єрних сторінок"],"sourceChecked":["Ссылка проверена вручную:","Lien vérifié manuellement :","Посилання перевірено вручну:"],"sourceKindCompany":["Карьерная страница компании · наличие вакансий не подтверждено","Page carrières de l’entreprise · recrutement non confirmé","Кар’єрна сторінка компанії · наявність вакансій не підтверджена"],"sourceKindSearch":["Публичный поиск Job Bank · не карьерная страница компании","Recherche publique Job Bank · pas une page carrières d’entreprise","Публічний пошук Job Bank · не сторінка кар’єри компанії"],"sourceStale":["Ссылка давно не перепроверялась — проверь её актуальность","Vérification ancienne — revérifiez ce lien","Посилання давно не перевіряли — перевір актуальність"],"sourceUnknown":["Дата ручной проверки неизвестна","Date de vérification inconnue","Дата ручної перевірки невідома"],"vacancyUnknown":["Открытая вакансия и рабочий язык — не подтверждены","Offre active et langue de travail non vérifiées","Відкрита вакансія та робоча мова не підтверджені"],"roleEvidenceEmployer":["Информация работодателя (не нормативное требование)","Information de l’employeur (non réglementaire)","Інформація роботодавця (не нормативна вимога)"],"roleEvidenceAuthority":["Официальный источник / справочник требований","Source officielle / guide des exigences","Офіційне джерело / довідник вимог"],"roleApplies":["Применимость к роли:","Applicabilité au poste :","Застосовність до посади:"],"roleRecheck":["Для этого вида работы проверь действующие правила, обязанности и требования регулятора; ссылки и цены не обновляются автоматически","Vérifiez les exigences actuelles selon le poste, les tâches et l’autorité compétente ; liens et prix ne sont pas actualisés automatiquement","Перевір чинні вимоги для посади, обов’язків і регулятора; посилання й ціни не оновлюються автоматично"],"careerChannelsOnly":["Направления в карточках — примеры профессий, не подтверждённые открытые вакансии.","Les métiers mentionnés sont des exemples, pas des postes actuellement confirmés.","Професії в картках — приклади, а не підтверджені відкриті вакансії."],"rolesReviewed":["Дата проверки профиля:","Date de vérification du profil :","Дата перевірки профілю:"]};
const t=key=>LABELS[key][language==="fr"?1:language==="uk"?2:0];
const roles=(refs.roles||{})[country]||[];
const employers=(refs.employers||{})[country]||[];
const escape=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const safeURL=s=>{try{const u=new URL(s);return u.protocol==="https:"&&!u.username&&!u.password?escape(u.href):"#"}catch{return "#"}};
const getStore=(key,otherwise={})=>{try{return JSON.parse(localStorage.getItem("qx-expanded-"+country+"-"+key)||"null")||otherwise}catch{return otherwise}};
const saveStore=(key,value)=>{try{localStorage.setItem("qx-expanded-"+country+"-"+key,JSON.stringify(value))}catch{}};
const makeLink=(url,label)=>'<a href="'+safeURL(url)+'" target="_blank" rel="noopener noreferrer">'+escape(label)+' ↗</a>';
const checkDate=refs.checked||"2026-11-17";
const reviewAge=(date)=>{
 if(typeof date!=="string"||!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(date))return null;
 const day=Date.parse(date+"T00:00:00Z"),now=Date.now();
 if(!Number.isFinite(day)||day>now)return null;
 return Math.floor((now-day)/86400000);
};
const reviewMarkup=(checked,kind)=>{
 const age=reviewAge(checked);
 const evidence=kind==="government_search"?t("sourceKindSearch"):t("sourceKindCompany");
 return '<div class="qx-source-evidence"><p>'+escape(evidence)+'</p>'+
 '<p>'+escape(t("sourceChecked"))+' <time datetime="'+escape(checked||"")+'">'+escape(checked||t("sourceUnknown"))+'</time>'+
 (age===null?' · '+escape(t("sourceUnknown")):age>45?' · <strong class="qx-source-stale">'+escape(t("sourceStale"))+'</strong>':'')+
 '</p><p>'+escape(t("vacancyUnknown"))+'</p></div>';
};

window.qexusExpansionLesson=id=>{
 const info=lessons.find(l=>l.id===id);if(!info)return "";
 const note=isCA?info.caseCA:info.caseNO;
 const header='<section class="qx-expanded" aria-label="Подробный урок"><div class="qx-lesson-tag">РАСШИРЕННЫЙ УРОК · QEXUS LAB</div><h3>'+escape(info.title)+'</h3>';
 const sections=info.sections.map(([h,t])=>'<section><h4>'+escape(h)+'</h4><p>'+escape(t)+'</p></section>').join("");
 const caseNote='<aside class="qx-case"><b>'+(isCA?"🇨🇦 Канада":"🇳🇴 Норвегия")+'</b><p>'+escape(note)+'</p></aside>';
 const sources=(info.references?.[country]||[]).filter(u=>/^https:\/\//.test(u)).map(u=>makeLink(u,"Первичный источник")).join("");
 const evidence=sources?'<div class="qx-links"><b>Документы и правила:</b> '+sources+'</div>':"";
 const quiz='<div class="qx-quiz"><h4>Проверка знаний · '+info.questions.length+' вопроса</h4>'+info.questions.map(([q,opts,ans,explain],i)=>'<fieldset class="qx-question"><legend>'+(i+1)+'. '+escape(q)+'</legend>'+opts.map((opt,j)=>'<label><input name="qx_'+country+'_'+id+'_'+i+'" type="radio" value="'+j+'"> '+escape(opt)+'</label>').join('')+'</fieldset>').join('')+'<button class="qx-grade" data-qx-grade="'+escape(id)+'">Проверить ответы</button><div class="qx-feedback" role="status" aria-live="polite"></div></div>';
 return header+sections+caseNote+evidence+quiz+'</section>';
};
const quizLabels={
 ru:{title:'Проверка знаний',button:'Проверить ответы',result:'Результат',incomplete:'Ответь на все вопросы.',success:'Отлично!',retry:'Попробуй повторить урок.'},
 fr:{title:'Vérifiez vos connaissances',button:'Vérifier les réponses',result:'Résultat',incomplete:'Répondez à toutes les questions.',success:'Bravo !',retry:'Relisez la leçon et réessayez.'},
 uk:{title:'Перевірте знання',button:'Перевірити відповіді',result:'Результат',incomplete:'Дайте відповіді на всі запитання.',success:'Чудово!',retry:'Повторіть урок і спробуйте ще раз.'}
};
const quizText=quizLabels[language]||quizLabels.ru;
const questionsFor=id=>window.QX_LOCALIZED_QUIZZES?.[language]?.[id]||lessons.find(l=>l.id===id)?.questions;
window.qexusExpansionQuiz=id=>{
 const questions=questionsFor(id);if(!questions)return '';
 return '<section class="qx-expanded qx-quiz-only"><div class="qx-quiz"><h4>'+quizText.title+' · '+questions.length+'</h4>'+questions.map(([q,opts],i)=>'<fieldset class="qx-question"><legend>'+(i+1)+'. '+escape(q)+'</legend>'+opts.map((opt,j)=>'<label><input name="qx_'+country+'_'+escape(id)+'_'+i+'" type="radio" value="'+j+'"> '+escape(opt)+'</label>').join('')+'</fieldset>').join('')+'<button class="qx-grade" data-qx-grade="'+escape(id)+'">'+quizText.button+'</button><div class="qx-feedback" role="status" aria-live="polite"></div></div></section>';
};
function grade(id,button){
 const questions=questionsFor(id);if(!questions)return;
 const root=button.closest('.qx-expanded'),feedback=root?.querySelector('.qx-feedback');if(!feedback)return;
 let correct=0,answered=0;
 const rows=questions.map(([q,opts,ans,why],i)=>{
  const selected=root.querySelector('input[name="qx_'+country+'_'+id+'_'+i+'"]:checked');
  if(selected){answered++;if(+selected.value===ans)correct++}
  return '<li>'+(i+1)+'. '+escape(why)+'</li>';
 });
 feedback.innerHTML='<strong>'+quizText.result+': '+correct+' / '+questions.length+'. '+(answered<questions.length?quizText.incomplete:correct===questions.length?quizText.success:quizText.retry)+'</strong><ol>'+rows.join('')+'</ol>';
 if(correct===questions.length){const passed=getStore('passed');passed[id]=true;saveStore('passed',passed)}
}
function matrix(){
 return `<div class="qx-intro"><div class="qx-overline">${t('matrixOverline')}</div><h1>${t('matrixTitle')}</h1><p>${t('matrixIntro')}</p></div>
 <div class="qx-panel qx-warning">${t('matrixWarning')}</div>
 <div class="qx-filter-row"><label for="qx-role-filter">${t('sector')}</label><select id="qx-role-filter"><option value="all">${t('all')}</option><option value="Береговая фабрика">${t('shore')}</option><option value="Аквакультура">${t('aqua')}</option><option value="Судно">${t('vessel')}</option></select></div>
 <div class="qx-role-grid">${roles.map(r=>`<article class="qx-role" data-qx-sector="${escape(r.sectorKey||r.sector)}"><div class="qx-role-top"><span>${escape(r.sector)}</span><span>${escape(r.level)}</span></div><h3>${escape(r.role)}</h3><details><summary>${t('details')} <span>⌄</span></summary><div class="qx-role-body"><h4>${t('requirements')}</h4><ul>${r.paper.map(x=>`<li>${escape(x)}</li>`).join('')}</ul><h4>${t('optional')}</h4><ul>${r.optional.map(x=>`<li>${escape(x)}</li>`).join('')}</ul><h4>${t('budget')}</h4><p class="qx-money">${escape(r.budget)}</p><p><b>${t('where')}</b> ${escape(r.location)}</p><div class="qx-links">${makeLink(r.source,r.sourceKind==='employer_information'?t('roleEvidenceEmployer'):t('roleEvidenceAuthority'))}${r.training?makeLink(r.training,t('provider')):''}</div><p class="qx-small">${t('roleApplies')} ${escape(r.role)} · ${t('rolesReviewed')} ${escape(r.checked||checkDate)}</p><p class="qx-small">${t('roleRecheck')}</p></div></details></article>`).join('')}</div>
 <p class="qx-small">${t('manualDate')} ${escape(checkDate)}. ${t('matrixNote')}</p>
 <details class="qx-subsection"><summary>${t('certs')} <span>⌄</span></summary><div class="qx-subsection-content">${window.qexusAcademyCertificates?.()||''}</div></details>`;
}
function employer(){
 return `<div class="qx-intro"><div class="qx-overline">${t('employerOverline')}</div><h1>${t('employerTitle')}</h1><p>${t('employerIntro')}</p><p class="qx-source-warning">${t('careerChannelsOnly')}</p></div>
 <div class="qx-filter-row"><input id="qx-employer-search" type="search" aria-label="${t('search')}" placeholder="${t('search')}"><label class="qx-fav-toggle"><input id="qx-only-fav" type="checkbox"> ${t('favoritesOnly')}</label></div>
 <div class="qx-employer-stats" id="qx-employer-count" role="status"></div><div class="qx-employer-grid" id="qx-employer-grid"></div>
 <p class="qx-small">${t('employerDate')} ${escape(checkDate)}. ${t('employerNote')}</p>
 <details class="qx-subsection"><summary>${t('application')} <span>⌄</span></summary><div class="qx-subsection-content">${window.qexusAcademyCareer?.()||''}</div></details>
 <details class="qx-subsection"><summary>${t('library')} <span>⌄</span></summary><div class="qx-subsection-content">${window.qexusAcademySources?.()||''}</div></details>
 <div class="qx-subtools"><h3>${t('tools')}</h3><button data-view="salary">${t('salary')}</button><button data-view="glossary">${t('glossary')}</button><button data-view="documents">${t('documents')}</button><button data-view="${isCA?'sources':'import'}">${t('sources')}</button></div>`;
}
function employerCard(e,index){
 const active=!!getStore('favorites')[e.name];
 return `<article class="qx-employer" data-qx-employer="${index}"><div class="qx-e-top"><span>${escape(e.place)}</span><button class="qx-favorite" title="${t('saveFavorite')}" aria-label="${t('favorite')}: ${escape(e.name)}" aria-pressed="${active}" data-qx-favorite="${escape(e.name)}">${active?'★':'☆'}</button></div><h3>${escape(e.name)}</h3><div class="qx-label">${escape(e.field)}</div><p><b>${t('jobs')}</b> ${escape(e.jobs)}</p><p class="qx-subtle">${escape(e.note)}</p><div class="qx-links">${makeLink(e.url,t('careerLink'))}${e.contact?'<a href="mailto:'+escape(e.contact)+'">✉ '+escape(e.contact)+'</a>':''}</div>${reviewMarkup(e.checked||checkDate,e.sourceKind)}</article>`;
}
const normalizeSearch=value=>String(value).normalize('NFKD').replace(/\p{M}/gu,'').toLocaleLowerCase().replace(/ø/g,'o').replace(/æ/g,'ae').replace(/œ/g,'oe');
function filteredEmployers(){
 const grid=document.getElementById('qx-employer-grid');if(!grid)return;
 const search=normalizeSearch(document.getElementById('qx-employer-search')?.value||'').trim();
 const only=document.getElementById('qx-only-fav')?.checked;
 const fav=getStore('favorites');
 let n=0;grid.innerHTML=employers.map((x,i)=>{
  if(search&&!normalizeSearch([x.name,x.place,x.field,x.jobs].join(' ')).includes(search))return '';
  if(only&&!fav[x.name])return '';
  n++;return employerCard(x,i);
 }).join('')||'<div class="qx-panel">'+t('empty')+'</div>';
 const count=document.getElementById('qx-employer-count');if(count)count.textContent=t('count').replace('{n}',n).replace('{total}',employers.length);
}
function show(view){
 const main=document.getElementById('main');if(!main)return;
 main.innerHTML='<div class="qa-wrap qx-wrap">'+(view==='matrix'?matrix():employer())+'</div>';
 document.querySelectorAll('.nav-item[data-view],.qa-side-link[data-qa-view]').forEach(b=>b.classList.remove('active'));
 document.querySelectorAll('[data-qx-view]').forEach(b=>b.classList.toggle('active',b.dataset.qxView===view));
 const crumb=document.getElementById('crumb')||document.getElementById('viewName');if(crumb)crumb.textContent=t(view==='matrix'?'matrixTitle':'employerTitle');
 document.getElementById('sidebar')?.classList.remove('open');
 document.getElementById('menuToggle')?.setAttribute('aria-expanded','false');
 if(view==='employers')filteredEmployers();
 window.scrollTo({top:0,behavior:'instant'});
}
document.addEventListener('click',e=>{
 const tool=e.target.closest('.qx-subtools button[data-view]');
 if(tool){e.preventDefault();window.qexusNavigate?.(tool.dataset.view);document.querySelectorAll('[data-qx-view]').forEach(b=>b.classList.remove('active'));return}
 const btn=e.target.closest('[data-qx-view]');
 if(btn){e.preventDefault();show(btn.dataset.qxView);return}
 if(e.target.closest('[data-view],[data-qa-view]'))document.querySelectorAll('[data-qx-view]').forEach(b=>b.classList.remove('active'));
 const quiz=e.target.closest('[data-qx-grade]');if(quiz){e.preventDefault();grade(quiz.dataset.qxGrade,quiz);return}
 const favorite=e.target.closest('[data-qx-favorite]');
 if(favorite){const data=getStore('favorites');data[favorite.dataset.qxFavorite]=!data[favorite.dataset.qxFavorite];saveStore('favorites',data);filteredEmployers();}
});
document.addEventListener('change',e=>{
 if(e.target.id==='qx-role-filter'){
  const s=e.target.value;document.querySelectorAll('.qx-role').forEach(el=>{el.hidden=!(s==='all'||el.dataset.qxSector===s)})
 }
 if(e.target.id==='qx-only-fav')filteredEmployers();
});
document.addEventListener('input',e=>{if(e.target.id==='qx-employer-search')filteredEmployers()});
})();
