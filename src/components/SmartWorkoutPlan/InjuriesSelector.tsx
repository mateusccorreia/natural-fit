import React from 'react';
import { Stethoscope, ShieldCheck } from 'lucide-react';
import { useSmartWorkout } from '../../context/SmartWorkoutContext';
import { type Injury } from '../../types/workout';
import clsx from 'clsx';

export function InjuriesSelector() {
  const { injuries, toggleInjury } = useSmartWorkout();

  const options: { id: Injury; label: string }[] = [
    { id: 'muscular', label: 'Lesões Musculares (últimos 12 meses)' },
    { id: 'articular', label: 'Lesões Articulares' },
    { id: 'cirurgia', label: 'Cirurgias Recentes' },
    { id: 'nenhuma', label: 'Nenhuma' },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Stethoscope className="w-5 h-5 text-red-500" />
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Histórico de Lesões Recentes
        </label>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {options.map((option) => {
          const isSelected = injuries.includes(option.id);
          return (
            <button
              key={option.id}
              onClick={() => toggleInjury(option.id)}
              className={clsx(
                "w-full p-3 rounded-lg border text-left transition-all flex items-center justify-between",
                isSelected
                  ? "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300"
                  : "border-gray-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-red-200"
              )}
            >
              <span className="text-sm font-medium">{option.label}</span>
              {isSelected && <ShieldCheck className="w-4 h-4" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
