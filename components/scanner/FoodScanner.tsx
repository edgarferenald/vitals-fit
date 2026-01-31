"use client";

import { useState, useRef } from "react";
import { Camera, Loader2 } from "lucide-react";
import NeonButton from "../ui/NeonButton";
import { compressImage } from "@/utils/imageUtils";
import { analyzeFoodImage, FoodAnalysisResult } from "@/lib/gemini";
import ScanResultModal from "./ScanResultModal";
import { useAuth } from "@/lib/AuthContext";
import { addFoodEntry } from "@/lib/foodService";

export default function FoodScanner() {
    const { user } = useAuth();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<FoodAnalysisResult | null>(null);
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setIsAnalyzing(true);

            // 1. Compress Image
            const compressedBase64 = await compressImage(file);
            setImageSrc(compressedBase64);

            // 2. Send to AI
            const analysis = await analyzeFoodImage(compressedBase64);
            setResult(analysis);

        } catch (error) {
            console.error("Scanning failed:", error);
            alert("Не удалось распознать. Попробуйте снова.");
        } finally {
            setIsAnalyzing(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const handleSave = async () => {
        if (!result) return;

        // Save to database if logged in
        if (user) {
            await addFoodEntry(user.id, {
                food_name: result.food_name,
                calories: result.calories,
                protein: result.macros.protein,
                fat: result.macros.fat,
                carbs: result.macros.carbs,
                recipe_suggestion: result.recipe_suggestion
            });
        }

        // Close modal
        setResult(null);
        setImageSrc(null);
    };

    const handleClose = () => {
        setResult(null);
        setImageSrc(null);
    };

    return (
        <>
            <input
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileSelect}
            />

            <div className="relative">
                {isAnalyzing && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 rounded-full">
                        <Loader2 className="w-6 h-6 text-neon-green animate-spin" />
                    </div>
                )}
                <div className="absolute inset-0 bg-neon-green blur-lg opacity-40 animate-pulse rounded-full"></div>
                <NeonButton
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isAnalyzing}
                    className="rounded-full w-12 h-12 flex items-center justify-center relative z-10 !p-0"
                >
                    <Camera className="w-6 h-6" />
                </NeonButton>
            </div>

            <ScanResultModal
                isOpen={!!result}
                onClose={handleClose}
                onSave={handleSave}
                result={result}
                imageSrc={imageSrc}
            />
        </>
    );
}
