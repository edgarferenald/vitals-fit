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

        // Define primary and fallback models
        const modelsToTry = ["google/gemini-2.5-flash", "google/gemini-2.0-flash-001", "openai/gpt-4o"];
        let responseText = null;
        let lastError = null;
        let lastStatus = 500;

        for (const model of modelsToTry) {
            console.log(`Trying model: ${model}`);
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
                        model: model,
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
                console.log(`OpenRouter Response status for ${model}:`, response.status);

                if (response.ok) {
                    responseText = data.choices?.[0]?.message?.content;
                    if (responseText) {
                        console.log(`OpenRouter Response text from ${model}:`, responseText?.substring(0, 200));
                        break; // Success! Exit the loop.
                    }
                } else {
                    console.error(`OpenRouter Error for ${model}:`, data);
                    lastError = data.error?.message || "OpenRouter API error";
                    lastStatus = response.status;
                    // Continue to the next model in the array
                }
            } catch (err: any) {
                console.error(`Fetch error for ${model}:`, err);
                lastError = err.message || "Network error";
                // Continue to the next model
            }
        }

        if (!responseText) {
            return NextResponse.json(
                { error: lastError || "All models failed" },
                { status: lastStatus }
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
