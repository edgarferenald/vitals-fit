"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useLocale } from "@/lib/LocaleContext";
import { getActivityDays } from "@/lib/progressService";
import GlassCard from "../ui/GlassCard";
import { CalendarDays } from "lucide-react";

export default function StreakCalendar() {
    const { user } = useAuth();
    const { t } = useLocale();
    const [activity, setActivity] = useState<Record<string, number>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) loadActivity();
        else setLoading(false);
    }, [user]);

    const loadActivity = async () => {
        if (!user) return;
        const data = await getActivityDays(user.id);
        setActivity(data);
        setLoading(false);
    };

    // Build 12 weeks (84 days) of data
    const today = new Date();
    const days: { date: string; dayOfWeek: number }[] = [];
    for (let i = 83; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        days.push({
            date: d.toISOString().split("T")[0],
            dayOfWeek: d.getDay(),
        });
    }

    // Group into columns (weeks)
    const weeks: typeof days[] = [];
    let currentWeek: typeof days = [];
    for (const day of days) {
        if (day.dayOfWeek === 1 && currentWeek.length > 0) {
            weeks.push(currentWeek);
            currentWeek = [];
        }
        currentWeek.push(day);
    }
    if (currentWeek.length > 0) weeks.push(currentWeek);

    const getColor = (count: number) => {
        if (count === 0) return "bg-white/5";
        if (count <= 2) return "bg-neon-green/20";
        if (count <= 5) return "bg-neon-green/40";
        if (count <= 10) return "bg-neon-green/60";
        return "bg-neon-green/80";
    };

    const todayStr = today.toISOString().split("T")[0];

    if (!user) return null;

    return (
        <GlassCard className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-neon-green">
                    <CalendarDays className="w-5 h-5" />
                    <h3 className="text-sm sm:text-lg font-bold uppercase tracking-wider">{t("calendar.title")}</h3>
                </div>
                <span className="text-[10px] sm:text-xs text-gray-500">{t("calendar.weeks12")}</span>
            </div>

            {loading ? (
                <div className="h-[100px] flex items-center justify-center">
                    <div className="animate-spin w-6 h-6 border-2 border-neon-green border-t-transparent rounded-full" />
                </div>
            ) : (
                <>
                    <div className="flex gap-[4px] sm:gap-[6px] lg:gap-2 overflow-x-auto pb-1">
                        {weeks.map((week, wi) => (
                            <div key={wi} className="flex flex-col gap-[4px] sm:gap-[6px] lg:gap-2">
                                {week.map((day) => {
                                    const count = activity[day.date] || 0;
                                    const isToday = day.date === todayStr;
                                    return (
                                        <div
                                            key={day.date}
                                            className={`w-[14px] h-[14px] sm:w-[20px] sm:h-[20px] lg:w-[24px] lg:h-[24px] rounded-[3px] sm:rounded-[4px] ${getColor(count)} ${isToday ? "ring-1 ring-neon-green" : ""
                                                } transition-colors`}
                                            title={`${day.date}: ${count} ${t("calendar.actions")}`}
                                        />
                                    );
                                })}
                            </div>
                        ))}
                    </div>

                    {/* Legend */}
                    <div className="flex items-center gap-2 mt-3 text-[10px] sm:text-xs text-gray-500">
                        <span>{t("calendar.less")}</span>
                        <div className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] lg:w-[20px] lg:h-[20px] rounded-[3px] bg-white/5" />
                        <div className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] lg:w-[20px] lg:h-[20px] rounded-[3px] bg-neon-green/20" />
                        <div className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] lg:w-[20px] lg:h-[20px] rounded-[3px] bg-neon-green/40" />
                        <div className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] lg:w-[20px] lg:h-[20px] rounded-[3px] bg-neon-green/60" />
                        <div className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] lg:w-[20px] lg:h-[20px] rounded-[3px] bg-neon-green/80" />
                        <span>{t("calendar.more")}</span>
                    </div>
                </>
            )}
        </GlassCard>
    );
}
