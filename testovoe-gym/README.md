# Тестовое Gym

Стек:

1. React (Vite)
2. SCSS
3. React-Router-DOM
4. Redux

## Как запустить

1. `npm i`
2. .env в корне с значениями

```md
VITE_API_URL = "base-url.app" VITE_RATE_URL = "sub../list" (чтобы не заиндексировалась ваша апи)
```

3. `npm run dev` / `npm run build && npm run preview`
4. (опционально) в F12(девтулз) в консоли написать `debug=false` если в dev mode
5. (опционально) чекбокс timer-time и чекбокс hide-modal чтобы увидеть анимацию

### Что можно было бы улучшить

1. Код анимаций зашит в страничку, а не в компонент
2. Pages/promo не совсем по fsd, не использовал слоты
3. Не использовал react-hook-form
