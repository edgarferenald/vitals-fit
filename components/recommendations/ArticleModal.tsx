"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Article } from "@/lib/articlesData";
import { useLocale } from "@/lib/LocaleContext";

interface ArticleModalProps {
    article: Article | null;
    onClose: () => void;
}

export default function ArticleModal({ article, onClose }: ArticleModalProps) {
    const { t } = useLocale();
    if (!article) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-12 pb-20 overflow-y-auto bg-black/90 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.95 }}
                    transition={{ type: "spring", damping: 25 }}
                    className="relative w-full max-w-2xl bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-2xl overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header Image */}
                    <div className="relative h-48 sm:h-64">
                        <img
                            src={article.imageUrl}
                            alt={article.title}
                            className="w-full h-full object-cover"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${article.color} to-transparent opacity-60`} />

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Title Overlay */}
                        <div className="absolute bottom-4 left-4 right-4">
                            <div className="flex items-center gap-3">
                                <span className="text-3xl">{article.emoji}</span>
                                <h2 className="text-2xl font-bold text-white drop-shadow-lg">{article.title}</h2>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 prose prose-invert prose-sm max-w-none 
                        prose-headings:text-neon-green prose-headings:font-bold
                        prose-h2:text-xl prose-h2:mt-6 prose-h2:mb-4
                        prose-h3:text-lg prose-h3:mt-4 prose-h3:mb-2
                        prose-p:text-gray-300 prose-p:leading-relaxed
                        prose-strong:text-white
                        prose-ul:text-gray-300 prose-li:my-1
                        prose-table:text-gray-300
                        prose-th:bg-gray-800 prose-th:px-3 prose-th:py-2
                        prose-td:px-3 prose-td:py-2 prose-td:border-gray-700
                    ">
                        <ReactMarkdown>{article.content}</ReactMarkdown>
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-gray-800">
                        <button
                            onClick={onClose}
                            className="w-full py-3 rounded-xl bg-neon-green/10 text-neon-green font-bold hover:bg-neon-green/20 transition-colors"
                        >
                            {t("articles.close")}
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
