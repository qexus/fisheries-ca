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
  codex:"https://www.fao.org/fao-who-codexalimentarius/en/"
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

function academyLanguage(){return (new URLSearchParams(location.search).get("lang")||document.documentElement.lang||"ru").toLowerCase()}
const qxTranslatedCards={
fr:{
"ca-sdv":["SDV-BS — sécurité de base des petits bâtiments","Pour les membres d’équipage de certains bateaux commerciaux et de pêche. Vérifiez le navire, la zone et les exigences de Transports Canada."],
"ca-sdv-qc":["SDV-BS — formation à l’ÉPAQ","Une formation offerte au Québec. Vérifiez le tarif de l’année, les dates et les préalables auprès de l’ÉPAQ."],
"ca-dvs":["DVS — sécurité des bâtiments domestiques","Formation aux urgences à bord de certains navires. Elle n’est pas exigée de tous les employés d’usine à terre."],
"ca-dvs-qc":["DVS — formation à l’ÉPAQ","Cours de sécurité des bâtiments domestiques au Québec; prix historique à reconfirmer."],
"ca-stcw":["STCW — formation de sécurité de base","Formation maritime reconnue selon les conditions applicables; vérifiez avec Transports Canada si elle correspond à votre poste."],
"ca-fa":["Premiers secours maritimes","Formation de base ou avancée selon le navire et les responsabilités de l’équipage."],
"ca-svop":["SVOP — conduite de petits bâtiments","Formation destinée à l’opérateur d’un petit bâtiment admissible, et non à tous les matelots."],
"ca-radio":["ROC-M / ROC-MC — radio maritime","Certificats radio selon le type d’appareil, le navire et les tâches assignées."],
"ca-roc-qc":["ROC-MC — cours à l’ÉPAQ","Formation radio maritime commerciale au Québec; vérifiez les conditions auprès de l’école."],
"ca-psc":["PSC — embarcations et radeaux de survie","Spécialisation avec préalables pour des responsabilités de sauvetage précises."],
"ca-mfa-qc":["Premiers secours maritimes avancés — ÉPAQ","Formation avancée pour certaines responsabilités à bord, pas une exigence générale en usine."],
"ca-food":["HACCP et bonnes pratiques alimentaires","Les documents de l’ACIA sont gratuits; ils ne constituent pas à eux seuls une certification individuelle."],
"no-fish":["Sécurité des pêcheurs — formation de base","Vérifiez les exigences de la Sjøfartsdirektoratet : formation de sécurité des pêcheurs ou certificat STCW admissible."],
"no-stcw":["STCW Basic Safety — certificat de compétence","Il peut falloir une demande de certificat de compétence distincte de l’attestation de cours."],
"no-refresh":["STCW — formation de remise à niveau","Formation réservée aux personnes ayant déjà les qualifications requises; ne pas l’acheter comme cours initial."],
"no-med":["Certificat médical maritime","Visite par un médecin maritime reconnu, sous réserve des exceptions applicables."],
"no-master":["Capitaine de pêche et officier de quart","Qualifications de commandement suivant la taille du navire et le poste."],
"no-radio":["Radio maritime et équipement de pont","Qualifications exigées uniquement pour certaines tâches et certains équipements."],
"no-food":["HACCP, hygiène et sécurité alimentaire","Ressources officielles gratuites et formations privées possibles; ne remplace pas les qualifications maritimes."],
"no-work":["UDI — autorisation de travailler","Démarche d’immigration, pas un cours. Un permis de travail canadien ne donne pas le droit de travailler en Norvège."]
},
uk:{
"ca-sdv":["SDV-BS — базова безпека малих суден","Для екіпажів певних комерційних і риболовних суден. Уточніть категорію судна, маршрут і правила Transport Canada."],
"ca-sdv-qc":["SDV-BS — навчання в ÉPAQ","Курс у Квебеку. Перевірте поточну вартість, дати й попередні вимоги."],
"ca-dvs":["DVS — безпека внутрішніх суден","Підготовка до надзвичайних ситуацій на певних суднах; не обов’язкова для всіх працівників берегового заводу."],
"ca-dvs-qc":["DVS — навчання в ÉPAQ","Курс безпеки суден у Квебеку; опубліковану раніше ціну треба перевірити."],
"ca-stcw":["STCW — базова морська безпека","Перевірте, чи відповідає ця підготовка вимогам Transport Canada до вашої посади."],
"ca-fa":["Морська перша допомога","Базове чи поглиблене навчання залежить від обов’язків екіпажу й типу судна."],
"ca-svop":["SVOP — оператор малого судна","Курс для керування відповідним малим судном, а не для кожного матроса."],
"ca-radio":["ROC-M / ROC-MC — морський радіозв’язок","Посвідчення залежить від радіообладнання, типу судна й ваших обов’язків."],
"ca-roc-qc":["ROC-MC — курс ÉPAQ","Комерційний морський радіозв’язок у Квебеку; уточніть умови навчання."],
"ca-psc":["PSC — рятувальні шлюпки й плоти","Додаткова спеціалізація з попередніми вимогами для певних посад."],
"ca-mfa-qc":["Поглиблена морська перша допомога — ÉPAQ","Для відповідальних осіб на окремих суднах; не загальна вимога до працівника берегового заводу."],
"ca-food":["HACCP та безпечне виробництво їжі","Державні матеріали CFIA безплатні, але самі по собі не є індивідуальним сертифікатом."],
"no-fish":["Базова безпека рибалок","Перевірте вимоги Sjøfartsdirektoratet щодо підготовки рибалок або прийнятного STCW."],
"no-stcw":["STCW Basic Safety — сертифікат компетентності","Окрім курсу, може знадобитися окрема заява на сертифікат компетентності."],
"no-refresh":["STCW — поновлення кваліфікації","Для тих, хто вже має відповідну базову підготовку; не купуйте як початковий курс."],
"no-med":["Медична довідка моряка","Медогляд у визнаного морського лікаря з урахуванням можливих винятків."],
"no-master":["Капітан риболовного судна й вахтовий","Кваліфікації командних посад залежно від розміру судна та обов’язків."],
"no-radio":["Радіозв’язок і палубне обладнання","Додаткові кваліфікації тільки для певних функцій та оснащення."],
"no-food":["HACCP, гігієна й харчова безпека","Безплатні офіційні матеріали й платні приватні курси; не замінюють морські сертифікати."],
"no-work":["UDI — дозвіл працювати","Імміграційний шлях, а не курс. Канадський work permit не дає права працювати в Норвегії."]
}
};
const qxStepLabels={
fr:{ca:[["Autorisation de travailler","Vérifiez que votre permis canadien permet de travailler dans la région et la fonction visées."],["Documents maritimes","Identifiez le navire, la route et les tâches, puis consultez Transports Canada."],["Postes en usine","N’achetez pas une formation maritime sans exigence écrite pour un poste à terre."],["Métiers techniques","Comparez vos compétences, les licences applicables et les exigences de l’employeur."]],
no:[["Droit de travailler","Déterminez le parcours d’immigration UDI approprié avant toute dépense importante."],["Documents maritimes","Vérifiez auprès de Sjøfartsdirektoratet la formation, les certificats et l’aptitude médicale."],["Usine à terre","Un certificat maritime n’est pas automatiquement exigé pour les postes en usine."],["Métiers techniques","Confirmez les compétences, la langue et les tâches exactes du poste."]]},
uk:{ca:[["Право на роботу","Перевірте, чи ваш канадський дозвіл дозволяє працювати в обраному регіоні та за посадою."],["Морські документи","З’ясуйте тип судна, маршрут, обов’язки й вимоги Transport Canada."],["Робота на заводі","Не купуйте морський курс без письмової вимоги роботодавця до берегової посади."],["Технічні вакансії","Порівняйте навички, місцеві ліцензії та вимоги роботодавця."]],
no:[["Право на роботу","З’ясуйте доступний імміграційний шлях UDI до великих витрат."],["Морські документи","Перевірте в Sjøfartsdirektoratet навчання, сертифікати й медичні вимоги."],["Береговий завод","Морський сертифікат не є автоматичною вимогою до роботи на березі."],["Технічні вакансії","Підтвердьте навички, потрібну мову та фактичні обов’язки."]]}}
;
const qxChecklist={
fr:["J’ai vérifié l’existence légale de l’employeur et son site officiel.","L’offre est actuelle ou je dispose d’une page carrières officielle.","J’ai vérifié mon autorisation légale de travailler.","J’ai identifié les certificats réellement exigés pour ce poste.","Mon CV et ma lettre reflètent fidèlement mon expérience.","J’ai posé des questions sur le salaire, le logement, l’assurance et l’horaire.","Je ne paie jamais pour une « embauche garantie » ou une place à bord.","Je dispose d’une offre écrite et d’un statut valide avant de quitter mon poste."],
uk:["Перевірено юридичну реєстрацію роботодавця та офіційний сайт.","Знайдено актуальну вакансію або офіційну кар’єрну сторінку.","Перевірено законне право працювати.","Визначено обов’язкові сертифікати саме для цієї посади.","CV і лист чесно описують мій досвід.","З’ясовано оплату, житло, страхування та графік.","Я не плачу за «гарантоване місце» або місце на судні.","Перед звільненням є письмова пропозиція та законні підстави працювати."]
};
function qxLocalizedCertification(){
 const lang=academyLanguage();
 if(!qxTranslatedCards[lang])return null;
 const fr=lang==="fr";
 const labels=fr?{k:"QUALIFICATIONS · ",heading:"Certificats et formations",intro:"Comparez les exigences officielles et des exemples de centres de formation. Les montants sont des prix historiques, non des devis; vérifiez la session, les préalables et la reconnaissance du certificat.",warn:"Cette académie gratuite ne délivre aucun certificat STCW, MED, ni certificat médical. Seuls les organismes compétents peuvent les émettre.",fee:"Tarif indicatif",check:"Confirmer avant paiement auprès du fournisseur",rules:"Exigences officielles",offer:"Cours ou fournisseur",more:"Consultez le guide complet des métiers et qualifications."}:
 {k:"КВАЛІФІКАЦІЇ · ",heading:"Сертифікати й навчання",intro:"Порівняйте офіційні вимоги та приклади навчальних центрів. Суми — історичні приклади, а не актуальні пропозиції; перевірте дати, умови й визнання документа.",warn:"Ця безплатна Академія не видає STCW, MED чи медичних довідок. Офіційні документи оформлюють уповноважені організації.",fee:"Орієнтовна ціна",check:"Перед оплатою уточніть у навчальному закладі",rules:"Офіційні вимоги",offer:"Курс / організація",more:"Докладні вимоги до професій та сертифікатів."};
 const base="/"+(isCA?"fisheries-ca":"fisheries")+"/"+lang+"/guides/professions.html";
 return '<div class="qa-intro"><div class="qa-label">'+labels.k+E(country.toUpperCase())+'</div><h1>'+labels.heading+'</h1><p>'+labels.intro+'</p></div>'+
 '<div class="qa-alert">⚠️ '+labels.warn+'</div>'+
 '<p><a href="'+base+'">'+labels.more+' ↗</a></p>'+
 '<div class="qa-cards">'+cards.map(c=>{
  const translated=qxTranslatedCards[lang][c.id];
  if(!translated)return "";
  const fee=(c.price.match(/\d[\d ]*\s(?:CAD|NOK)\b/)||[])[0] || (c.id==="ca-food"?(fr?"Ressources publiques gratuites":"Державні матеріали безплатні"):(fr?"Consulter le fournisseur":"Уточніть у закладі"));
  return '<article class="qa-cert"><div class="qa-row"><span class="qa-kicker">'+labels.k+'</span><span class="qa-price">'+E(fee)+'</span></div><h3>'+E(translated[0])+'</h3><p>'+E(translated[1])+'</p><div class="qa-tip">'+labels.check+'</div><div class="qa-actions">'+external(c.source,labels.rules)+external(c.offer,labels.offer)+'</div></article>';
 }).join('')+'</div>';
}
function qxLocalizedJobs(){
 const lang=academyLanguage();
 if(!qxChecklist[lang])return null;
 const fr=lang==="fr",n=isCA?"ca":"no";
 const L=fr?{label:"CANDIDATURES",title:"Du registre à un contrat vérifié",intro:"Une entreprise inscrite dans un registre n’a pas forcément de poste vacant. Vérifiez les exigences officielles, votre droit de travailler et les offres réelles.",check:"Liste de vérification avant de postuler",interview:"Questions d’entrevue (en anglais)",safety:"Contrat et prévention des arnaques",body:"Vérifiez le taux, les heures garanties, le logement, le transport, les retenues, la monnaie et le retour à domicile. Évitez tout paiement pour un emploi garanti."}:
 {label:"ПРАЦЕВЛАШТУВАННЯ",title:"Від реєстру до перевіреного контракту",intro:"Компанія у реєстрі не обов’язково має вакансії. Перевірте офіційні вимоги, право працювати й реальні оголошення.",check:"Список перевірки перед поданням",interview:"Запитання на співбесіді (англійською)",safety:"Договір і захист від шахраїв",body:"Перевірте ставку, гарантовані години, житло, дорогу, утримання, валюту й повернення додому. Не платіть за гарантоване працевлаштування."};
 const interview=["Tell me about your industrial experience.","What personal protective equipment do you use?","What would you do if a winch or conveyor jams?","Can you work shifts, weekends and in cold conditions?","What training or certificates do you currently hold?","Are you legally authorized to work in this country?"];
 return '<div class="qa-intro"><div class="qa-label">'+L.label+'</div><h1>'+L.title+'</h1><p>'+L.intro+'</p></div>'+
 '<div class="qa-steps">'+qxStepLabels[lang][n].map((x,i)=>'<div class="qa-step"><span>'+(i+1)+'</span><div><h3>'+E(x[0])+'</h3><p>'+E(x[1])+'</p></div></div>').join('')+'</div>'+
 '<div class="qa-panel"><h3>'+L.check+'</h3>'+qxChecklist[lang].map((x,i)=>'<label class="qa-check"><input type="checkbox" data-qa-check="'+i+'"> '+E(x)+'</label>').join('')+'</div>'+
 '<div class="qa-panel"><h3>'+L.interview+'</h3><div class="qa-terms">'+interview.map(x=>'<div>'+E(x)+'</div>').join('')+'</div></div>'+
 '<div class="qa-panel"><h3>'+L.safety+'</h3><p>'+L.body+'</p></div>';
}
function qxLocalizedLibrary(){
 const lang=academyLanguage();
 if(!qxChecklist[lang])return null;
 const fr=lang==="fr";
 const L=fr?{label:"SOURCES OFFICIELLES",title:"Bibliothèque gratuite",intro:"Utilisez les ressources gouvernementales et les sites des organismes de formation pour vérifier les règles et les offres. Un registre ne garantit aucun emploi.",status:"Vérification des données",body:"Règles et tarifs : vérification manuelle le 17 novembre 2026. Les prix et les exigences peuvent avoir changé. Un prix non publié ne signifie pas que la formation est gratuite.",open:"Consulter la source"}:
 {label:"ОФІЦІЙНІ ДЖЕРЕЛА",title:"Безплатна бібліотека",intro:"Перевіряйте правила та вакансії за державними джерелами й сайтами навчальних закладів. Реєстр не гарантує роботу.",status:"Актуальність даних",body:"Правила й ціни вручну звіряли 17 листопада 2026 року. Вартість і вимоги могли змінитися. Відсутня ціна не означає безплатне навчання.",open:"Відкрити джерело"};
 const names=isCA?(fr?["Guichet-Emplois — offres","MPO — secteur des pêches","ACIA — salubrité alimentaire","Transports Canada — sécurité des navires","TP 10655 — centres reconnus"]:["Job Bank — вакансії","DFO — рибна галузь","CFIA — харчова безпека","Transport Canada — суднові вимоги","TP 10655 — визнані центри"]):
 (fr?["NAV — offres d’emploi","Fiskeridirektoratet — flotte","Mattilsynet — entreprises","Sjøfartsdirektoratet — qualifications","UDI — droit de travailler"]:["NAV — вакансії","Fiskeridirektoratet — флот","Mattilsynet — компанії","Sjøfartsdirektoratet — сертифікати","UDI — право на роботу"]);
 return '<div class="qa-intro"><div class="qa-label">'+L.label+'</div><h1>'+L.title+'</h1><p>'+L.intro+'</p></div>'+
 '<div class="qa-cards">'+workLinks.map(([url],i)=>'<div class="qa-panel"><h3>'+E(names[i])+'</h3>'+external(url,L.open)+'</div>').join('')+'</div>'+
 '<div class="qa-panel"><h3>'+L.status+'</h3><p>'+L.body+'</p></div>';
}

