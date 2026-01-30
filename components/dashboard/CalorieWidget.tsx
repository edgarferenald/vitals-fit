"use client";

import GlassCard from "../ui/GlassCard";
import { Flame } from "lucide-react";
import ProgressBar from "../ui/ProgressBar";

interface CalorieWidgetProps {
    calories?: number;
}

export default function CalorieWidget({ calories = 0 }: CalorieWidgetProps) {
    // Hardcoded goal for MVP, could be dynamic later
    const goal = 2500;
    const percentage = Math.min((calories / goal) * 100, 100);

    return (
        <GlassCard className="flex-1 flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 lg:gap-3 text-neon-pink">
                    <Flame className="w-6 h-6 lg:w-8 lg:h-8 animate-bounce" /> {/* Animate bounce for fire effect */}
                    <h3 className="text-lg lg:text-xl font-bold uppercase tracking-wider">Калории</h3>
                </div>
                <span className="text-2xl lg:text-3xl font-orbitron">{calories} ккал</span>
            </div>

            <div className="relative pt-2">
                <ProgressBar progress={percentage} color="pink" />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Потреблено</span>
                    <span>Цель: {goal}</span>
                </div>
            </div>
        </GlassCard>
    );
}
