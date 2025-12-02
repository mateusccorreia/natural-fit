import { BatteryWarning, CheckCircle2 } from 'lucide-react';
import { useSmartWorkout } from '../../context/SmartWorkoutContext';

export function DeloadSuggestion() {
  // In a real app, this would be calculated based on history
  // For demo, we'll use a random chance or fixed logic if we had history
  const { fatigueScore } = useSmartWorkout();
  
  // Mock logic: if fatigue score is high (simulated), suggest deload
  const needsDeload = fatigueScore > 7; 

  return (
    <div className="bg-gray-50 dark:bg-slate-700/30 rounded-xl p-5 border border-gray-100 dark:border-slate-700">
      <div className="flex items-center gap-2 mb-4">
        <BatteryWarning className="w-5 h-5 text-purple-500" />
        <h3 className="font-bold text-slate-900 dark:text-white">Status de Recuperação</h3>
      </div>

      {needsDeload ? (
        <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800">
          <p className="text-sm font-bold text-purple-700 dark:text-purple-300 mb-1">
            Sugestão: Semana de Deload
          </p>
          <p className="text-xs text-purple-600 dark:text-purple-400">
            Detectamos queda de performance. Reduza a carga em 50% esta semana para recuperar.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-violet-600 dark:text-violet-400">
            <CheckCircle2 className="w-4 h-4" />
            <span className="font-medium">Recuperação em dia</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Continue progredindo cargas normalmente. O sistema avisará quando você precisar de um descanso.
          </p>
        </div>
      )}
    </div>
  );
}
