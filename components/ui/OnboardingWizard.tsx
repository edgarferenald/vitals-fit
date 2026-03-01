"use client";

import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useLocale } from "@/lib/LocaleContext";
import {
    calculate,
    Gender,
    ActivityLevel,
    Goal,
} from "@/lib/calculatorService";
import GlassCard from "../ui/GlassCard";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Sparkles } from "lucide-react";

interface OnboardingWizardProps {
    onComplete: () => void;
}

export default function OnboardingWizard({ onComplete }: OnboardingWizardProps) {
    const { user, updateProfile } = useAuth();
    const { t } = useLocale();
    const [step, setStep] = useState(0);

    const [gender, setGender] = useState<Gender>("male");
    const [age, setAge] = useState(25);
    const [weight, setWeight] = useState(70);
    const [height, setHeight] = useState(175);
    const [activityLevel, setActivityLevel] = useState<ActivityLevel>("moderate");
    const [goal, setGoal] = useState<Goal>("maintain");
    const [saving, setSaving] = useState(false);

    const steps = [
        "onboarding.stepGoal",
        "onboarding.stepBody",
        "onboarding.stepActivity",
        "onboarding.stepReady",
    ];

    const canProceed = () => {
        if (step === 1) return age > 0 && weight > 0 && height > 0;
        return true;
    };

    const handleFinish = async () => {
        if (!user) return;
        setSaving(true);

        try {
            // Calculate norms
            const result = calculate({ gender, age, weight, height, activityLevel, goal });

            await updateProfile({
                gender,
                age,
                weight_kg: weight,
                height_cm: height,
                activity_level: activityLevel,
                goal,
                calorie_goal: result.targetCalories,
                water_goal_ml: result.water,
                onboarding_completed: true,
            } as any);

            onComplete();
        } catch (error) {
            console.error("Onboarding error:", error);
        } finally {
            setSaving(false);
        }
    };

    const activities: { value: ActivityLevel; labelKey: string }[] = [
        { value: "sedentary", labelKey: "activity.sedentary" },
        { value: "light", labelKey: "activity.light" },
        { value: "moderate", labelKey: "activity.moderate" },
        { value: "active", labelKey: "activity.active" },
        { value: "very_active", labelKey: "activity.very_active" },
    ];

    const goals: { value: Goal; labelKey: string }[] = [
        { value: "lose", labelKey: "goal.lose" },
        { value: "maintain", labelKey: "goal.maintain" },
        { value: "gain", labelKey: "goal.gain" },
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                {/* Logo */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-widest mb-1">
                        VITALS
                    </h1>
                    <p className="text-xs sm:text-sm text-neon-green">{t("onboarding.welcome")}</p>
                </div>

                {/* Progress dots */}
                <div className="flex items-center justify-center gap-2 mb-6">
                    {steps.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1.5 rounded-full transition-all duration-300 ${i === step
                                    ? "w-8 bg-neon-green"
                                    : i < step
                                        ? "w-4 bg-neon-green/50"
                                        : "w-4 bg-white/10"
                                }`}
                        />
                    ))}
                </div>

                <GlassCard className="p-6 sm:p-8">
                    <h3 className="text-lg font-bold text-white mb-4">{t(steps[step])}</h3>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            {/* Step 0: Goal + Gender */}
                            {step === 0 && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">{t("calc.goal")}</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {goals.map(g => (
                                                <button
                                                    key={g.value}
                                                    onClick={() => setGoal(g.value)}
                                                    className={`py-3 rounded-xl text-sm font-bold transition-all ${goal === g.value
                                                            ? "bg-neon-green text-black shadow-[0_0_20px_rgba(0,255,148,0.3)]"
                                                            : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
                                                        }`}
                                                >
                                                    {t(g.labelKey)}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">{t("calc.gender")}</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {(["male", "female"] as Gender[]).map(g => (
                                                <button
                                                    key={g}
                                                    onClick={() => setGender(g)}
                                                    className={`py-3 rounded-xl text-sm font-bold transition-all ${gender === g
                                                            ? "bg-neon-blue text-black shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                                                            : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
                                                        }`}
                                                >
                                                    {t(`calc.${g}`)}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 1: Body params */}
                            {step === 1 && (
                                <div className="space-y-4">
                                    {[
                                        { label: t("calc.age"), value: age, set: setAge, min: 10, max: 100, unit: "" },
                                        { label: t("calc.weight"), value: weight, set: setWeight, min: 30, max: 300, unit: "kg" },
                                        { label: t("calc.height"), value: height, set: setHeight, min: 100, max: 250, unit: "cm" },
                                    ].map(field => (
                                        <div key={field.label}>
                                            <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">{field.label}</label>
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="range"
                                                    min={field.min}
                                                    max={field.max}
                                                    value={field.value}
                                                    onChange={e => field.set(Number(e.target.value))}
                                                    className="flex-1 accent-neon-green h-1"
                                                />
                                                <span className="text-lg font-orbitron text-white w-16 text-right">
                                                    {field.value}<span className="text-xs text-gray-400 ml-0.5">{field.unit}</span>
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Step 2: Activity */}
                            {step === 2 && (
                                <div className="space-y-2">
                                    {activities.map(a => (
                                        <button
                                            key={a.value}
                                            onClick={() => setActivityLevel(a.value)}
                                            className={`w-full py-3 px-4 rounded-xl text-sm text-left transition-all ${activityLevel === a.value
                                                    ? "bg-neon-green/20 text-neon-green border border-neon-green/30"
                                                    : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
                                                }`}
                                        >
                                            {t(a.labelKey)}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Step 3: Summary */}
                            {step === 3 && (
                                <div className="text-center space-y-4">
                                    <Sparkles className="w-12 h-12 text-neon-green mx-auto" />
                                    <p className="text-gray-300 text-sm">{t("onboarding.ready")}</p>
                                    <div className="grid grid-cols-2 gap-3 text-center">
                                        {(() => {
                                            const result = calculate({ gender, age, weight, height, activityLevel, goal });
                                            return (
                                                <>
                                                    <div className="p-3 rounded-xl bg-neon-pink/10 border border-neon-pink/20">
                                                        <span className="text-xl font-orbitron text-neon-pink">{result.targetCalories}</span>
                                                        <p className="text-[10px] text-gray-400 mt-0.5">{t("calories.kcal")}/{t("onboarding.day")}</p>
                                                    </div>
                                                    <div className="p-3 rounded-xl bg-neon-blue/10 border border-neon-blue/20">
                                                        <span className="text-xl font-orbitron text-neon-blue">{result.water}</span>
                                                        <p className="text-[10px] text-gray-400 mt-0.5">{t("water.ml")}/{t("onboarding.day")}</p>
                                                    </div>
                                                    <div className="p-3 rounded-xl bg-neon-green/10 border border-neon-green/20">
                                                        <span className="text-xl font-orbitron text-neon-green">{result.protein}</span>
                                                        <p className="text-[10px] text-gray-400 mt-0.5">{t("calc.protein")}, g</p>
                                                    </div>
                                                    <div className="p-3 rounded-xl bg-neon-yellow/10 border border-neon-yellow/20">
                                                        <span className="text-xl font-orbitron text-neon-yellow">{result.fat + result.carbs}</span>
                                                        <p className="text-[10px] text-gray-400 mt-0.5">{t("calc.fat")}+{t("calc.carbs")}, g</p>
                                                    </div>
                                                </>
                                            );
                                        })()}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation */}
                    <div className="flex gap-3 mt-6">
                        {step > 0 && (
                            <button
                                onClick={() => setStep(s => s - 1)}
                                className="px-4 py-2.5 rounded-xl border border-gray-600 text-gray-400 hover:bg-gray-800 transition-colors flex items-center gap-1"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                {t("onboarding.back")}
                            </button>
                        )}
                        <button
                            onClick={step === 3 ? handleFinish : () => setStep(s => s + 1)}
                            disabled={!canProceed() || saving}
                            className="flex-1 py-2.5 rounded-xl bg-neon-green text-black font-bold uppercase tracking-wider hover:bg-neon-green/80 transition-all shadow-[0_0_20px_rgba(0,255,148,0.3)] disabled:opacity-50 flex items-center justify-center gap-1"
                        >
                            {saving ? "..." : step === 3 ? t("onboarding.start") : t("onboarding.next")}
                            {step < 3 && <ChevronRight className="w-4 h-4" />}
                        </button>
                    </div>
                </GlassCard>
            </motion.div>
        </div>
    );
}
