export type MuscleGroup = 'chest' | 'back' | 'legs' | 'shoulders' | 'arms' | 'abs' | 'cardio';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type Equipment = 'dumbbell' | 'barbell' | 'machine' | 'bodyweight' | 'cables' | 'academia' | 'casa_halteres' | 'elasticos' | 'peso_corpo';

export interface Exercise {
    id: string;
    name: string;
    muscleGroup: MuscleGroup;
    difficulty: Difficulty;
    equipment: Equipment[];
    description: string;
    videoUrl?: string;
    youtubeId?: string;
    instructions: string[];
    risks?: string[];
}

export interface Set {
    id: string;
    reps: number;
    weight: number;
    completed: boolean;
}

export interface WorkoutExercise {
    id: string;
    name: string;
    sets: number | string;
    reps: string;
    rest: number;
    muscleGroup: MuscleGroup;
    equipment: string[];
    difficulty: string;
    notes?: string;
}

export type WorkoutSplit = 'Full Body' | 'Upper / Lower' | 'PPL' | string;

export type Goal = 'emagrecimento' | 'hipertrofia' | 'definicao' | 'resistencia' | 'saude' | 'forca';
export type Level = 'iniciante' | 'intermediario' | 'avancado';
export type ExperienceHistory = 'nunca' | 'parou' | 'menos_1_ano' | '1_3_anos' | 'mais_3_anos';
export type MuscleFocus = 'perna' | 'braco' | 'peito' | 'costas' | 'gluteos' | 'abs' | 'nenhum';
export type Injury = 'muscular' | 'articular' | 'cirurgia' | 'nenhuma';

export interface RoutineSession {
    id: string;
    name: string;
    muscleGroups: MuscleGroup[];
    exercises: WorkoutExercise[];
    duration: number;
}

export interface WorkoutRoutine {
    id: string;
    name: string;
    description: string;
    split: WorkoutSplit;
    sessions: RoutineSession[];
    frequency: string[];
}

export interface WorkoutSession {
    id: string;
    routineId: string;
    date: string;
    duration: number; // in minutes
    exercises: WorkoutExercise[];
    completed: boolean;
}

export interface WorkoutState {
    exercises: Exercise[];
    routines: WorkoutRoutine[];
    activeSession: WorkoutSession | null;
    history: WorkoutSession[];
    startWorkout: (routineId: string) => void;
    finishWorkout: () => void;
    updateSet: (exerciseId: string, setId: string, data: Partial<Set>) => void;
    addRoutine: (routine: WorkoutRoutine) => void;
    updateExercise: (exerciseId: string, data: Partial<Exercise>) => void;
}

export interface Anamnese {
    sexo: 'masculino' | 'feminino';
    idade: number;
    peso: number;
    altura: number;
    objetivos: Goal[];
    frequenciaTreino: number;
    tempoPorTreino: number;
    localTreino: string;
    equipamentos: string[];
    nivelExperiencia: Level;
    experiencia: ExperienceHistory;
    focoMuscular: MuscleFocus[];
    lesoes: Injury[];
    limitacoes: {
        lombar: boolean;
        ombro: boolean;
        joelho: boolean;
        cervical: boolean;
        [key: string]: boolean;
    };
    preferencias: {
        gosta: string[];
        naoGosta: string[];
        focoGluteos: boolean;
        focoPeito: boolean;
    };
    isTraining: boolean;
    trainingDuration: number; // in months

    // New Advanced Fields
    trainingCompanion?: 'solo' | 'partner' | 'instructor';
    excludedExercises?: string[];
    trainingStyle?: 'machines' | 'free_weights' | 'mixed';
    hatedExercises?: string[];
    technicalComfort?: 'low' | 'medium' | 'high';
    needsQuickWorkout?: boolean;
    sleepHours?: number;
    aestheticGoal?: 'shredded' | 'strong' | 'athletic' | 'voluminous';
}

export interface GeneratedExercise {
    musculo: string;
    nome: string;
    series: number;
    reps: string;
    rir: string;
    observacao?: string;
}

export interface GeneratedDay {
    dia: number;
    split: string;
    exercicios: GeneratedExercise[];
}

export interface GeneratedWeek {
    weekNumber: number;
    phase: 'Adaptation' | 'Base' | 'Stimulus' | 'Deload';
    description: string;
    days: GeneratedDay[];
}

export interface GeneratedWorkout {
    diasDeTreino: GeneratedDay[]; // Legacy support
    periodization?: GeneratedWeek[]; // New FitNow structure
}
