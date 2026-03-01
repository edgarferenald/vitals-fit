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
import { Droplets, Flame, LogOut, Edit2, Check, Download, FileText, User, Calculator, X } from "lucide-react";
import { updateWaterGoal } from "@/lib/waterService";
import { updateCalorieGoal } from "@/lib/foodService";
import { getStreakHistory, deleteStreak } from "@/lib/streakService";
import { exportToCSV, exportToPDF } from "@/lib/exportService";
import { Trash2 } from "lucide-react";

const ACTIVITY_OPTIONS = ["sedentary", "light", "moderate", "active", "very_active"];
const GOAL_OPTIONS = ["lose", "maintain", "gain"];

function calculateNorms(gender: string, age: number, weight: number, height: number, activity: string, goal: string) {
    // Mifflin-St Jeor
    let bmr = 10 * weight + 6.25 * height - 5 * age;
    bmr += gender === "male" ? 5 : -161;

    const activityMultipliers: Record<string, number> = {
        sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, very_active: 1.9,
    };
    const tdee = bmr * (activityMultipliers[activity] || 1.55);

    const goalMultipliers: Record<string, number> = { lose: 0.85, maintain: 1, gain: 1.15 };
    const calories = Math.round(tdee * (goalMultipliers[goal] || 1));

    const protein = Math.round(weight * (goal === "gain" ? 2.2 : goal === "lose" ? 2.0 : 1.8));
    const fat = Math.round((calories * 0.25) / 9);
    const carbs = Math.round((calories - protein * 4 - fat * 9) / 4);
    const water = Math.round(weight * 30);

    const bmi = +(weight / ((height / 100) ** 2)).toFixed(1);
    const idealWeight = gender === "male"
        ? Math.round(50 + 0.91 * (height - 152.4))
        : Math.round(45.5 + 0.91 * (height - 152.4));

    return { calories, protein, fat, carbs, water, bmi, idealWeight };
}

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

    // Body params editing
    const [isEditingBody, setIsEditingBody] = useState(false);
    const [bodyGender, setBodyGender] = useState(profile?.gender || "male");
    const [bodyAge, setBodyAge] = useState(profile?.age || 25);
    const [bodyWeight, setBodyWeight] = useState(profile?.weight_kg || 70);
    const [bodyHeight, setBodyHeight] = useState(profile?.height_cm || 175);
    const [bodyActivity, setBodyActivity] = useState(profile?.activity_level || "moderate");
    const [bodyGoal, setBodyGoal] = useState(profile?.goal || "maintain");
    const [savingBody, setSavingBody] = useState(false);

    // Norms modal
    const [showNorms, setShowNorms] = useState(false);

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

    const handleStartEditBody = () => {
        setBodyGender(profile?.gender || "male");
        setBodyAge(profile?.age || 25);
        setBodyWeight(profile?.weight_kg || 70);
        setBodyHeight(profile?.height_cm || 175);
        setBodyActivity(profile?.activity_level || "moderate");
        setBodyGoal(profile?.goal || "maintain");
        setIsEditingBody(true);
    };

    const handleSaveBody = async () => {
        if (!user) return;
        setSavingBody(true);
        await updateProfile({
            gender: bodyGender,
            age: bodyAge,
            weight_kg: bodyWeight,
            height_cm: bodyHeight,
            activity_level: bodyActivity,
            goal: bodyGoal,
        });
        setSavingBody(false);
        setIsEditingBody(false);
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
            <div className="flex flex-col gap-3 p-4 sm:p-6 min-h-screen">
                <Header />
                <div className="flex-1 flex items-center justify-center">
                    <AuthForm />
                </div>
            </div>
        );
    }

    const norms = profile?.gender && profile?.age && profile?.weight_kg && profile?.height_cm
        ? calculateNorms(
            profile.gender,
            profile.age,
            profile.weight_kg,
            profile.height_cm,
            profile.activity_level || "moderate",
            profile.goal || "maintain"
        )
        : null;

    return (
        <PageTransition className="flex flex-col gap-4 p-4 sm:p-6 min-h-screen">
            <Header />

            {/* Profile Card */}
            <GlassCard className="flex items-center gap-4 p-5">
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

            {/* Body Parameters Section */}
            <h2 className="text-sm text-gray-400 uppercase tracking-wider mt-2">{t("settings.bodyParams")}</h2>

            {isEditingBody ? (
                <GlassCard className="p-5 space-y-4">
                    {/* Gender */}
                    <div>
                        <label className="block text-xs text-gray-400 mb-1.5">{t("calc.gender")}</label>
                        <div className="grid grid-cols-2 gap-2">
                            {["male", "female"].map((g) => (
                                <button
                                    key={g}
                                    onClick={() => setBodyGender(g)}
                                    className={`py-2 rounded-lg text-sm font-bold transition-all ${bodyGender === g
                                            ? "bg-neon-green/20 text-neon-green border border-neon-green/40"
                                            : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
                                        }`}
                                >
                                    {t(`calc.${g}`)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Age, Weight, Height */}
                    <div className="grid grid-cols-3 gap-3">
                        <div>
                            <label className="block text-xs text-gray-400 mb-1.5">{t("calc.age")}</label>
                            <input
                                type="number"
                                value={bodyAge}
                                onChange={(e) => setBodyAge(Number(e.target.value))}
                                className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white text-center focus:outline-none focus:border-neon-green"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-400 mb-1.5">{t("calc.weight")}</label>
                            <input
                                type="number"
                                value={bodyWeight}
                                onChange={(e) => setBodyWeight(Number(e.target.value))}
                                className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white text-center focus:outline-none focus:border-neon-green"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-400 mb-1.5">{t("calc.height")}</label>
                            <input
                                type="number"
                                value={bodyHeight}
                                onChange={(e) => setBodyHeight(Number(e.target.value))}
                                className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white text-center focus:outline-none focus:border-neon-green"
                            />
                        </div>
                    </div>

                    {/* Activity Level */}
                    <div>
                        <label className="block text-xs text-gray-400 mb-1.5">{t("calc.activityLevel")}</label>
                        <div className="space-y-1.5">
                            {ACTIVITY_OPTIONS.map((a) => (
                                <button
                                    key={a}
                                    onClick={() => setBodyActivity(a)}
                                    className={`w-full py-2 px-3 rounded-lg text-sm text-left transition-all ${bodyActivity === a
                                            ? "bg-neon-green/20 text-neon-green border border-neon-green/40"
                                            : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
                                        }`}
                                >
                                    {t(`activity.${a}`)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Goal */}
                    <div>
                        <label className="block text-xs text-gray-400 mb-1.5">{t("calc.goal")}</label>
                        <div className="grid grid-cols-3 gap-2">
                            {GOAL_OPTIONS.map((g) => (
                                <button
                                    key={g}
                                    onClick={() => setBodyGoal(g)}
                                    className={`py-2 rounded-lg text-sm font-bold transition-all ${bodyGoal === g
                                            ? "bg-neon-green/20 text-neon-green border border-neon-green/40"
                                            : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
                                        }`}
                                >
                                    {t(`goal.${g}`)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Save / Cancel */}
                    <div className="flex gap-3 pt-2">
                        <button
                            onClick={() => setIsEditingBody(false)}
                            className="flex-1 py-2.5 rounded-lg border border-gray-600 text-gray-400 hover:bg-gray-800 transition-colors"
                        >
                            {t("streak.cancel")}
                        </button>
                        <button
                            onClick={handleSaveBody}
                            disabled={savingBody}
                            className="flex-1 py-2.5 rounded-lg bg-neon-green text-black font-bold hover:bg-neon-green/80 transition-colors disabled:opacity-50"
                        >
                            {savingBody ? "..." : t("settings.save")}
                        </button>
                    </div>
                </GlassCard>
            ) : (
                <GlassCard
                    onClick={handleStartEditBody}
                    className="p-5 cursor-pointer hover:border-neon-green/30 transition-colors"
                >
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <User className="w-5 h-5 text-neon-green" />
                            <span className="font-bold text-white text-sm">{t("settings.bodyParams")}</span>
                        </div>
                        <Edit2 className="w-4 h-4 text-gray-500" />
                    </div>
                    {profile?.gender ? (
                        <div className="grid grid-cols-3 gap-3 text-center">
                            <div>
                                <div className="text-xs text-gray-500">{t("calc.gender")}</div>
                                <div className="text-sm text-white font-medium">{t(`calc.${profile.gender}`)}</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500">{t("calc.age")}</div>
                                <div className="text-sm text-white font-medium">{profile.age}</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500">{t("calc.weight")}</div>
                                <div className="text-sm text-white font-medium">{profile.weight_kg} {t("calc.kg")}</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500">{t("calc.height")}</div>
                                <div className="text-sm text-white font-medium">{profile.height_cm} см</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500">{t("calc.activityLevel")}</div>
                                <div className="text-sm text-white font-medium">{t(`activity.${profile.activity_level}`)}</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500">{t("calc.goal")}</div>
                                <div className="text-sm text-white font-medium">{t(`goal.${profile.goal}`)}</div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500">{t("calc.subtitle")}</p>
                    )}
                </GlassCard>
            )}

            {/* View Norms Button */}
            {norms && (
                <GlassCard
                    onClick={() => setShowNorms(true)}
                    className="flex items-center gap-4 p-5 cursor-pointer hover:border-neon-blue/50 transition-colors"
                >
                    <div className="p-2.5 bg-neon-blue/10 rounded-xl border border-neon-blue/30">
                        <Calculator className="w-5 h-5 text-neon-blue" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-white">{t("settings.viewNorms")}</h3>
                        <p className="text-xs text-gray-400">{t("calc.subtitle")}</p>
                    </div>
                    <div className="text-neon-blue text-xl font-light">→</div>
                </GlassCard>
            )}

            {/* Goals Section */}
            <h2 className="text-sm text-gray-400 uppercase tracking-wider mt-2">{t("settings.goals")}</h2>

            <GlassCard
                onClick={() => setShowWaterGoal(true)}
                className="flex items-center gap-4 p-5 hover:border-neon-blue/50 transition-colors cursor-pointer"
            >
                <Droplets className="w-6 h-6 text-neon-blue" />
                <div className="flex-1 text-left">
                    <h3 className="font-bold text-white">{t("settings.water")}</h3>
                    <p className="text-sm text-gray-400">{t("settings.dailyGoal")}</p>
                </div>
                <span className="text-lg font-orbitron text-neon-blue">{profile?.water_goal_ml || 2000} {t("water.ml")}</span>
            </GlassCard>

            <GlassCard
                onClick={() => setShowCalorieGoal(true)}
                className="flex items-center gap-4 p-5 hover:border-neon-pink/50 transition-colors cursor-pointer"
            >
                <Flame className="w-6 h-6 text-neon-pink" />
                <div className="flex-1 text-left">
                    <h3 className="font-bold text-white">{t("settings.calories")}</h3>
                    <p className="text-sm text-gray-400">{t("settings.dailyGoal")}</p>
                </div>
                <span className="text-lg font-orbitron text-neon-pink">{profile?.calorie_goal || 2500} {t("calories.kcal")}</span>
            </GlassCard>

            {/* Export Section */}
            <h2 className="text-sm text-gray-400 uppercase tracking-wider mt-2">{t("settings.export")}</h2>

            <div className="grid grid-cols-2 gap-3">
                <GlassCard
                    onClick={exporting ? undefined : handleExportCSV}
                    className={`flex items-center gap-3 p-4 hover:border-neon-green/50 transition-colors ${exporting ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                >
                    <Download className="w-5 h-5 text-neon-green" />
                    <div className="text-left">
                        <h3 className="text-sm font-bold text-white">CSV</h3>
                        <p className="text-[10px] text-gray-400">{t("settings.exportFood")}</p>
                    </div>
                    {exporting === "csv" && <div className="animate-spin w-4 h-4 border-2 border-neon-green border-t-transparent rounded-full ml-auto" />}
                </GlassCard>

                <GlassCard
                    onClick={exporting ? undefined : handleExportPDF}
                    className={`flex items-center gap-3 p-4 hover:border-neon-pink/50 transition-colors ${exporting ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                >
                    <FileText className="w-5 h-5 text-neon-pink" />
                    <div className="text-left">
                        <h3 className="text-sm font-bold text-white">PDF</h3>
                        <p className="text-[10px] text-gray-400">{t("settings.exportFood")}</p>
                    </div>
                    {exporting === "pdf" && <div className="animate-spin w-4 h-4 border-2 border-neon-pink border-t-transparent rounded-full ml-auto" />}
                </GlassCard>
            </div>

            {/* Streak History */}
            <h2 className="text-sm text-gray-400 uppercase tracking-wider mt-2">{t("settings.streaks")}</h2>

            <GlassCard
                onClick={loadStreakHistory}
                className="flex items-center gap-4 p-5 hover:border-neon-green/50 transition-colors cursor-pointer"
            >
                <div className="flex-1 text-left">
                    <h3 className="font-bold text-white">{t("settings.streakHistory")}</h3>
                    <p className="text-sm text-gray-400">{t("settings.manageStreaks")}</p>
                </div>
            </GlassCard>

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

            {/* Norms Modal */}
            {showNorms && norms && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    onClick={() => setShowNorms(false)}
                >
                    <div
                        className="w-full max-w-md rounded-2xl bg-black/95 border border-neon-blue/30 p-6 space-y-5"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-neon-blue">
                                <Calculator className="w-5 h-5" />
                                <h3 className="text-lg font-bold">{t("settings.normsTitle")}</h3>
                            </div>
                            <button
                                onClick={() => setShowNorms(false)}
                                className="p-1 text-gray-500 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-neon-pink/10 border border-neon-pink/20 rounded-xl p-4 text-center">
                                <div className="text-xs text-gray-400 mb-1">{t("calc.caloriesPerDay")}</div>
                                <div className="text-2xl font-orbitron text-neon-pink font-bold">{norms.calories}</div>
                                <div className="text-[10px] text-gray-500">{t("calories.kcal")} {t("settings.perDay")}</div>
                            </div>
                            <div className="bg-neon-blue/10 border border-neon-blue/20 rounded-xl p-4 text-center">
                                <div className="text-xs text-gray-400 mb-1">{t("calc.water")}</div>
                                <div className="text-2xl font-orbitron text-neon-blue font-bold">{norms.water}</div>
                                <div className="text-[10px] text-gray-500">{t("water.ml")} {t("settings.perDay")}</div>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                                <div className="text-xs text-gray-400 mb-1">{t("calc.protein")}</div>
                                <div className="text-xl font-orbitron text-white font-bold">{norms.protein}g</div>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                                <div className="text-xs text-gray-400 mb-1">{t("calc.carbs")}</div>
                                <div className="text-xl font-orbitron text-white font-bold">{norms.carbs}g</div>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                                <div className="text-xs text-gray-400 mb-1">{t("calc.fat")}</div>
                                <div className="text-xl font-orbitron text-white font-bold">{norms.fat}g</div>
                            </div>
                            <div className="bg-neon-green/10 border border-neon-green/20 rounded-xl p-4 text-center">
                                <div className="text-xs text-gray-400 mb-1">{t("calc.bmi")}</div>
                                <div className="text-xl font-orbitron text-neon-green font-bold">{norms.bmi}</div>
                            </div>
                        </div>

                        <div className="bg-neon-green/5 border border-neon-green/20 rounded-xl p-4 text-center">
                            <div className="text-xs text-gray-400 mb-1">{t("calc.idealWeight")}</div>
                            <div className="text-2xl font-orbitron text-neon-green font-bold">{norms.idealWeight} {t("calc.kg")}</div>
                        </div>
                    </div>
                </div>
            )}
        </PageTransition>
    );
}
