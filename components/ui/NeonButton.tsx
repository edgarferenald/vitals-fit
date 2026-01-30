"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger";
    fullWidth?: boolean;
}

export default function NeonButton({
    children,
    className,
    variant = "primary",
    fullWidth = false,
    ...props
}: NeonButtonProps) {

    const baseStyles = "relative px-6 py-3 rounded-xl font-orbitron font-bold uppercase text-sm tracking-wider transition-all duration-300";

    const variants = {
        primary: "bg-neon-green/10 text-neon-green border border-neon-green hover:bg-neon-green hover:text-black shadow-[0_0_10px_rgba(0,255,148,0.2)] hover:shadow-[0_0_20px_rgba(0,255,148,0.6)]",
        secondary: "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/30",
        danger: "bg-neon-pink/10 text-neon-pink border border-neon-pink hover:bg-neon-pink hover:text-white shadow-[0_0_10px_rgba(255,0,60,0.2)] hover:shadow-[0_0_20px_rgba(255,0,60,0.6)]"
    };

    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ y: -2 }}
            className={clsx(baseStyles, variants[variant], fullWidth && "w-full", className)}
            {...(props as any)}
        >
            {children}
        </motion.button>
    );
}
