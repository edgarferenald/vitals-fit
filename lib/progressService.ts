import { supabase } from "./supabase";

export interface DayData {
    date: string;
    calories: number;
    water: number;
}

// Get aggregated data for the last N days
export async function getProgressData(userId: string, days: number = 7): Promise<DayData[]> {
    const result: DayData[] = [];
    const today = new Date();

    for (let i = days - 1; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split("T")[0];
        result.push({ date: dateStr, calories: 0, water: 0 });
    }

    const startDate = result[0].date;
    const endDate = result[result.length - 1].date;

    // Fetch food entries
    const { data: foodData } = await supabase
        .from("food_entries")
        .select("date, calories")
        .eq("user_id", userId)
        .gte("date", startDate)
        .lte("date", endDate);

    if (foodData) {
        for (const entry of foodData) {
            const day = result.find(d => d.date === entry.date);
            if (day) day.calories += entry.calories;
        }
    }

    // Fetch water entries
    const { data: waterData } = await supabase
        .from("water_entries")
        .select("date, amount_ml")
        .eq("user_id", userId)
        .gte("date", startDate)
        .lte("date", endDate);

    if (waterData) {
        for (const entry of waterData) {
            const day = result.find(d => d.date === entry.date);
            if (day) day.water += entry.amount_ml;
        }
    }

    return result;
}

// Get dates with activity for streak calendar (last 84 days / 12 weeks)
export async function getActivityDays(userId: string): Promise<Record<string, number>> {
    const activity: Record<string, number> = {};
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 83);
    const startStr = startDate.toISOString().split("T")[0];
    const endStr = today.toISOString().split("T")[0];

    // Food entries
    const { data: foodData } = await supabase
        .from("food_entries")
        .select("date")
        .eq("user_id", userId)
        .gte("date", startStr)
        .lte("date", endStr);

    if (foodData) {
        for (const entry of foodData) {
            activity[entry.date] = (activity[entry.date] || 0) + 1;
        }
    }

    // Water entries
    const { data: waterData } = await supabase
        .from("water_entries")
        .select("date")
        .eq("user_id", userId)
        .gte("date", startStr)
        .lte("date", endStr);

    if (waterData) {
        for (const entry of waterData) {
            activity[entry.date] = (activity[entry.date] || 0) + 1;
        }
    }

    return activity;
}
