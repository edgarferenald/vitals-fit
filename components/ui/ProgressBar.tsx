"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

interface ProgressBarProps {
    progress: number; // 0 to 100
    color?: "green" | "blue" | "pink";
    className?: string;
}

export default function ProgressBar({ progress, color = "green", className }: ProgressBarProps) {
    const colors = {
        green: "bg-neon-green shadow-[0_0_10px_#00FF94]",
        blue: "bg-neon-blue shadow-[0_0_10px_#00F0FF]",
        pink: "bg-neon-pink shadow-[0_0_10px_#FF003C]"
    };

    return (
        <div className={clsx("w-full h-2 bg-white/10 rounded-full overflow-hidden", className)}>
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={clsx("h-full rounded-full", colors[color])}
            />
        </div>
    );
}
