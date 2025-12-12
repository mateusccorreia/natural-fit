import { BicepsFlexed } from 'lucide-react';
import { SmartWorkoutProvider, useSmartWorkout } from '../context/SmartWorkoutContext';
import { WorkoutWizard } from '../components/SmartWorkoutPlan/Wizard/WorkoutWizard';

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

        <WorkoutWizard />
      </div>
    </SmartWorkoutProvider>
  );
}
