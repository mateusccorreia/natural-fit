export type UserLevel = 'beginner' | 'intermediate' | 'advanced';
export type UserGoal = 'gain_muscle' | 'definition' | 'lose_fat' | 'strength';
export type Gender = 'male' | 'female' | 'other';

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    age: number;
    gender: Gender;
    height: number; // in cm
    weight: number; // in kg
    bodyFat?: number; // percentage
    experienceLevel: UserLevel;
    goal: UserGoal;
    dietaryRestrictions?: string[];
    injuries?: string[];
    avatarUrl?: string;
    createdAt: string;
}

export interface AuthState {
    user: UserProfile | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string) => Promise<void>;
    register: (data: Partial<UserProfile>) => Promise<void>;
    logout: () => void;
    updateProfile: (data: Partial<UserProfile>) => void;
}