function localeAcademyUI(){
 const language=(new URLSearchParams(location.search).get("lang")||document.documentElement.lang).toLowerCase();
 return language==="fr"||language==="uk"?{language,data:window.QX_ACADEMY_UI?.[language]}:null;
}
function localizedCertificationHTML(){
 const locale=localeAcademyUI();if(!locale?.data)return null;
 const fr=locale.language==="fr",d=locale.data;
 const title=fr?"Certificats et formations":"Сертифікати та навчання";
 const description=fr?
 "Les certificats obligatoires dépendent du poste, du navire et du pays. Les prix sont des exemples relevés en novembre 2026 et doivent être reconfirmés avant paiement.":
 "Обов’язкові сертифікати залежать від посади, судна та країни. Наведені ціни — приклади станом на листопад 2026 року, їх потрібно перевіряти перед оплатою.";
 const warning=fr?
 "Cette académie gratuite ne délivre ni certificats STCW/MED, ni attestations médicales, ni qualifications professionnelles officielles. Seuls les organismes reconnus peuvent les délivrer.":
 "Ця безплатна Академія не видає STCW/MED, медичних довідок чи офіційних професійних посвідчень. Їх видають лише відповідні визнані організації.";
 let output='<div class="qa-intro"><div class="qa-label">'+(fr?"FORMATIONS ET SOURCES OFFICIELLES":"НАВЧАННЯ ТА ОФІЦІЙНІ ДЖЕРЕЛА")+' · '+country.toUpperCase()+'</div><h1>'+title+'</h1><p>'+description+'</p></div><div class="qa-alert">⚠️ '+warning+'</div><div class="qa-cards">';
 for(const c of cards){
  const z=d.certs[c.id];
  if(!Array.isArray(z)||z.length!==7)return null;
  output+='<article class="qa-cert"><div class="qa-row"><span class="qa-kicker">'+E(z[0])+'</span><span class="qa-price">'+E(z[2])+'</span></div><h3>'+E(z[1])+'</h3><p>'+E(z[5])+'</p><div class="qa-details"><span>📍 '+E(z[3])+'</span><span>🕒 '+E(z[4])+'</span></div><div class="qa-tip">'+(fr?"Avant de payer : ":"Перед оплатою: ")+E(z[6])+'</div><div class="qa-actions">'+external(c.source,fr?"Règles officielles":"Офіційні вимоги")+external(c.offer,fr?"Cours et fournisseur":"Курс і навчальний заклад")+'</div></article>';
 }
 return output+'</div>';
}
function localizedJobsHTML(){
 const locale=localeAcademyUI();if(!locale?.data)return null;
 const d=locale.data,fr=locale.language==="fr",docs=isCA?d.docs.ca:d.docs.no;
 const interview=["Tell me about your industrial experience.","What personal protective equipment do you use?","What would you do if a winch or conveyor jams?","Can you work shifts, weekends and in cold conditions?","What training or certificates do you currently hold?","Are you legally authorized to work in this country?"];
 let output='<div class="qa-intro"><div class="qa-label">'+(fr?"PRÉPARATION À LA CANDIDATURE":"ПІДГОТОВКА ДО ПРАЦЕВЛАШТУВАННЯ")+'</div><h1>'+(fr?"Du registre au contrat":"Від реєстру до контракту")+'</h1><p>'+(fr?"Une feuille de route fondée sur les exigences réelles de l’employeur et de la loi, sans payer de faux recruteurs.":"Практичний план за вимогами роботодавця та закону без оплати фальшивим посередникам.")+'</p></div>';
 output+='<div class="qa-steps">'+docs.map((a,i)=>'<div class="qa-step"><span>'+(i+1)+'</span><div><h3>'+E(a[0])+'</h3><p>'+E(a[1])+'</p></div></div>').join('')+'</div>';
 output+='<div class="qa-panel"><h3>'+(fr?"Liste de vérification avant de postuler":"Перелік перед поданням заявки")+'</h3>'+d.checklist.map((x,i)=>'<label class="qa-check"><input type="checkbox" data-qa-check="'+i+'"> '+E(x)+'</label>').join('')+'</div>';
 output+='<div class="qa-panel"><h3>'+(fr?"Questions d’entrevue en anglais":"Запитання на співбесіді англійською")+'</h3><div class="qa-terms">'+interview.map(t=>'<div>'+E(t)+'</div>').join('')+'</div></div>';
 output+='<div class="qa-panel"><h3>'+(fr?"Contrat et prévention des fraudes":"Контракт і захист від шахрайства")+'</h3><p>'+(fr?"Confirmez le taux fixe ou le partage des prises, les heures garanties, les heures supplémentaires, les vacances, les assurances, les repas, le transport, les retenues, la devise et la résiliation. Identifiez l’employeur légal et qui paie la formation. Ne payez jamais pour une prétendue place garantie.":
 "Уточніть ставку чи частку від улову, гарантовані години, понаднормові, відпустку, страхування, харчування, транспорт, утримання, валюту та розірвання договору. Перевірте юридичного роботодавця й хто оплачує навчання. Не платіть за «гарантовану вакансію».")+'</p></div>';
 return output;
}
function localizedLibraryHTML(){
 const locale=localeAcademyUI();if(!locale?.data)return null;
 const d=locale.data,fr=locale.language==="fr",labels=isCA?d.library.ca:d.library.no;
 if(labels.length!==workLinks.length)return null;
 let output='<div class="qa-intro"><div class="qa-label">'+(fr?"DOCUMENTS ET SOURCES":"ДОКУМЕНТИ ТА ДЖЕРЕЛА")+'</div><h1>'+(fr?"Bibliothèque gratuite":"Безплатна бібліотека")+'</h1><p>'+(fr?"Liens directs vers les autorités et les centres de formation. Une source officielle ne prouve pas l’existence d’une offre actuelle ni votre droit de travailler.":"Прямі посилання на державні органи та навчальні центри. Офіційне джерело не підтверджує актуальної вакансії чи права працювати.")+'</p></div>';
 output+='<div class="qa-cards">'+workLinks.map(([u],i)=>'<div class="qa-panel"><h3>'+E(labels[i])+'</h3>'+external(u,fr?"Ouvrir la source":"Відкрити джерело")+'</div>').join('')+'</div>';
 output+='<div class="qa-panel"><h3>'+(fr?"Validité des informations":"Актуальність відомостей")+'</h3><p>'+(fr?"Les règles sont rapprochées des sources officielles et les tarifs des prestataires. Un prix absent n’indique pas un cours gratuit. Dernière vérification manuelle : 17 novembre 2026. Revérifiez avant toute candidature ou dépense.":"Вимоги звіряються з державними джерелами, ціни — з навчальними закладами. Відсутність ціни не означає, що курс безплатний. Остання ручна перевірка: 17 листопада 2026 року. Уточнюйте дані перед поданням чи витратами.")+'</p></div>';
 return output;
}
function certificationHTML(){
const localized=localizedCertificationHTML();if(localized)return localized;

const translated=qxLocalizedCertification();if(translated)return translated;
return '<div class="qa-intro"><div class="qa-label">ПОДТВЕРЖДЕННЫЕ ПРОВАЙДЕРЫ · '+country.toUpperCase()+'</div><h1>Сертификаты и обучение</h1><p>Никаких «обязательных восьми дипломов для всех». Здесь собраны требования ведомств и примеры предложений учебных центров. Цены — снимок на ноябрь 2026; перед оплатой перепроверь условия, доступность мест и признание сертификата.</p></div>'+
'<div class="qa-alert">⚠️ Бесплатная академия qexus lab НЕ выдаёт STCW, MED, медицинские заключения или дипломы Maricert. Официальные квалификации оформляются только через соответствующих провайдеров и органы.</div>'+
'<div class="qa-cards">'+cards.map(c=>'<article class="qa-cert"><div class="qa-row"><span class="qa-kicker">'+E(c.kind)+'</span><span class="qa-price">'+E(c.price)+'</span></div><h3>'+E(c.name)+'</h3><p>'+E(c.role)+'</p><div class="qa-details"><span>📍 '+E(c.location)+'</span><span>🕒 '+E(c.duration)+'</span></div><div class="qa-tip">Перед оплатой: '+E(c.todo)+'</div><div class="qa-actions">'+external(c.source,"Правила и требования")+external(c.offer,"Курс / провайдер")+'</div></article>').join('')+'</div>';
}

