import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState, UserProfile } from '../types/auth';

// Mock user for development
const MOCK_USER: UserProfile = {
    id: '1',
    name: 'Usuário Teste',
    email: 'teste@naturalfit.com',
    age: 25,
    gender: 'male',
    height: 175,
    weight: 75,
    experienceLevel: 'intermediate',
    goal: 'gain_muscle',
    createdAt: new Date().toISOString(),
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            isLoading: false,

            login: async (email: string) => {
                set({ isLoading: true });
                // Simulate API call
                await new Promise((resolve) => setTimeout(resolve, 1000));

                // For now, just log in with mock user if email matches
                if (email) {
                    set({
                        user: { ...MOCK_USER, email },
                        isAuthenticated: true,
                        isLoading: false
                    });
                } else {
                    set({ isLoading: false });
                }
            },

            register: async (data: Partial<UserProfile>) => {
                set({ isLoading: true });
                await new Promise((resolve) => setTimeout(resolve, 1000));

                const newUser = {
                    ...MOCK_USER,
                    ...data,
                    id: Math.random().toString(36).substr(2, 9),
                } as UserProfile;

                set({
                    user: newUser,
                    isAuthenticated: true,
                    isLoading: false
                });
            },

            logout: () => {
                set({ user: null, isAuthenticated: false });
            },

            updateProfile: (data: Partial<UserProfile>) => {
                set((state) => ({
                    user: state.user ? { ...state.user, ...data } : null,
                }));
            },
        }),
        {
            name: 'natural-fit-auth',
        }
    )
);
