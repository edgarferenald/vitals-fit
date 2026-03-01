"use client";

import { useLocale } from "@/lib/LocaleContext";

interface BodyVisualizerProps {
    gender: string;
    age: number | null;
    weight: number | null;
    height: number | null;
    activity: string | null;
    goal: string | null;
    onClick?: () => void;
}

function MaleSilhouette() {
    return (
        <svg viewBox="0 0 200 440" className="w-full h-full" fill="none">
            {/* Head */}
            <circle cx="100" cy="45" r="30" fill="url(#bodyGradMale)" opacity="0.9" />
            {/* Neck */}
            <rect x="90" y="73" width="20" height="15" rx="5" fill="url(#bodyGradMale)" opacity="0.8" />
            {/* Body - Torso */}
            <path
                d="M60 88 L140 88 L145 200 L130 210 L70 210 L55 200 Z"
                fill="url(#bodyGradMale)"
                opacity="0.7"
            />
            {/* Left Arm */}
            <path
                d="M60 88 L35 140 L30 190 L42 192 L50 150 L62 110"
                stroke="url(#bodyGradMale)"
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.6"
            />
            {/* Right Arm */}
            <path
                d="M140 88 L165 140 L170 190 L158 192 L150 150 L138 110"
                stroke="url(#bodyGradMale)"
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.6"
            />
            {/* Left Leg */}
            <path
                d="M75 208 L68 310 L65 400 L80 400 L85 310 L90 220"
                stroke="url(#bodyGradMale)"
                strokeWidth="18"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.6"
            />
            {/* Right Leg */}
            <path
                d="M125 208 L132 310 L135 400 L120 400 L115 310 L110 220"
                stroke="url(#bodyGradMale)"
                strokeWidth="18"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.6"
            />
            <defs>
                <linearGradient id="bodyGradMale" x1="100" y1="0" x2="100" y2="440" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#00FF94" />
                    <stop offset="100%" stopColor="#00F0FF" />
                </linearGradient>
            </defs>
        </svg>
    );
}

function FemaleSilhouette() {
    return (
        <svg viewBox="0 0 200 440" className="w-full h-full" fill="none">
            {/* Head */}
            <circle cx="100" cy="42" r="28" fill="url(#bodyGradFemale)" opacity="0.9" />
            {/* Hair accent */}
            <path
                d="M72 38 Q72 15 100 14 Q128 15 128 38"
                stroke="url(#bodyGradFemale)"
                strokeWidth="4"
                opacity="0.5"
            />
            {/* Neck */}
            <rect x="92" y="68" width="16" height="14" rx="5" fill="url(#bodyGradFemale)" opacity="0.8" />
            {/* Body - Torso (curvier) */}
            <path
                d="M65 82 L135 82 L140 140 L135 170 L125 200 L130 215 L70 215 L75 200 L65 170 L60 140 Z"
                fill="url(#bodyGradFemale)"
                opacity="0.7"
            />
            {/* Left Arm */}
            <path
                d="M65 82 L42 130 L38 185 L48 187 L55 140 L67 105"
                stroke="url(#bodyGradFemale)"
                strokeWidth="13"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.6"
            />
            {/* Right Arm */}
            <path
                d="M135 82 L158 130 L162 185 L152 187 L145 140 L133 105"
                stroke="url(#bodyGradFemale)"
                strokeWidth="13"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.6"
            />
            {/* Left Leg */}
            <path
                d="M78 213 L72 310 L68 400 L82 400 L86 310 L90 225"
                stroke="url(#bodyGradFemale)"
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.6"
            />
            {/* Right Leg */}
            <path
                d="M122 213 L128 310 L132 400 L118 400 L114 310 L110 225"
                stroke="url(#bodyGradFemale)"
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.6"
            />
            <defs>
                <linearGradient id="bodyGradFemale" x1="100" y1="0" x2="100" y2="440" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FF003C" />
                    <stop offset="100%" stopColor="#FF69B4" />
                </linearGradient>
            </defs>
        </svg>
    );
}

export default function BodyVisualizer({
    gender,
    age,
    weight,
    height,
    activity,
    goal,
    onClick,
}: BodyVisualizerProps) {
    const { t } = useLocale();

    const isMale = gender === "male";

    return (
        <div
            onClick={onClick}
            className={`relative w-full rounded-2xl overflow-hidden p-6 ${onClick ? "cursor-pointer hover:border-neon-green/40" : ""
                } border border-white/10 bg-gradient-to-b ${isMale ? "from-neon-green/5 to-neon-blue/5" : "from-neon-pink/5 to-pink-500/5"
                }`}
        >
            {/* Glow effect behind silhouette */}
            <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-64 rounded-full blur-[60px] opacity-20 ${isMale ? "bg-neon-green" : "bg-neon-pink"
                    }`}
            />

            <div className="relative flex items-center justify-center gap-4">
                {/* Left side labels */}
                <div className="flex flex-col items-end gap-6 flex-1 min-w-0">
                    <ParamBadge
                        label={t("calc.weight")}
                        value={weight ? `${weight} ${t("calc.kg")}` : "—"}
                        color={isMale ? "neon-green" : "neon-pink"}
                        align="right"
                    />
                    <ParamBadge
                        label={t("calc.age")}
                        value={age ? `${age}` : "—"}
                        color={isMale ? "neon-blue" : "neon-pink"}
                        align="right"
                    />
                    <ParamBadge
                        label={t("calc.goal")}
                        value={goal ? t(`goal.${goal}`) : "—"}
                        color={isMale ? "neon-green" : "neon-pink"}
                        align="right"
                    />
                </div>

                {/* Silhouette */}
                <div className="w-24 sm:w-28 lg:w-32 flex-shrink-0">
                    {isMale ? <MaleSilhouette /> : <FemaleSilhouette />}
                </div>

                {/* Right side labels */}
                <div className="flex flex-col items-start gap-6 flex-1 min-w-0">
                    <ParamBadge
                        label={t("calc.height")}
                        value={height ? `${height} см` : "—"}
                        color={isMale ? "neon-green" : "neon-pink"}
                        align="left"
                    />
                    <ParamBadge
                        label={t("calc.gender")}
                        value={t(`calc.${gender}`)}
                        color={isMale ? "neon-blue" : "neon-pink"}
                        align="left"
                    />
                    <ParamBadge
                        label={t("calc.activityLevel")}
                        value={activity ? t(`activity.${activity}`) : "—"}
                        color={isMale ? "neon-green" : "neon-pink"}
                        align="left"
                        small
                    />
                </div>
            </div>

            {/* Edit hint */}
            {onClick && (
                <div className="text-center mt-3 text-[10px] text-gray-500 uppercase tracking-widest">
                    {t("settings.bodyParams")} • {t("streak.cancel") === "Отмена" ? "Нажми для редактирования" : "Tap to edit"}
                </div>
            )}
        </div>
    );
}

function ParamBadge({
    label,
    value,
    color,
    align,
    small,
}: {
    label: string;
    value: string;
    color: string;
    align: "left" | "right";
    small?: boolean;
}) {
    return (
        <div className={`${align === "right" ? "text-right" : "text-left"}`}>
            <div className="text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-wider">{label}</div>
            <div
                className={`${small ? "text-[11px] sm:text-xs" : "text-sm sm:text-base"} font-bold text-${color} leading-tight`}
            >
                {value}
            </div>
        </div>
    );
}
