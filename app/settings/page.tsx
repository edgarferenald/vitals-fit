"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useLocale } from "@/lib/LocaleContext";
import AuthForm from "@/components/auth/AuthForm";
import GlassCard from "@/components/ui/GlassCard";
import GoalModal from "@/components/ui/GoalModal";
import Header from "@/components/ui/Header";
import PageTransition from "@/components/ui/PageTransition";
import { Droplets, Flame, LogOut, Edit2, Check, Download, FileText } from "lucide-react";
import { updateWaterGoal } from "@/lib/waterService";
import { updateCalorieGoal } from "@/lib/foodService";
import { getStreakHistory, deleteStreak } from "@/lib/streakService";
import { exportToCSV, exportToPDF } from "@/lib/exportService";
import { Trash2 } from "lucide-react";

export default function SettingsPage() {
    const { user, profile, signOut, refreshProfile, updateProfile } = useAuth();
    const { t } = useLocale();
    const [showWaterGoal, setShowWaterGoal] = useState(false);
    const [showCalorieGoal, setShowCalorieGoal] = useState(false);
    const [streakHistory, setStreakHistory] = useState<any[]>([]);
    const [showStreaks, setShowStreaks] = useState(false);
    const [isEditingName, setIsEditingName] = useState(false);
    const [newName, setNewName] = useState("");
    const [exporting, setExporting] = useState<string | null>(null);

    const handleWaterGoalSave = async (goal: number) => {
        if (!user) return;
        await updateWaterGoal(user.id, goal);
        await refreshProfile();
    };

    const handleCalorieGoalSave = async (goal: number) => {
        if (!user) return;
        await updateCalorieGoal(user.id, goal);
        await refreshProfile();
    };

    const loadStreakHistory = async () => {
        if (!user) return;
        const history = await getStreakHistory(user.id);
        setStreakHistory(history);
        setShowStreaks(true);
    };

    const handleDeleteStreak = async (id: string) => {
        await deleteStreak(id);
        loadStreakHistory();
    };

    const handleEditName = () => {
        setNewName(profile?.display_name || "");
        setIsEditingName(true);
    };

    const handleSaveName = async () => {
        if (!user) return;
        await updateProfile({ display_name: newName.trim() || null });
        setIsEditingName(false);
    };

    const handleExportCSV = async () => {
        if (!user) return;
        setExporting("csv");
        try { await exportToCSV(user.id); } finally { setExporting(null); }
    };

    const handleExportPDF = async () => {
        if (!user) return;
        setExporting("pdf");
        try { await exportToPDF(user.id); } finally { setExporting(null); }
    };

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

            {/* Profile Card */}
            <GlassCard className="flex items-center gap-4 p-4">
                <div className="w-16 h-16 rounded-full bg-neon-green/10 border-2 border-neon-green/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl text-neon-green font-bold">
                        {(profile?.display_name || user.email || "?").charAt(0).toUpperCase()}
                    </span>
                </div>
                <div className="flex-1">
                    {isEditingName ? (
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                placeholder={t("settings.enterName")}
                                className="flex-1 px-3 py-1 rounded-lg bg-black/50 border border-neon-green/30 text-white focus:outline-none focus:border-neon-green"
                                autoFocus
                            />
                            <button
                                onClick={handleSaveName}
                                className="p-2 text-neon-green hover:bg-neon-green/10 rounded-lg transition-colors"
                            >
                                <Check className="w-5 h-5" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <h2 className="font-bold text-white">{profile?.display_name || t("settings.user")}</h2>
                            <button
                                onClick={handleEditName}
                                className="p-1 text-gray-500 hover:text-neon-green transition-colors"
                            >
                                <Edit2 className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                    <p className="text-sm text-gray-400">{user.email}</p>
                </div>
            </GlassCard>

            {/* Goals Section */}
            <h2 className="text-sm text-gray-400 uppercase tracking-wider mt-2">{t("settings.goals")}</h2>

            <button onClick={() => setShowWaterGoal(true)}>
                <GlassCard className="flex items-center gap-4 p-4 hover:border-neon-blue/50 transition-colors">
                    <Droplets className="w-6 h-6 text-neon-blue" />
                    <div className="flex-1 text-left">
                        <h3 className="font-bold text-white">{t("settings.water")}</h3>
                        <p className="text-sm text-gray-400">{t("settings.dailyGoal")}</p>
                    </div>
                    <span className="text-lg font-orbitron text-neon-blue">{profile?.water_goal_ml || 2000} {t("water.ml")}</span>
                </GlassCard>
            </button>

            <button onClick={() => setShowCalorieGoal(true)}>
                <GlassCard className="flex items-center gap-4 p-4 hover:border-neon-pink/50 transition-colors">
                    <Flame className="w-6 h-6 text-neon-pink" />
                    <div className="flex-1 text-left">
                        <h3 className="font-bold text-white">{t("settings.calories")}</h3>
                        <p className="text-sm text-gray-400">{t("settings.dailyGoal")}</p>
                    </div>
                    <span className="text-lg font-orbitron text-neon-pink">{profile?.calorie_goal || 2500} {t("calories.kcal")}</span>
                </GlassCard>
            </button>

            {/* Export Section */}
            <h2 className="text-sm text-gray-400 uppercase tracking-wider mt-2">{t("settings.export")}</h2>

            <div className="grid grid-cols-2 gap-3">
                <button onClick={handleExportCSV} disabled={!!exporting}>
                    <GlassCard className="flex items-center gap-3 p-4 hover:border-neon-green/50 transition-colors">
                        <Download className="w-5 h-5 text-neon-green" />
                        <div className="text-left">
                            <h3 className="text-sm font-bold text-white">CSV</h3>
                            <p className="text-[10px] text-gray-400">{t("settings.exportFood")}</p>
                        </div>
                        {exporting === "csv" && <div className="animate-spin w-4 h-4 border-2 border-neon-green border-t-transparent rounded-full ml-auto" />}
                    </GlassCard>
                </button>
                <button onClick={handleExportPDF} disabled={!!exporting}>
                    <GlassCard className="flex items-center gap-3 p-4 hover:border-neon-pink/50 transition-colors">
                        <FileText className="w-5 h-5 text-neon-pink" />
                        <div className="text-left">
                            <h3 className="text-sm font-bold text-white">PDF</h3>
                            <p className="text-[10px] text-gray-400">{t("settings.exportFood")}</p>
                        </div>
                        {exporting === "pdf" && <div className="animate-spin w-4 h-4 border-2 border-neon-pink border-t-transparent rounded-full ml-auto" />}
                    </GlassCard>
                </button>
            </div>

            {/* Streak History */}
            <h2 className="text-sm text-gray-400 uppercase tracking-wider mt-2">{t("settings.streaks")}</h2>

            <button onClick={loadStreakHistory}>
                <GlassCard className="flex items-center gap-4 p-4 hover:border-neon-green/50 transition-colors">
                    <div className="flex-1 text-left">
                        <h3 className="font-bold text-white">{t("settings.streakHistory")}</h3>
                        <p className="text-sm text-gray-400">{t("settings.manageStreaks")}</p>
                    </div>
                </GlassCard>
            </button>

            {showStreaks && (
                <div className="space-y-2">
                    {streakHistory.map((streak) => (
                        <GlassCard key={streak.id} className="flex items-center gap-4 p-3">
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${streak.is_active ? 'bg-neon-green' : 'bg-gray-500'}`} />
                                    <span className="font-bold text-white">{streak.days_count} {t("settings.days")}</span>
                                </div>
                                <p className="text-xs text-gray-400">
                                    {streak.start_date} — {streak.end_date || t("settings.active")}
                                </p>
                            </div>
                            {!streak.is_active && (
                                <button
                                    onClick={() => handleDeleteStreak(streak.id)}
                                    className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            )}
                        </GlassCard>
                    ))}
                </div>
            )}

            {/* Logout */}
            <button
                onClick={signOut}
                className="mt-4 py-3 rounded-lg border border-red-500/30 text-red-400 flex items-center justify-center gap-2 hover:bg-red-500/10 transition-colors"
            >
                <LogOut className="w-5 h-5" />
                {t("settings.logout")}
            </button>

            {/* Modals */}
            <GoalModal
                isOpen={showWaterGoal}
                onClose={() => setShowWaterGoal(false)}
                title={t("water.goalTitle")}
                currentValue={profile?.water_goal_ml || 2000}
                unit={t("water.goalUnit")}
                onSave={handleWaterGoalSave}
                presets={[1500, 2000, 2500, 3000]}
            />

            <GoalModal
                isOpen={showCalorieGoal}
                onClose={() => setShowCalorieGoal(false)}
                title={t("calories.goalTitle")}
                currentValue={profile?.calorie_goal || 2500}
                unit={t("calories.goalUnit")}
                onSave={handleCalorieGoalSave}
                presets={[1500, 2000, 2500, 3000]}
            />
        </PageTransition>
    );
}
