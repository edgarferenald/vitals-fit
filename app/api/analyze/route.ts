import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: NextRequest) {
    const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

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

        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

        // Clean base64 string if it contains metadata header
        const cleanBase64 = image.replace(/^data:image\/[a-z]+;base64,/, "");

        const prompt = `
      Проанализируй это изображение еды. Определи блюдо, оцени калории и разбей макронутриенты (белки, жиры, углеводы) в граммах.
      Также дай очень краткий совет по рецепту или здоровью.
      
      ВАЖНО: Все текстовые поля (food_name и recipe_suggestion) должны быть на РУССКОМ языке!
      
      Верни результат ТОЛЬКО как валидный JSON объект со следующей структурой:
      {
        "food_name": "string на русском языке",
        "calories": number,
        "macros": {
          "protein": number,
          "fat": number,
          "carbs": number
        },
        "recipe_suggestion": "string на русском языке"
      }
      Не включай форматирование markdown типа \`\`\`json или \`\`\`. Только чистая JSON строка.
    `;

        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    data: cleanBase64,
                    mimeType: "image/jpeg",
                },
            },
        ]);

        const responseText = result.response.text();
        console.log("Gemini Response:", responseText);

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
