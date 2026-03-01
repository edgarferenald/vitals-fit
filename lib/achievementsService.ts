import { supabase } from "./supabase";

export interface Badge {
    id: string;
    icon: string;
    titleKey: string;
    descKey: string;
    unlocked: boolean;
    progress: number; // 0-100
}

export async function calculateBadges(userId: string): Promise<Badge[]> {
    // Fetch all data needed
    const [streakData, foodData, waterData] = await Promise.all([
        supabase.from("streaks").select("*").eq("user_id", userId),
        supabase.from("food_entries").select("id, date, calories").eq("user_id", userId),
        supabase.from("water_entries").select("id, date, amount_ml").eq("user_id", userId),
    ]);

    const streaks = streakData.data || [];
    const foods = foodData.data || [];
    const waters = waterData.data || [];

    // Calculate stats
    const maxStreak = Math.max(0, ...streaks.map(s => s.days_count || 0));
    const totalFoodEntries = foods.length;

    // Total water per week (last 7 days)
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekAgoStr = weekAgo.toISOString().split("T")[0];
    const weekWater = waters
        .filter(w => w.date >= weekAgoStr)
        .reduce((sum, w) => sum + (w.amount_ml > 0 ? w.amount_ml : 0), 0);

    // Unique food days
    const uniqueFoodDays = new Set(foods.map(f => f.date)).size;

    // Total calories tracked
    const totalCalories = foods.reduce((sum, f) => sum + f.calories, 0);

    return [
        {
            id: "streak_7",
            icon: "🔥",
            titleKey: "badge.streak7.title",
            descKey: "badge.streak7.desc",
            unlocked: maxStreak >= 7,
            progress: Math.min(100, (maxStreak / 7) * 100),
        },
        {
            id: "streak_30",
            icon: "⚡",
            titleKey: "badge.streak30.title",
            descKey: "badge.streak30.desc",
            unlocked: maxStreak >= 30,
            progress: Math.min(100, (maxStreak / 30) * 100),
        },
        {
            id: "water_10k",
            icon: "💧",
            titleKey: "badge.water10k.title",
            descKey: "badge.water10k.desc",
            unlocked: weekWater >= 10000,
            progress: Math.min(100, (weekWater / 10000) * 100),
        },
        {
            id: "first_scan",
            icon: "📸",
            titleKey: "badge.firstScan.title",
            descKey: "badge.firstScan.desc",
            unlocked: totalFoodEntries >= 1,
            progress: totalFoodEntries >= 1 ? 100 : 0,
        },
        {
            id: "food_100",
            icon: "🍽️",
            titleKey: "badge.food100.title",
            descKey: "badge.food100.desc",
            unlocked: totalFoodEntries >= 100,
            progress: Math.min(100, (totalFoodEntries / 100) * 100),
        },
        {
            id: "tracker_pro",
            icon: "📊",
            titleKey: "badge.trackerPro.title",
            descKey: "badge.trackerPro.desc",
            unlocked: uniqueFoodDays >= 14,
            progress: Math.min(100, (uniqueFoodDays / 14) * 100),
        },
        {
            id: "calorie_master",
            icon: "🏆",
            titleKey: "badge.calorieMaster.title",
            descKey: "badge.calorieMaster.desc",
            unlocked: totalCalories >= 50000,
            progress: Math.min(100, (totalCalories / 50000) * 100),
        },
        {
            id: "hydro_week",
            icon: "🌊",
            titleKey: "badge.hydroWeek.title",
            descKey: "badge.hydroWeek.desc",
            unlocked: weekWater >= 14000,
            progress: Math.min(100, (weekWater / 14000) * 100),
        },
    ];
}
