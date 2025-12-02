export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface Food {
    id: string;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    servingSize: string; // e.g., "100g"
}

export interface MealFood {
    id: string;
    foodId: string;
    food: Food;
    quantity: number; // multiplier of servingSize
}

export interface Meal {
    id: string;
    type: MealType;
    name: string;
    foods: MealFood[];
    time?: string;
}

export interface DailyLog {
    id: string;
    date: string;
    meals: Meal[];
    waterIntake: number; // in ml
    caloriesConsumed: number;
    proteinConsumed: number;
    carbsConsumed: number;
    fatsConsumed: number;
}

export interface NutritionState {
    dailyLogs: DailyLog[];
    activeLog: DailyLog | null;
    calorieGoal: number;
    macroGoals: {
        protein: number;
        carbs: number;
        fats: number;
    };
    waterGoal: number;
    addFoodToMeal: (date: string, mealType: MealType, food: Food, quantity: number) => void;
    removeFoodFromMeal: (date: string, mealType: MealType, mealFoodId: string) => void;
    updateWaterIntake: (date: string, amount: number) => void;
    calculateGoals: (profile: any) => void; // profile type to be imported or any for now
}
