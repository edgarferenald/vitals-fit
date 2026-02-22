// Localization translations for RU, UK, EN

export type Locale = "ru" | "uk" | "en";

export const translations: Record<Locale, Record<string, string>> = {
    ru: {
        // Header
        "header.status": "Система в сети",

        // Nav
        "nav.dashboard": "Главная",
        "nav.scanner": "Сканер",
        "nav.history": "История",
        "nav.recommendations": "Советы",
        "nav.settings": "Профиль",

        // Auth
        "auth.login": "Вход",
        "auth.register": "Регистрация",
        "auth.email": "Email",
        "auth.password": "Пароль",
        "auth.emailPlaceholder": "your@email.com",
        "auth.submit.login": "Войти",
        "auth.submit.register": "Создать аккаунт",
        "auth.loading": "Загрузка...",
        "auth.noAccount": "Нет аккаунта?",
        "auth.hasAccount": "Уже есть аккаунт?",

        // Streak
        "streak.title": "Серия",
        "streak.days": "Дней",
        "streak.login": "Войдите",
        "streak.noActive": "Нет активной серии",
        "streak.start": "Начать",
        "streak.keepGoing": "Так держать!",
        "streak.newStreak": "Начать новую серию?",
        "streak.newStreakDesc": "Текущая серия ({days} дней) будет завершена и начнётся новая с 1 дня.",
        "streak.cancel": "Отмена",

        // Water
        "water.title": "Вода",
        "water.ml": "мл",
        "water.loginToTrack": "Войдите для отслеживания",
        "water.goal": "Цель: {goal}мл",
        "water.goalTitle": "Цель воды",
        "water.goalUnit": "миллилитров в день",

        // Calories
        "calories.title": "Калории",
        "calories.kcal": "ккал",
        "calories.loginToTrack": "Войдите для отслеживания",
        "calories.consumed": "Потреблено",
        "calories.goal": "Цель: {goal}",
        "calories.goalTitle": "Цель калорий",
        "calories.goalUnit": "килокалорий в день",

        // Scanner
        "scanner.error": "Не удалось распознать. Попробуйте снова.",
        "scanner.energy": "Энергия",
        "scanner.protein": "Белки",
        "scanner.fat": "Жиры",
        "scanner.carbs": "Углеводы",
        "scanner.addToDiary": "Добавить в дневник",

        // History
        "history.title": "История еды",
        "history.loginToView": "Войдите для просмотра истории",
        "history.empty": "История пуста",
        "history.scanToStart": "Отсканируйте еду, чтобы начать",
        "history.today": "Сегодня",
        "history.yesterday": "Вчера",
        "history.p": "Б",
        "history.f": "Ж",
        "history.c": "У",

        // Recommendations
        "recommendations.title": "Рекомендации",
        "recommendations.articles": "Полезные статьи",
        "articles.read": "Читать →",
        "articles.close": "Закрыть",

        // Calculator
        "calc.title": "Калькулятор норм",
        "calc.subtitle": "Узнай свои персональные показатели",
        "calc.gender": "Пол",
        "calc.male": "Мужской",
        "calc.female": "Женский",
        "calc.age": "Возраст",
        "calc.weight": "Вес (кг)",
        "calc.height": "Рост (см)",
        "calc.activityLevel": "Уровень активности",
        "calc.goal": "Цель",
        "calc.calculate": "Рассчитать",
        "calc.yourNorms": "Твои нормы",
        "calc.caloriesPerDay": "Калории в день",
        "calc.water": "Вода",
        "calc.protein": "Белок",
        "calc.carbs": "Углеводы",
        "calc.fat": "Жиры",

        // Activity labels
        "activity.sedentary": "Минимальная (офис)",
        "activity.light": "Низкая (1-3 тренировки)",
        "activity.moderate": "Средняя (3-5 тренировок)",
        "activity.active": "Высокая (6-7 тренировок)",
        "activity.very_active": "Очень высокая (спортсмен)",

        // Goal labels
        "goal.lose": "Похудение",
        "goal.maintain": "Поддержание",
        "goal.gain": "Набор массы",

        // Settings
        "settings.user": "Пользователь",
        "settings.enterName": "Введите имя",
        "settings.goals": "Цели",
        "settings.water": "Вода",
        "settings.dailyGoal": "Дневная цель",
        "settings.calories": "Калории",
        "settings.streaks": "Серии",
        "settings.streakHistory": "История серий",
        "settings.manageStreaks": "Управление сериями",
        "settings.days": "дней",
        "settings.active": "активна",
        "settings.logout": "Выйти",
        "settings.save": "Сохранить",

        // AI prompt language
        "ai.language": "РУССКОМ",
    },
    uk: {
        // Header
        "header.status": "Система онлайн",

        // Nav
        "nav.dashboard": "Головна",
        "nav.scanner": "Сканер",
        "nav.history": "Iсторiя",
        "nav.recommendations": "Поради",
        "nav.settings": "Профiль",

        // Auth
        "auth.login": "Вхід",
        "auth.register": "Реєстрація",
        "auth.email": "Email",
        "auth.password": "Пароль",
        "auth.emailPlaceholder": "your@email.com",
        "auth.submit.login": "Увійти",
        "auth.submit.register": "Створити акаунт",
        "auth.loading": "Завантаження...",
        "auth.noAccount": "Немає акаунта?",
        "auth.hasAccount": "Вже є акаунт?",

        // Streak
        "streak.title": "Серія",
        "streak.days": "Днів",
        "streak.login": "Увійдіть",
        "streak.noActive": "Немає активної серії",
        "streak.start": "Почати",
        "streak.keepGoing": "Так тримати!",
        "streak.newStreak": "Почати нову серію?",
        "streak.newStreakDesc": "Поточна серія ({days} днів) буде завершена і розпочнеться нова з 1 дня.",
        "streak.cancel": "Скасувати",

        // Water
        "water.title": "Вода",
        "water.ml": "мл",
        "water.loginToTrack": "Увійдіть для відстеження",
        "water.goal": "Ціль: {goal}мл",
        "water.goalTitle": "Ціль води",
        "water.goalUnit": "мілілітрів на день",

        // Calories
        "calories.title": "Калорії",
        "calories.kcal": "ккал",
        "calories.loginToTrack": "Увійдіть для відстеження",
        "calories.consumed": "Спожито",
        "calories.goal": "Ціль: {goal}",
        "calories.goalTitle": "Ціль калорій",
        "calories.goalUnit": "кілокалорій на день",

        // Scanner
        "scanner.error": "Не вдалося розпізнати. Спробуйте ще раз.",
        "scanner.energy": "Енергія",
        "scanner.protein": "Білки",
        "scanner.fat": "Жири",
        "scanner.carbs": "Вуглеводи",
        "scanner.addToDiary": "Додати до щоденника",

        // History
        "history.title": "Історія їжі",
        "history.loginToView": "Увійдіть для перегляду історії",
        "history.empty": "Історія порожня",
        "history.scanToStart": "Відскануйте їжу, щоб почати",
        "history.today": "Сьогодні",
        "history.yesterday": "Вчора",
        "history.p": "Б",
        "history.f": "Ж",
        "history.c": "В",

        // Recommendations
        "recommendations.title": "Рекомендації",
        "recommendations.articles": "Корисні статті",
        "articles.read": "Читати →",
        "articles.close": "Закрити",

        // Calculator
        "calc.title": "Калькулятор норм",
        "calc.subtitle": "Дізнайся свої персональні показники",
        "calc.gender": "Стать",
        "calc.male": "Чоловіча",
        "calc.female": "Жіноча",
        "calc.age": "Вік",
        "calc.weight": "Вага (кг)",
        "calc.height": "Зріст (см)",
        "calc.activityLevel": "Рівень активності",
        "calc.goal": "Ціль",
        "calc.calculate": "Розрахувати",
        "calc.yourNorms": "Твої норми",
        "calc.caloriesPerDay": "Калорії на день",
        "calc.water": "Вода",
        "calc.protein": "Білок",
        "calc.carbs": "Вуглеводи",
        "calc.fat": "Жири",

        // Activity labels
        "activity.sedentary": "Мінімальна (офіс)",
        "activity.light": "Низька (1-3 тренування)",
        "activity.moderate": "Середня (3-5 тренувань)",
        "activity.active": "Висока (6-7 тренувань)",
        "activity.very_active": "Дуже висока (спортсмен)",

        // Goal labels
        "goal.lose": "Схуднення",
        "goal.maintain": "Підтримка",
        "goal.gain": "Набір маси",

        // Settings
        "settings.user": "Користувач",
        "settings.enterName": "Введіть ім'я",
        "settings.goals": "Цілі",
        "settings.water": "Вода",
        "settings.dailyGoal": "Денна ціль",
        "settings.calories": "Калорії",
        "settings.streaks": "Серії",
        "settings.streakHistory": "Історія серій",
        "settings.manageStreaks": "Керування серіями",
        "settings.days": "днів",
        "settings.active": "активна",
        "settings.logout": "Вийти",
        "settings.save": "Зберегти",

        // AI prompt language
        "ai.language": "УКРАЇНСЬКОЮ",
    },
    en: {
        // Header
        "header.status": "System online",

        // Nav
        "nav.dashboard": "Home",
        "nav.scanner": "Scanner",
        "nav.history": "History",
        "nav.recommendations": "Tips",
        "nav.settings": "Profile",

        // Auth
        "auth.login": "Login",
        "auth.register": "Sign Up",
        "auth.email": "Email",
        "auth.password": "Password",
        "auth.emailPlaceholder": "your@email.com",
        "auth.submit.login": "Sign In",
        "auth.submit.register": "Create Account",
        "auth.loading": "Loading...",
        "auth.noAccount": "No account?",
        "auth.hasAccount": "Already have an account?",

        // Streak
        "streak.title": "Streak",
        "streak.days": "Days",
        "streak.login": "Log in",
        "streak.noActive": "No active streak",
        "streak.start": "Start",
        "streak.keepGoing": "Keep going!",
        "streak.newStreak": "Start a new streak?",
        "streak.newStreakDesc": "Current streak ({days} days) will end and a new one will start from day 1.",
        "streak.cancel": "Cancel",

        // Water
        "water.title": "Water",
        "water.ml": "ml",
        "water.loginToTrack": "Log in to track",
        "water.goal": "Goal: {goal}ml",
        "water.goalTitle": "Water Goal",
        "water.goalUnit": "milliliters per day",

        // Calories
        "calories.title": "Calories",
        "calories.kcal": "kcal",
        "calories.loginToTrack": "Log in to track",
        "calories.consumed": "Consumed",
        "calories.goal": "Goal: {goal}",
        "calories.goalTitle": "Calorie Goal",
        "calories.goalUnit": "kilocalories per day",

        // Scanner
        "scanner.error": "Could not recognize. Try again.",
        "scanner.energy": "Energy",
        "scanner.protein": "Protein",
        "scanner.fat": "Fat",
        "scanner.carbs": "Carbs",
        "scanner.addToDiary": "Add to diary",

        // History
        "history.title": "Food History",
        "history.loginToView": "Log in to view history",
        "history.empty": "History is empty",
        "history.scanToStart": "Scan food to get started",
        "history.today": "Today",
        "history.yesterday": "Yesterday",
        "history.p": "P",
        "history.f": "F",
        "history.c": "C",

        // Recommendations
        "recommendations.title": "Recommendations",
        "recommendations.articles": "Useful articles",
        "articles.read": "Read →",
        "articles.close": "Close",

        // Calculator
        "calc.title": "Norm Calculator",
        "calc.subtitle": "Find out your personal numbers",
        "calc.gender": "Gender",
        "calc.male": "Male",
        "calc.female": "Female",
        "calc.age": "Age",
        "calc.weight": "Weight (kg)",
        "calc.height": "Height (cm)",
        "calc.activityLevel": "Activity Level",
        "calc.goal": "Goal",
        "calc.calculate": "Calculate",
        "calc.yourNorms": "Your Norms",
        "calc.caloriesPerDay": "Calories per day",
        "calc.water": "Water",
        "calc.protein": "Protein",
        "calc.carbs": "Carbs",
        "calc.fat": "Fat",

        // Activity labels
        "activity.sedentary": "Minimal (office)",
        "activity.light": "Low (1-3 workouts)",
        "activity.moderate": "Moderate (3-5 workouts)",
        "activity.active": "High (6-7 workouts)",
        "activity.very_active": "Very High (athlete)",

        // Goal labels
        "goal.lose": "Lose Weight",
        "goal.maintain": "Maintain",
        "goal.gain": "Gain Mass",

        // Settings
        "settings.user": "User",
        "settings.enterName": "Enter name",
        "settings.goals": "Goals",
        "settings.water": "Water",
        "settings.dailyGoal": "Daily goal",
        "settings.calories": "Calories",
        "settings.streaks": "Streaks",
        "settings.streakHistory": "Streak History",
        "settings.manageStreaks": "Manage streaks",
        "settings.days": "days",
        "settings.active": "active",
        "settings.logout": "Logout",
        "settings.save": "Save",

        // AI prompt language
        "ai.language": "ENGLISH",
    }
};
