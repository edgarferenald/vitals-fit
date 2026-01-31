"use client";

import { useState } from "react";
import GlassCard from "../ui/GlassCard";
import NeonButton from "../ui/NeonButton";
import { Droplets, Plus } from "lucide-react";
import ProgressBar from "../ui/ProgressBar";

export default function WaterWidget() {
    const [waterAmount, setWaterAmount] = useState(0);
    const goal = 2000;

    const addWater = () => {
        setWaterAmount((prev) => prev + 150);
    };

    const percentage = Math.min((waterAmount / goal) * 100, 100);

    return (
        <GlassCard className="flex-1 flex flex-col gap-1.5 sm:gap-3 p-3 sm:p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 sm:gap-2 text-neon-blue">
                    <Droplets className="w-4 h-4 sm:w-6 sm:h-6 animate-pulse" />
                    <h3 className="text-sm sm:text-lg font-bold uppercase tracking-wider">Вода</h3>
                </div>
                <span className="text-lg sm:text-2xl font-orbitron">{waterAmount}<span className="text-xs sm:text-sm ml-0.5">мл</span></span>
            </div>

            <div className="relative">
                <ProgressBar progress={percentage} color="blue" />
                <div className="text-right text-[10px] sm:text-xs text-gray-400 mt-0.5">Цель: {goal}мл</div>
            </div>

            <NeonButton
                onClick={addWater}
                fullWidth
                className="flex items-center justify-center gap-1 text-xs sm:text-sm py-1.5 sm:py-2"
            >
                <Plus className="w-3 h-3 sm:w-4 sm:h-4" /> +150мл
            </NeonButton>
        </GlassCard>
    );
}
