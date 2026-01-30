"use client";

import GlassCard from "../ui/GlassCard";
import { Zap } from "lucide-react";

interface StreakWidgetProps {
    days?: number;
}

export default function StreakWidget({ days = 0 }: StreakWidgetProps) {
    return (
        <GlassCard className="flex items-center justify-between bg-gradient-to-r from-neon-green/5 to-transparent">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-neon-green/10 rounded-full border border-neon-green/30 shadow-[0_0_10px_rgba(0,255,148,0.2)]">
                    <Zap className="w-6 h-6 text-neon-green fill-neon-green" />
                </div>
                <div className="flex flex-col">
                    <span className="text-sm text-gray-400 uppercase tracking-widest font-bold">Серия</span>
                    <span className="text-xs text-gray-500">Так держать!</span>
                </div>
            </div>

            <div className="text-4xl font-black font-orbitron text-white text-glow">
                {days} <span className="text-sm font-normal text-gray-400">Дней</span>
            </div>
        </GlassCard>
    );
}
