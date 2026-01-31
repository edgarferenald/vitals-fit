"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import { getFoodHistory, deleteFoodEntry, FoodEntry } from "@/lib/foodService";
import GlassCard from "@/components/ui/GlassCard";
import TopNav from "@/components/ui/TopNav";
import { Trash2, Utensils } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function HistoryPage() {
    const { user, profile } = useAuth();
    const [entries, setEntries] = useState<FoodEntry[]>([]);
    const [loading, setLoading] = useState(true);

    const avatarText = profile?.display_name
        ? profile.display_name.charAt(0).toUpperCase()
        : user?.email?.charAt(0).toUpperCase() || "U";

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

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const today = new Date().toISOString().split("T")[0];
        const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

        if (dateStr === today) return "Сегодня";
        if (dateStr === yesterday) return "Вчера";

        return date.toLocaleDateString("ru-RU", {
            weekday: "short",
            day: "numeric",
            month: "short"
        });
    };

    return (
        <div className="flex flex-col gap-3 p-3 sm:p-6 min-h-screen">
            {/* Header with Navigation */}
            <header className="flex items-center justify-between gap-2">
                <div className="flex-shrink-0">
                    <h1 className="text-lg sm:text-2xl font-bold text-white tracking-widest">
                        VITALS<span className="text-neon-green text-[8px] sm:text-xs ml-0.5 align-top">v1</span>
                    </h1>
                </div>
                <TopNav />
                <Link href="/settings" className="flex-shrink-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-neon-green via-neon-blue to-neon-pink p-[1.5px]">
                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-[10px] sm:text-xs font-bold text-white">
                            {avatarText}
                        </div>
                    </div>
                </Link>
            </header>

            <h2 className="text-lg font-bold text-white">История еды</h2>

            {!user ? (
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-gray-400">Войдите для просмотра истории</p>
                </div>
            ) : loading ? (
                <div className="flex-1 flex items-center justify-center">
                    <div className="animate-spin w-8 h-8 border-2 border-neon-green border-t-transparent rounded-full" />
                </div>
            ) : entries.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-4">
                    <Utensils className="w-16 h-16 text-gray-600" />
                    <p className="text-gray-400 text-center">
                        История пуста<br />
                        <span className="text-sm">Отсканируйте еду, чтобы начать</span>
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
                                                        <span className="text-neon-pink">{entry.calories} ккал</span>
                                                        <span>Б: {entry.protein}г</span>
                                                        <span>Ж: {entry.fat}г</span>
                                                        <span>У: {entry.carbs}г</span>
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
