"use client";

import GlassCard from "../ui/GlassCard";
import { Zap } from "lucide-react";

interface StreakWidgetProps {
    days?: number;
}

export default function StreakWidget({ days = 0 }: StreakWidgetProps) {
    return (
        <GlassCard className="h-full flex flex-row items-center justify-between bg-gradient-to-r from-neon-green/5 to-transparent py-3 px-4 sm:py-4 sm:px-6">
            <div className="flex items-center gap-2 sm:gap-4">
                <div className="p-1.5 sm:p-3 bg-neon-green/10 rounded-full border border-neon-green/30 shadow-[0_0_10px_rgba(0,255,148,0.2)]">
                    <Zap className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-neon-green fill-neon-green" />
                </div>
                <div className="flex flex-col">
                    <span className="text-xs sm:text-sm lg:text-lg text-gray-400 uppercase tracking-widest font-bold">Серия</span>
                    <span className="text-[10px] sm:text-xs lg:text-sm text-gray-500">Так держать!</span>
                </div>
            </div>

            <div className="text-2xl sm:text-4xl lg:text-5xl font-black font-orbitron text-white text-glow">
                {days} <span className="text-xs sm:text-sm lg:text-lg font-normal text-gray-400">Дней</span>
            </div>
        </GlassCard>
    );
}
