"use client";

import { useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import {
    calculate,
    UserParams,
    Gender,
    ActivityLevel,
    Goal,
    CalculationResult,
    activityLabels,
    goalLabels
} from "@/lib/calculatorService";
import { Calculator as CalcIcon, Droplets, Flame, Dumbbell, Apple } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Calculator() {
    const [params, setParams] = useState<UserParams>({
        gender: "male",
        age: 30,
        weight: 70,
        height: 175,
        activityLevel: "moderate",
        goal: "maintain"
    });
    const [result, setResult] = useState<CalculationResult | null>(null);
    const [showResult, setShowResult] = useState(false);

    const handleCalculate = () => {
        const calcResult = calculate(params);
        setResult(calcResult);
        setShowResult(true);
    };

    const updateParam = <K extends keyof UserParams>(key: K, value: UserParams[K]) => {
        setParams(prev => ({ ...prev, [key]: value }));
        setShowResult(false);
    };

    return (
        <div className="space-y-4">
            <GlassCard className="p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-neon-pink/10 rounded-lg">
                        <CalcIcon className="w-6 h-6 text-neon-pink" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-white">Калькулятор норм</h2>
                        <p className="text-xs text-gray-400">Узнай свои персональные показатели</p>
                    </div>
                </div>

                {/* Form Grid */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {/* Gender */}
                    <div className="col-span-2">
                        <label className="block text-xs text-gray-400 mb-2">Пол</label>
                        <div className="flex gap-2">
                            <button
                                onClick={() => updateParam("gender", "male")}
                                className={`flex-1 py-2 rounded-lg border transition-all ${params.gender === "male"
                                    ? "bg-neon-blue/20 border-neon-blue text-neon-blue"
                                    : "border-gray-700 text-gray-400 hover:border-gray-500"
                                    }`}
                            >
                                Мужской
                            </button>
                            <button
                                onClick={() => updateParam("gender", "female")}
                                className={`flex-1 py-2 rounded-lg border transition-all ${params.gender === "female"
                                    ? "bg-neon-pink/20 border-neon-pink text-neon-pink"
                                    : "border-gray-700 text-gray-400 hover:border-gray-500"
                                    }`}
                            >
                                Женский
                            </button>
                        </div>
                    </div>

                    {/* Age */}
                    <div>
                        <label className="block text-xs text-gray-400 mb-2">Возраст</label>
                        <input
                            type="number"
                            value={params.age}
                            onChange={(e) => updateParam("age", parseInt(e.target.value) || 0)}
                            className="w-full px-3 py-2 rounded-lg bg-black/50 border border-gray-700 text-white focus:border-neon-green focus:outline-none"
                            min={10}
                            max={100}
                        />
                    </div>

                    {/* Weight */}
                    <div>
                        <label className="block text-xs text-gray-400 mb-2">Вес (кг)</label>
                        <input
                            type="number"
                            value={params.weight}
                            onChange={(e) => updateParam("weight", parseInt(e.target.value) || 0)}
                            className="w-full px-3 py-2 rounded-lg bg-black/50 border border-gray-700 text-white focus:border-neon-green focus:outline-none"
                            min={30}
                            max={300}
                        />
                    </div>

                    {/* Height */}
                    <div className="col-span-2">
                        <label className="block text-xs text-gray-400 mb-2">Рост (см)</label>
                        <input
                            type="number"
                            value={params.height}
                            onChange={(e) => updateParam("height", parseInt(e.target.value) || 0)}
                            className="w-full px-3 py-2 rounded-lg bg-black/50 border border-gray-700 text-white focus:border-neon-green focus:outline-none"
                            min={100}
                            max={250}
                        />
                    </div>

                    {/* Activity Level */}
                    <div className="col-span-2">
                        <label className="block text-xs text-gray-400 mb-2">Уровень активности</label>
                        <select
                            value={params.activityLevel}
                            onChange={(e) => updateParam("activityLevel", e.target.value as ActivityLevel)}
                            className="w-full px-3 py-2 rounded-lg bg-black/50 border border-gray-700 text-white focus:border-neon-green focus:outline-none"
                        >
                            {Object.entries(activityLabels).map(([value, label]) => (
                                <option key={value} value={value}>{label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Goal */}
                    <div className="col-span-2">
                        <label className="block text-xs text-gray-400 mb-2">Цель</label>
                        <div className="flex gap-2">
                            {(Object.entries(goalLabels) as [Goal, string][]).map(([value, label]) => (
                                <button
                                    key={value}
                                    onClick={() => updateParam("goal", value)}
                                    className={`flex-1 py-2 rounded-lg border transition-all text-sm ${params.goal === value
                                        ? "bg-neon-green/20 border-neon-green text-neon-green"
                                        : "border-gray-700 text-gray-400 hover:border-gray-500"
                                        }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Calculate Button */}
                <button
                    onClick={handleCalculate}
                    className="w-full mt-6 py-3 rounded-xl bg-neon-green text-black font-bold uppercase tracking-wider hover:bg-neon-green/80 transition-all shadow-[0_0_20px_rgba(0,255,148,0.3)]"
                >
                    Рассчитать
                </button>
            </GlassCard>

            {/* Results */}
            <AnimatePresence>
                {showResult && result && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <GlassCard className="p-4 sm:p-6 border-neon-green/30">
                            <h3 className="text-lg font-bold text-white mb-4">Твои нормы</h3>

                            <div className="grid grid-cols-2 gap-3">
                                {/* Calories */}
                                <div className="col-span-2 p-4 rounded-xl bg-gradient-to-r from-neon-pink/10 to-transparent border border-neon-pink/30">
                                    <div className="flex items-center gap-3">
                                        <Flame className="w-8 h-8 text-neon-pink" />
                                        <div>
                                            <p className="text-xs text-gray-400">Калории в день</p>
                                            <p className="text-2xl font-bold font-orbitron text-white">
                                                {result.targetCalories} <span className="text-sm text-gray-400">ккал</span>
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">
                                        BMR: {result.bmr} • TDEE: {result.tdee}
                                    </p>
                                </div>

                                {/* Water */}
                                <div className="p-4 rounded-xl bg-gradient-to-r from-neon-blue/10 to-transparent border border-neon-blue/30">
                                    <Droplets className="w-6 h-6 text-neon-blue mb-2" />
                                    <p className="text-xs text-gray-400">Вода</p>
                                    <p className="text-xl font-bold font-orbitron text-white">
                                        {result.water} <span className="text-xs text-gray-400">мл</span>
                                    </p>
                                </div>

                                {/* Protein */}
                                <div className="p-4 rounded-xl bg-gradient-to-r from-neon-green/10 to-transparent border border-neon-green/30">
                                    <Dumbbell className="w-6 h-6 text-neon-green mb-2" />
                                    <p className="text-xs text-gray-400">Белок</p>
                                    <p className="text-xl font-bold font-orbitron text-white">
                                        {result.protein} <span className="text-xs text-gray-400">г</span>
                                    </p>
                                </div>

                                {/* Carbs */}
                                <div className="p-4 rounded-xl bg-gradient-to-r from-yellow-500/10 to-transparent border border-yellow-500/30">
                                    <Apple className="w-6 h-6 text-yellow-500 mb-2" />
                                    <p className="text-xs text-gray-400">Углеводы</p>
                                    <p className="text-xl font-bold font-orbitron text-white">
                                        {result.carbs} <span className="text-xs text-gray-400">г</span>
                                    </p>
                                </div>

                                {/* Fat */}
                                <div className="p-4 rounded-xl bg-gradient-to-r from-orange-500/10 to-transparent border border-orange-500/30">
                                    <div className="w-6 h-6 text-orange-500 mb-2 font-bold text-lg">🥑</div>
                                    <p className="text-xs text-gray-400">Жиры</p>
                                    <p className="text-xl font-bold font-orbitron text-white">
                                        {result.fat} <span className="text-xs text-gray-400">г</span>
                                    </p>
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
