import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const API_KEY = process.env.OPENROUTER_API_KEY;

    console.log("OpenRouter API Key status:", API_KEY ? "Present" : "Missing");

    if (!API_KEY) {
        return NextResponse.json(
            { error: "OpenRouter API key not configured" },
            { status: 500 }
        );
    }

    try {
        const { image } = await request.json();

        if (!image) {
            return NextResponse.json(
                { error: "No image provided" },
                { status: 400 }
            );
        }

        const prompt = `Проанализируй это изображение еды. Определи блюдо, оцени калории и разбей макронутриенты (белки, жиры, углеводы) в граммах.
Также дай очень краткий совет по рецепту или здоровью.

ВАЖНО: Все текстовые поля должны быть на РУССКОМ языке!

Верни результат ТОЛЬКО как валидный JSON объект со следующей структурой:
{
  "food_name": "название блюда на русском",
  "calories": число,
  "macros": {
    "protein": число,
    "fat": число,
    "carbs": число
  },
  "recipe_suggestion": "совет на русском"
}
Не включай форматирование markdown. Только чистый JSON.`;

        // Use OpenRouter API with a vision model
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://vitals-fit-xi.vercel.app",
                "X-Title": "Vitals Fitness App",
            },
            body: JSON.stringify({
                model: "google/gemini-2.5-flash",
                messages: [
                    {
                        role: "user",
                        content: [
                            { type: "text", text: prompt },
                            {
                                type: "image_url",
                                image_url: {
                                    url: image.startsWith("data:") ? image : `data:image/jpeg;base64,${image}`,
                                },
                            },
                        ],
                    },
                ],
                max_tokens: 1024,
                temperature: 0.4,
            }),
        });

        const data = await response.json();
        console.log("OpenRouter Response status:", response.status);

        if (!response.ok) {
            console.error("OpenRouter Error:", data);
            return NextResponse.json(
                { error: data.error?.message || "OpenRouter API error" },
                { status: response.status }
            );
        }

        // Extract text from response
        const responseText = data.choices?.[0]?.message?.content;
        console.log("OpenRouter Response text:", responseText?.substring(0, 200));

        if (!responseText) {
            return NextResponse.json(
                { error: "No response from OpenRouter" },
                { status: 500 }
            );
        }

        // Sanitize response if needed (remove markdown)
        const sanitizedText = responseText
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const parsedResult = JSON.parse(sanitizedText);

        return NextResponse.json(parsedResult);
    } catch (error: any) {
        console.error("Error analyzing food:", error);
        return NextResponse.json(
            { error: error.message || "Failed to analyze image" },
            { status: 500 }
        );
    }
}
