"use client";

import GlassCard from "../ui/GlassCard";
import { Zap } from "lucide-react";

interface StreakWidgetProps {
    days?: number;
}

export default function StreakWidget({ days = 0 }: StreakWidgetProps) {
    return (
        <GlassCard className="h-full flex flex-col lg:flex-row items-center justify-between bg-gradient-to-r from-neon-green/5 to-transparent lg:min-h-[300px]">
            <div className="flex items-center gap-3 lg:gap-4">
                <div className="p-2 lg:p-4 bg-neon-green/10 rounded-full border border-neon-green/30 shadow-[0_0_10px_rgba(0,255,148,0.2)]">
                    <Zap className="w-6 h-6 lg:w-10 lg:h-10 text-neon-green fill-neon-green" />
                </div>
                <div className="flex flex-col">
                    <span className="text-sm lg:text-lg text-gray-400 uppercase tracking-widest font-bold">Серия</span>
                    <span className="text-xs lg:text-sm text-gray-500">Так держать!</span>
                </div>
            </div>

            <div className="text-4xl lg:text-6xl font-black font-orbitron text-white text-glow mt-4 lg:mt-0">
                {days} <span className="text-sm lg:text-xl font-normal text-gray-400">Дней</span>
            </div>
        </GlassCard>
    );
}
