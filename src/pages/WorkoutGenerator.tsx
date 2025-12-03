import { BicepsFlexed } from 'lucide-react';
import { SmartWorkoutProvider, useSmartWorkout } from '../context/SmartWorkoutContext';
import { GenderSelector } from '../components/SmartWorkoutPlan/GenderSelector';
import { BiometricsSelector } from '../components/SmartWorkoutPlan/BiometricsSelector';
import { GoalSelector } from '../components/SmartWorkoutPlan/GoalSelector';
import { FrequencySelector } from '../components/SmartWorkoutPlan/FrequencySelector';
import { TimeAvailability } from '../components/SmartWorkoutPlan/TimeAvailability';
import { EquipmentSelector } from '../components/SmartWorkoutPlan/EquipmentSelector';
import { WorkoutPreview } from '../components/SmartWorkoutPlan/WorkoutPreview';
import { LimitationsSelector } from '../components/SmartWorkoutPlan/LimitationsSelector';
import { PreferencesSelector } from '../components/SmartWorkoutPlan/PreferencesSelector';

import { ExperienceSelector } from '../components/SmartWorkoutPlan/ExperienceSelector';
import { MuscleFocusSelector } from '../components/SmartWorkoutPlan/MuscleFocusSelector';
import { InjuriesSelector } from '../components/SmartWorkoutPlan/InjuriesSelector';

function GeneratorContent() {
  const { generateWorkout, isGenerating, currentPlan, resetPlan } = useSmartWorkout();

  if (currentPlan) {
    return (
      <div className="space-y-6">
        <WorkoutPreview />
        <div className="flex gap-4">
          <button
            onClick={resetPlan}
            className="flex-1 py-3 px-4 rounded-xl border border-gray-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-medium hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
          >
            Voltar e Editar
          </button>
          <button
            onClick={() => {/* Save logic would go here */}}
            className="flex-1 py-3 px-4 rounded-xl bg-violet-600 text-white font-bold hover:bg-violet-700 shadow-lg shadow-violet-500/30 transition-all"
          >
            Salvar Treino
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 space-y-8">
      {/* 1. Dados Básicos */}
      <GenderSelector />
      <BiometricsSelector />
      
      {/* 2. Objetivos */}
      <GoalSelector />
      
      {/* 3. Frequência */}
      <FrequencySelector />
      
      {/* 4. Tempo Disponível */}
      <TimeAvailability />
      
      {/* 5. Local/Equipamentos */}
      <EquipmentSelector />
      
      {/* 6. Restrições/Limitações */}
      <LimitationsSelector />
      
      {/* 7. Experiência */}
      <ExperienceSelector />
      
      {/* 8. Preferências */}
      <PreferencesSelector />
      
      {/* 9. Foco Muscular */}
      <MuscleFocusSelector />
      
      {/* 10. Lesões */}
      <InjuriesSelector />

      <button
        onClick={generateWorkout}
        disabled={isGenerating}
        className="w-full py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-violet-500/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isGenerating ? (
          <>
            <BicepsFlexed className="w-6 h-6 mr-2 animate-spin" />
            Gerando seu treino...
          </>
        ) : (
          <>
            <BicepsFlexed className="w-6 h-6 mr-2" />
            Gerar Treino Inteligente
          </>
        )}
      </button>
    </div>
  );
}

export function WorkoutGenerator() {
  return (
    <SmartWorkoutProvider>
      <div className="max-w-3xl mx-auto space-y-8 pb-12">
        <header className="text-center">
          <div className="mx-auto h-16 w-16 bg-violet-100 dark:bg-violet-900/30 rounded-2xl flex items-center justify-center mb-4">
            <BicepsFlexed className="w-8 h-8 text-violet-600 dark:text-violet-400" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Gerador de Treinos
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
            Montagem de treinos baseada em ciência — adaptada ao seu nível, objetivo e rotina.
          </p>
        </header>

        <GeneratorContent />
      </div>
    </SmartWorkoutProvider>
  );
}