function legacyExtras(id){
 const translations=window.QX_APP_I18N?.[academyLanguage()];
 const copy=text=>translations?.[text]||text;
 const map=isCA
 ?{"01":["01"],"02":["02"],"04":["06"],"05":["05","07"],"06":["08"],"07":["04"],"08":["03"],"09":["10"],"10":["09"]}
 :{"01":[1],"03":[4],"04":[3],"05":[5],"06":[6],"07":[7],"08":[2],"09":[9],"10":[8],"11":[10]};
 const arr=isCA?(window.CANADA_FISHERIES_SEED?.lessons||[]):(window.QEXUS_DATA?.modules||[]);
 const old=(map[id]||[]).map(n=>arr.find(x=>String(x.id)===String(n))).filter(Boolean);
 if(!old.length)return "";
 return '<details class="qa-legacy"><summary>'+E(copy('Дополнительные материалы и практика'))+' <span>⌄</span></summary><div class="qa-legacy-content">'+old.map(x=>
 '<h4>'+E(copy(x.title))+'</h4>'+
 (x.goal?'<p><b>Цель:</b> '+E(x.goal)+'</p>':'')+
 (Array.isArray(x.sections)?x.sections.map(z=>'<h5>'+E(z[0])+'</h5><p>'+E(z[1])+'</p>').join(''):'')+
 (x.theory?'<p>'+E(copy(x.theory))+'</p>':'')+
 '<div class="qa-legacy-task"><b>'+E(copy('Практика:'))+'</b> '+E(copy(x.practice||x.task||''))+'</div>'
 ).join('')+'</div></details>';
}
function translatedCurriculumHTML(){
 const language=(new URLSearchParams(location.search).get("lang")||document.documentElement.lang).toLowerCase();
 if(!["fr","uk"].includes(language))return null;
 const lessons=window.QX_LOCALIZED_LESSONS?.[language];
 if(!Array.isArray(lessons)||lessons.length!==12)return null;
 const fr=language==="fr";
 const intro=fr?"FORMATIONS GRATUITES · 12 LEÇONS":"БЕЗПЛАТНЕ НАВЧАННЯ · 12 УРОКІВ";
 const title=fr?"Formation · 12 leçons":"Навчання · 12 уроків";
 const explain=fr?"Douze leçons traduites, avec théorie, exercices, questions et sources officielles. Cette formation autonome ne délivre pas de certificats maritimes.":"Дванадцять перекладених уроків із теорією, вправами, запитаннями та офіційними джерелами. Самостійне навчання не видає морських сертифікатів.";
 let out='<div class="qa-intro"><div class="qa-label">'+intro+'</div><h1>'+title+'</h1><p>'+explain+'</p></div><div class="qa-course-progress"><strong id="qa-progress">—</strong><span>'+(fr?"Votre progression reste uniquement sur cet appareil.":"Ваш прогрес зберігається лише на цьому пристрої.")+'</span></div>';
 for(const l of lessons){
 const url="/"+(isCA?"fisheries-ca":"fisheries")+"/"+language+"/guides/lesson-"+l.id+".html";
 out+='<details class="qa-lesson" id="qa-lesson-'+E(l.id)+'"><summary><span class="qa-num">'+E(l.id)+'</span><span><b>'+E(l.title)+'</b><small>'+(fr?"Théorie, exercices et questions":"Теорія, вправи й запитання")+'</small></span><span class="qa-chevron">⌄</span></summary><div class="qa-lessonbody"><p>'+E(l.lead)+'</p>';
 for(const [h,p] of l.sections)out+='<h3>'+E(h)+'</h3><p>'+E(p)+'</p>';
 out+='<div class="qa-panel"><h3>'+(fr?"Exigences propres au pays":"Вимоги для країни")+'</h3><p>'+E(l.note)+'</p></div>';
 out+='<div class="qa-exercise"><b>'+(fr?"Exercice pratique":"Практичне завдання")+'</b><p>'+E(l.task)+'</p></div>';
 if(isCA)out+=legacyExtras(l.id);
 out+=(window.qexusExpansionQuiz?.(l.id)||'');
 out+='<p><a href="'+E(url)+'">'+(fr?"Leçon complète et sources officielles":"Повний урок та офіційні джерела")+' ↗</a></p>';
 out+='<label class="qa-done"><input type="checkbox" data-qa-complete="'+E(l.id)+'"> '+(fr?"J’ai terminé cette activité":"Я виконав(ла) це завдання")+'</label></div></details>';
 }
 out+='<div class="qa-panel"><h3>'+(fr?"Glossaire professionnel":"Професійний словник")+'</h3><p>'+(fr?"Consultez les termes des métiers, de la sécurité et de l’aquaculture dans le guide traduit.":"Дивіться перекладені терміни професій, безпеки й аквакультури у словнику.")+'</p><a href="/'+(isCA?"fisheries-ca":"fisheries")+'/'+language+'/guides/glossary.html">'+(fr?"Ouvrir le glossaire":"Відкрити словник")+' ↗</a></div>';
 return out;
}
function curriculumHTML(){
const localized=translatedCurriculumHTML();if(localized)return localized;
return '<div class="qa-intro"><div class="qa-label">САМОСТОЯТЕЛЬНОЕ ОБУЧЕНИЕ · 12 МОДУЛЕЙ</div><h1>Обучение · 12 уроков</h1><p>Единый бесплатный курс qexus lab: 12 подробных уроков, вопросы и задания. Полезные материалы прежних 10 коротких уроков перенесены внутрь соответствующих тем. Этот сайт не выдаёт официальных морских сертификатов.</p></div><div class="qa-course-progress"><strong id="qa-progress">Прогресс —</strong><span>Результаты хранятся только на этом устройстве</span></div>'+
modules.map(m=>'<details class="qa-lesson" id="qa-lesson-'+m[0]+'"><summary><span class="qa-num">'+m[0]+'</span><span><b>'+E(m[1])+'</b><small>Теория + практика</small></span><span class="qa-chevron">⌄</span></summary><div class="qa-lessonbody"><p>'+E(m[2])+'</p>'+(window.qexusExpansionLesson?.(m[0])||'')+legacyExtras(m[0])+'<div class="qa-exercise"><b>Самостоятельное задание</b><p>'+E(m[3])+'</p></div><label class="qa-done"><input type="checkbox" data-qa-complete="'+m[0]+'"> Я выполнил(а) задание</label></div></details>').join('')+
'<div class="qa-panel"><h3>20 терминов для начала</h3><div class="qa-terms">'+terms.map(a=>'<div><b>'+E(a[0])+'</b><span>'+E(a[1])+'</span></div>').join('')+'</div></div>';
}
function jobsHTML(){
const localized=localizedJobsHTML();if(localized)return localized;

const translated=qxLocalizedJobs();if(translated)return translated;
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
const localized=localizedLibraryHTML();if(localized)return localized;

const translated=qxLocalizedLibrary();if(translated)return translated;
return '<div class="qa-intro"><div class="qa-label">ИСТОЧНИКИ И ПРОВЕРКА ФАКТОВ</div><h1>Бесплатная библиотека</h1><p>Оригинальные документы государственных ведомств и курсы провайдеров. Это отправные точки для обновления информации, не готовые доказательства наличия вакансии или разрешения на работу.</p></div>'+
'<div class="qa-cards">'+workLinks.map(([u,title])=>'<div class="qa-panel"><h3>'+E(title)+'</h3>'+external(u,"Открыть источник")+'</div>').join('')+'</div>'+
'<div class="qa-panel"><h3>Статус информации</h3><p>Требования подтверждаются ссылками на ведомства, цены — страницами провайдеров. Отсутствие цены означает «не проверено», а не «бесплатно». Последняя ручная сверка: 17 ноября 2026. Для актуальных вакансий, курсов и визовых правил требуется повторная проверка перед действием.</p></div>';
}
window.qexusAcademyCertificates=certificationHTML;
window.qexusAcademyCareer=jobsHTML;
window.qexusAcademySources=libraryHTML;
const titles={cert:"Сертификаты",curriculum:"12 модулей",jobs:"Трудоустройство",library:"Библиотека"};
const translatedViewTitles={fr:{cert:"Certificats",curriculum:"12 leçons",jobs:"Recherche d’emploi",library:"Bibliothèque"},uk:{cert:"Сертифікати",curriculum:"12 уроків",jobs:"Працевлаштування",library:"Бібліотека"}};
function show(view){
  if(!(view in titles))return;
  const main=document.getElementById("main");if(!main)return;
  const fn={cert:certificationHTML,curriculum:curriculumHTML,jobs:jobsHTML,library:libraryHTML}[view];
  main.innerHTML='<div class="qa-wrap">'+fn()+'</div>';
  document.querySelectorAll('.nav-item[data-view]').forEach(b=>b.classList.remove("active"));
  document.querySelectorAll("[data-qa-view]").forEach(b=>b.classList.toggle("active",b.dataset.qaView===view));
  const crumb=document.getElementById("crumb")||document.getElementById("viewName");if(crumb){const language=(new URLSearchParams(location.search).get("lang")||document.documentElement.lang).toLowerCase();crumb.textContent=translatedViewTitles[language]?.[view]||titles[view];}
  if(view==="curriculum"){
    let done=read("lessons");document.querySelectorAll("[data-qa-complete]").forEach(x=>x.checked=!!done[x.dataset.qaComplete]);progress(done);
  }
  if(view==="jobs"){let data=read("checks");document.querySelectorAll("[data-qa-check]").forEach(x=>x.checked=!!data[x.dataset.qaCheck]);}
  document.getElementById("sidebar")?.classList.remove("open");
  document.getElementById("menuToggle")?.setAttribute("aria-expanded","false");
  window.scrollTo({top:0,behavior:"instant"});
}
function read(key){try{return JSON.parse(localStorage.getItem("qexus-academy-"+country+"-"+key)||"{}")}catch{return {}}}
function write(key,v){try{localStorage.setItem("qexus-academy-"+country+"-"+key,JSON.stringify(v))}catch{}}
function progress(done){const count=modules.filter(m=>done[m[0]]).length;const e=document.getElementById("qa-progress");if(e){const language=(new URLSearchParams(location.search).get("lang")||document.documentElement.lang).toLowerCase();e.textContent=language==="fr"?"Terminées : "+count+" / "+modules.length:language==="uk"?"Пройдено: "+count+" / "+modules.length:"Пройдено "+count+" / "+modules.length;}}
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