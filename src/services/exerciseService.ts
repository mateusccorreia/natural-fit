import type { Exercise } from '../types/workout';
import { exercises } from '../data/exercises';

// Reverse mapping for display
export const BODY_PART_TRANSLATIONS: Record<string, string> = {
    'chest': 'Peito',
    'back': 'Costas',
    'legs': 'Pernas',
    'upper legs': 'Pernas',
    'lower legs': 'Panturrilha',
    'shoulders': 'Ombros',
    'arms': 'Braços',
    'upper arms': 'Braços',
    'lower arms': 'Antebraço',
    'abs': 'Abdômen',
    'waist': 'Abdômen',
    'cardio': 'Cardio',
    'neck': 'Pescoço'
};

export const exerciseService = {
    async getAllExercises(limit = 50, offset = 0): Promise<Exercise[]> {
        // Return local exercises, simulating pagination if needed
        return exercises.slice(offset, offset + limit);
    },

    async searchExercises(term: string): Promise<Exercise[]> {
        const lowerTerm = term.toLowerCase();
        return exercises.filter(ex =>
            ex.name.toLowerCase().includes(lowerTerm) ||
            ex.description.toLowerCase().includes(lowerTerm)
        );
    },

    async getBodyParts(): Promise<string[]> {
        // Return unique muscle groups from local data, translated
        const groups = new Set(exercises.map(ex => BODY_PART_TRANSLATIONS[ex.muscleGroup] || ex.muscleGroup));
        return Array.from(groups);
    },

    async getExercisesByBodyPart(groupName: string): Promise<Exercise[]> {
        // Filter by translated name
        return exercises.filter(ex => {
            const translated = BODY_PART_TRANSLATIONS[ex.muscleGroup] || ex.muscleGroup;
            return translated === groupName;
        });
    }
};
