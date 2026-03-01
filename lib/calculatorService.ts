// Calculator service with BMR, TDEE, and macro calculations

export type Gender = "male" | "female";
export type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "very_active";
export type Goal = "lose" | "maintain" | "gain";

export interface UserParams {
    gender: Gender;
    age: number;
    weight: number; // kg
    height: number; // cm
    activityLevel: ActivityLevel;
    goal: Goal;
}

export interface CalculationResult {
    bmr: number;
    tdee: number;
    targetCalories: number;
    water: number; // ml
    protein: number; // g
    fat: number; // g
    carbs: number; // g
    bmi: number;
    bmiCategory: string;
    idealWeight: { min: number; max: number };
}

const activityMultipliers: Record<ActivityLevel, number> = {
    sedentary: 1.2,      // Сидячий образ жизни
    light: 1.375,        // Лёгкие тренировки 1-3 раза/неделю
    moderate: 1.55,      // Умеренные тренировки 3-5 раз/неделю
    active: 1.725,       // Интенсивные тренировки 6-7 раз/неделю
    very_active: 1.9     // Очень интенсивные тренировки или физ. работа
};

const activityLabels: Record<ActivityLevel, string> = {
    sedentary: "Минимальная (офис)",
    light: "Низкая (1-3 тренировки)",
    moderate: "Средняя (3-5 тренировок)",
    active: "Высокая (6-7 тренировок)",
    very_active: "Очень высокая (спортсмен)"
};

const goalLabels: Record<Goal, string> = {
    lose: "Похудение",
    maintain: "Поддержание",
    gain: "Набор массы"
};

// Mifflin-St Jeor Equation (most accurate for general population)
export function calculateBMR(gender: Gender, weight: number, height: number, age: number): number {
    if (gender === "male") {
        return Math.round(10 * weight + 6.25 * height - 5 * age + 5);
    } else {
        return Math.round(10 * weight + 6.25 * height - 5 * age - 161);
    }
}

export function calculateTDEE(bmr: number, activityLevel: ActivityLevel): number {
    return Math.round(bmr * activityMultipliers[activityLevel]);
}

export function calculateTargetCalories(tdee: number, goal: Goal): number {
    switch (goal) {
        case "lose":
            return Math.round(tdee * 0.8); // 20% deficit
        case "gain":
            return Math.round(tdee * 1.15); // 15% surplus
        default:
            return tdee;
    }
}

export function calculateWater(weight: number): number {
    return Math.round(weight * 35); // 35ml per kg
}

export function calculateMacros(targetCalories: number, goal: Goal): { protein: number; fat: number; carbs: number } {
    let proteinRatio: number;
    let fatRatio: number;
    let carbsRatio: number;

    switch (goal) {
        case "lose":
            proteinRatio = 0.35; // Higher protein for preservation
            fatRatio = 0.30;
            carbsRatio = 0.35;
            break;
        case "gain":
            proteinRatio = 0.30;
            fatRatio = 0.25;
            carbsRatio = 0.45;
            break;
        default:
            proteinRatio = 0.30;
            fatRatio = 0.30;
            carbsRatio = 0.40;
    }

    return {
        protein: Math.round((targetCalories * proteinRatio) / 4), // 4 cal per gram
        fat: Math.round((targetCalories * fatRatio) / 9),         // 9 cal per gram
        carbs: Math.round((targetCalories * carbsRatio) / 4)      // 4 cal per gram
    };
}

export function calculateBMI(weight: number, height: number): number {
    const heightM = height / 100;
    return Math.round((weight / (heightM * heightM)) * 10) / 10;
}

export function getBMICategory(bmi: number): string {
    if (bmi < 18.5) return "bmi.underweight";
    if (bmi < 25) return "bmi.normal";
    if (bmi < 30) return "bmi.overweight";
    return "bmi.obese";
}

export function getIdealWeight(height: number): { min: number; max: number } {
    const heightM = height / 100;
    return {
        min: Math.round(18.5 * heightM * heightM),
        max: Math.round(24.9 * heightM * heightM),
    };
}

export function calculate(params: UserParams): CalculationResult {
    const bmr = calculateBMR(params.gender, params.weight, params.height, params.age);
    const tdee = calculateTDEE(bmr, params.activityLevel);
    const targetCalories = calculateTargetCalories(tdee, params.goal);
    const water = calculateWater(params.weight);
    const macros = calculateMacros(targetCalories, params.goal);
    const bmi = calculateBMI(params.weight, params.height);
    const bmiCategory = getBMICategory(bmi);
    const idealWeight = getIdealWeight(params.height);

    return {
        bmr,
        tdee,
        targetCalories,
        water,
        ...macros,
        bmi,
        bmiCategory,
        idealWeight,
    };
}

export { activityLabels, goalLabels };
