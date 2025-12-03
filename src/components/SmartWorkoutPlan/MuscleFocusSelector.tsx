import { Target } from 'lucide-react';
import { useSmartWorkout } from '../../context/SmartWorkoutContext';
import { type MuscleFocus } from '../../types/workout';
import clsx from 'clsx';

export function MuscleFocusSelector() {
  const { muscleFocus, toggleMuscleFocus } = useSmartWorkout();

  const options: { id: MuscleFocus; label: string }[] = [
    { id: 'perna', label: 'Pernas' },
    { id: 'braco', label: 'Braços' },
    { id: 'peito', label: 'Peito' },
    { id: 'costas', label: 'Costas' },
    { id: 'gluteos', label: 'Glúteos' },
    { id: 'abs', label: 'Abdômen' },
    { id: 'nenhum', label: 'Sem preferência' },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Target className="w-5 h-5 text-purple-500" />
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Objetivo específico (Foco Muscular)
        </label>
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = muscleFocus.includes(option.id);
          return (
            <button
              key={option.id}
              onClick={() => toggleMuscleFocus(option.id)}
              className={clsx(
                "px-4 py-2 rounded-full border transition-all text-sm font-medium",
                isSelected
                  ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300"
                  : "border-gray-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-purple-200"
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
