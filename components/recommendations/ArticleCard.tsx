"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Article } from "@/lib/articlesData";
import { useLocale } from "@/lib/LocaleContext";

interface ArticleCardProps {
    article: Article;
    onClick: () => void;
}

export default function ArticleCard({ article, onClick }: ArticleCardProps) {
    const { t } = useLocale();
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className="relative overflow-hidden rounded-xl border border-gray-800 hover:border-gray-600 transition-colors cursor-pointer group"
        >
            {/* Image */}
            <div className="relative h-32 sm:h-40">
                <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover"
                />
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${article.color} to-transparent opacity-60`} />

                {/* Emoji Badge */}
                <div className="absolute top-3 left-3 w-10 h-10 rounded-full bg-black/70 backdrop-blur-sm flex items-center justify-center text-xl">
                    {article.emoji}
                </div>

                {/* Read indicator */}
                <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-[10px] text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">
                    {t("articles.read")}
                </div>
            </div>

            {/* Content */}
            <div className="p-4 bg-black/80">
                <h3 className="font-bold text-white mb-1 group-hover:text-neon-green transition-colors">
                    {article.title}
                </h3>
                <p className="text-xs text-gray-400 line-clamp-2">
                    {article.description}
                </p>
            </div>
        </motion.div>
    );
}
