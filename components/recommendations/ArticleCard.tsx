"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface ArticleCardProps {
    title: string;
    description: string;
    imageUrl: string;
    emoji: string;
    color: string;
}

export default function ArticleCard({ title, description, imageUrl, emoji, color }: ArticleCardProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative overflow-hidden rounded-xl border border-gray-800 hover:border-gray-600 transition-colors cursor-pointer group"
        >
            {/* Image */}
            <div className="relative h-32 sm:h-40">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover"
                />
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${color} to-transparent opacity-60`} />

                {/* Emoji Badge */}
                <div className="absolute top-3 left-3 w-10 h-10 rounded-full bg-black/70 backdrop-blur-sm flex items-center justify-center text-xl">
                    {emoji}
                </div>
            </div>

            {/* Content */}
            <div className="p-4 bg-black/80">
                <h3 className="font-bold text-white mb-1 group-hover:text-neon-green transition-colors">
                    {title}
                </h3>
                <p className="text-xs text-gray-400 line-clamp-2">
                    {description}
                </p>
            </div>
        </motion.div>
    );
}
