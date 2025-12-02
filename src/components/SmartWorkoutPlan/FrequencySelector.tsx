import { Calendar } from 'lucide-react';
import { useSmartWorkout } from '../../context/SmartWorkoutContext';
import clsx from 'clsx';

export function FrequencySelector() {
  const { daysPerWeek, setDaysPerWeek } = useSmartWorkout();

  const days = [2, 3, 4, 5, 6];

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
        Quantos dias por semana você vai treinar?
      </label>
      <div className="grid grid-cols-5 gap-2">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setDaysPerWeek(day)}
            className={clsx(
              "py-3 px-2 rounded-xl border-2 transition-all flex flex-col items-center justify-center",
              daysPerWeek === day
                ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400"
                : "border-gray-200 dark:border-slate-700 hover:border-violet-200 dark:hover:border-violet-800 hover:bg-gray-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
            )}
          >
            <Calendar className={clsx("w-5 h-5 mb-1", daysPerWeek === day ? "text-violet-500" : "text-slate-400")} />
            <span className="font-bold text-lg">{day}</span>
            <span className="text-[10px] uppercase font-bold opacity-70">Dias</span>
          </button>
        ))}
      </div>
    </div>
  );
}
