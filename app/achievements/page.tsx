"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useLocale } from "@/lib/LocaleContext";
import { calculateBadges, Badge } from "@/lib/achievementsService";
import Header from "@/components/ui/Header";
import GlassCard from "@/components/ui/GlassCard";
import AuthForm from "@/components/auth/AuthForm";
import PageTransition from "@/components/ui/PageTransition";
import { Trophy } from "lucide-react";
import { motion } from "framer-motion";

export default function AchievementsPage() {
    const { user, loading: authLoading } = useAuth();
    const { t } = useLocale();
    const [badges, setBadges] = useState<Badge[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) loadBadges();
        else setLoading(false);
    }, [user]);

    const loadBadges = async () => {
        if (!user) return;
        const data = await calculateBadges(user.id);
        setBadges(data);
        setLoading(false);
    };

    const unlockedCount = badges.filter(b => b.unlocked).length;

    if (authLoading) {
        return (
            <div className="flex flex-col gap-3 p-3 sm:p-6 min-h-screen">
                <Header />
                <div className="flex-1 flex items-center justify-center">
                    <div className="animate-spin w-8 h-8 border-2 border-neon-green border-t-transparent rounded-full" />
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex flex-col gap-3 p-3 sm:p-6 min-h-screen">
                <Header />
                <div className="flex-1 flex items-center justify-center">
                    <AuthForm />
                </div>
            </div>
        );
    }

    return (
        <PageTransition className="flex flex-col gap-3 p-3 sm:p-6 min-h-screen">
            <Header />

            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white">{t("achievements.title")}</h2>
                <div className="flex items-center gap-1.5 text-neon-yellow">
                    <Trophy className="w-4 h-4" />
                    <span className="text-sm font-bold font-orbitron">{unlockedCount}/{badges.length}</span>
                </div>
            </div>

            {loading ? (
                <div className="flex-1 flex items-center justify-center">
                    <div className="animate-spin w-8 h-8 border-2 border-neon-green border-t-transparent rounded-full" />
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {badges.map((badge, index) => (
                        <motion.div
                            key={badge.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05, duration: 0.3 }}
                        >
                            <GlassCard
                                className={`p-4 flex flex-col items-center text-center gap-2 relative overflow-hidden transition-all ${badge.unlocked
                                        ? "border-neon-green/40 shadow-[0_0_15px_rgba(0,255,148,0.15)]"
                                        : "opacity-50 grayscale"
                                    }`}
                            >
                                {badge.unlocked && (
                                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-neon-green to-transparent" />
                                )}

                                <span className="text-3xl sm:text-4xl">{badge.icon}</span>
                                <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">{t(badge.titleKey)}</h4>
                                <p className="text-[9px] sm:text-[10px] text-gray-400 leading-tight">{t(badge.descKey)}</p>

                                {/* Progress bar */}
                                <div className="w-full mt-1">
                                    <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-500 ${badge.unlocked ? "bg-neon-green" : "bg-neon-green/30"
                                                }`}
                                            style={{ width: `${badge.progress}%` }}
                                        />
                                    </div>
                                    <span className="text-[8px] text-gray-500 mt-0.5 block">{Math.round(badge.progress)}%</span>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            )}
        </PageTransition>
    );
}
