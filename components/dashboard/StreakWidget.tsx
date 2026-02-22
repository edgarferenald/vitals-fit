"use client";

import { useState, useEffect } from "react";
import GlassCard from "../ui/GlassCard";
import { Zap, RefreshCw } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { useLocale } from "@/lib/LocaleContext";
import { checkDailyStreak, startNewStreak } from "@/lib/streakService";
import { motion, AnimatePresence } from "framer-motion";

export default function StreakWidget() {
    const { user } = useAuth();
    const { t } = useLocale();
    const [days, setDays] = useState(0);
    const [loading, setLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        if (user) {
            loadAndUpdateStreak();
        }
    }, [user]);

    const loadAndUpdateStreak = async () => {
        if (!user) return;
        const currentDays = await checkDailyStreak(user.id);
        setDays(currentDays);
    };

    const handleNewStreak = async () => {
        if (!user || loading) return;
        setLoading(true);
        const newStreak = await startNewStreak(user.id);
        if (newStreak) {
            setDays(newStreak.days_count);
        }
        setShowConfirm(false);
        setLoading(false);
    };

    // Demo mode if not logged in
    if (!user) {
        return (
            <GlassCard className="h-full flex flex-row items-center justify-between bg-gradient-to-r from-neon-green/5 to-transparent py-3 px-4 sm:py-4 sm:px-6">
                <div className="flex items-center gap-2 sm:gap-4">
                    <div className="p-1.5 sm:p-3 bg-neon-green/10 rounded-full border border-neon-green/30">
                        <Zap className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-neon-green fill-neon-green" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs sm:text-sm lg:text-lg text-gray-400 uppercase tracking-widest font-bold">{t("streak.title")}</span>
                        <span className="text-[10px] sm:text-xs lg:text-sm text-gray-500">{t("streak.login")}</span>
                    </div>
                </div>
                <div className="text-2xl sm:text-4xl lg:text-5xl font-black font-orbitron text-white text-glow">
                    0 <span className="text-xs sm:text-sm lg:text-lg font-normal text-gray-400">{t("streak.days")}</span>
                </div>
            </GlassCard>
        );
    }

    // No active streak - show prominent "Start" button
    if (days === 0) {
        return (
            <GlassCard className="h-full flex flex-row items-center justify-between bg-gradient-to-r from-neon-green/5 to-transparent py-3 px-4 sm:py-4 sm:px-6">
                <div className="flex items-center gap-2 sm:gap-4">
                    <div className="p-1.5 sm:p-3 bg-neon-green/10 rounded-full border border-neon-green/30">
                        <Zap className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-neon-green fill-neon-green" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs sm:text-sm lg:text-lg text-gray-400 uppercase tracking-widest font-bold">{t("streak.title")}</span>
                        <span className="text-[10px] sm:text-xs lg:text-sm text-gray-500">{t("streak.noActive")}</span>
                    </div>
                </div>
                <button
                    onClick={handleNewStreak}
                    disabled={loading}
                    className="px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-neon-green text-black font-bold text-sm sm:text-base uppercase tracking-wider hover:bg-neon-green/80 transition-all shadow-[0_0_20px_rgba(0,255,148,0.4)] hover:shadow-[0_0_30px_rgba(0,255,148,0.6)] disabled:opacity-50"
                >
                    {loading ? "..." : t("streak.start")}
                </button>
            </GlassCard>
        );
    }

    return (
        <>
            <GlassCard className="h-full flex flex-row items-center justify-between bg-gradient-to-r from-neon-green/5 to-transparent py-3 px-4 sm:py-4 sm:px-6">
                <div className="flex items-center gap-2 sm:gap-4">
                    <button
                        onClick={() => setShowConfirm(true)}
                        className="p-1.5 sm:p-3 bg-neon-green/10 rounded-full border border-neon-green/30 shadow-[0_0_10px_rgba(0,255,148,0.2)] hover:bg-neon-green/20 transition-colors group"
                        title={t("streak.newStreak")}
                    >
                        <Zap className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-neon-green fill-neon-green group-hover:hidden" />
                        <RefreshCw className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-neon-green hidden group-hover:block" />
                    </button>
                    <div className="flex flex-col">
                        <span className="text-xs sm:text-sm lg:text-lg text-gray-400 uppercase tracking-widest font-bold">{t("streak.title")}</span>
                        <span className="text-[10px] sm:text-xs lg:text-sm text-neon-green">{t("streak.keepGoing")}</span>
                    </div>
                </div>

                <div className="text-2xl sm:text-4xl lg:text-5xl font-black font-orbitron text-white text-glow">
                    {days} <span className="text-xs sm:text-sm lg:text-lg font-normal text-gray-400">{t("streak.days")}</span>
                </div>
            </GlassCard>

            {/* Confirmation Modal */}
            <AnimatePresence>
                {showConfirm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                        onClick={() => setShowConfirm(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="w-full max-w-sm p-6 rounded-2xl bg-black/90 border border-neon-green/30"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-xl font-bold text-white mb-2">{t("streak.newStreak")}</h3>
                            <p className="text-gray-400 mb-4">
                                {t("streak.newStreakDesc", { days })}
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowConfirm(false)}
                                    className="flex-1 py-2 rounded-lg border border-gray-600 text-gray-400 hover:bg-gray-800 transition-colors"
                                >
                                    {t("streak.cancel")}
                                </button>
                                <button
                                    onClick={handleNewStreak}
                                    disabled={loading}
                                    className="flex-1 py-2 rounded-lg bg-neon-green text-black font-bold hover:bg-neon-green/80 transition-colors disabled:opacity-50"
                                >
                                    {loading ? "..." : t("streak.start")}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
