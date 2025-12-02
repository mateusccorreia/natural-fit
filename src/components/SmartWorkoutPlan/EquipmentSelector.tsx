import { Dumbbell, Building2, Activity, User } from 'lucide-react';
import { useSmartWorkout, type Equipment } from '../../context/SmartWorkoutContext';
import clsx from 'clsx';

export function EquipmentSelector() {
  const { equipment, toggleEquipment } = useSmartWorkout();

  const options: { id: Equipment; label: string; icon: any }[] = [
    { id: 'academia', label: 'Academia Completa', icon: Building2 },
    { id: 'casa_halteres', label: 'Halteres em Casa', icon: Dumbbell },
    { id: 'elasticos', label: 'Elásticos', icon: Activity },
    { id: 'peso_corpo', label: 'Peso do Corpo', icon: User },
  ];

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
        Quais equipamentos você tem disponíveis?
      </label>
      <div className="grid grid-cols-2 gap-3">
        {options.map((item) => {
          const isSelected = equipment.includes(item.id);
          return (
            <button
              key={item.id}
              onClick={() => toggleEquipment(item.id)}
              className={clsx(
                "p-4 rounded-xl border-2 transition-all text-left flex flex-col items-center justify-center text-center",
                isSelected
                  ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20"
                  : "border-gray-200 dark:border-slate-700 hover:border-violet-200 dark:hover:border-violet-800 hover:bg-gray-50 dark:hover:bg-slate-800"
              )}
            >
              <div className={clsx(
                "p-3 rounded-full mb-3 transition-colors",
                isSelected
                  ? "bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400"
                  : "bg-gray-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
              )}>
                <item.icon className="w-6 h-6" />
              </div>
              <div className={clsx(
                "font-medium",
                isSelected ? "text-violet-700 dark:text-violet-400" : "text-slate-900 dark:text-white"
              )}>
                {item.label}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
