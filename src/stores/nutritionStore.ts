import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { NutritionState, DailyLog, MealType, Food } from '../types/nutrition';

const INITIAL_GOALS = {
    calories: 2500,
    protein: 160,
    carbs: 300,
    fats: 70,
    water: 3000,
};

export const useNutritionStore = create<NutritionState>()(
    persist(
        (set) => ({
            dailyLogs: [],
            activeLog: null,
            calorieGoal: INITIAL_GOALS.calories,
            macroGoals: {
                protein: INITIAL_GOALS.protein,
                carbs: INITIAL_GOALS.carbs,
                fats: INITIAL_GOALS.fats,
            },
            waterGoal: INITIAL_GOALS.water,

            addFoodToMeal: (date: string, mealType: MealType, food: Food, quantity: number) => {
                set((state) => {
                    const existingLogIndex = state.dailyLogs.findIndex(l => l.date === date);
                    let newLogs = [...state.dailyLogs];
                    let log: DailyLog;

                    if (existingLogIndex >= 0) {
                        log = { ...newLogs[existingLogIndex] };
                    } else {
                        log = {
                            id: Math.random().toString(36).substr(2, 9),
                            date,
                            meals: [],
                            waterIntake: 0,
                            caloriesConsumed: 0,
                            proteinConsumed: 0,
                            carbsConsumed: 0,
                            fatsConsumed: 0,
                        };
                        newLogs.push(log);
                    }

                    const existingMealIndex = log.meals.findIndex(m => m.type === mealType);
                    let meals = [...log.meals];

                    if (existingMealIndex >= 0) {
                        const meal = { ...meals[existingMealIndex] };
                        meal.foods.push({
                            id: Math.random().toString(36).substr(2, 9),
                            foodId: food.id,
                            food,
                            quantity,
                        });
                        meals[existingMealIndex] = meal;
                    } else {
                        meals.push({
                            id: Math.random().toString(36).substr(2, 9),
                            type: mealType,
                            name: mealType === 'breakfast' ? 'Café da Manhã' :
                                mealType === 'lunch' ? 'Almoço' :
                                    mealType === 'dinner' ? 'Jantar' : 'Lanche',
                            foods: [{
                                id: Math.random().toString(36).substr(2, 9),
                                foodId: food.id,
                                food,
                                quantity,
                            }],
                        });
                    }

                    log.meals = meals;

                    // Recalculate totals
                    log.caloriesConsumed += food.calories * quantity;
                    log.proteinConsumed += food.protein * quantity;
                    log.carbsConsumed += food.carbs * quantity;
                    log.fatsConsumed += food.fats * quantity;

                    if (existingLogIndex >= 0) {
                        newLogs[existingLogIndex] = log;
                    }

                    return { dailyLogs: newLogs, activeLog: log };
                });
            },

            removeFoodFromMeal: (date: string, mealType: MealType, mealFoodId: string) => {
                set((state) => {
                    const existingLogIndex = state.dailyLogs.findIndex(l => l.date === date);
                    if (existingLogIndex === -1) return state;

                    let newLogs = [...state.dailyLogs];
                    const log = { ...newLogs[existingLogIndex] };

                    const existingMealIndex = log.meals.findIndex(m => m.type === mealType);
                    if (existingMealIndex === -1) return state;

                    let meals = [...log.meals];
                    const meal = { ...meals[existingMealIndex] };

                    const foodToRemoveIndex = meal.foods.findIndex(f => f.id === mealFoodId);
                    if (foodToRemoveIndex === -1) return state;

                    const foodToRemove = meal.foods[foodToRemoveIndex];

                    // Remove food
                    meal.foods = meal.foods.filter(f => f.id !== mealFoodId);
                    meals[existingMealIndex] = meal;
                    log.meals = meals;

                    // Recalculate totals
                    log.caloriesConsumed -= foodToRemove.food.calories * foodToRemove.quantity;
                    log.proteinConsumed -= foodToRemove.food.protein * foodToRemove.quantity;
                    log.carbsConsumed -= foodToRemove.food.carbs * foodToRemove.quantity;
                    log.fatsConsumed -= foodToRemove.food.fats * foodToRemove.quantity;

                    // Ensure no negative values (just in case)
                    log.caloriesConsumed = Math.max(0, log.caloriesConsumed);
                    log.proteinConsumed = Math.max(0, log.proteinConsumed);
                    log.carbsConsumed = Math.max(0, log.carbsConsumed);
                    log.fatsConsumed = Math.max(0, log.fatsConsumed);

                    newLogs[existingLogIndex] = log;

                    return { dailyLogs: newLogs, activeLog: log };
                });
            },

            updateWaterIntake: (date: string, amount: number) => {
                set((state) => {
                    const existingLogIndex = state.dailyLogs.findIndex(l => l.date === date);
                    let newLogs = [...state.dailyLogs];

                    if (existingLogIndex >= 0) {
                        const log = { ...newLogs[existingLogIndex] };
                        log.waterIntake = Math.max(0, log.waterIntake + amount);
                        newLogs[existingLogIndex] = log;
                        return { dailyLogs: newLogs, activeLog: log };
                    }

                    return state;
                });
            },

            calculateGoals: (profile: any) => {
                if (!profile) return;

                // Mock calculation
                const bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5;
                const tdee = bmr * 1.55; // Moderate activity

                const goalCalories = profile.goal === 'lose_fat' ? tdee - 500 :
                    profile.goal === 'gain_muscle' ? tdee + 300 : tdee;

                set({
                    calorieGoal: Math.round(goalCalories),
                    macroGoals: {
                        protein: Math.round(profile.weight * 2),
                        fats: Math.round(profile.weight * 0.8),
                        carbs: Math.round((goalCalories - (profile.weight * 2 * 4) - (profile.weight * 0.8 * 9)) / 4),
                    },
                    waterGoal: Math.round(profile.weight * 35),
                });
            },
        }),
        {
            name: 'natural-fit-nutrition',
        }
    )
);
