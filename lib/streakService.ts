import { supabase } from "./supabase";

interface Streak {
    id: string;
    user_id: string;
    start_date: string;
    end_date: string | null;
    is_active: boolean;
    days_count: number;
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

// Increment streak days (call on daily login)
export async function incrementStreak(userId: string): Promise<number> {
    const streak = await getActiveStreak(userId);

    if (!streak) {
        const newStreak = await startNewStreak(userId);
        return newStreak?.days_count ?? 0;
    }

    const today = new Date().toISOString().split("T")[0];
    const startDate = new Date(streak.start_date);
    const todayDate = new Date(today);

    // Calculate days since start
    const diffTime = Math.abs(todayDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    // Update streak
    await supabase
        .from("streaks")
        .update({ days_count: diffDays })
        .eq("id", streak.id);

    return diffDays;
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
