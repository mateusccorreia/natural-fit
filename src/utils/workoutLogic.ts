import type { Goal, Level, Equipment, WorkoutRoutine, RoutineSession, WorkoutExercise, MuscleGroup, ExperienceHistory, MuscleFocus, Injury } from '../types/workout';
import { generateWorkout } from './workoutGenerator';
import type { Anamnese } from '../types/workout';

// --- Types ---
type Sex = 'male' | 'female';

export interface UserProfile {
    sex: Sex;
    level: Level;
    experience: ExperienceHistory;
    goals: Goal[];
    daysPerWeek: number;
    timeAvailable: number;
    equipment: Equipment[];
    weight: number; // kg
    height: number; // cm
    age?: number;
    limitations?: {
        lombar: boolean;
        ombro: boolean;
        joelho: boolean;
        cervical: boolean;
    };
    injuries: Injury[];
    muscleFocus: MuscleFocus[];
    preferences?: {
        gosta: string[];
        naoGosta: string[];
        focoGluteos: boolean;
        focoPeito: boolean;
    };
}

// --- Main Generator Function (Adapter) ---

export function generateWorkoutPlan(profile: UserProfile): WorkoutRoutine {
    // 1. Map UserProfile to Anamnese
    const anamnese: Anamnese = {
        sexo: profile.sex === 'male' ? 'masculino' : 'feminino',
        idade: profile.age || 30, // Default if missing
        peso: profile.weight,
        altura: profile.height,
        objetivos: profile.goals,
        frequenciaTreino: profile.daysPerWeek,
        tempoPorTreino: profile.timeAvailable,
        localTreino: 'academia', // Default or derived
        equipamentos: profile.equipment,
        nivelExperiencia: profile.level,
        experiencia: profile.experience,
        focoMuscular: profile.muscleFocus,
        lesoes: profile.injuries,
        limitacoes: profile.limitations || { lombar: false, ombro: false, joelho: false, cervical: false },
        preferencias: profile.preferences || { gosta: [], naoGosta: [], focoGluteos: false, focoPeito: false }
    };

    // 2. Call the new generator
    const generated = generateWorkout(anamnese);

    // 3. Map GeneratedWorkout to WorkoutRoutine
    const sessions: RoutineSession[] = generated.diasDeTreino.map((dia, index) => {
        const exercises: WorkoutExercise[] = dia.exercicios.map((ex, idx) => ({
            id: `ex-${dia.dia}-${idx}-${Math.random().toString(36).substr(2, 5)}`,
            name: ex.nome,
            sets: ex.series,
            reps: ex.reps,
            rest: 60, // Default rest
            muscleGroup: mapMuscleToEnglish(ex.musculo),
            equipment: ['academia'], // Placeholder
            difficulty: 'intermediate',
            notes: `RIR: ${ex.rir}`
        }));

        // Calculate duration (approx 3 min per set + transition)
        const totalSets = exercises.reduce((acc, ex) => acc + (typeof ex.sets === 'number' ? ex.sets : 3), 0);
        const duration = totalSets * 3;

        return {
            id: `session-${index}`,
            name: `Treino ${String.fromCharCode(65 + index)} - ${dia.split}`,
            muscleGroups: Array.from(new Set(exercises.map(e => e.muscleGroup))),
            exercises: exercises,
            duration: duration
        };
    });

    const primaryGoal = profile.goals.length > 0 ? profile.goals[0] : 'hipertrofia';

    return {
        id: `routine-${Date.now()}`,
        name: `SmartPlan ${primaryGoal.charAt(0).toUpperCase() + primaryGoal.slice(1)}`,
        description: `Plano personalizado de ${profile.daysPerWeek} dias focado em ${primaryGoal}.`,
        split: sessions.map(s => s.name.split(' - ')[1]).join(' / '), // Rough split name
        frequency: Array(profile.daysPerWeek).fill('day'),
        sessions: sessions
    };
}

function mapMuscleToEnglish(ptMuscle: string): MuscleGroup {
    const map: Record<string, MuscleGroup> = {
        'peito': 'chest',
        'costas': 'back',
        'pernas': 'legs',
        'ombros': 'shoulders',
        'bracos': 'arms',
        'abdomen': 'abs',
        'gluteos': 'legs', // Map to legs as per type definition usually
    };
    return map[ptMuscle] || 'chest';
}
