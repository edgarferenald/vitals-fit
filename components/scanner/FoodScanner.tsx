"use client";

import { useState, useRef } from "react";
import { Camera, Loader2 } from "lucide-react";
import NeonButton from "../ui/NeonButton";
import { compressImage } from "@/utils/imageUtils";
import { analyzeFoodImage, FoodAnalysisResult } from "@/lib/gemini";
import ScanResultModal from "./ScanResultModal";

export default function FoodScanner() {
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

            // 2. Send to Gemini
            const analysis = await analyzeFoodImage(compressedBase64);
            setResult(analysis);

        } catch (error) {
            console.error("Scanning failed:", error);
            alert("Failed to analyze image. Please try again.");
        } finally {
            setIsAnalyzing(false);
            // Reset input layout
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const handleSave = () => {
        // In real app: save to Supabase
        console.log("Saving entry:", result);
        // Be sure to close after save
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
                capture="environment" // Triggers camera on mobile
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileSelect}
            />

            {/* Trigger Button (Using the styled layout from Dashboard, or making this the wrapper) */}
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

            {/* Result Modal */}
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
