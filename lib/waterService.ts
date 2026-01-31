import { supabase } from "./supabase";

// Get today's water total for a user
export async function getTodayWater(userId: string): Promise<number> {
    const today = new Date().toISOString().split("T")[0];

    const { data, error } = await supabase
        .from("water_entries")
        .select("amount_ml")
        .eq("user_id", userId)
        .eq("date", today);

    if (error) {
        console.error("Error fetching water:", error);
        return 0;
    }

    return data?.reduce((sum, entry) => sum + entry.amount_ml, 0) ?? 0;
}

// Add water entry
export async function addWater(userId: string, amount: number): Promise<boolean> {
    const today = new Date().toISOString().split("T")[0];

    const { error } = await supabase
        .from("water_entries")
        .insert({
            user_id: userId,
            date: today,
            amount_ml: amount
        });

    if (error) {
        console.error("Error adding water:", error);
        return false;
    }

    return true;
}

// Remove water (add negative entry)
export async function removeWater(userId: string, amount: number): Promise<boolean> {
    return addWater(userId, -Math.abs(amount));
}

// Update user's water goal
export async function updateWaterGoal(userId: string, goal: number): Promise<boolean> {
    const { error } = await supabase
        .from("users")
        .update({ water_goal_ml: goal })
        .eq("id", userId);

    if (error) {
        console.error("Error updating water goal:", error);
        return false;
    }

    return true;
}
