# Источники и ограничения — Canada Fisheries

Дата изучения публичных страниц: **16 ноября 2026**.

1. **CFIA** — https://apps.inspection.canada.ca/webapps/FishList/?lang=en  
   «Canadian fish and seafood establishments approved for export». Публичные данные: имя, номер, адрес, населённый пункт, провинция. Автоматический импорт: CSV `https://apps.inspection.canada.ca/webapps/FishList/Home/GetCSV` с запасным парсером HTML. Это не источник вакансий и не полный список всех канадских работодателей рыбной отрасли.
2. **DFO (BC)** — https://open.canada.ca/data/dataset/522d1b67-30d8-4a34-9b62-5da99b1035e6  
   CSV для shellfish, marine finfish и landbased aquaculture license holders. Обновляются через каталог DFO; могут поменяться поля. Если не удастся распознать владельца лицензии, данные не публикуются как компании. Реальную выгрузку ещё нужно испытать в GitHub Actions.
3. **Job Bank** — https://www.jobbank.gc.ca/jobsearch/jobsearch?searchstring=fish+processing  
   Вакансии из открытой поисковой выдачи на дату подготовки. Номера объявлений и ставки — исторические снимки, не автоматическая онлайн-база. Указана минимальная ставка опубликованного диапазона, когда в поисковой выдаче диапазон (Ocean Pier maintenance).
4. **Job Bank** — https://www.jobbank.gc.ca/wagereport/occupation/17168  
   NOC 95107, национальная медианная ставка 18 CAD/час, страница обновлена 19 ноября 2025. Не юридический минимум и не универсальная зарплата в 2026.
5. **IRCC** — https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada/open-work-permit.html и https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/ukraine-measures.html.  
   Открытое разрешение разрешает работу для допустимых работодателей; проверь условия permit и актуальные специальные правила.
6. **Transport Canada** — https://tc.canada.ca/en/marine-transportation/marine-safety/small-fishing-vessel-safety.  
   Морские требования зависят от судна и работы на борту.
7. **DFO Atlantic stats** — https://www.dfo-mpo.gc.ca/stats/commercial/licences-permis/licences-permis-atl-eng.htm.  
   Общая статистика по судам, не именной каталог капитанов/экипажей.

**Не включать в публичный репозиторий:** телефоны и адреса частных лиц, резюме, SIN, копии permit и паспорта, личные ответы работодателей и заметки о переписке.

**Процедура проверки вакансий:** сверить номер объявления на Job Bank, дату размещения, статус, реальный адрес, применимые языковые условия и право на работу. Никогда не заявлять, что организация «нанимает», лишь потому что она присутствует в CFIA.
