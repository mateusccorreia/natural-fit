import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { 
  Goal, 
  Level, 
  ExperienceHistory, 
  Equipment, 
  Injury, 
  MuscleFocus, 
  GeneratedWorkout,
  Anamnese 
} from '../types/workout';
import { generateWorkout as generateFitNowWorkout } from '../utils/workoutGenerator';

export interface SmartWorkoutState {
  gender: 'male' | 'female';
  goals: Goal[];
  level: Level;
  experience: ExperienceHistory;
  daysPerWeek: number;
  timeAvailable: number;
  equipment: Equipment[];
  weight: number;
  height: number;
  currentPlan: GeneratedWorkout | null;
  fatigueScore: number;
  isGenerating: boolean;
  limitations: {
    lombar: boolean;
    ombro: boolean;
    joelho: boolean;
    cervical: boolean;
  };
  injuries: Injury[];
  muscleFocus: MuscleFocus[];
  preferences: {
    gosta: string[];
    naoGosta: string[];
    focoGluteos: boolean;
    focoPeito: boolean;
  };
  isTraining: boolean;
  trainingDuration: number;
}

interface SmartWorkoutContextType extends SmartWorkoutState {
  setGender: (gender: 'male' | 'female') => void;
  toggleGoal: (goal: Goal) => void;
  setLevel: (level: Level) => void;
  setExperience: (exp: ExperienceHistory) => void;
  setDaysPerWeek: (days: number) => void;
  setTimeAvailable: (time: number) => void;
  setEquipment: (equipment: Equipment[]) => void;
  setWeight: (weight: number) => void;
  setHeight: (height: number) => void;
  toggleEquipment: (eq: Equipment) => void;
  generateWorkout: () => Promise<void>;
  resetPlan: () => void;
  setFatigueScore: (score: number) => void;
  toggleLimitation: (limitation: 'lombar' | 'ombro' | 'joelho' | 'cervical') => void;
  toggleInjury: (injury: Injury) => void;
  toggleMuscleFocus: (focus: MuscleFocus) => void;
  togglePreferenceFocus: (focus: 'focoGluteos' | 'focoPeito') => void;
  setIsTraining: (isTraining: boolean) => void;
  setTrainingDuration: (months: number) => void;
}

const SmartWorkoutContext = createContext<SmartWorkoutContextType | undefined>(undefined);

export const useSmartWorkout = () => {
  const context = useContext(SmartWorkoutContext);
  if (!context) {
    throw new Error('useSmartWorkout must be used within a SmartWorkoutProvider');
  }
  return context;
};

interface SmartWorkoutProviderProps {
  children: ReactNode;
}

export const SmartWorkoutProvider: React.FC<SmartWorkoutProviderProps> = ({ children }) => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [daysPerWeek, setDaysPerWeek] = useState<number>(3);
  const [goals, setGoals] = useState<Goal[]>(['hipertrofia']);
  const [level, setLevel] = useState<Level>('intermediario');
  const [experience, setExperience] = useState<ExperienceHistory>('1_3_anos');
  const [timeAvailable, setTimeAvailable] = useState<number>(45);
  const [equipment, setEquipment] = useState<Equipment[]>(['academia']);
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(170);
  const [currentPlan, setCurrentPlan] = useState<GeneratedWorkout | null>(null);
  const [fatigueScore, setFatigueScore] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [limitations, setLimitations] = useState({
    lombar: false,
    ombro: false,
    joelho: false,
    cervical: false
  });
  const [injuries, setInjuries] = useState<Injury[]>([]);
  const [muscleFocus, setMuscleFocus] = useState<MuscleFocus[]>([]);
  const [preferences, setPreferences] = useState({
    gosta: [],
    naoGosta: [],
    focoGluteos: false,
    focoPeito: false
  });
  const [isTraining, setIsTraining] = useState<boolean>(false);
  const [trainingDuration, setTrainingDuration] = useState<number>(0);

  const toggleGoal = (goal: Goal) => {
    setGoals(prev => 
      prev.includes(goal)
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  const toggleEquipment = (eq: Equipment) => {
    setEquipment(prev => 
      prev.includes(eq) 
        ? prev.filter(e => e !== eq)
        : [...prev, eq]
    );
  };

  const toggleLimitation = (limitation: 'lombar' | 'ombro' | 'joelho' | 'cervical') => {
    setLimitations(prev => ({
      ...prev,
      [limitation]: !prev[limitation]
    }));
  };

  const toggleInjury = (injury: Injury) => {
    setInjuries(prev => 
      prev.includes(injury)
        ? prev.filter(i => i !== injury)
        : [...prev, injury]
    );
  };

  const toggleMuscleFocus = (focus: MuscleFocus) => {
    setMuscleFocus(prev => 
      prev.includes(focus)
        ? prev.filter(f => f !== focus)
        : [...prev, focus]
    );
  };

  const togglePreferenceFocus = (focus: 'focoGluteos' | 'focoPeito') => {
    setPreferences(prev => ({
      ...prev,
      [focus]: !prev[focus]
    }));
  };

  const generateWorkout = async () => {
    setIsGenerating(true);

    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1500));

    const anamnese: Anamnese = {
      sexo: gender === 'male' ? 'masculino' : 'feminino',
      idade: 30, // Default
      peso: weight,
      altura: height,
      objetivos: goals,
      frequenciaTreino: daysPerWeek,
      tempoPorTreino: timeAvailable,
      localTreino: 'academia', // Default or derived
      equipamentos: equipment,
      nivelExperiencia: level,
      experiencia: experience,
      focoMuscular: muscleFocus,
      lesoes: injuries,
      limitacoes: limitations,
      preferencias: preferences,
      isTraining: isTraining,
      trainingDuration: trainingDuration
    };

    const generatedRoutine = generateFitNowWorkout(anamnese);

    setCurrentPlan(generatedRoutine);
    setIsGenerating(false);
  };

  const resetPlan = () => {
    setCurrentPlan(null);
  };

  return (
    <SmartWorkoutContext.Provider
      value={{
        gender,
        goals,
        level,
        experience,
        daysPerWeek,
        timeAvailable,
        equipment,
        weight,
        height,
        currentPlan,
        fatigueScore,
        isGenerating,
        limitations,
        injuries,
        muscleFocus,
        preferences,
        setGender,
        toggleGoal,
        setLevel,
        setExperience,
        setDaysPerWeek,
        setTimeAvailable,
        setEquipment,
        setWeight,
        setHeight,
        toggleEquipment,
        generateWorkout,
        resetPlan,
        setFatigueScore,
        toggleLimitation,
        toggleInjury,
        toggleMuscleFocus,
        togglePreferenceFocus,
        isTraining,
        setIsTraining,
        trainingDuration,
        setTrainingDuration
      }}
    >
      {children}
    </SmartWorkoutContext.Provider>
  );
};
