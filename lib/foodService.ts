import { supabase } from "./supabase";

export interface FoodEntry {
    id: string;
    user_id: string;
    date: string;
    food_name: string;
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
    recipe_suggestion: string | null;
    created_at: string;
}

// Get today's calories
export async function getTodayCalories(userId: string): Promise<number> {
    const today = new Date().toISOString().split("T")[0];

    const { data, error } = await supabase
        .from("food_entries")
        .select("calories")
        .eq("user_id", userId)
        .eq("date", today);

    if (error) {
        console.error("Error fetching calories:", error);
        return 0;
    }

    return data?.reduce((sum, entry) => sum + entry.calories, 0) ?? 0;
}

// Add food entry
export async function addFoodEntry(
    userId: string,
    food: {
        food_name: string;
        calories: number;
        protein: number;
        fat: number;
        carbs: number;
        recipe_suggestion?: string;
    }
): Promise<FoodEntry | null> {
    const today = new Date().toISOString().split("T")[0];

    const { data, error } = await supabase
        .from("food_entries")
        .insert({
            user_id: userId,
            date: today,
            ...food
        })
        .select()
        .single();

    if (error) {
        console.error("Error adding food entry:", error);
        return null;
    }

    return data as FoodEntry;
}

// Get food history (all entries)
export async function getFoodHistory(userId: string, limit = 50): Promise<FoodEntry[]> {
    const { data, error } = await supabase
        .from("food_entries")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(limit);

    if (error) {
        console.error("Error fetching food history:", error);
        return [];
    }

    return data as FoodEntry[];
}

// Get food entries for a specific date
export async function getFoodByDate(userId: string, date: string): Promise<FoodEntry[]> {
    const { data, error } = await supabase
        .from("food_entries")
        .select("*")
        .eq("user_id", userId)
        .eq("date", date)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching food by date:", error);
        return [];
    }

    return data as FoodEntry[];
}

// Delete food entry
export async function deleteFoodEntry(entryId: string): Promise<boolean> {
    const { error } = await supabase
        .from("food_entries")
        .delete()
        .eq("id", entryId);

    if (error) {
        console.error("Error deleting food entry:", error);
        return false;
    }

    return true;
}

// Update calorie goal
export async function updateCalorieGoal(userId: string, goal: number): Promise<boolean> {
    const { error } = await supabase
        .from("users")
        .update({ calorie_goal: goal })
        .eq("id", userId);

    if (error) {
        console.error("Error updating calorie goal:", error);
        return false;
    }

    return true;
}
