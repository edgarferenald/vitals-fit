"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useLocale } from "@/lib/LocaleContext";
import { getFoodHistory, deleteFoodEntry, FoodEntry } from "@/lib/foodService";
import GlassCard from "@/components/ui/GlassCard";
import Header from "@/components/ui/Header";
import { Trash2, Utensils } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function HistoryPage() {
    const { user } = useAuth();
    const { t, locale } = useLocale();
    const [entries, setEntries] = useState<FoodEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            loadHistory();
        } else {
            setLoading(false);
        }
    }, [user]);

    const loadHistory = async () => {
        if (!user) return;
        const history = await getFoodHistory(user.id);
        setEntries(history);
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        const success = await deleteFoodEntry(id);
        if (success) {
            setEntries(prev => prev.filter(e => e.id !== id));
        }
    };

    // Group entries by date
    const groupedEntries = entries.reduce((groups, entry) => {
        const date = entry.date;
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(entry);
        return groups;
    }, {} as Record<string, FoodEntry[]>);

    const dateLocaleMap = { ru: "ru-RU", uk: "uk-UA", en: "en-US" } as const;

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const today = new Date().toISOString().split("T")[0];
        const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

        if (dateStr === today) return t("history.today");
        if (dateStr === yesterday) return t("history.yesterday");

        return date.toLocaleDateString(dateLocaleMap[locale], {
            weekday: "short",
            day: "numeric",
            month: "short"
        });
    };

    return (
        <div className="flex flex-col gap-3 p-3 sm:p-6 min-h-screen">
            <Header />

            <h2 className="text-lg font-bold text-white">{t("history.title")}</h2>

            {!user ? (
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-gray-400">{t("history.loginToView")}</p>
                </div>
            ) : loading ? (
                <div className="flex-1 flex items-center justify-center">
                    <div className="animate-spin w-8 h-8 border-2 border-neon-green border-t-transparent rounded-full" />
                </div>
            ) : entries.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-4">
                    <Utensils className="w-16 h-16 text-gray-600" />
                    <p className="text-gray-400 text-center">
                        {t("history.empty")}<br />
                        <span className="text-sm">{t("history.scanToStart")}</span>
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
                    {Object.entries(groupedEntries).map(([date, dayEntries]) => (
                        <div key={date}>
                            <h3 className="text-sm text-gray-400 uppercase tracking-wider mb-2">
                                {formatDate(date)}
                            </h3>
                            <div className="space-y-2">
                                <AnimatePresence>
                                    {dayEntries.map((entry) => (
                                        <motion.div
                                            key={entry.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                        >
                                            <GlassCard className="flex items-center gap-4 p-3">
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-white">{entry.food_name}</h4>
                                                    <div className="flex gap-3 text-xs text-gray-400 mt-1">
                                                        <span className="text-neon-pink">{entry.calories} {t("calories.kcal")}</span>
                                                        <span>{t("history.p")}: {entry.protein}g</span>
                                                        <span>{t("history.f")}: {entry.fat}g</span>
                                                        <span>{t("history.c")}: {entry.carbs}g</span>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleDelete(entry.id)}
                                                    className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </GlassCard>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
