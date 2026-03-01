"use client";

import { useState, useRef } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useLocale } from "@/lib/LocaleContext";
import { supabase } from "@/lib/supabase";
import { Camera, User } from "lucide-react";

interface AvatarUploadProps {
    size?: "sm" | "md" | "lg";
    onUpload?: (url: string) => void;
    editable?: boolean;
}

export default function AvatarUpload({ size = "md", onUpload, editable = true }: AvatarUploadProps) {
    const { user, profile, updateProfile } = useAuth();
    const { t } = useLocale();
    const [uploading, setUploading] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    const sizeClasses = {
        sm: "w-8 h-8 sm:w-10 sm:h-10",
        md: "w-12 h-12 sm:w-16 sm:h-16",
        lg: "w-20 h-20 sm:w-24 sm:h-24",
    };

    const avatarUrl = profile?.avatar_url;

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !user) return;

        // Validate file
        if (file.size > 2 * 1024 * 1024) {
            alert(t("avatar.tooLarge"));
            return;
        }

        setUploading(true);
        try {
            const ext = file.name.split(".").pop();
            const path = `${user.id}/avatar.${ext}`;

            // Upload to Supabase Storage
            const { error: uploadError } = await supabase.storage
                .from("avatars")
                .upload(path, file, { upsert: true });

            if (uploadError) {
                console.error("Upload error:", uploadError);
                setUploading(false);
                return;
            }

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from("avatars")
                .getPublicUrl(path);

            // Add cache buster
            const urlWithBuster = `${publicUrl}?t=${Date.now()}`;

            // Update profile
            await updateProfile({ avatar_url: urlWithBuster } as any);
            onUpload?.(urlWithBuster);
        } catch (error) {
            console.error("Avatar upload error:", error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="relative group">
            <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-tr from-neon-green via-neon-blue to-neon-pink p-[2px] overflow-hidden`}>
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                    {avatarUrl ? (
                        <img
                            src={avatarUrl}
                            alt="Avatar"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <User className="w-1/2 h-1/2 text-white" />
                    )}
                </div>
            </div>

            {editable && (
                <>
                    <button
                        onClick={() => fileRef.current?.click()}
                        disabled={uploading}
                        className="absolute inset-0 rounded-full flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                        {uploading ? (
                            <div className="animate-spin w-4 h-4 border-2 border-neon-green border-t-transparent rounded-full" />
                        ) : (
                            <Camera className="w-4 h-4 text-white" />
                        )}
                    </button>
                    <input
                        ref={fileRef}
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={handleUpload}
                        className="hidden"
                    />
                </>
            )}
        </div>
    );
}
