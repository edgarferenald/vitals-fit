"use client";

import Header from "@/components/ui/Header";
import Calculator from "@/components/recommendations/Calculator";
import ArticleCard from "@/components/recommendations/ArticleCard";

const articles = [
    {
        title: "Вода и метаболизм",
        description: "Как правильное потребление воды ускоряет обмен веществ и помогает похудеть. Научные факты и практические советы.",
        imageUrl: "/articles/article_water_1769947735698.png",
        emoji: "💧",
        color: "from-neon-blue/80"
    },
    {
        title: "Как работают калории",
        description: "Что такое калорийный дефицит, как его создать и почему это единственный способ похудеть. Разбираемся в основах.",
        imageUrl: "/articles/article_calories_1769947752149.png",
        emoji: "🔥",
        color: "from-neon-pink/80"
    },
    {
        title: "Белок для мышц",
        description: "Сколько белка нужно для роста мышц? Лучшие источники протеина и оптимальное время приёма.",
        imageUrl: "/articles/article_protein_1769947766366.png",
        emoji: "💪",
        color: "from-neon-green/80"
    },
    {
        title: "Правильное питание",
        description: "Баланс макронутриентов, микроэлементы и витамины. Как составить здоровый рацион без жёстких диет.",
        imageUrl: "/articles/article_nutrition_1769947792368.png",
        emoji: "🥗",
        color: "from-purple-500/80"
    },
    {
        title: "Интервальное голодание",
        description: "Что такое IF, схемы 16/8 и 20/4, польза и противопоказания. Подходит ли вам этот метод?",
        imageUrl: "/articles/article_fasting_1769947807036.png",
        emoji: "⏰",
        color: "from-orange-500/80"
    }
];

export default function RecommendationsPage() {
    return (
        <div className="flex flex-col gap-3 p-3 sm:p-6 min-h-screen overflow-auto pb-6">
            <Header />

            <h2 className="text-lg font-bold text-white">Рекомендации</h2>

            {/* Calculator */}
            <Calculator />

            {/* Articles Section */}
            <div className="mt-4">
                <h3 className="text-sm text-gray-400 uppercase tracking-wider mb-3">Полезные статьи</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {articles.map((article, index) => (
                        <ArticleCard key={index} {...article} />
                    ))}
                </div>
            </div>
        </div>
    );
}
