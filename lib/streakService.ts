import { supabase } from "./supabase";

interface Streak {
    id: string;
    user_id: string;
    start_date: string;
    end_date: string | null;
    is_active: boolean;
    days_count: number;
    last_check_date?: string;
}

// Get active streak for user
export async function getActiveStreak(userId: string): Promise<Streak | null> {
    const { data, error } = await supabase
        .from("streaks")
        .select("*")
        .eq("user_id", userId)
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

    if (error) {
        // No active streak is not an error
        if (error.code === "PGRST116") return null;
        console.error("Error fetching streak:", error);
        return null;
    }

    return data as Streak;
}

// Start a new streak (ends current if exists)
export async function startNewStreak(userId: string): Promise<Streak | null> {
    const today = new Date().toISOString().split("T")[0];

    // End current active streak
    await supabase
        .from("streaks")
        .update({ is_active: false, end_date: today })
        .eq("user_id", userId)
        .eq("is_active", true);

    // Create new streak
    const { data, error } = await supabase
        .from("streaks")
        .insert({
            user_id: userId,
            start_date: today,
            is_active: true,
            days_count: 1
        })
        .select()
        .single();

    if (error) {
        console.error("Error creating streak:", error);
        return null;
    }

    return data as Streak;
}

// Check and update streak on daily login
// Returns the current days count
export async function checkDailyStreak(userId: string): Promise<number> {
    const streak = await getActiveStreak(userId);

    // No active streak - return 0
    if (!streak) {
        return 0;
    }

    const today = new Date().toISOString().split("T")[0];
    const startDate = new Date(streak.start_date);
    const todayDate = new Date(today);

    // Calculate total days since start (inclusive)
    const diffTime = todayDate.getTime() - startDate.getTime();
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

    // Only update if days changed
    if (totalDays !== streak.days_count) {
        await supabase
            .from("streaks")
            .update({ days_count: totalDays })
            .eq("id", streak.id);
    }

    return totalDays;
}

// Get all streaks for history
export async function getStreakHistory(userId: string): Promise<Streak[]> {
    const { data, error } = await supabase
        .from("streaks")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching streak history:", error);
        return [];
    }

    return data as Streak[];
}

// Delete a streak
export async function deleteStreak(streakId: string): Promise<boolean> {
    const { error } = await supabase
        .from("streaks")
        .delete()
        .eq("id", streakId);

    if (error) {
        console.error("Error deleting streak:", error);
        return false;
    }

    return true;
}
