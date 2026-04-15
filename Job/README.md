# 🚀 Job Board - Доска Вакансий

Современная доска вакансий с Firebase Firestore интеграцией.

## ✨ Функционал

- ➕ **Добавление вакансий** - форма с валидацией
- 📋 **Список вакансий** - красивые карточки
- 🔍 **Поиск** - по названию вакансии (реал-тайм с дебаунсом)
- 🎯 **Фильтр** - по категориям
- 🗑️ **Удаление** - вакансий
- 📱 **Адаптивный дизайн** - работает на всех устройствах

## 🛠️ Настройка Firebase

1. Создайте проект в [Firebase Console](https://console.firebase.google.com/)
2. Включите Firestore Database
3. Получите конфигурацию проекта
4. Замените значения в `src/firebase.js`:

```javascript
const firebaseConfig = {
  apiKey: "ваш-api-key",
  authDomain: "ваш-project.firebaseapp.com",
  projectId: "ваш-project-id",
  storageBucket: "ваш-project.appspot.com",
  messagingSenderId: "ваш-sender-id",
  appId: "ваш-app-id"
};
```

## 🚀 Запуск

```bash
npm install
npm run dev
```

## 🎨 Дизайн

- Минималистичный и современный интерфейс
- Градиентный фон
- Плавные анимации
- Иконки для лучшего UX
- Адаптивная верстка

## 📦 Технологии

- React 19
- Firebase Firestore
- Vite
- CSS3 с современными фичами
