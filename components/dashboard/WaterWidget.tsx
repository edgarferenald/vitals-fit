"use client";

import { useState, useEffect } from "react";
import GlassCard from "../ui/GlassCard";
import NeonButton from "../ui/NeonButton";
import GoalModal from "../ui/GoalModal";
import { Droplets, Plus, Minus, Settings } from "lucide-react";
import ProgressBar from "../ui/ProgressBar";
import { useAuth } from "@/lib/AuthContext";
import { getTodayWater, addWater, removeWater, updateWaterGoal } from "@/lib/waterService";

export default function WaterWidget() {
    const { user, profile, refreshProfile } = useAuth();
    const [waterAmount, setWaterAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [showGoalModal, setShowGoalModal] = useState(false);

    const goal = profile?.water_goal_ml ?? 2000;

    useEffect(() => {
        if (user) {
            loadWater();
        }
    }, [user]);

    const loadWater = async () => {
        if (!user) return;
        const water = await getTodayWater(user.id);
        setWaterAmount(water);
    };

    const handleAddWater = async () => {
        if (!user || loading) return;
        setLoading(true);
        const success = await addWater(user.id, 150);
        if (success) {
            setWaterAmount(prev => prev + 150);
        }
        setLoading(false);
    };

    const handleRemoveWater = async () => {
        if (!user || loading || waterAmount < 150) return;
        setLoading(true);
        const success = await removeWater(user.id, 150);
        if (success) {
            setWaterAmount(prev => Math.max(0, prev - 150));
        }
        setLoading(false);
    };

    const handleSaveGoal = async (newGoal: number) => {
        if (!user) return;
        await updateWaterGoal(user.id, newGoal);
        await refreshProfile();
    };

    const percentage = Math.min((waterAmount / goal) * 100, 100);

    // Demo mode if not logged in
    if (!user) {
        return (
            <GlassCard className="flex-1 flex flex-col gap-1.5 sm:gap-3 p-3 sm:p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 sm:gap-2 text-neon-blue">
                        <Droplets className="w-4 h-4 sm:w-6 sm:h-6 animate-pulse" />
                        <h3 className="text-sm sm:text-lg font-bold uppercase tracking-wider">Вода</h3>
                    </div>
                    <span className="text-lg sm:text-2xl font-orbitron">0<span className="text-xs sm:text-sm ml-0.5">мл</span></span>
                </div>
                <ProgressBar progress={0} color="blue" />
                <p className="text-center text-xs text-gray-400">Войдите для отслеживания</p>
            </GlassCard>
        );
    }

    return (
        <>
            <GlassCard className="flex-1 flex flex-col gap-1.5 sm:gap-3 p-3 sm:p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 sm:gap-2 text-neon-blue">
                        <Droplets className="w-4 h-4 sm:w-6 sm:h-6 animate-pulse" />
                        <h3 className="text-sm sm:text-lg font-bold uppercase tracking-wider">Вода</h3>
                    </div>
                    <button
                        onClick={() => setShowGoalModal(true)}
                        className="flex items-center gap-1 text-lg sm:text-2xl font-orbitron hover:text-neon-blue transition-colors"
                    >
                        {waterAmount}<span className="text-xs sm:text-sm ml-0.5">мл</span>
                        <Settings className="w-3 h-3 text-gray-500" />
                    </button>
                </div>

                <div className="relative">
                    <ProgressBar progress={percentage} color="blue" />
                    <div className="text-right text-[10px] sm:text-xs text-gray-400 mt-0.5">Цель: {goal}мл</div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={handleRemoveWater}
                        disabled={loading || waterAmount < 150}
                        className="flex-1 flex items-center justify-center py-1.5 sm:py-2 rounded-lg border border-yellow-500/50 bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                    <NeonButton
                        onClick={handleAddWater}
                        disabled={loading}
                        className="flex-[2] flex items-center justify-center gap-1 text-xs sm:text-sm py-1.5 sm:py-2"
                    >
                        <Plus className="w-3 h-3 sm:w-4 sm:h-4" /> 150мл
                    </NeonButton>
                </div>
            </GlassCard>

            <GoalModal
                isOpen={showGoalModal}
                onClose={() => setShowGoalModal(false)}
                title="Цель воды"
                currentValue={goal}
                unit="миллилитров в день"
                onSave={handleSaveGoal}
                presets={[1500, 2000, 2500, 3000]}
            />
        </>
    );
}
