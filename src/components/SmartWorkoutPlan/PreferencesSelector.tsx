import { ThumbsUp, Zap } from 'lucide-react';
import { useSmartWorkout } from '../../context/SmartWorkoutContext';
import clsx from 'clsx';

export function PreferencesSelector() {
  const { preferences, togglePreferenceFocus } = useSmartWorkout();
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <ThumbsUp className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Preferências Específicas
        </h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          onClick={() => togglePreferenceFocus('focoGluteos')}
          className={clsx(
            "p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between",
            preferences.focoGluteos
              ? "border-pink-500 bg-pink-50 dark:bg-pink-900/20"
              : "border-gray-100 dark:border-slate-700 hover:border-pink-200"
          )}
        >
          <div>
            <div className={clsx("font-medium", preferences.focoGluteos ? "text-pink-700 dark:text-pink-400" : "text-slate-900 dark:text-white")}>
              Focar em Glúteos?
            </div>
            <div className="text-xs text-slate-500">Aumenta frequência/volume</div>
          </div>
          {preferences.focoGluteos && <Zap className="w-4 h-4 text-pink-500" />}
        </button>

        <button
          onClick={() => togglePreferenceFocus('focoPeito')}
          className={clsx(
            "p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between",
            preferences.focoPeito
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
              : "border-gray-100 dark:border-slate-700 hover:border-blue-200"
          )}
        >
          <div>
            <div className={clsx("font-medium", preferences.focoPeito ? "text-blue-700 dark:text-blue-400" : "text-slate-900 dark:text-white")}>
              Focar em Peitoral?
            </div>
            <div className="text-xs text-slate-500">Aumenta frequência/volume</div>
          </div>
          {preferences.focoPeito && <Zap className="w-4 h-4 text-blue-500" />}
        </button>
      </div>
    </div>
  );
}
