"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GoalModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    currentValue: number;
    unit: string;
    onSave: (value: number) => void;
    presets?: number[];
}

export default function GoalModal({
    isOpen,
    onClose,
    title,
    currentValue,
    unit,
    onSave,
    presets = []
}: GoalModalProps) {
    const [value, setValue] = useState(currentValue);

    const handleSave = () => {
        onSave(value);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="w-full max-w-sm p-6 rounded-2xl bg-black/90 border border-neon-green/30"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-white">{title}</h3>
                            <button onClick={onClose} className="text-gray-400 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="mb-4">
                            <input
                                type="number"
                                value={value}
                                onChange={(e) => setValue(Number(e.target.value))}
                                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-neon-green/30 text-white text-center text-2xl font-orbitron focus:outline-none focus:border-neon-green"
                            />
                            <p className="text-center text-gray-400 mt-1">{unit}</p>
                        </div>

                        {presets.length > 0 && (
                            <div className="flex gap-2 mb-4 flex-wrap">
                                {presets.map((preset) => (
                                    <button
                                        key={preset}
                                        onClick={() => setValue(preset)}
                                        className={`px-3 py-1 rounded-full text-sm border transition-colors ${value === preset
                                                ? "border-neon-green bg-neon-green/20 text-neon-green"
                                                : "border-gray-600 text-gray-400 hover:border-gray-400"
                                            }`}
                                    >
                                        {preset}
                                    </button>
                                ))}
                            </div>
                        )}

                        <button
                            onClick={handleSave}
                            className="w-full py-3 rounded-lg bg-neon-green text-black font-bold uppercase tracking-wider hover:bg-neon-green/80 transition-colors"
                        >
                            Сохранить
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
