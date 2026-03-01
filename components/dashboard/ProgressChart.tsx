"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useLocale } from "@/lib/LocaleContext";
import { getProgressData, DayData } from "@/lib/progressService";
import GlassCard from "../ui/GlassCard";
import { BarChart3 } from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

export default function ProgressChart() {
    const { user, profile } = useAuth();
    const { t } = useLocale();
    const [data, setData] = useState<DayData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            loadData();
        } else {
            setLoading(false);
        }
    }, [user]);

    const loadData = async () => {
        if (!user) return;
        const progress = await getProgressData(user.id, 7);
        setData(progress);
        setLoading(false);
    };

    const formatDate = (dateStr: string) => {
        const d = new Date(dateStr);
        return d.toLocaleDateString("ru", { weekday: "short" }).toUpperCase();
    };

    const calGoal = profile?.calorie_goal || 2500;
    const waterGoal = profile?.water_goal_ml || 2000;

    if (!user || loading) {
        return (
            <GlassCard className="p-4 sm:p-6">
                <div className="flex items-center gap-2 text-neon-green mb-3">
                    <BarChart3 className="w-5 h-5" />
                    <h3 className="text-sm sm:text-lg font-bold uppercase tracking-wider">{t("progress.title")}</h3>
                </div>
                <div className="h-[180px] flex items-center justify-center">
                    {loading ? (
                        <div className="animate-spin w-6 h-6 border-2 border-neon-green border-t-transparent rounded-full" />
                    ) : (
                        <p className="text-xs text-gray-500">{t("progress.loginToView")}</p>
                    )}
                </div>
            </GlassCard>
        );
    }

    return (
        <GlassCard className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-neon-green">
                    <BarChart3 className="w-5 h-5" />
                    <h3 className="text-sm sm:text-lg font-bold uppercase tracking-wider">{t("progress.title")}</h3>
                </div>
                <span className="text-[10px] sm:text-xs text-gray-500">{t("progress.last7days")}</span>
            </div>

            <div className="h-[180px] sm:h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="gradCalories" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#FF003C" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#FF003C" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="gradWater" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#00F0FF" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis
                            dataKey="date"
                            tickFormatter={formatDate}
                            tick={{ fill: "#6b7280", fontSize: 10 }}
                            axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                            tickLine={false}
                        />
                        <YAxis
                            tick={{ fill: "#6b7280", fontSize: 10 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip
                            contentStyle={{
                                background: "rgba(0,0,0,0.9)",
                                border: "1px solid rgba(0,255,148,0.3)",
                                borderRadius: "12px",
                                fontSize: "12px",
                                color: "#fff",
                            }}
                            labelFormatter={(label) => {
                                const d = new Date(label);
                                return d.toLocaleDateString("ru", { day: "numeric", month: "short" });
                            }}
                            formatter={((value: number | undefined, name: string | undefined) => {
                                const v = value ?? 0;
                                const n = name ?? "";
                                if (n === "calories") return [`${v} ${t("calories.kcal")}`, t("calories.title")];
                                return [`${v} ${t("water.ml")}`, t("water.title")];
                            }) as any}
                        />
                        <Area
                            type="monotone"
                            dataKey="calories"
                            stroke="#FF003C"
                            strokeWidth={2}
                            fill="url(#gradCalories)"
                            dot={{ fill: "#FF003C", strokeWidth: 0, r: 3 }}
                            activeDot={{ r: 5, stroke: "#FF003C", strokeWidth: 2, fill: "#000" }}
                        />
                        <Area
                            type="monotone"
                            dataKey="water"
                            stroke="#00F0FF"
                            strokeWidth={2}
                            fill="url(#gradWater)"
                            dot={{ fill: "#00F0FF", strokeWidth: 0, r: 3 }}
                            activeDot={{ r: 5, stroke: "#00F0FF", strokeWidth: 2, fill: "#000" }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-2 text-[10px] sm:text-xs">
                <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-neon-pink" />
                    <span className="text-gray-400">{t("calories.title")}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-neon-blue" />
                    <span className="text-gray-400">{t("water.title")}</span>
                </div>
            </div>
        </GlassCard>
    );
}
