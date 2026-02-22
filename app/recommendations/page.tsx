"use client";

import { useState } from "react";
import Header from "@/components/ui/Header";
import Calculator from "@/components/recommendations/Calculator";
import ArticleCard from "@/components/recommendations/ArticleCard";
import ArticleModal from "@/components/recommendations/ArticleModal";
import { articles, Article } from "@/lib/articlesData";
import { useLocale } from "@/lib/LocaleContext";

export default function RecommendationsPage() {
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
    const { t } = useLocale();

    return (
        <div className="flex flex-col gap-3 p-3 sm:p-6 min-h-screen overflow-auto pb-6">
            <Header />

            <h2 className="text-lg font-bold text-white">{t("recommendations.title")}</h2>

            {/* Calculator */}
            <Calculator />

            {/* Articles Section */}
            <div className="mt-4">
                <h3 className="text-sm text-gray-400 uppercase tracking-wider mb-3">{t("recommendations.articles")}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {articles.map((article) => (
                        <ArticleCard
                            key={article.id}
                            article={article}
                            onClick={() => setSelectedArticle(article)}
                        />
                    ))}
                </div>
            </div>

            {/* Article Modal */}
            {selectedArticle && (
                <ArticleModal
                    article={selectedArticle}
                    onClose={() => setSelectedArticle(null)}
                />
            )}
        </div>
    );
}
