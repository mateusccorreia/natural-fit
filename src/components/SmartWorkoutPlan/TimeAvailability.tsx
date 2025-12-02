import { Clock } from 'lucide-react';
import { useSmartWorkout } from '../../context/SmartWorkoutContext';
import clsx from 'clsx';

export function TimeAvailability() {
  const { timeAvailable, setTimeAvailable } = useSmartWorkout();

  const times = [30, 45, 60, 90];

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
        Quanto tempo você tem para treinar?
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {times.map((time) => (
          <button
            key={time}
            onClick={() => setTimeAvailable(time)}
            className={clsx(
              "py-4 px-2 rounded-xl border-2 transition-all flex flex-col items-center justify-center",
              timeAvailable === time
                ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400"
                : "border-gray-200 dark:border-slate-700 hover:border-violet-200 dark:hover:border-violet-800 hover:bg-gray-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
            )}
          >
            <Clock className={clsx("w-6 h-6 mb-2", timeAvailable === time ? "text-violet-500" : "text-slate-400")} />
            <span className="font-bold text-lg">{time === 90 ? '90+' : time}</span>
            <span className="text-xs opacity-80">minutos</span>
          </button>
        ))}
      </div>
    </div>
  );
}
