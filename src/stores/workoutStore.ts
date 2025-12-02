import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { WorkoutState, WorkoutRoutine, WorkoutSession, Set, Exercise } from '../types/workout';
import { exercises } from '../data/exercises';

export const useWorkoutStore = create<WorkoutState>()(
    persist(
        (set, get) => ({
            exercises: exercises,
            routines: [],
            activeSession: null,
            history: [],

            startWorkout: (routineId: string) => {
                const routine = get().routines.find(r => r.id === routineId);
                if (!routine) return;

                const newSession: WorkoutSession = {
                    id: Math.random().toString(36).substr(2, 9),
                    routineId,
                    date: new Date().toISOString(),
                    duration: 0,
                    exercises: routine.exercises.map(e => ({
                        ...e,
                        sets: e.sets.map(s => ({ ...s, completed: false }))
                    })),
                    completed: false,
                };

                set({ activeSession: newSession });
            },

            finishWorkout: () => {
                const { activeSession, history } = get();
                if (!activeSession) return;

                const completedSession = { ...activeSession, completed: true, duration: 45 }; // Mock duration
                set({
                    activeSession: null,
                    history: [completedSession, ...history]
                });
            },

            updateSet: (exerciseId: string, setId: string, data: Partial<Set>) => {
                const { activeSession } = get();
                if (!activeSession) return;

                const updatedExercises = activeSession.exercises.map(e => {
                    if (e.id !== exerciseId) return e;
                    return {
                        ...e,
                        sets: e.sets.map(s => s.id === setId ? { ...s, ...data } : s)
                    };
                });

                set({ activeSession: { ...activeSession, exercises: updatedExercises } });
            },

            addRoutine: (routine: WorkoutRoutine) => {
                set((state) => ({ routines: [...state.routines, routine] }));
            },

            updateExercise: (exerciseId: string, data: Partial<Exercise>) => {
                set((state) => ({
                    exercises: state.exercises.map((e) =>
                        e.id === exerciseId ? { ...e, ...data } : e
                    ),
                }));
            },
        }),
        {
            name: 'natural-fit-workout',
        }
    )
);
