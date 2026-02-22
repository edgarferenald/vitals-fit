"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import NeonButton from "../ui/NeonButton";
import { FoodAnalysisResult } from "@/lib/gemini";
import { useLocale } from "@/lib/LocaleContext";
import Image from "next/image";

interface ScanResultModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
    result: FoodAnalysisResult | null;
    imageSrc: string | null;
}

export default function ScanResultModal({ isOpen, onClose, onSave, result, imageSrc }: ScanResultModalProps) {
    const { t } = useLocale();
    if (!isOpen || !result) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="bg-gray-900 border border-neon-green/30 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl relative"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 z-10 p-1 bg-black/40 rounded-full text-white hover:text-neon-pink transition-colors"
                    >
                        <X size={20} />
                    </button>

                    {/* Image Header */}
                    <div className="relative h-48 w-full">
                        {imageSrc && (
                            <Image
                                src={imageSrc}
                                alt="Scanned Food"
                                fill
                                className="object-cover"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4">
                            <h2 className="text-2xl font-bold font-orbitron text-white text-glow">{result.food_name}</h2>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                        {/* Calories */}
                        <div className="flex items-end justify-between border-b border-white/10 pb-4">
                            <span className="text-gray-400 uppercase tracking-widest text-xs">{t("scanner.energy")}</span>
                            <span className="text-3xl font-orbitron text-neon-green">{result.calories} <span className="text-sm font-sans text-gray-500">ккал</span></span>
                        </div>

                        {/* Macros Mesh */}
                        <div className="grid grid-cols-3 gap-2">
                            <div className="bg-white/5 rounded-lg p-3 text-center border border-white/5">
                                <div className="text-xs text-gray-400 mb-1">{t("scanner.protein")}</div>
                                <div className="font-bold text-neon-blue">{result.macros.protein}g</div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-3 text-center border border-white/5">
                                <div className="text-xs text-gray-400 mb-1">{t("scanner.fat")}</div>
                                <div className="font-bold text-neon-yellow">{result.macros.fat}g</div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-3 text-center border border-white/5">
                                <div className="text-xs text-gray-400 mb-1">{t("scanner.carbs")}</div>
                                <div className="font-bold text-neon-pink">{result.macros.carbs}g</div>
                            </div>
                        </div>

                        {/* AI Insight */}
                        <div className="bg-neon-green/5 border border-neon-green/20 rounded-lg p-3">
                            <p className="text-xs text-gray-300 italic">"{result.recipe_suggestion}"</p>
                        </div>

                        {/* Actions */}
                        <div className="pt-2">
                            <NeonButton fullWidth onClick={onSave} className="flex items-center justify-center gap-2">
                                <Check size={18} /> {t("scanner.addToDiary")}
                            </NeonButton>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
