# Тестовое задание для Junior React Developer

### Задание

Необходимо развернуть локально `json-server` и загрузить в него данные **seminars**. Используйте любые удобные технологии, но обязательно с использованием React для реализации следующих функций:

1. **Запрос данных**

   - Запросите данные с семинарами из `json-server`.

2. **Отрисовка списка семинаров**

   - Отобразите список семинаров на странице.

3. **Удаление семинара**

   - Реализуйте кнопку удаления семинара, которая при клике открывает окно подтверждения.
   - При подтверждении удаления отправьте `DELETE` запрос на сервер.

4. **Редактирование семинара**

   - Реализуйте кнопку редактирования семинара.
   - Редактирование должно происходить в модальном окне.

5. **Размещение на GitHub**
   - Залейте проект на GitHub и пришлите ссылку.
   - **Важно:** `json-server` должен находиться в том же репозитории, что и приложение.

### Дополнительные рекомендации

- Используйте современные подходы (например, React Hooks, функциональные компоненты).
- Обратите внимание на обработку ошибок и состояния загрузки.
- Добавьте комментарии в код для пояснения ключевых моментов реализации.

# Todo

1. [x] List
   1. [-] Pagination
   2. [x] Skeleton
2. [x] Card
   - вы могли тестовый json с рабочими в РФ ссылками на изображения дать?
   1. [x] Skeleton (искусственный loading)
   2. [x] Удаление семинара (кнопка)
      1. [x] Отрисовывать новый UI без семинара и через таймаут без успешного удаления возвращать обратно с варнингом
      2. [x] Окно с подтверждением удаления
   3. [x] Image
3. [x] Page
   1. [?] Загрузка первых трёх (искусств. задержка, пагинация)
   2. [?] (Запрос) получение только id чтобы потом с lazy load Card'ов подгружать их информацию

## Компоненты

1. Card

   - Отрисовывается родителем, semi controllable компонент (коллбеки обновления списка идут с родителя пропсами, коллбеки с апи запросами вызываются карточкой напрямую с контекста)

   1. При edit делает запрос через контекст в апи для обновления, после вызывает коллбеки. Обновление ui всецело на родителе (контекст или просто родитель (для stories подходит))
   2. При delete то-же самое

   ```
   ●── Card
    ├── ◉ Data
    │   └── ◉ props
    │       └── ◉ CardList.items
    │           └── ◉ seminarsCtx.seminars
    └── ◉ Methods
        ├── ◉ Edit Modal
        │   ├── ● Card/seminarCtx.apiEditSeminar() //обновление данных в апи
        │   └── ● Card/onEditCb() => CardList.items/onEditCb: ui-update.editCardUpdateUI() // обновление данных в ui
        └── ◉ Delete Modal
            ├── ● Card/seminarCtx.apiDeleteSeminar() //обновление данных в апи
            └── ● Card/onDeleteCb() => CardList.items/onDeleteCb: ui-update.deleteCardUpdateUI() // обновление данных в ui
   ```

2. CardList (бывш. List)

   - Пытался уйти от привязки к Card
   - Отвечает только за отрисовку карточек

   ```
   ●── List
    └── ◉ Behavior
        └── Через 3 сек как переданные пропсы остаются undefined, внутренний стейт выставляется [] (рендерится "нечего показывать")
   ```

3. SeminarsContext
   - Отвечает за апи запросы и хранение текущего списка семинаров. К нему Card обращается напрямую чтобы обновить или удалить себя в апи
