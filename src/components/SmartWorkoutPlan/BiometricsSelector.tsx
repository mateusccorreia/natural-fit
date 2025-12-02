import { useSmartWorkout } from '../../context/SmartWorkoutContext';
import { Scale, Ruler } from 'lucide-react';

export function BiometricsSelector() {
  const { weight, setWeight, height, setHeight } = useSmartWorkout();

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
      <div className="flex items-center gap-2 mb-2">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <Scale className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="font-semibold text-slate-900 dark:text-white">
          Suas Medidas
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-2">
            <Scale className="w-4 h-4" /> Peso (kg)
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
            placeholder="Ex: 70"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-2">
            <Ruler className="w-4 h-4" /> Altura (cm)
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
            placeholder="Ex: 170"
          />
        </div>
      </div>
      
      <p className="text-xs text-slate-500 dark:text-slate-400 italic">
        Usamos seu peso e altura para calcular o IMC e ajustar o volume de treino ideal para sua recuperação.
      </p>
    </div>
  );
}
