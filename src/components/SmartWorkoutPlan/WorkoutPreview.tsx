import { useState } from 'react';
import { useSmartWorkout } from '../../context/SmartWorkoutContext';
import { Clock, Repeat, Dumbbell, AlertCircle, Calendar, Info } from 'lucide-react';
import { ProgressionEngine } from './ProgressionEngine';
import { DeloadSuggestion } from './DeloadSuggestion';
import clsx from 'clsx';

export function WorkoutPreview() {
  const { currentPlan } = useSmartWorkout();
  const [selectedWeek, setSelectedWeek] = useState(1);

  if (!currentPlan) return null;

  // Determine which days to show (Legacy vs Periodization)
  // Determine which days to show (Legacy vs Periodization)
  const activeDays = (currentPlan.periodization 
    ? currentPlan.periodization.find(w => w.weekNumber === selectedWeek)?.days 
    : currentPlan.diasDeTreino) || [];

  const currentPhase = currentPlan.periodization?.find(w => w.weekNumber === selectedWeek);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-slate-700 bg-violet-50/50 dark:bg-violet-900/10">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Seu Plano FitNow
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Ciclo de 4 semanas focado em resultados naturais.
          </p>
        </div>

        {/* Week Selector */}
        {currentPlan.periodization && (
          <div className="px-6 pt-6">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {currentPlan.periodization.map((week) => (
                <button
                  key={week.weekNumber}
                  onClick={() => setSelectedWeek(week.weekNumber)}
                  className={clsx(
                    "flex-1 min-w-[100px] p-3 rounded-xl border-2 transition-all text-sm font-medium flex flex-col items-center gap-1",
                    selectedWeek === week.weekNumber
                      ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400"
                      : "border-gray-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800"
                  )}
                >
                  <span className="uppercase text-xs tracking-wider opacity-70">Semana {week.weekNumber}</span>
                  <span className="font-bold">{week.phase}</span>
                </button>
              ))}
            </div>
            
            {currentPhase && (
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800 flex gap-3">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>Foco da Semana:</strong> {currentPhase.description}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="p-6">
          <div className="space-y-8">
            {activeDays.map((day) => (
              <div key={day.dia} className="space-y-4">
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 border-b border-gray-100 dark:border-slate-700 pb-2 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-violet-500" />
                  Dia {day.dia} - {day.split}
                </h3>
                
                <div className="space-y-3">
                  {day.exercicios.map((exercise, index) => (
                    <div 
                      key={`${day.dia}-${index}`}
                      className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-slate-700/50 border border-gray-100 dark:border-slate-700"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center text-violet-600 dark:text-violet-400 font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 dark:text-white">
                            {exercise.nome}
                          </h3>
                          <div className="flex flex-wrap items-center gap-4 mt-1 text-sm text-slate-500 dark:text-slate-400">
                            <span className="flex items-center gap-1">
                              <Repeat className="w-3 h-3" /> {exercise.series} séries
                            </span>
                            <span className="flex items-center gap-1">
                              <Dumbbell className="w-3 h-3" /> {exercise.reps} reps
                            </span>
                            <span className="flex items-center gap-1 text-xs bg-slate-200 dark:bg-slate-600 px-2 py-0.5 rounded">
                              RIR: {exercise.rir}
                            </span>
                            {exercise.observacao && (
                                <span className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded">
                                    {exercise.observacao}
                                </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-violet-50 dark:bg-violet-900/20 rounded-xl border border-violet-100 dark:border-violet-800 flex gap-3">
            <AlertCircle className="w-5 h-5 text-violet-600 dark:text-violet-400 flex-shrink-0" />
            <p className="text-sm text-violet-700 dark:text-violet-300">
              <strong>Dica:</strong> Após completar este ciclo de 4 semanas, gere um novo treino para continuar progredindo!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
