import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const API_KEY = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    console.log("Server API Key status:", API_KEY ? "Present (length: " + API_KEY.length + ")" : "Missing");

    if (!API_KEY) {
        return NextResponse.json(
            { error: "API key not configured" },
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

        // Clean base64 string if it contains metadata header
        const cleanBase64 = image.replace(/^data:image\/[a-z]+;base64,/, "");

        const prompt = `Проанализируй это изображение еды. Определи блюдо, оцени калории и разбей макронутриенты (белки, жиры, углеводы) в граммах.
Также дай очень краткий совет по рецепту или здоровью.

ВАЖНО: Все текстовые поля (food_name и recipe_suggestion) должны быть на РУССКОМ языке!

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

        // Use REST API directly with v1 endpoint
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                { text: prompt },
                                {
                                    inline_data: {
                                        mime_type: "image/jpeg",
                                        data: cleanBase64,
                                    },
                                },
                            ],
                        },
                    ],
                    generationConfig: {
                        temperature: 0.4,
                        maxOutputTokens: 1024,
                    },
                }),
            }
        );

        const data = await response.json();
        console.log("Gemini API Response status:", response.status);
        console.log("Gemini API Response:", JSON.stringify(data).substring(0, 500));

        if (!response.ok) {
            console.error("Gemini API Error:", data);
            return NextResponse.json(
                { error: data.error?.message || "Gemini API error" },
                { status: response.status }
            );
        }

        // Extract text from response
        const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!responseText) {
            return NextResponse.json(
                { error: "No response from Gemini" },
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
