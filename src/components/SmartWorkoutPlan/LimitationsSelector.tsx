import { AlertTriangle } from 'lucide-react';
import { useSmartWorkout } from '../../context/SmartWorkoutContext';

export function LimitationsSelector() {
  const { limitations, toggleLimitation } = useSmartWorkout();

  const options = [
    { id: 'lombar', label: 'Lombar', description: 'Evita sobrecarga na coluna' },
    { id: 'ombro', label: 'Ombro', description: 'Evita movimentos acima da cabeça' },
    { id: 'joelho', label: 'Joelho', description: 'Evita alto impacto e flexão profunda' },
    { id: 'cervical', label: 'Cervical', description: 'Evita carga sobre o pescoço' },
  ] as const;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-amber-500" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Possui alguma limitação?
        </h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => toggleLimitation(option.id)}
            className={`
              relative p-4 rounded-xl border-2 text-left transition-all
              ${limitations[option.id]
                ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20'
                : 'border-gray-100 dark:border-slate-700 hover:border-amber-200 dark:hover:border-amber-800'
              }
            `}
          >
            <div className="font-medium text-slate-900 dark:text-white mb-1">
              {option.label}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {option.description}
            </div>
            {limitations[option.id] && (
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-500" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
