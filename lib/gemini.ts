import { GoogleGenerativeAI } from "@google/generative-ai";

export interface FoodAnalysisResult {
    food_name: string;
    calories: number;
    macros: {
        protein: number;
        fat: number;
        carbs: number;
    };
    ingredients?: string[];
    recipe_suggestion?: string;
}

export async function analyzeFoodImage(base64Image: string): Promise<FoodAnalysisResult | null> {
    const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    console.log("API Key status:", API_KEY ? "Present" : "Missing");

    if (!API_KEY) {
        // Return mock data if no key is present for development/demo ease
        console.log("Returning mock data due to missing API Key");
        return new Promise((resolve) => setTimeout(() => resolve({
            food_name: "Салат с курицей гриль",
            calories: 450,
            macros: { protein: 40, fat: 15, carbs: 10 },
            recipe_suggestion: "Добавьте оливковое масло для полезных жиров."
        }), 2000));
    }

    try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Clean base64 string if it contains metadata header
        const cleanBase64 = base64Image.replace(/^data:image\/[a-z]+;base64,/, "");

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
                    mimeType: "image/jpeg", // Assuming JPEG for simplicity after compression
                },
            },
        ]);

        const responseText = result.response.text();
        console.log("Gemini Response:", responseText);

        // Sanitize response if needed (remove markdown)
        const sanitizedText = responseText.replace(/```json/g, "").replace(/```/g, "").trim();

        return JSON.parse(sanitizedText) as FoodAnalysisResult;
    } catch (error) {
        console.error("Error analyzing food:", error);
        throw error;
    }
}
