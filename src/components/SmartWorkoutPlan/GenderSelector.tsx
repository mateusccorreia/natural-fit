import { User } from 'lucide-react';
import { useSmartWorkout } from '../../context/SmartWorkoutContext';
import clsx from 'clsx';

export function GenderSelector() {
  const { gender, setGender } = useSmartWorkout();

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
        Qual é o seu gênero?
      </label>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setGender('male')}
          className={clsx(
            "p-4 rounded-xl border-2 transition-all flex items-center justify-center gap-3",
            gender === 'male'
              ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400"
              : "border-gray-200 dark:border-slate-700 hover:border-violet-200 dark:hover:border-violet-800 hover:bg-gray-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
          )}
        >
          <User className="w-6 h-6" />
          <span className="font-bold text-lg">Homem</span>
        </button>

        <button
          onClick={() => setGender('female')}
          className={clsx(
            "p-4 rounded-xl border-2 transition-all flex items-center justify-center gap-3",
            gender === 'female'
              ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400"
              : "border-gray-200 dark:border-slate-700 hover:border-violet-200 dark:hover:border-violet-800 hover:bg-gray-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
          )}
        >
          <User className="w-6 h-6" />
          <span className="font-bold text-lg">Mulher</span>
        </button>
      </div>
    </div>
  );
}
