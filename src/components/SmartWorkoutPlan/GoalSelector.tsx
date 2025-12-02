import { Target, Dumbbell, Flame, Heart, Activity, BicepsFlexed } from 'lucide-react';
import { useSmartWorkout } from '../../context/SmartWorkoutContext';
import { type Goal } from '../../types/workout';
import clsx from 'clsx';

export function GoalSelector() {
  const { goals, toggleGoal } = useSmartWorkout();

  const goalOptions: { id: Goal; label: string; icon: any; desc: string }[] = [
    { 
      id: 'hipertrofia', 
      label: 'Hipertrofia', 
      icon: Dumbbell,
      desc: 'Ganho de massa muscular'
    },
    { 
      id: 'emagrecimento', 
      label: 'Emagrecimento', 
      icon: Flame,
      desc: 'Queima de gordura'
    },
    { 
      id: 'definicao', 
      label: 'Definição', 
      icon: Target,
      desc: 'Tonificação muscular'
    },
    { 
      id: 'resistencia', 
      label: 'Resistência', 
      icon: Activity,
      desc: 'Melhorar condicionamento'
    },
    { 
      id: 'saude', 
      label: 'Saúde / Básico', 
      icon: Heart,
      desc: 'Manter-se ativo e saudável'
    },
    { 
      id: 'forca', 
      label: 'Força', 
      icon: BicepsFlexed, // Assuming BicepsFlexed exists or use Dumbbell variant
      desc: 'Aumento de força bruta'
    }
  ];

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
        Quais são seus objetivos? (Marque quantos quiser)
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {goalOptions.map((item) => {
          const isSelected = goals.includes(item.id);
          return (
            <button
              key={item.id}
              onClick={() => toggleGoal(item.id)}
              className={clsx(
                "relative p-4 rounded-xl border-2 transition-all text-left flex items-center group",
                isSelected
                  ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20"
                  : "border-gray-200 dark:border-slate-700 hover:border-violet-200 dark:hover:border-violet-800 hover:bg-gray-50 dark:hover:bg-slate-800"
              )}
            >
              <div className={clsx(
                "p-3 rounded-lg mr-3 transition-colors",
                isSelected
                  ? "bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400"
                  : "bg-gray-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-white dark:group-hover:bg-slate-700"
              )}>
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <div className={clsx(
                  "font-bold text-sm",
                  isSelected ? "text-violet-700 dark:text-violet-400" : "text-slate-900 dark:text-white"
                )}>
                  {item.label}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {item.desc}
                </div>
              </div>
              {isSelected && (
                <div className="absolute top-2 right-2 w-2 h-2 bg-violet-500 rounded-full shadow-sm shadow-violet-500/50" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
