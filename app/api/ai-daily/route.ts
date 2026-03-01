import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const API_KEY = process.env.OPENROUTER_API_KEY;

    if (!API_KEY) {
        return NextResponse.json(
            { error: "OpenRouter API key not configured" },
            { status: 500 }
        );
    }

    try {
        const { calories, water, calorieGoal, waterGoal, foodList, language } = await request.json();

        const prompt = `Ты — профессиональный нутрициолог и фитнес-эксперт. Проанализируй рацион пользователя за сегодня и дай персональные рекомендации.

Данные за сегодня:
- Калории: ${calories} из ${calorieGoal} ккал (цель)
- Вода: ${water} из ${waterGoal} мл (цель)
- Список еды:
${foodList || "Пока нет записей"}

Дай анализ на ${language} языке в формате:
1. Общая оценка дня (emoji + оценка)
2. Что хорошо
3. Что улучшить
4. Рекомендация на вечер/ужин
5. Совет на завтра

Будь конкретным, используй цифры. Формат — Markdown.`;

        const modelsToTry = ["google/gemini-2.5-flash", "google/gemini-2.0-flash-001"];
        let responseText = null;

        for (const model of modelsToTry) {
            try {
                const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${API_KEY}`,
                        "Content-Type": "application/json",
                        "HTTP-Referer": "https://vitals-fit-xi.vercel.app",
                        "X-Title": "Vitals Fitness App",
                    },
                    body: JSON.stringify({
                        model,
                        messages: [{ role: "user", content: prompt }],
                        max_tokens: 1500,
                        temperature: 0.7,
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    responseText = data.choices?.[0]?.message?.content;
                    if (responseText) break;
                }
            } catch (err) {
                console.error(`AI Daily error for ${model}:`, err);
            }
        }

        if (!responseText) {
            return NextResponse.json({ analysis: "Не удалось получить анализ. Попробуйте позже." });
        }

        return NextResponse.json({ analysis: responseText });
    } catch (error: any) {
        console.error("AI Daily analysis error:", error);
        return NextResponse.json(
            { error: error.message || "Failed" },
            { status: 500 }
        );
    }
}
