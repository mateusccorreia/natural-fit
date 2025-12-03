import { History, Award } from 'lucide-react';
import { useSmartWorkout } from '../../context/SmartWorkoutContext';
import { type ExperienceHistory } from '../../types/workout';
import clsx from 'clsx';

export function ExperienceSelector() {
  const { experience, setExperience } = useSmartWorkout();

  const options: { id: ExperienceHistory; label: string; desc: string }[] = [
    { id: 'nunca', label: 'Nunca treinei', desc: 'Primeiro contato com musculação' },
    { id: 'parou', label: 'Já treinei mas parei', desc: 'Retornando aos treinos' },
    { id: 'menos_1_ano', label: 'Treino há menos de 1 ano', desc: 'Iniciante consistente' },
    { id: '1_3_anos', label: 'Treino há 1–3 anos', desc: 'Intermediário' },
    { id: 'mais_3_anos', label: 'Treino há 3+ anos', desc: 'Experiente / Avançado' },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <History className="w-5 h-5 text-blue-500" />
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Qual sua experiência com treino?
        </label>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => setExperience(option.id)}
            className={clsx(
              "w-full p-3 rounded-lg border-2 text-left transition-all flex items-center justify-between",
              experience === option.id
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : "border-gray-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-800"
            )}
          >
            <div>
              <div className={clsx(
                "font-medium",
                experience === option.id ? "text-blue-700 dark:text-blue-400" : "text-slate-700 dark:text-slate-300"
              )}>
                {option.label}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {option.desc}
              </div>
            </div>
            {experience === option.id && <Award className="w-4 h-4 text-blue-500" />}
          </button>
        ))}
      </div>
    </div>
  );
}
