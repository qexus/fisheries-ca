import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const script = file => fs.readFileSync('public/' + file, 'utf8');
const registry = JSON.parse(script('generated/registry.json'));
const shell = script('index.html');
for (const asset of ['data.js', 'backup-guard.js', 'app-locale.js']) {
  assert(shell.indexOf(`src="${asset}"`) < shell.indexOf('src="app.js"'));
  assert.match(shell, new RegExp(`<script src="${asset}"></script>`));
}

const cyrillic = /[А-Яа-яЁё]/;
const russianOnly = /[ЫыЭэЪъЁё]/;
for (const language of ['fr', 'uk']) {
  const window = {scrollTo() {}};
  const elements = Object.fromEntries(['main', 'viewName', 'sidebar', 'menuToggle', 'toast', 'lessonNote', 'quizResult', 'restoreNotes', 'restoreFile'].map(id => ['#' + id, {
    innerHTML: '', textContent: '', value: '',
    listeners: {},
    addEventListener(type, listener) {this.listeners[type] = listener;},
    classList: {toggle() {}, remove() {}, add() {}},
    setAttribute() {},
  }]));
  const reads = new Map();
  let lessonButtons = [];
  let quizButtons = [];
  const document = {
    documentElement: {lang: 'ru'},
    querySelector: selector => elements[selector] || null,
    querySelectorAll: selector => selector === '.lesson-open' ? lessonButtons : selector === '.quiz-answer' ? quizButtons : [],
    addEventListener() {},
  };
  const warnings = ['CFIA CSV не обработан (exception details); пробуем HTML.', 'BC landbased download failed: keeping 42 prior records (stale).'];
  const context = vm.createContext({
    window, document, location: {search: '?lang=' + language}, URLSearchParams, URL,
    localStorage: {getItem: key => reads.get(key), setItem: (key, value) => reads.set(key, value)},
    fetch: async () => ({ok: true, json: async () => ({...registry, warnings})}),
    setTimeout() {},
  });
  for (const file of ['data.js', 'backup-guard.js', 'app-locale.js', 'app.js']) {
    vm.runInContext(script(file), context, {filename: file});
  }
  await new Promise(resolve => setImmediate(resolve));
  const catalog = window.QX_APP_I18N[language];
  const seed = window.CANADA_FISHERIES_SEED;
  const required = new Set();
  for (const job of seed.jobs) for (const key of ['title', 'notes']) required.add(job[key]);
  for (const company of [...seed.companies, ...registry.companies, ...registry.aquaculture]) {
    required.add(company.category).add(company.notes);
  }
  for (const item of seed.glossary) required.add(item.ru);
  for (const source of seed.sources) for (const key of ['title', 'type', 'detail']) required.add(source[key]);
  for (const lesson of seed.lessons) {
    for (const key of [lesson.title, lesson.theory, lesson.task, lesson.question, ...lesson.answers]) {
      if (cyrillic.test(key)) required.add(key);
    }
  }
  for (const value of required) assert(Object.hasOwn(catalog, value), `${language}: missing ${value}`);
  for (const [source, localized] of Object.entries(catalog)) {
    const params = value => [...value.matchAll(/\{(\w+)\}/g)].map(match => match[1]).sort();
    assert.deepEqual(params(localized), params(source), `${language}: placeholders for ${source}`);
    assert(!localized.match(language === 'fr' ? cyrillic : russianOnly), `${language}: unexpected Russian characters in ${localized}`);
  }
  const main = elements['#main'];
  for (const view of ['dashboard', 'companies', 'jobs', 'aquaculture', 'course', 'glossary', 'documents', 'salary', 'sources']) {
    window.qexusNavigate(view);
    assert.match(main.innerHTML, /<h1>[^<]+/);
    const body = main.innerHTML.replace(/<[^>]+>/g, '');
    assert(!body.match(language === 'fr' ? cyrillic : russianOnly), `${language}/${view}: ${body.match(language === 'fr' ? cyrillic : russianOnly)?.[0]} leaks into text`);
    assert(!/\{\w+\}/.test(body), `${language}/${view}: unresolved parameter`);
    if (view === 'jobs') {
      assert.match(main.innerHTML, /value="Техническая"/);
      assert.match(main.innerHTML, /value="Производство"/);
      for (const job of seed.jobs) assert(main.innerHTML.includes(`data-copy="${job.job_number}"`));
    }
    if (view === 'glossary') assert(main.innerHTML.includes('lang="en" data-no-translate'));
    if (view === 'sources') {
      assert(main.innerHTML.includes('42'));
      assert(!main.innerHTML.includes('exception details'));
    }
  }
  elements['#restoreFile'].files = [{size: 12, text: async () => '{ invalid'}];
  await elements['#restoreNotes'].listeners.click();
  assert.equal(elements['#toast'].textContent, catalog['Ошибка: {reason}'].replace('{reason}', catalog['Не удалось прочитать резервную копию']));
  for (const lesson of seed.lessons) {
    const button = {dataset: {id: lesson.id}, addEventListener(type, listener) {this.click = listener;}};
    const correct = {dataset: {answer: lesson.correct}, classList: {add() {}, remove() {}}, addEventListener(type, listener) {this.click = listener;}};
    lessonButtons = [button];
    quizButtons = [correct];
    window.qexusNavigate('course');
    button.click();
    assert(main.innerHTML.includes(catalog[lesson.title]));
    correct.click();
    assert.equal(elements['#quizResult'].textContent, catalog['Верно!']);
  }
}
console.log('Passed: FR/UK Canada app views, registry and source messages, stable archive filters, JSON error, 56 glossary entries and ten legacy lessons.');
