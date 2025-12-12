
import { Users, AlertTriangle, Activity, Moon, Battery, Settings, Dumbbell } from 'lucide-react';
import { useSmartWorkout } from '../../context/SmartWorkoutContext';
import clsx from 'clsx';

export function AdvancedPreferencesSelector() {
  const { advanced, setAdvancedField } = useSmartWorkout();

  const handleToggleMap = (field: 'excludedExercises' | 'hatedExercises', value: string) => {
    const current = advanced[field];
    const updated = current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value];
    setAdvancedField(field, updated);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 1. Companhia de Treino */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-500" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Você treina sozinho ou com instrutor?
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: 'solo', label: 'Sozinho', desc: 'Foco total' },
            { id: 'partner', label: 'Com parceiro', desc: 'Motivação extra' },
            { id: 'instructor', label: 'Com instrutor', desc: 'Supervisão técnica' }
          ].map(opt => (
            <button
              key={opt.id}
              onClick={() => setAdvancedField('trainingCompanion', opt.id)}
              className={clsx(
                "p-4 rounded-xl border-2 text-left transition-all",
                advanced.trainingCompanion === opt.id
                  ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
                  : "border-gray-100 dark:border-slate-700 hover:border-indigo-200"
              )}
            >
              <div className={clsx("font-medium", advanced.trainingCompanion === opt.id ? "text-indigo-700 dark:text-indigo-400" : "text-slate-900 dark:text-white")}>
                {opt.label}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{opt.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Exercícios Excluídos (Lesão/Impossibilidade) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Existem exercícios que você NÃO PODE realizar?
          </h3>
          <span className="text-xs text-slate-500">(Toque para excluir)</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'squat', label: 'Agachamento Livre' },
            { id: 'deadlift', label: 'Levantamento Terra' },
            { id: 'ohp', label: 'Desenvolvimento Militar' },
            { id: 'bb_row', label: 'Remada Curvada' },
            { id: 'bench_press', label: 'Supino Reto' }
          ].map(ex => (
            <button
              key={ex.id}
              onClick={() => handleToggleMap('excludedExercises', ex.id)}
              className={clsx(
                "px-4 py-2 rounded-full text-sm font-medium border transition-colors",
                advanced.excludedExercises.includes(ex.id)
                  ? "bg-amber-100 border-amber-500 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                  : "bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-amber-300"
              )}
            >
              {ex.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Estilo de Treino */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Dumbbell className="w-5 h-5 text-emerald-500" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Estilo de treino preferido?
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: 'machines', label: 'Máquinas', desc: 'Mais estabilidade' },
            { id: 'free_weights', label: 'Pesos livres', desc: 'Mais coordenação' },
            { id: 'mixed', label: 'Sem preferência', desc: 'O melhor dos dois' }
          ].map(opt => (
            <button
              key={opt.id}
              onClick={() => setAdvancedField('trainingStyle', opt.id)}
              className={clsx(
                "p-4 rounded-xl border-2 text-left transition-all",
                advanced.trainingStyle === opt.id
                  ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                  : "border-gray-100 dark:border-slate-700 hover:border-emerald-200"
              )}
            >
              <div className={clsx("font-medium", advanced.trainingStyle === opt.id ? "text-emerald-700 dark:text-emerald-400" : "text-slate-900 dark:text-white")}>
                {opt.label}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{opt.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Exercícios Odiados */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-400" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Tem exercícios que você ODEIA ou evita?
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'lunge', label: 'Avanço / Passada' },
            { id: 'pull_up', label: 'Barra Fixa' },
            { id: 'stiff', label: 'Stiff' },
            { id: 'burpee', label: 'Burpees' },
            { id: 'bulgarian', label: 'Agachamento Búlgaro' }
          ].map(ex => (
            <button
              key={ex.id}
              onClick={() => handleToggleMap('hatedExercises', ex.id)}
              className={clsx(
                "px-4 py-2 rounded-full text-sm font-medium border transition-colors",
                advanced.hatedExercises.includes(ex.id)
                  ? "bg-red-100 border-red-500 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  : "bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-red-300"
              )}
            >
              {ex.label}
            </button>
          ))}
        </div>
      </div>

      {/* 5. Conforto Técnico */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-gray-500" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Nível de conforto com movimentos técnicos?
          </h3>
        </div>
        <div className="flex gap-4">
          <input 
            type="range" 
            min="1" 
            max="3" 
            step="1"
            value={advanced.technicalComfort === 'low' ? 1 : advanced.technicalComfort === 'medium' ? 2 : 3}
            onChange={(e) => {
              const val = Number(e.target.value);
              setAdvancedField('technicalComfort', val === 1 ? 'low' : val === 2 ? 'medium' : 'high');
            }}
            className="w-full accent-violet-600" 
          />
        </div>
        <div className="flex justify-between text-sm text-slate-500">
          <span className={advanced.technicalComfort === 'low' ? 'font-bold text-violet-600' : ''}>Baixo (Iniciante)</span>
          <span className={advanced.technicalComfort === 'medium' ? 'font-bold text-violet-600' : ''}>Médio</span>
          <span className={advanced.technicalComfort === 'high' ? 'font-bold text-violet-600' : ''}>Alto (Avançado)</span>
        </div>
      </div>

      {/* 6. Rotina e Sono */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 p-4 bg-gray-50 dark:bg-slate-800/50 rounded-xl">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-orange-500" />
            <h3 className="font-semibold text-slate-900 dark:text-white">
              Treinos Express?
            </h3>
          </div>
          <p className="text-sm text-slate-500 mb-2">Precisa de rotinas super rápidas (&lt; 35 min) frequentemente?</p>
          <div className="flex gap-2">
            <button
               onClick={() => setAdvancedField('needsQuickWorkout', true)}
               className={clsx("flex-1 py-2 rounded-lg border", advanced.needsQuickWorkout ? "bg-orange-100 border-orange-500 text-orange-700" : "bg-white border-gray-200 text-slate-600")}
            >Sim</button>
            <button
               onClick={() => setAdvancedField('needsQuickWorkout', false)}
               className={clsx("flex-1 py-2 rounded-lg border", !advanced.needsQuickWorkout ? "bg-white border-slate-300 text-slate-900 font-medium" : "bg-white border-gray-100 text-slate-400")}
            >Não</button>
          </div>
        </div>

        <div className="space-y-4 p-4 bg-gray-50 dark:bg-slate-800/50 rounded-xl">
          <div className="flex items-center gap-2">
            <Moon className="w-5 h-5 text-indigo-400" />
            <h3 className="font-semibold text-slate-900 dark:text-white">
              Sono (média/noite)
            </h3>
          </div>
          <div className="flex items-center gap-4">
            <input 
              type="number" 
              min="4" 
              max="12" 
              value={advanced.sleepHours} 
              onChange={(e) => setAdvancedField('sleepHours', Number(e.target.value))}
              className="w-20 p-2 text-center rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-lg font-bold"
            />
            <span className="text-slate-500">horas</span>
          </div>
        </div>
      </div>

      {/* 7. Objetivo Estético */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Battery className="w-5 h-5 text-cyan-500" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
             Qual estética você deseja atingir?
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { id: 'shredded', label: 'Trincado', desc: 'Definição máxima' },
            { id: 'strong', label: 'Forte e Denso', desc: 'Volume com força' },
            { id: 'athletic', label: 'Atlético', desc: 'Funcional e ágil' },
            { id: 'voluminous', label: 'Cheio / Volumoso', desc: 'Hipertrofia máxima' }
          ].map(opt => (
            <button
              key={opt.id}
              onClick={() => setAdvancedField('aestheticGoal', opt.id)}
              className={clsx(
                "p-4 rounded-xl border-2 text-left transition-all",
                advanced.aestheticGoal === opt.id
                  ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20"
                  : "border-gray-100 dark:border-slate-700 hover:border-cyan-200"
              )}
            >
              <div className={clsx("font-medium", advanced.aestheticGoal === opt.id ? "text-cyan-700 dark:text-cyan-400" : "text-slate-900 dark:text-white")}>
                {opt.label}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{opt.desc}</div>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
