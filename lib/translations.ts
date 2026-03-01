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
        "nav.achievements": "Награды",

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
        "scanner.title": "Сканер Еды",
        "scanner.ready": "AI Анализ Готов",
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
        "calc.bmi": "ИМТ (BMI)",
        "calc.idealWeight": "Идеальный вес",
        "calc.kg": "кг",

        // BMI categories
        "bmi.underweight": "Дефицит",
        "bmi.normal": "Норма",
        "bmi.overweight": "Избыток",
        "bmi.obese": "Ожирение",

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
        "settings.export": "Экспорт данных",
        "settings.exportFood": "История еды",

        // Progress Chart
        "progress.title": "Прогресс",
        "progress.last7days": "Последние 7 дней",
        "progress.loginToView": "Войдите для просмотра",

        // Streak Calendar
        "calendar.title": "Активность",
        "calendar.weeks12": "12 недель",
        "calendar.actions": "действий",
        "calendar.less": "Меньше",
        "calendar.more": "Больше",

        // Achievements
        "achievements.title": "Достижения",
        "badge.streak7.title": "7 дней подряд",
        "badge.streak7.desc": "Серия 7 дней без перерыва",
        "badge.streak30.title": "Месяц силы",
        "badge.streak30.desc": "Серия 30 дней подряд",
        "badge.water10k.title": "Водный поток",
        "badge.water10k.desc": "10 000 мл воды за неделю",
        "badge.firstScan.title": "Первый скан",
        "badge.firstScan.desc": "Первое сканирование еды",
        "badge.food100.title": "Гурман",
        "badge.food100.desc": "100 записей еды",
        "badge.trackerPro.title": "Трекер PRO",
        "badge.trackerPro.desc": "14 дней с записями",
        "badge.calorieMaster.title": "Мастер калорий",
        "badge.calorieMaster.desc": "50 000 ккал отслежено",
        "badge.hydroWeek.title": "Гидро-неделя",
        "badge.hydroWeek.desc": "14 000 мл воды за неделю",

        // AI Daily Analysis
        "ai.dailyTitle": "AI Анализ дня",
        "ai.dailyDesc": "Gemini проанализирует ваш рацион",
        "ai.analyzing": "Анализирую ваш рацион...",
        "ai.noData": "Пока нет данных для анализа. Добавьте еду в дневник.",
        "ai.error": "Не удалось получить анализ. Попробуйте позже.",
        "ai.language": "РУССКОМ",

        // Onboarding
        "onboarding.welcome": "Настроим под тебя",
        "onboarding.stepGoal": "Твоя цель",
        "onboarding.stepBody": "Параметры тела",
        "onboarding.stepActivity": "Уровень активности",
        "onboarding.stepReady": "Всё готово!",
        "onboarding.ready": "Мы рассчитали твои персональные нормы",
        "onboarding.back": "Назад",
        "onboarding.next": "Далее",
        "onboarding.start": "Начать",
        "onboarding.day": "день",

        // Avatar
        "avatar.tooLarge": "Файл слишком большой. Максимум 2 МБ.",
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
        "nav.achievements": "Нагороди",

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
        "scanner.title": "Сканер Їжі",
        "scanner.ready": "AI Аналіз Готовий",
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
        "calc.bmi": "ІМТ (BMI)",
        "calc.idealWeight": "Ідеальна вага",
        "calc.kg": "кг",

        // BMI categories
        "bmi.underweight": "Дефіцит",
        "bmi.normal": "Норма",
        "bmi.overweight": "Надлишок",
        "bmi.obese": "Ожиріння",

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
        "settings.export": "Експорт даних",
        "settings.exportFood": "Історія їжі",

        // Progress Chart
        "progress.title": "Прогрес",
        "progress.last7days": "Останні 7 днів",
        "progress.loginToView": "Увійдіть для перегляду",

        // Streak Calendar
        "calendar.title": "Активність",
        "calendar.weeks12": "12 тижнів",
        "calendar.actions": "дій",
        "calendar.less": "Менше",
        "calendar.more": "Більше",

        // Achievements
        "achievements.title": "Досягнення",
        "badge.streak7.title": "7 днів поспіль",
        "badge.streak7.desc": "Серія 7 днів без перерви",
        "badge.streak30.title": "Місяць сили",
        "badge.streak30.desc": "Серія 30 днів поспіль",
        "badge.water10k.title": "Водний потік",
        "badge.water10k.desc": "10 000 мл води за тиждень",
        "badge.firstScan.title": "Перший скан",
        "badge.firstScan.desc": "Перше сканування їжі",
        "badge.food100.title": "Гурман",
        "badge.food100.desc": "100 записів їжі",
        "badge.trackerPro.title": "Трекер PRO",
        "badge.trackerPro.desc": "14 днів із записами",
        "badge.calorieMaster.title": "Майстер калорій",
        "badge.calorieMaster.desc": "50 000 ккал відстежено",
        "badge.hydroWeek.title": "Гідро-тиждень",
        "badge.hydroWeek.desc": "14 000 мл води за тиждень",

        // AI Daily Analysis
        "ai.dailyTitle": "AI Аналіз дня",
        "ai.dailyDesc": "Gemini проаналізує ваш раціон",
        "ai.analyzing": "Аналізую ваш раціон...",
        "ai.noData": "Поки немає даних для аналізу. Додайте їжу до щоденника.",
        "ai.error": "Не вдалося отримати аналіз. Спробуйте пізніше.",
        "ai.language": "УКРАЇНСЬКОЮ",

        // Onboarding
        "onboarding.welcome": "Налаштуємо під тебе",
        "onboarding.stepGoal": "Твоя ціль",
        "onboarding.stepBody": "Параметри тіла",
        "onboarding.stepActivity": "Рівень активності",
        "onboarding.stepReady": "Все готово!",
        "onboarding.ready": "Ми розрахували твої персональні норми",
        "onboarding.back": "Назад",
        "onboarding.next": "Далі",
        "onboarding.start": "Почати",
        "onboarding.day": "день",

        // Avatar
        "avatar.tooLarge": "Файл занадто великий. Максимум 2 МБ.",
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
        "nav.achievements": "Awards",

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
        "scanner.title": "Food Scanner",
        "scanner.ready": "AI Analysis Ready",
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
        "calc.bmi": "BMI",
        "calc.idealWeight": "Ideal weight",
        "calc.kg": "kg",

        // BMI categories
        "bmi.underweight": "Underweight",
        "bmi.normal": "Normal",
        "bmi.overweight": "Overweight",
        "bmi.obese": "Obese",

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
        "settings.export": "Data Export",
        "settings.exportFood": "Food history",

        // Progress Chart
        "progress.title": "Progress",
        "progress.last7days": "Last 7 days",
        "progress.loginToView": "Log in to view",

        // Streak Calendar
        "calendar.title": "Activity",
        "calendar.weeks12": "12 weeks",
        "calendar.actions": "actions",
        "calendar.less": "Less",
        "calendar.more": "More",

        // Achievements
        "achievements.title": "Achievements",
        "badge.streak7.title": "7 Day Streak",
        "badge.streak7.desc": "7 consecutive days streak",
        "badge.streak30.title": "Month of Power",
        "badge.streak30.desc": "30 consecutive days streak",
        "badge.water10k.title": "Water Flow",
        "badge.water10k.desc": "10,000 ml water in a week",
        "badge.firstScan.title": "First Scan",
        "badge.firstScan.desc": "First food scan",
        "badge.food100.title": "Gourmet",
        "badge.food100.desc": "100 food entries",
        "badge.trackerPro.title": "Tracker PRO",
        "badge.trackerPro.desc": "14 days with entries",
        "badge.calorieMaster.title": "Calorie Master",
        "badge.calorieMaster.desc": "50,000 kcal tracked",
        "badge.hydroWeek.title": "Hydro Week",
        "badge.hydroWeek.desc": "14,000 ml water in a week",

        // AI Daily Analysis
        "ai.dailyTitle": "AI Day Analysis",
        "ai.dailyDesc": "Gemini will analyze your diet",
        "ai.analyzing": "Analyzing your diet...",
        "ai.noData": "No data to analyze yet. Add food to your diary.",
        "ai.error": "Could not get analysis. Try again later.",
        "ai.language": "ENGLISH",

        // Onboarding
        "onboarding.welcome": "Let's set up for you",
        "onboarding.stepGoal": "Your goal",
        "onboarding.stepBody": "Body parameters",
        "onboarding.stepActivity": "Activity level",
        "onboarding.stepReady": "All set!",
        "onboarding.ready": "We calculated your personal norms",
        "onboarding.back": "Back",
        "onboarding.next": "Next",
        "onboarding.start": "Start",
        "onboarding.day": "day",

        // Avatar
        "avatar.tooLarge": "File is too large. Maximum 2 MB.",
    }
};
