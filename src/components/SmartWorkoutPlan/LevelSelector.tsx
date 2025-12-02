import { Zap, Shield, Trophy } from 'lucide-react';
import { useSmartWorkout, type Level } from '../../context/SmartWorkoutContext';
import clsx from 'clsx';

export function LevelSelector() {
  const { level, setLevel, isTraining, setIsTraining, trainingDuration, setTrainingDuration } = useSmartWorkout();

  const handleTrainingDurationChange = (months: number) => {
    setTrainingDuration(months);
    
    // Auto-set level based on duration
    if (months < 3) setLevel('iniciante');
    else if (months <= 12) setLevel('intermediario');
    else setLevel('avancado');
  };

  const levels: { id: Level; label: string; icon: any; desc: string }[] = [
    { 
      id: 'iniciante', 
      label: 'Iniciante', 
      icon: Shield,
      desc: 'Nunca treinei ou estou voltando agora'
    },
    { 
      id: 'intermediario', 
      label: 'Intermediário', 
      icon: Zap,
      desc: 'Treino regularmente há pelo menos 6 meses'
    },
    { 
      id: 'avancado', 
      label: 'Avançado', 
      icon: Trophy,
      desc: 'Treino pesado há mais de 2 anos'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Você já está treinando atualmente?
        </label>
        <div className="flex gap-4">
          <button
            onClick={() => {
              setIsTraining(true);
              // Default to intermediate if they say yes, but duration will refine it
              if (trainingDuration === 0) setLevel('intermediario');
            }}
            className={clsx(
              "flex-1 py-3 px-4 rounded-xl border-2 font-medium transition-all",
              isTraining
                ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400"
                : "border-gray-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800"
            )}
          >
            Sim, já treino
          </button>
          <button
            onClick={() => {
              setIsTraining(false);
              setTrainingDuration(0);
              setLevel('iniciante');
            }}
            className={clsx(
              "flex-1 py-3 px-4 rounded-xl border-2 font-medium transition-all",
              !isTraining
                ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400"
                : "border-gray-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800"
            )}
          >
            Não, estou parado
          </button>
        </div>
      </div>

      {isTraining && (
        <div className="space-y-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Há quanto tempo você treina? (em meses)
          </label>
          <div className="relative">
            <input
              type="number"
              min="1"
              max="120"
              value={trainingDuration || ''}
              onChange={(e) => handleTrainingDurationChange(parseInt(e.target.value) || 0)}
              placeholder="Ex: 6"
              className="w-full p-4 rounded-xl border-2 border-gray-200 dark:border-slate-700 bg-transparent focus:border-violet-500 focus:ring-0 transition-colors text-lg"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              meses
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            * Ajustaremos seu nível automaticamente com base no seu tempo de treino.
          </p>
        </div>
      )}

      <div className="space-y-3">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Nível Sugerido (você pode alterar se preferir):
        </label>
        <div className="grid grid-cols-1 gap-3">
          {levels.map((item) => (
            <button
              key={item.id}
              onClick={() => setLevel(item.id)}
              className={clsx(
                "relative p-4 rounded-xl border-2 transition-all text-left flex items-center group",
                level === item.id
                  ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20"
                  : "border-gray-200 dark:border-slate-700 hover:border-violet-200 dark:hover:border-violet-800 hover:bg-gray-50 dark:hover:bg-slate-800"
              )}
            >
              <div className={clsx(
                "p-3 rounded-lg mr-4 transition-colors",
                level === item.id
                  ? "bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400"
                  : "bg-gray-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-white dark:group-hover:bg-slate-700"
              )}>
                <item.icon className="w-6 h-6" />
              </div>
              <div>
                <div className={clsx(
                  "font-bold text-lg",
                  level === item.id ? "text-violet-700 dark:text-violet-400" : "text-slate-900 dark:text-white"
                )}>
                  {item.label}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {item.desc}
                </div>
              </div>
              {level === item.id && (
                <div className="absolute top-4 right-4 w-3 h-3 bg-violet-500 rounded-full shadow-sm shadow-violet-500/50" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
