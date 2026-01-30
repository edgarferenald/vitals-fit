import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!API_KEY) {
    console.warn("Gemini API Key is missing. Check your .env.local file.");
}

const genAI = new GoogleGenerativeAI(API_KEY || "");

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
    if (!API_KEY) {
        // Return mock data if no key is present for development/demo ease
        console.log("Returning mock data due to missing API Key");
        return new Promise((resolve) => setTimeout(() => resolve({
            food_name: "Grilled Chicken Salad",
            calories: 450,
            macros: { protein: 40, fat: 15, carbs: 10 },
            recipe_suggestion: "Add some olive oil for healthy fats."
        }), 2000));
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Clean base64 string if it contains metadata header
        const cleanBase64 = base64Image.replace(/^data:image\/[a-z]+;base64,/, "");

        const prompt = `
      Analyze this image of food. Identify the dish, estimate the calories, and breakdown macronutrients (protein, fat, carbs) in grams.
      Also provide a very brief recipe suggestion or health tip.
      Return the result ONLY as a valid JSON object with the following structure:
      {
        "food_name": "string",
        "calories": number,
        "macros": {
          "protein": number,
          "fat": number,
          "carbs": number
        },
        "recipe_suggestion": "string"
      }
      Do not include markdown formatting like \`\`\`json or \`\`\`. Just the raw JSON string.
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
