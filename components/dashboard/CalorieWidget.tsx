"use client";

import GlassCard from "../ui/GlassCard";
import { Flame } from "lucide-react";
import ProgressBar from "../ui/ProgressBar";

interface CalorieWidgetProps {
    calories?: number;
}

export default function CalorieWidget({ calories = 0 }: CalorieWidgetProps) {
    const goal = 2500;
    const percentage = Math.min((calories / goal) * 100, 100);

    return (
        <GlassCard className="flex-1 flex flex-col gap-1.5 sm:gap-3 p-3 sm:p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 sm:gap-2 text-neon-pink">
                    <Flame className="w-4 h-4 sm:w-6 sm:h-6 animate-bounce" />
                    <h3 className="text-sm sm:text-lg font-bold uppercase tracking-wider">Калории</h3>
                </div>
                <span className="text-lg sm:text-2xl font-orbitron">{calories}<span className="text-xs sm:text-sm ml-0.5">ккал</span></span>
            </div>

            <div className="relative">
                <ProgressBar progress={percentage} color="pink" />
                <div className="flex justify-between text-[10px] sm:text-xs text-gray-400 mt-0.5">
                    <span>Потреблено</span>
                    <span>Цель: {goal}</span>
                </div>
            </div>
        </GlassCard>
    );
}
