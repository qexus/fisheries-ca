/* qexus lab Fisheries Academy — independent, free-reference curriculum
 * Applies to Norway and Canada sites; does not issue maritime qualifications.
 * Last researched: 2026-11-17.
 */
(()=>{
"use strict";
const isCA=/fisheries-ca(?:\/|$)/.test(location.pathname);
const country=isCA?"Canada":"Norway";
const E=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const external=(url,text)=>'<a target="_blank" rel="noopener noreferrer" href="'+E(url)+'">'+E(text||"Официальная информация")+' ↗</a>';
const L={
  tc:"https://tc.canada.ca/en/marine-transportation/publications/tp-15356-small-vessel-compliance-program-fishing-vessel-svcp-f-detailed-compliance-report-guidance-notes-06-2024",
  schools:"https://tc.canada.ca/en/marine-transportation/publications/tp-10655e-recognized-institutions-approved-training-courses-11-2025",
  dfo:"https://www.dfo-mpo.gc.ca/",
  jobbank:"https://www.jobbank.gc.ca/",
  cfia:"https://inspection.canada.ca/en/food-safety-industry/preventive-control-plans",
  cfiafish:"https://inspection.canada.ca/en/food-safety-industry/food-guidance-commodity/fish",
  nsccDVS:"https://www.nscc.ca/programs-and-courses/marine/course.aspx?i=013169",
  nsccSTCW:"https://www.nscc.ca/programs-and-courses/marine/course.aspx?I=009382",
  nsccSVOP:"https://www.nscc.ca/programs-and-courses/marine/course.aspx?I=009591",
  nsccPSC:"https://www.nscc.ca/programs-and-courses/marine/course.aspx?i=009383",
  mi:"https://www.trainatmi.ca/search/publicCourseSearchDetails.do?courseId=900541&method=load&selectedProgramAreaId=9052224&selectedProgramStreamId=",
  cfmu:"https://sidel.cegep-rimouski.qc.ca/detailscours.aspx?cours=2865&entite=cfmu",
  epaq:"https://epaq.qc.ca/formations-reglementees/",
  east:"https://formation-professionnelle.essb.qc.ca/services-aux-entreprises/formations-en-surete-et-securite-maritime/",
  sdir:"https://www.sdir.no/en/Seafarers/Certificates/requirements-for-working-on-fishing-vessels/",
  sdirCert:"https://www.sdir.no/sjofolk/sertifikater/Informasjon_om_maritime_sertifikater_og_kvalifikasjoner/sikkerhetskurs/",
  sdirMed:"https://www.sdir.no/en/Seafarers/seafarers-health/for-seafarers/medical-certificate/",
  medPrice:"https://sjomannslege.no/priser/priser-sjomannslege/",
  norwayCourse:"https://gskkurs.no/stcw-grunnleggende-sikkerhetsopplaring-for-fiskere/",
  refresh:"https://www.kursfokus.no/kurs/stcw-grunnleggende-sikkerhetsopplaering-oppdatering-kombinert-med-e-laering/",
  udi:"https://www.udi.no/en/want-to-apply/work-immigration/",
  udiSeason:"https://www.udi.no/en/want-to-apply/work-immigration/seasonal-workers",
  nav:"https://arbeidsplassen.nav.no/stillinger",
  fdir:"https://www.fiskeridir.no/",
  mat:"https://www.mattilsynet.no/",
  codex:"https://www.fao.org/fao-who-codexalimentarius/en/",
  training:"https://bfisherman.com/programma-kursa/"
};
const certCA=[
{id:"ca-sdv",kind:"Для экипажа на определённых судах",name:"SDV-BS — Small Non-Pleasure Domestic Vessel Basic Safety",price:"925 CAD в Lévis (885 + 40 сбор)",location:"CFMU — Lévis, Québec; также ÉPAQ Grande-Rivière и Eastern Shores New Carlisle",duration:"12,5 часа в CFMU",role:"Для экипажей соответствующих малых коммерческих/рыболовных судов. Ранее назывался MED A3. Условия применения зависят от района плавания и судна.",source:L.tc,offer:L.cfmu,todo:"Проверь тип судна, язык преподавания и срок действия сертификата Fatigue Management. В ÉPAQ опубликовано 525 CAD на 2025–2026, 13 часов; актуальную цену перепроверь."},
{id:"ca-sdv-qc",kind:"Квебек: альтернативный курс",name:"SDV-BS — ÉPAQ Grande-Rivière",price:"525 CAD (тариф ÉPAQ 2025–2026, перепроверить на 2026–2027)",location:"École des pêches et de l’aquaculture du Québec, Grande-Rivière, QC",duration:"13 часов · очно",role:"Местная программа для соответствующих малых коммерческих и рыболовных судов; Transport Canada certificate. На сайте ÉPAQ указаны возможные программы финансирования Services Québec. Этот опубликованный тариф относится к 2025–2026 учебному году.",source:L.schools,offer:L.epaq,todo:"Подтверди язык курса и дату занятий. Не требуется автоматически каждому фабричному работнику."},
{id:"ca-dvs",kind:"Для экипажа на определённых судах",name:"DVS — Domestic Vessel Safety (ранее MED A1)",price:"815 CAD",location:"NSCC, Sydney Waterfront Campus, Nova Scotia",duration:"26 часов · очно",role:"Подготовка к аварийным ситуациям на судне. Для более удалённых районов плавания могут действовать иные требования.",source:L.tc,offer:L.nsccDVS,todo:"Сравни сертификат с требованиями работодателя; не покупай автоматически для фабрики."},
{id:"ca-dvs-qc",kind:"Квебек: альтернативный курс",name:"DVS — ÉPAQ Grande-Rivière",price:"1 075 CAD (тариф ÉPAQ 2025–2026, перепроверить на 2026–2027)",location:"ÉPAQ, Grande-Rivière, Québec",duration:"26 часов",role:"Подготовка Domestic Vessel Safety, 26 часов; уточни язык, свободные места и тариф на 2026–2027 непосредственно у ÉPAQ.",source:L.schools,offer:L.epaq,todo:"Нужна пройденная подготовка Fatigue Management. Уточни условия для своей категории судна."},
{id:"ca-stcw",kind:"Для определённых морских маршрутов",name:"STCW Basic Safety",price:"1 890 CAD",location:"NSCC, Strait Area Campus (Nautical Institute), Nova Scotia",duration:"Очный курс, около одной учебной недели",role:"Международная базовая морская подготовка. Не заменяет проверку требований судна Transport Canada.",source:L.schools,offer:L.nsccSTCW,todo:"Уточни допустимость STCW именно для позиции и возможность регистрации как иностранного слушателя."},
{id:"ca-fa",kind:"По составу экипажа",name:"Marine Basic / Advanced First Aid",price:"Цена зависит от учебного центра",location:"Признанные Transport Canada школы и уполномоченные провинциальные провайдеры",duration:"Зависит от класса и уровня",role:"На небольшом рыболовном судне минимум один подходящий член экипажа должен иметь действующее обучение первой помощи. Advanced нужен для отдельных дальних маршрутов.",source:L.tc,offer:L.schools,todo:"Проверь, требуется ли этот сертификат лично тебе, а не назначенному члену экипажа."},
{id:"ca-svop",kind:"Только управление судном",name:"SVOP — Small Vessel Operator Proficiency",price:"625 CAD",location:"NSCC, Shelburne Campus и другие площадки Nova Scotia",duration:"26 часов · очно",role:"Для оператора соответствующего малого судна. Не является обязательным курсом для рядового рабочего фабрики или каждого матроса.",source:L.tc,offer:L.nsccSVOP,todo:"Не оплачивай без намерения работать оператором судна."},
{id:"ca-radio",kind:"Для радиосвязи",name:"ROC-M / ROC-MC — морская радиосвязь",price:"Цена у провайдера",location:"Курсы и экзамены морской радиосвязи; конкретного провайдера уточнять",duration:"Зависит от категории",role:"Для людей, которые будут работать с морскими радиостанциями, тип удостоверения зависит от оборудования и судна.",source:L.tc,offer:L.schools,todo:"Уточни, какой вариант указан в судовых требованиях: ROC-M или ROC-MC."},
{id:"ca-roc-qc",kind:"Квебек: морская радиосвязь",name:"ROC-MC / CRO-CM — ÉPAQ",price:"855 CAD (тариф ÉPAQ 2025–2026, перепроверить на 2026–2027)",location:"ÉPAQ, Grande-Rivière, Québec",duration:"24 часа",role:"Курс ограниченного удостоверения радиооператора морской коммерческой связи. Нужен только для соответствующих обязанностей и оборудования.",source:L.schools,offer:L.epaq,todo:"Не путай коммерческий ROC-MC с обычным ROC-M; уточни потребность у судовладельца."},
{id:"ca-psc",kind:"Дополнительная специализация",name:"Proficiency in Survival Craft (PSC)",price:"1 290 CAD",location:"NSCC, Strait Area Campus, Nova Scotia",duration:"30,5 часа · очно",role:"Работа со спасательными шлюпками и плотами. Есть предварительные требования; обычно не первая покупка новичка.",source:L.schools,offer:L.nsccPSC,todo:"Имеет смысл после подтверждения должности и базовой подготовки."},
{id:"ca-mfa-qc",kind:"Квебек: дополнительная медицина",name:"Marine Advanced First Aid — ÉPAQ",price:"1 190 CAD (тариф ÉPAQ 2025–2026, перепроверить на 2026–2027)",location:"ÉPAQ, Grande-Rivière, Québec",duration:"35 часов",role:"Продвинутая морская первая помощь для соответствующих обязанностей. Не является общим требованием к работнику береговой фабрики.",source:L.tc,offer:L.epaq,todo:"Сначала проверь, назначаешься ли ты ответственным за первую помощь и какой уровень нужен."},
{id:"ca-food",kind:"Для фабрики — полезное обучение",name:"HACCP, GMP, пищевые риски и preventive controls",price:"Официальные материалы CFIA: бесплатно",location:"Онлайн: CFIA Canada",duration:"Самостоятельно",role:"CFIA объясняет риски, HACCP и preventive control plans. Изучение страниц НЕ даёт официального индивидуального сертификата.",source:L.cfia,offer:L.cfiafish,todo:"Пройди материалы, потренируйся распознавать физические, химические и микробиологические риски."}
];
const certNO=[
{id:"no-fish",kind:"Обязательно для большинства рыбаков",name:"Безопасность рыбаков / допустимая STCW Basic Safety",price:"Пример курса: 18 788 NOK",location:"RelyOn, Bergen — предложение через gskkurs.no",duration:"Очно; точная программа и часы по объявлению",role:"По Norwegian Maritime Authority: 50-часовая подготовка рыбаков ИЛИ подходящий сертификат STCW Basic Safety. Требования и сроки переобучения уточняй по действующим правилам.",source:L.sdir,offer:L.norwayCourse,todo:"На сайте провайдера упомянуты изменения с 2026 года, отличающиеся от формулировки Sdir. До оплаты получи письменное подтверждение Sdir/центра о признании курса."},
{id:"no-stcw",kind:"Морская безопасность",name:"STCW Basic Safety — сертификат компетентности",price:"Цена зависит от курса и центра",location:"Признанные учебные центры Норвегии; возможна подготовка в другой стране",duration:"Как правило, несколько очных дней",role:"При обучении в Норвегии с 15.08.2025 не всегда достаточно справки о прохождении — может требоваться отдельная электронная заявка на CoP в Sjøfartsdirektoratet.",source:L.sdirCert,offer:L.sdir,todo:"Проверь отдельные требования к выдаче CoP, а не только к посещению курса."},
{id:"no-refresh",kind:"Только для имеющих предыдущую подготовку",name:"STCW Basic Safety — повторная подготовка",price:"От 8 704 NOK (пример)",location:"RelyOn и другие курсы в Норвегии",duration:"1–2 дня или часть e-learning + практика",role:"Это не курс для новичка без базового сертификата. Для 50-часового курса рыбаков есть отдельная 20-часовая переподготовка и временные рамки.",source:L.sdir,offer:L.refresh,todo:"Не путай базовый и refresher: цена 8 704 NOK относится именно к обновлению."},
{id:"no-med",kind:"Морская медкомиссия",name:"Seafarer's medical certificate — медицинская справка моряка",price:"2 700 NOK (частный прайс)",location:"Legekontoret for sjømenn, Bergen, Strandgaten 18",duration:"Запись и обследование у одобренного врача",role:"Обычно нужна для экипажа, но существуют исключения для некоторых малых судов. Справка обычно действует до 2 лет.",source:L.sdirMed,offer:L.medPrice,todo:"Найди врача из официального списка; заранее проверь допустимость справки и стоимость анализов."},
{id:"no-master",kind:"Управление и навигационная вахта",name:"Fishing master / watch officer certificates",price:"Зависит от категории и учебного центра",location:"Sjøfartsdirektoratet + признанные морские школы",duration:"Индивидуально",role:"Для капитанов и навигационных вахтенных на судах от 10,67 м. Для палубного новичка не обязателен по умолчанию.",source:L.sdir,offer:L.sdirCert,todo:"Уточни тоннаж судна и категорию должности до выбора школы."},
{id:"no-radio",kind:"По обязанностям",name:"Радиосвязь, стропы, краны и гидравлика",price:"По запросу",location:"Судовладелец, Sjøfartsdirektoratet, аккредитованные центры",duration:"Зависит от специализации",role:"Некоторые должности требуют отдельной квалификации — это не единый обязательный пакет для всех моряков.",source:L.sdir,offer:L.sdirCert,todo:"Получить от работодателя точное наименование курса и органа признания."},
{id:"no-food",kind:"Для заводов и аквакультуры",name:"HACCP / GMP, гигиена и качество морепродуктов",price:"Госинформация бесплатна; частные курсы платные",location:"Mattilsynet и обучающие центры",duration:"Самостоятельно или у провайдера",role:"Знания о безопасности еды полезны для резюме. Но частный онлайн-диплом сам по себе не заменяет морской STCW или признанные требования работодателя.",source:L.mat,offer:L.codex,todo:"Изучи безопасность пищи и санитарные процессы; спроси, обучает ли фабрика на месте."},
{id:"no-work",kind:"Юридический допуск, не курс",name:"UDI — право на работу / seasonal или skilled worker",price:"Сбор зависит от маршрута и момента подачи",location:"UDI, норвежское иммиграционное ведомство",duration:"По процедуре",role:"Канадское разрешение на работу не переносится в Норвегию. Для сезонной рыбопереработки требуются подходящее предложение и, как правило, подтверждение NAV.",source:L.udiSeason,offer:L.udi,todo:"До больших расходов на обучение уточнить реалистичный иммиграционный путь."}
];
const modules=[
["01","Маршруты трудоустройства","Судно, береговая фабрика, рыбная ферма, техническое обслуживание и логистика — разные карьеры. Изучи требования по языку, режиму, здоровью и праву на работу.","Выбери две целевые должности и запиши по пять требований каждой."],
["02","Суда и экипаж","Траулер, сейнер, ярусолов, краболов, морозильный траулер; палубный матрос, обработчик улова, инженер, механик, штурман. От должности зависит допуск.","Нарисуй схему экипажа и рабочей смены для одного типа судна."],
["03","Промысловые снасти","Тралы, донные сети, ярусы, ловушки и кошельковый невод; лебёдки, гидравлика, ролики, блоки, стропы. Опасности: натяжение канатов, зажимы, падение за борт.","Составь список 10 опасностей промысловой палубы и защитных мер."],
["04","Безопасность и выживание","Сигналы тревоги, спасжилет, immersion suit, muster station, fire extinguisher, man overboard, аварийная остановка. Онлайн-чтение не заменяет практическую морскую подготовку.","Составь карточку действий при пожаре и при человеке за бортом."],
["05","Рыбопереработка и качество","Холодовая цепь, приёмка, сортировка, санитария, маркировка партий, аллергены, очистка оборудования, HACCP/PCP, предотвращение перекрёстного загрязнения.","Разбери условную партию рыбы: температура, чистота, партия, возможные риски."],
["06","Аквакультура и RAS","Рециркуляция воды, насосы, фильтры, аэрация, кислород, солёность, pH, биобезопасность, кормление и мониторинг. Технические навыки часто востребованы.","Нарисуй упрощённую схему RAS с насосом, фильтром и датчиками."],
["07","Документы и квалификации","Роль, судно и страна определяют документы. Сначала право на работу, затем обязательные курсы, медсправка и только потом дополнительные платные обучения.","Отметь три документа с подтверждённой необходимостью для целевой должности."],
["08","Поиск работодателей","Реестр предприятий ≠ текущая вакансия. Сверяй юридическое имя, регистрационный номер, сайт, контакты и дату объявления. Веди историю проверки.","Найди пять предприятий в базе сайта и проверь хотя бы одну карьерную страницу."],
["09","Резюме, письмо и интервью","В резюме отдельно показывай навыки безопасности, промышленного оборудования, командной работы и языки. Не придумывай сертификаты, лицензии или морской опыт.","Подготовь два ответа на английском: «Why this role?» и «How do you work safely?»."],
["10","Контракты, деньги и налоги","Ставка до/после налогов, сверхурочные, жильё, питание, транспорт, компенсации, страховка, продолжительность сезона, валюта, право на отпуск.","Сравни два условных предложения по годовому реальному доходу после расходов."],
["11","Первый день и дисциплина","Проверка СИЗ, инструктаж, зона работ, знакомство с аварийным планом, устная обратная связь руководителю, отказ от опасных задач без подготовки.","Составь 12 вопросов супервайзеру перед первой сменой."],
["12","Финальный проект","Твоя собственная база: 10 компаний, 5 вакансий или карьерных страниц, точная матрица документов, бюджет обучения и адаптированное CV.","Пройди чек-лист и объясни, что обязательно для выбранной работы, а что факультативно."]
];
const terms=[
["PPE","Средства индивидуальной защиты"],["Muster station","Место сбора по тревоге"],["Man overboard","Человек за бортом"],["Winch","Лебёдка"],["Trawl","Трал"],["Purse seine","Кошельковый невод"],["Longline","Ярус"],["Crab pot","Крабовая ловушка"],["Cold chain","Холодовая цепь"],["Traceability","Прослеживаемость"],["Critical control point","Критическая контрольная точка"],["Cross-contamination","Перекрёстное загрязнение"],["Lockout/tagout","Блокировка и маркировка оборудования"],["Risk assessment","Оценка рисков"],["Shift handover","Передача смены"],["Emergency stop","Аварийная остановка"],["Deckhand","Палубный рабочий"],["Processing operator","Оператор переработки"],["Maintenance technician","Техник обслуживания"],["Job offer","Предложение работы"]
];
const T={
  docs: isCA?
  [["Разрешение работать","Уточни, допускает ли твоё канадское разрешение работу у выбранного работодателя, в провинции и на судне; учти срок действия и ограничения."],
   ["Морские документы","Для экипажа проверь у работодателя GT, длину судна, район плавания, обязанности по радиосвязи и аварийные обязанности; затем выбери курс по Transport Canada."],
   ["Работа на фабрике","Не покупай морские курсы для берегового производства без письменного требования работодателя. Изучи требования по санитарии и безопасности."],
   ["Технические должности","Проверь опыт с насосами, конвейерами, двигателями и блокировками; лицензируемые специальности могут требовать местного признания."]]:
  [["Разрешение работать","Для не-граждан ЕЭЗ оцени UDI seasonal/skilled worker/seafarer. Канадское разрешение по CUAET не действует в Норвегии."],
   ["Морские документы","Проверь в Sdir действительность курса безопасности, признание зарубежного CoP, медсправку и требования к должности."],
   ["Работа на фабрике","Морской сертификат не всегда требуется на берегу. Условия найма и иммиграционный маршрут важнее красивого необязательного диплома."],
   ["Технические должности","Уточни квалификацию, обязанности и язык: maintenance на фабрике или ферме отличается от судового механика."]]
};
const workLinks=isCA?[[L.jobbank,"Job Bank Canada — вакансии"],[L.dfo,"DFO — рыболовная отрасль"],[L.cfia,"CFIA — пищевые требования"],[L.tc,"Transport Canada — требования к рыболовным судам"],[L.schools,"TP 10655 — признанные учебные центры"]]:[[L.nav,"NAV Arbeidsplassen — вакансии"],[L.fdir,"Fiskeridirektoratet — флот"],[L.mat,"Mattilsynet — предприятия"],[L.sdir,"Sjøfartsdirektoratet — морские документы"],[L.udi,"UDI — право на работу"]];
const cards=isCA?certCA:certNO;
function certificationHTML(){
return '<div class="qa-intro"><div class="qa-label">ПОДТВЕРЖДЕННЫЕ ПРОВАЙДЕРЫ · '+country.toUpperCase()+'</div><h1>Сертификаты и обучение</h1><p>Никаких «обязательных восьми дипломов для всех». Здесь собраны требования ведомств и примеры предложений учебных центров. Цены — снимок на ноябрь 2026; перед оплатой перепроверь условия, доступность мест и признание сертификата.</p></div>'+
'<div class="qa-alert">⚠️ Бесплатная академия qexus lab НЕ выдаёт STCW, MED, медицинские заключения или дипломы Maricert. Официальные квалификации оформляются только через соответствующих провайдеров и органы.</div>'+
'<div class="qa-cards">'+cards.map(c=>'<article class="qa-cert"><div class="qa-row"><span class="qa-kicker">'+E(c.kind)+'</span><span class="qa-price">'+E(c.price)+'</span></div><h3>'+E(c.name)+'</h3><p>'+E(c.role)+'</p><div class="qa-details"><span>📍 '+E(c.location)+'</span><span>🕒 '+E(c.duration)+'</span></div><div class="qa-tip">Перед оплатой: '+E(c.todo)+'</div><div class="qa-actions">'+external(c.source,"Правила и требования")+external(c.offer,"Курс / провайдер")+'</div></article>').join('')+'</div>';
}
function curriculumHTML(){
return '<div class="qa-intro"><div class="qa-label">САМОСТОЯТЕЛЬНОЕ ОБУЧЕНИЕ · 12 МОДУЛЕЙ</div><h1>Практический курс</h1><p>Собственная бесплатная программа qexus lab по открытым профессиональным источникам. Она дополняет 10 исходных уроков на сайте; не заменяет практику на судне или обучение у аккредитованного центра.</p></div><div class="qa-course-progress"><strong id="qa-progress">Прогресс —</strong><span>Результаты хранятся только на этом устройстве</span></div>'+
modules.map(m=>'<details class="qa-lesson" id="qa-lesson-'+m[0]+'"><summary><span class="qa-num">'+m[0]+'</span><span><b>'+E(m[1])+'</b><small>Теория + практика</small></span><span class="qa-chevron">⌄</span></summary><div class="qa-lessonbody"><p>'+E(m[2])+'</p>'+(window.qexusExpansionLesson?.(m[0])||'')+'<div class="qa-exercise"><b>Самостоятельное задание</b><p>'+E(m[3])+'</p></div><label class="qa-done"><input type="checkbox" data-qa-complete="'+m[0]+'"> Я выполнил(а) задание</label></div></details>').join('')+
'<div class="qa-panel"><h3>20 терминов для начала</h3><div class="qa-terms">'+terms.map(a=>'<div><b>'+E(a[0])+'</b><span>'+E(a[1])+'</span></div>').join('')+'</div></div>';
}
function jobsHTML(){
const interview=["Tell me about your industrial experience.","What personal protective equipment do you use?","What would you do if a winch or conveyor jams?","Can you work shifts, weekends and in cold conditions?","What training or certificates do you currently hold?","Are you legally authorized to work in this country?"];
return '<div class="qa-intro"><div class="qa-label">ПОДГОТОВКА К ПРИЁМУ НА РАБОТУ</div><h1>От реестра до контракта</h1><p>Пошаговая дорожная карта вместо покупки непроверенного списка email. Обязательные требования устанавливаются работодателем и законом, а не рекламой курсов.</p></div>'+
'<div class="qa-steps">'+T.docs.map((a,i)=>'<div class="qa-step"><span>'+(i+1)+'</span><div><h3>'+E(a[0])+'</h3><p>'+E(a[1])+'</p></div></div>').join('')+'</div>'+
'<div class="qa-panel"><h3>Чек-лист перед откликом</h3>'+[
 "Проверена юридическая регистрация компании и официальный сайт.",
 "Найдена актуальная вакансия либо официальный карьерный канал.",
 "Проверены работа, гражданство, разрешение и доступность позиции.",
 "Записаны обязательные сертификаты именно для этой должности.",
 "Подготовлены CV и короткое персональное письмо без выдуманного морского опыта.",
 "Собраны вопросы о зарплате, жилье, страховании, сезоне и графике.",
 "Никому не переводятся деньги за «гарантированную вакансию» или «место на судне».",
 "Перед увольнением получено письменное предложение и законное основание работать."
].map((x,i)=>'<label class="qa-check"><input type="checkbox" data-qa-check="'+i+'"> '+E(x)+'</label>').join('')+'</div>'+
'<div class="qa-panel"><h3>Вопросы на собеседовании (английский)</h3><div class="qa-terms">'+interview.map(t=>'<div>'+E(t)+'</div>').join('')+'</div></div>'+
'<div class="qa-panel"><h3>Проверка договора и мошенничества</h3><p>Уточни фиксированную ставку или оплату от улова, гарантированные часы, сверхурочные, отпускные, страховку, питание, транспорт, удержания, валюту и порядок расторжения. Проверь, кто юридически нанимает и кто оплачивает обучение. Избегай работодателей, требующих личные платежи до письменного контракта.</p></div>';
}
function libraryHTML(){
return '<div class="qa-intro"><div class="qa-label">ИСТОЧНИКИ И ПРОВЕРКА ФАКТОВ</div><h1>Бесплатная библиотека</h1><p>Оригинальные документы государственных ведомств и курсы провайдеров. Это отправные точки для обновления информации, не готовые доказательства наличия вакансии или разрешения на работу.</p></div>'+
'<div class="qa-cards">'+workLinks.map(([u,title])=>'<div class="qa-panel"><h3>'+E(title)+'</h3>'+external(u,"Открыть источник")+'</div>').join('')+'</div>'+
'<div class="qa-panel"><h3>Как устроен платный курс BFISHERMAN</h3><p>На открытой странице описаны 12 модулей: ориентация, дополнительные пищевые сертификаты, флот, документы, снасти, поиск работы, первые дни, налоги, государственные квалификации, базы компаний и итоговый экзамен. В нашем проекте мы самостоятельно создаём справочники по этим темам. Платные видео и закрытые контакты не копируем.</p>'+external(L.training,"Посмотреть открытую программу")+'</div>'+
'<div class="qa-panel"><h3>Статус информации</h3><p>Требования подтверждаются ссылками на ведомства, цены — страницами провайдеров. Отсутствие цены означает «не проверено», а не «бесплатно». Последняя ручная сверка: 17 ноября 2026. Для актуальных вакансий, курсов и визовых правил требуется повторная проверка перед действием.</p></div>';
}
const titles={cert:"Сертификаты",curriculum:"12 модулей",jobs:"Трудоустройство",library:"Библиотека"};
function show(view){
  if(!(view in titles))return;
  const main=document.getElementById("main");if(!main)return;
  const fn={cert:certificationHTML,curriculum:curriculumHTML,jobs:jobsHTML,library:libraryHTML}[view];
  main.innerHTML='<div class="qa-wrap">'+fn()+'</div>';
  document.querySelectorAll('.nav-item[data-view]').forEach(b=>b.classList.remove("active"));
  document.querySelectorAll("[data-qa-view]").forEach(b=>b.classList.toggle("active",b.dataset.qaView===view));
  const crumb=document.getElementById("crumb")||document.getElementById("viewName");if(crumb)crumb.textContent=titles[view];
  if(view==="curriculum"){
    let done=read("lessons");document.querySelectorAll("[data-qa-complete]").forEach(x=>x.checked=!!done[x.dataset.qaComplete]);progress(done);
  }
  if(view==="jobs"){let data=read("checks");document.querySelectorAll("[data-qa-check]").forEach(x=>x.checked=!!data[x.dataset.qaCheck]);}
  document.getElementById("sidebar")?.classList.remove("open");
  window.scrollTo({top:0,behavior:"instant"});
}
function read(key){try{return JSON.parse(localStorage.getItem("qexus-academy-"+country+"-"+key)||"{}")}catch{return {}}}
function write(key,v){try{localStorage.setItem("qexus-academy-"+country+"-"+key,JSON.stringify(v))}catch{}}
function progress(done){const count=modules.filter(m=>done[m[0]]).length;const e=document.getElementById("qa-progress");if(e)e.textContent="Пройдено "+count+" / "+modules.length;}
document.addEventListener("click",ev=>{
  const b=ev.target.closest("[data-qa-view]");
  if(b){ev.preventDefault();show(b.dataset.qaView);return}
  if(ev.target.closest('[data-view]'))document.querySelectorAll("[data-qa-view]").forEach(x=>x.classList.remove("active"));
});
document.addEventListener("change",ev=>{
  if(ev.target.matches("[data-qa-complete]")){let data=read("lessons");data[ev.target.dataset.qaComplete]=ev.target.checked;write("lessons",data);progress(data)}
  if(ev.target.matches("[data-qa-check]")){let data=read("checks");data[ev.target.dataset.qaCheck]=ev.target.checked;write("checks",data)}
});
})();