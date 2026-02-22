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
} from "@/lib/calculatorService";
import { useLocale } from "@/lib/LocaleContext";
import { Calculator as CalcIcon, Droplets, Flame, Dumbbell, Apple } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Calculator() {
    const { t } = useLocale();
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

    const activityOptions: { value: ActivityLevel; labelKey: string }[] = [
        { value: "sedentary", labelKey: "activity.sedentary" },
        { value: "light", labelKey: "activity.light" },
        { value: "moderate", labelKey: "activity.moderate" },
        { value: "active", labelKey: "activity.active" },
        { value: "very_active", labelKey: "activity.very_active" },
    ];

    const goalOptions: { value: Goal; labelKey: string }[] = [
        { value: "lose", labelKey: "goal.lose" },
        { value: "maintain", labelKey: "goal.maintain" },
        { value: "gain", labelKey: "goal.gain" },
    ];

    return (
        <div className="space-y-4">
            <GlassCard className="p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-neon-pink/10 rounded-lg">
                        <CalcIcon className="w-6 h-6 text-neon-pink" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-white">{t("calc.title")}</h2>
                        <p className="text-xs text-gray-400">{t("calc.subtitle")}</p>
                    </div>
                </div>

                {/* Form Grid */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {/* Gender */}
                    <div className="col-span-2">
                        <label className="block text-xs text-gray-400 mb-2">{t("calc.gender")}</label>
                        <div className="flex gap-2">
                            <button
                                onClick={() => updateParam("gender", "male")}
                                className={`flex-1 py-2 rounded-lg border transition-all ${params.gender === "male"
                                    ? "bg-neon-blue/20 border-neon-blue text-neon-blue"
                                    : "border-gray-700 text-gray-400 hover:border-gray-500"
                                    }`}
                            >
                                {t("calc.male")}
                            </button>
                            <button
                                onClick={() => updateParam("gender", "female")}
                                className={`flex-1 py-2 rounded-lg border transition-all ${params.gender === "female"
                                    ? "bg-neon-pink/20 border-neon-pink text-neon-pink"
                                    : "border-gray-700 text-gray-400 hover:border-gray-500"
                                    }`}
                            >
                                {t("calc.female")}
                            </button>
                        </div>
                    </div>

                    {/* Age */}
                    <div>
                        <label className="block text-xs text-gray-400 mb-2">{t("calc.age")}</label>
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
                        <label className="block text-xs text-gray-400 mb-2">{t("calc.weight")}</label>
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
                        <label className="block text-xs text-gray-400 mb-2">{t("calc.height")}</label>
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
                        <label className="block text-xs text-gray-400 mb-2">{t("calc.activityLevel")}</label>
                        <select
                            value={params.activityLevel}
                            onChange={(e) => updateParam("activityLevel", e.target.value as ActivityLevel)}
                            className="w-full px-3 py-2 rounded-lg bg-black/50 border border-gray-700 text-white focus:border-neon-green focus:outline-none"
                        >
                            {activityOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>{t(opt.labelKey)}</option>
                            ))}
                        </select>
                    </div>

                    {/* Goal */}
                    <div className="col-span-2">
                        <label className="block text-xs text-gray-400 mb-2">{t("calc.goal")}</label>
                        <div className="flex gap-2">
                            {goalOptions.map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => updateParam("goal", opt.value)}
                                    className={`flex-1 py-2 rounded-lg border transition-all text-sm ${params.goal === opt.value
                                        ? "bg-neon-green/20 border-neon-green text-neon-green"
                                        : "border-gray-700 text-gray-400 hover:border-gray-500"
                                        }`}
                                >
                                    {t(opt.labelKey)}
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
                    {t("calc.calculate")}
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
                            <h3 className="text-lg font-bold text-white mb-4">{t("calc.yourNorms")}</h3>

                            <div className="grid grid-cols-2 gap-3">
                                {/* Calories */}
                                <div className="col-span-2 p-4 rounded-xl bg-gradient-to-r from-neon-pink/10 to-transparent border border-neon-pink/30">
                                    <div className="flex items-center gap-3">
                                        <Flame className="w-8 h-8 text-neon-pink" />
                                        <div>
                                            <p className="text-xs text-gray-400">{t("calc.caloriesPerDay")}</p>
                                            <p className="text-2xl font-bold font-orbitron text-white">
                                                {result.targetCalories} <span className="text-sm text-gray-400">{t("calories.kcal")}</span>
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
                                    <p className="text-xs text-gray-400">{t("calc.water")}</p>
                                    <p className="text-xl font-bold font-orbitron text-white">
                                        {result.water} <span className="text-xs text-gray-400">{t("water.ml")}</span>
                                    </p>
                                </div>

                                {/* Protein */}
                                <div className="p-4 rounded-xl bg-gradient-to-r from-neon-green/10 to-transparent border border-neon-green/30">
                                    <Dumbbell className="w-6 h-6 text-neon-green mb-2" />
                                    <p className="text-xs text-gray-400">{t("calc.protein")}</p>
                                    <p className="text-xl font-bold font-orbitron text-white">
                                        {result.protein} <span className="text-xs text-gray-400">g</span>
                                    </p>
                                </div>

                                {/* Carbs */}
                                <div className="p-4 rounded-xl bg-gradient-to-r from-yellow-500/10 to-transparent border border-yellow-500/30">
                                    <Apple className="w-6 h-6 text-yellow-500 mb-2" />
                                    <p className="text-xs text-gray-400">{t("calc.carbs")}</p>
                                    <p className="text-xl font-bold font-orbitron text-white">
                                        {result.carbs} <span className="text-xs text-gray-400">g</span>
                                    </p>
                                </div>

                                {/* Fat */}
                                <div className="p-4 rounded-xl bg-gradient-to-r from-orange-500/10 to-transparent border border-orange-500/30">
                                    <div className="w-6 h-6 text-orange-500 mb-2 font-bold text-lg">🥑</div>
                                    <p className="text-xs text-gray-400">{t("calc.fat")}</p>
                                    <p className="text-xl font-bold font-orbitron text-white">
                                        {result.fat} <span className="text-xs text-gray-400">g</span>
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
