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
    console.log("Calling server-side API for food analysis...");

    try {
        const response = await fetch("/api/analyze", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ image: base64Image }),
        });

        if (!response.ok) {
            const error = await response.json();
            console.error("API Error:", error);

            // Return unrecognized food data on error
            console.log("Returning unrecognized food data due to API error");
            return {
                food_name: "Блюдо не распознано",
                calories: 0,
                macros: { protein: 0, fat: 0, carbs: 0 },
                recipe_suggestion: "Введите калории вручную или сделайте новое фото."
            };
        }

        const result = await response.json();
        console.log("Analysis result:", result);
        return result as FoodAnalysisResult;
    } catch (error) {
        console.error("Error analyzing food:", error);

        // Return unrecognized food data on error
        return {
            food_name: "Блюдо не распознано",
            calories: 0,
            macros: { protein: 0, fat: 0, carbs: 0 },
            recipe_suggestion: "Введите калории вручную или сделайте новое фото."
        };
    }
}
