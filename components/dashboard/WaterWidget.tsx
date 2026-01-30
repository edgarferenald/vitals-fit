"use client";

import { useState } from "react";
import GlassCard from "../ui/GlassCard";
import NeonButton from "../ui/NeonButton";
import { Droplets, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProgressBar from "../ui/ProgressBar";

export default function WaterWidget() {
    const [waterAmount, setWaterAmount] = useState(0);
    const goal = 2000; // 2000ml goal

    const addWater = () => {
        // In real implementation, this would save to Supabase
        setWaterAmount((prev) => prev + 150);
    };

    const percentage = Math.min((waterAmount / goal) * 100, 100);

    return (
        <GlassCard className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-neon-blue">
                    <Droplets className="w-6 h-6 animate-pulse" />
                    <h3 className="text-lg font-bold uppercase tracking-wider">Вода</h3>
                </div>
                <span className="text-2xl font-orbitron">{waterAmount} ml</span>
            </div>

            {/* Progress Bar */}
            <div className="relative pt-2">
                <ProgressBar progress={percentage} color="blue" />
                <div className="text-right text-xs text-gray-400 mt-1">Цель: {goal}мл</div>
            </div>

            {/* Controls */}
            <div className="mt-2">
                <NeonButton
                    onClick={addWater}
                    fullWidth
                    className="flex items-center justify-center gap-2"
                >
                    <Plus className="w-4 h-4" /> Добавить 150мл
                </NeonButton>
            </div>

            {/* Floating +150ml Animation (Conceptual) */}
            {/* We could add an AnimatePresence here for floating text when button is clicked */}
        </GlassCard>
    );
}
