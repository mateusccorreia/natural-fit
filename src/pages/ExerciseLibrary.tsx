import { useState, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { exerciseService, BODY_PART_TRANSLATIONS } from '../services/exerciseService';
import type { Exercise } from '../types/workout';
import clsx from 'clsx';

export function ExerciseLibrary() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBodyPart, setSelectedBodyPart] = useState<string>('all');
  const [bodyParts, setBodyParts] = useState<string[]>([]);
  
  // Handle search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        exerciseService.searchExercises(searchTerm).then(setExercises);
      } else if (selectedBodyPart === 'all') {
        exerciseService.getAllExercises(50).then(setExercises);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, selectedBodyPart]);

  // Initial load
  useEffect(() => {
    exerciseService.getAllExercises(50).then(setExercises);
    exerciseService.getBodyParts().then(setBodyParts);
    setLoading(false);
  }, []);

  // Handle body part filter
  const handleBodyPartChange = (part: string) => {
    setSelectedBodyPart(part);
    setSearchTerm('');
    if (part === 'all') {
      exerciseService.getAllExercises(50).then(setExercises);
    } else {
      exerciseService.getExercisesByBodyPart(part).then(setExercises);
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Biblioteca de Exercícios</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Explore nossa biblioteca de exercícios selecionados
          </p>
        </div>
      </header>

      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar exercício (ex: bench press)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleBodyPartChange('all')}
            className={clsx(
              "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize",
              selectedBodyPart === 'all'
                ? "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400"
                : "bg-gray-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600"
            )}
          >
            Todos
          </button>
          {bodyParts.map((part) => (
            <button
              key={part}
              onClick={() => handleBodyPartChange(part)}
              className={clsx(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize",
                selectedBodyPart === part
                  ? "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400"
                  : "bg-gray-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600"
              )}
            >
              {part}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {exercises.map((exercise) => (
            <div
              key={exercise.id}
              className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 hover:border-violet-500 dark:hover:border-violet-500 transition-colors group flex flex-col"
            >
              <div className="mb-4 aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-slate-700">
                {exercise.youtubeId ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${exercise.youtubeId}`}
                    title={exercise.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 bg-gray-200 dark:bg-slate-800">
                    <span className="text-sm">Vídeo indisponível</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                  {exercise.name}
                </h3>
              </div>
              
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2 flex-grow">
                {exercise.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                <span className="text-xs bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 px-2 py-1 rounded capitalize">
                  {BODY_PART_TRANSLATIONS[exercise.muscleGroup] || exercise.muscleGroup}
                </span>
                {exercise.equipment.map((eq) => (
                  <span key={eq} className="text-xs bg-gray-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded capitalize">
                    {eq}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {!loading && exercises.length === 0 && (
        <div className="text-center py-12 text-slate-500 dark:text-slate-400">
          Nenhum exercício encontrado. Tente outro termo ou categoria.
        </div>
      )}
    </div>
  );
}
