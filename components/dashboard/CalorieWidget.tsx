"use client";

import { useState, useEffect } from "react";
import GlassCard from "../ui/GlassCard";
import GoalModal from "../ui/GoalModal";
import { Flame, Settings } from "lucide-react";
import ProgressBar from "../ui/ProgressBar";
import { useAuth } from "@/lib/AuthContext";
import { getTodayCalories, updateCalorieGoal } from "@/lib/foodService";

export default function CalorieWidget() {
    const { user, profile, refreshProfile } = useAuth();
    const [calories, setCalories] = useState(0);
    const [showGoalModal, setShowGoalModal] = useState(false);

    const goal = profile?.calorie_goal ?? 2500;

    useEffect(() => {
        if (user) {
            loadCalories();
        }
    }, [user]);

    const loadCalories = async () => {
        if (!user) return;
        const cals = await getTodayCalories(user.id);
        setCalories(cals);
    };

    const handleSaveGoal = async (newGoal: number) => {
        if (!user) return;
        await updateCalorieGoal(user.id, newGoal);
        await refreshProfile();
    };

    const percentage = Math.min((calories / goal) * 100, 100);

    // Demo mode if not logged in
    if (!user) {
        return (
            <GlassCard className="flex-1 flex flex-col gap-1.5 sm:gap-3 p-3 sm:p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 sm:gap-2 text-neon-pink">
                        <Flame className="w-4 h-4 sm:w-6 sm:h-6 animate-bounce" />
                        <h3 className="text-sm sm:text-lg font-bold uppercase tracking-wider">Калории</h3>
                    </div>
                    <span className="text-lg sm:text-2xl font-orbitron">0<span className="text-xs sm:text-sm ml-0.5">ккал</span></span>
                </div>
                <ProgressBar progress={0} color="pink" />
                <p className="text-center text-xs text-gray-400">Войдите для отслеживания</p>
            </GlassCard>
        );
    }

    return (
        <>
            <GlassCard className="flex-1 flex flex-col gap-1.5 sm:gap-3 p-3 sm:p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 sm:gap-2 text-neon-pink">
                        <Flame className="w-4 h-4 sm:w-6 sm:h-6 animate-bounce" />
                        <h3 className="text-sm sm:text-lg font-bold uppercase tracking-wider">Калории</h3>
                    </div>
                    <button
                        onClick={() => setShowGoalModal(true)}
                        className="flex items-center gap-1 text-lg sm:text-2xl font-orbitron hover:text-neon-pink transition-colors"
                    >
                        {calories}<span className="text-xs sm:text-sm ml-0.5">ккал</span>
                        <Settings className="w-3 h-3 text-gray-500" />
                    </button>
                </div>

                <div className="relative">
                    <ProgressBar progress={percentage} color="pink" />
                    <div className="flex justify-between text-[10px] sm:text-xs text-gray-400 mt-0.5">
                        <span>Потреблено</span>
                        <span>Цель: {goal}</span>
                    </div>
                </div>
            </GlassCard>

            <GoalModal
                isOpen={showGoalModal}
                onClose={() => setShowGoalModal(false)}
                title="Цель калорий"
                currentValue={goal}
                unit="килокалорий в день"
                onSave={handleSaveGoal}
                presets={[1500, 2000, 2500, 3000]}
            />
        </>
    );
}
