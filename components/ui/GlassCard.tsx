"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import clsx from "clsx";

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}

export default function GlassCard({ children, className, onClick }: GlassCardProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={clsx(
                "glass-panel rounded-2xl p-6 relative overflow-hidden",
                "border border-white/5",
                "shadow-[0_4px_30px_rgba(0,0,0,0.1)]",
                className
            )}
            onClick={onClick}
        >
            {/* Subtle internal glow */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />
            {children}
        </motion.div>
    );
}
