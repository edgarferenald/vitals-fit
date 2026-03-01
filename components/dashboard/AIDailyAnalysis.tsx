"use client";

import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useLocale } from "@/lib/LocaleContext";
import { getTodayCalories, getFoodByDate } from "@/lib/foodService";
import { getTodayWater } from "@/lib/waterService";
import GlassCard from "../ui/GlassCard";
import { BrainCircuit, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";

export default function AIDailyAnalysis() {
    const { user, profile } = useAuth();
    const { t } = useLocale();
    const [analysis, setAnalysis] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    if (!user) return null;

    const handleAnalyze = async () => {
        setLoading(true);
        setShowModal(true);
        setAnalysis("");

        try {
            const today = new Date().toISOString().split("T")[0];
            const [calories, water, foods] = await Promise.all([
                getTodayCalories(user.id),
                getTodayWater(user.id),
                getFoodByDate(user.id, today),
            ]);

            const foodList = foods.map(f => `${f.food_name}: ${f.calories} kcal (P: ${f.protein}g, F: ${f.fat}g, C: ${f.carbs}g)`).join("\n");

            const response = await fetch("/api/ai-daily", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    calories,
                    water,
                    calorieGoal: profile?.calorie_goal || 2500,
                    waterGoal: profile?.water_goal_ml || 2000,
                    foodList,
                    language: t("ai.language"),
                }),
            });

            const data = await response.json();
            setAnalysis(data.analysis || t("ai.noData"));
        } catch (error) {
            console.error("AI analysis error:", error);
            setAnalysis(t("ai.error"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button onClick={handleAnalyze} className="w-full group">
                <GlassCard className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:border-neon-blue/50 transition-all group-hover:shadow-[0_0_20px_rgba(0,240,255,0.15)]">
                    <div className="p-2 sm:p-3 bg-neon-blue/10 rounded-xl border border-neon-blue/30 group-hover:bg-neon-blue/20 transition-colors">
                        <BrainCircuit className="w-5 h-5 sm:w-6 sm:h-6 text-neon-blue" />
                    </div>
                    <div className="flex-1 text-left">
                        <h3 className="text-sm sm:text-base font-bold text-white">{t("ai.dailyTitle")}</h3>
                        <p className="text-[10px] sm:text-xs text-gray-400">{t("ai.dailyDesc")}</p>
                    </div>
                    <div className="text-neon-blue text-xl sm:text-2xl font-light">→</div>
                </GlassCard>
            </button>

            {/* Analysis Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => !loading && setShowModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl bg-black/95 border border-neon-blue/30 p-5 sm:p-6"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2 text-neon-blue">
                                    <BrainCircuit className="w-5 h-5" />
                                    <h3 className="text-lg font-bold">{t("ai.dailyTitle")}</h3>
                                </div>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="p-1 text-gray-500 hover:text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {loading ? (
                                <div className="flex flex-col items-center gap-3 py-10">
                                    <Loader2 className="w-8 h-8 text-neon-blue animate-spin" />
                                    <p className="text-sm text-gray-400">{t("ai.analyzing")}</p>
                                </div>
                            ) : (
                                <div className="prose prose-invert prose-sm max-w-none text-gray-300 [&_h1]:text-neon-green [&_h2]:text-neon-blue [&_h3]:text-neon-blue [&_strong]:text-white [&_li]:text-gray-300">
                                    <ReactMarkdown>{analysis}</ReactMarkdown>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
