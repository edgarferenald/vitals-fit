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
        <svg viewBox="0 0 120 300" className="w-full h-full drop-shadow-[0_0_15px_rgba(0,255,148,0.3)]">
            <defs>
                <linearGradient id="maleGrad" x1="60" y1="0" x2="60" y2="300" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#00FF94" stopOpacity="0.95" />
                    <stop offset="50%" stopColor="#00D4FF" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#0088FF" stopOpacity="0.5" />
                </linearGradient>
                <filter id="maleGlow">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
            <g filter="url(#maleGlow)">
                {/* Complete male body as single smooth path */}
                <path
                    d="M60 8
                       C 44 8, 36 20, 36 32
                       C 36 44, 44 54, 60 54
                       C 76 54, 84 44, 84 32
                       C 84 20, 76 8, 60 8
                       Z"
                    fill="url(#maleGrad)"
                />
                {/* Neck + shoulders + torso */}
                <path
                    d="M50 54 L50 62
                       C 50 62, 26 65, 18 78
                       L 6 120 L 18 122 L 28 92
                       C 28 92, 30 88, 34 86
                       L 34 86 L 34 160
                       C 34 168, 34 172, 36 176
                       L 36 176 L 34 178
                       L 42 180
                       L 42 240
                       C 42 244, 40 252, 38 260
                       L 32 288 L 48 290
                       L 56 252 L 60 240
                       L 64 252 L 72 290
                       L 88 288 L 82 260
                       C 80 252, 78 244, 78 240
                       L 78 180 L 86 178
                       L 84 176
                       C 86 172, 86 168, 86 160
                       L 86 86
                       C 90 88, 92 92, 92 92
                       L 102 122 L 114 120
                       L 102 78 C 94 65, 70 62, 70 62
                       L 70 54
                       Z"
                    fill="url(#maleGrad)"
                />
            </g>
        </svg>
    );
}

function FemaleSilhouette() {
    return (
        <svg viewBox="0 0 120 300" className="w-full h-full drop-shadow-[0_0_15px_rgba(255,0,60,0.3)]">
            <defs>
                <linearGradient id="femaleGrad" x1="60" y1="0" x2="60" y2="300" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FF003C" stopOpacity="0.95" />
                    <stop offset="50%" stopColor="#FF69B4" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#FF1493" stopOpacity="0.5" />
                </linearGradient>
                <filter id="femaleGlow">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
            <g filter="url(#femaleGlow)">
                {/* Head */}
                <path
                    d="M60 8
                       C 46 8, 38 18, 38 30
                       C 38 42, 46 52, 60 52
                       C 74 52, 82 42, 82 30
                       C 82 18, 74 8, 60 8
                       Z"
                    fill="url(#femaleGrad)"
                />
                {/* Hair accent */}
                <path
                    d="M38 30 C 36 14, 48 4, 60 4 C 72 4, 84 14, 82 30"
                    stroke="url(#femaleGrad)"
                    strokeWidth="3"
                    fill="none"
                    opacity="0.4"
                />
                {/* Body with curves */}
                <path
                    d="M52 52 L52 60
                       C 52 60, 30 63, 22 76
                       L 12 114 L 22 116 L 30 90
                       C 30 90, 32 86, 36 84
                       L 36 110
                       C 34 118, 32 126, 32 130
                       C 32 138, 34 142, 36 146
                       L 36 152
                       C 34 156, 30 162, 30 170
                       C 30 178, 34 180, 38 180
                       L 38 178
                       L 40 240
                       C 40 248, 38 258, 36 266
                       L 30 290 L 46 292
                       L 54 256 L 60 240
                       L 66 256 L 74 292
                       L 90 290 L 84 266
                       C 82 258, 80 248, 80 240
                       L 82 178
                       L 82 180
                       C 86 180, 90 178, 90 170
                       C 90 162, 86 156, 84 152
                       L 84 146
                       C 86 142, 88 138, 88 130
                       C 88 126, 86 118, 84 110
                       L 84 84
                       C 88 86, 90 90, 90 90
                       L 98 116 L 108 114
                       L 98 76 C 90 63, 68 60, 68 60
                       L 68 52
                       Z"
                    fill="url(#femaleGrad)"
                />
            </g>
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
    const accent = isMale ? "text-neon-green" : "text-neon-pink";
    const accentBorder = isMale ? "border-neon-green/20" : "border-neon-pink/20";
    const accentBg = isMale ? "bg-neon-green/5" : "bg-neon-pink/5";

    return (
        <div
            onClick={onClick}
            className={`relative w-full rounded-2xl overflow-hidden border ${accentBorder} ${accentBg} ${onClick ? "cursor-pointer hover:scale-[1.01] transition-transform" : ""
                }`}
        >
            {/* Animated scan lines */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)",
                }}
            />

            <div className="relative flex items-stretch min-h-[280px] sm:min-h-[320px]">
                {/* Left parameters */}
                <div className="flex flex-col justify-around py-6 pl-4 pr-2 flex-1 min-w-0 z-10">
                    <ParamTag label={t("calc.weight")} value={weight ? `${weight} ${t("calc.kg")}` : "—"} accent={accent} />
                    <ParamTag label={t("calc.age")} value={age ? `${age}` : "—"} accent={accent} />
                    <ParamTag label={t("calc.goal")} value={goal ? t(`goal.${goal}`) : "—"} accent={accent} />
                </div>

                {/* Center: Silhouette */}
                <div className="relative w-28 sm:w-36 lg:w-44 flex-shrink-0 flex items-center justify-center py-4">
                    {/* Circular glow */}
                    <div className={`absolute inset-0 m-auto w-24 h-48 rounded-full blur-[40px] opacity-15 ${isMale ? "bg-neon-green" : "bg-neon-pink"}`} />
                    {/* Dotted outline circle */}
                    <div className={`absolute inset-0 m-auto w-32 h-32 rounded-full border border-dashed ${accentBorder} opacity-30`} />
                    <div className="relative w-20 sm:w-24 lg:w-28">
                        {isMale ? <MaleSilhouette /> : <FemaleSilhouette />}
                    </div>
                </div>

                {/* Right parameters */}
                <div className="flex flex-col justify-around py-6 pr-4 pl-2 flex-1 min-w-0 z-10">
                    <ParamTag label={t("calc.height")} value={height ? `${height} см` : "—"} accent={accent} align="left" />
                    <ParamTag label={t("calc.gender")} value={t(`calc.${gender}`)} accent={accent} align="left" />
                    <ParamTag label={t("calc.activityLevel")} value={activity ? t(`activity.${activity}`) : "—"} accent={accent} align="left" small />
                </div>
            </div>

            {/* Edit hint footer */}
            {onClick && (
                <div className={`text-center py-2 text-[10px] text-gray-600 uppercase tracking-[0.2em] border-t ${accentBorder}`}>
                    ✏️ {t("settings.bodyParams")}
                </div>
            )}
        </div>
    );
}

function ParamTag({
    label,
    value,
    accent,
    align = "right",
    small,
}: {
    label: string;
    value: string;
    accent: string;
    align?: "left" | "right";
    small?: boolean;
}) {
    return (
        <div className={align === "right" ? "text-right" : "text-left"}>
            <div className="text-[8px] sm:text-[10px] text-gray-600 uppercase tracking-wider leading-tight">{label}</div>
            <div className={`${small ? "text-[10px] sm:text-xs" : "text-xs sm:text-sm"} font-bold ${accent} leading-tight mt-0.5`}>
                {value}
            </div>
        </div>
    );
}
