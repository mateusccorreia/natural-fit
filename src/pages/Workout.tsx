import { Link } from 'react-router-dom';
import { Play, Plus, Calendar, Book } from 'lucide-react';

export function Workout() {
  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Treino</h1>
          <p className="text-slate-500 dark:text-slate-400">Gerencie sua rotina</p>
        </div>
        <Link
          to="/workout/new"
          className="p-2 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-lg hover:bg-violet-200 dark:hover:bg-violet-900/50 transition-colors"
        >
          <Plus className="w-6 h-6" />
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-2 bg-gradient-to-br from-violet-500 to-violet-600 rounded-2xl p-6 text-white shadow-lg">
          <h2 className="text-xl font-bold mb-2">Treino de Hoje</h2>
          <p className="text-violet-100 mb-6">Peito e Tríceps - Hipertrofia</p>
          <button className="flex items-center bg-white text-violet-600 px-6 py-3 rounded-xl font-bold hover:bg-violet-50 transition-colors">
            <Play className="w-5 h-5 mr-2 fill-current" />
            Iniciar Treino
          </button>
        </div>

        <div className="space-y-4">
          <Link
            to="/workout/library"
            className="flex items-center p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 hover:border-violet-500 transition-colors group"
          >
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg mr-4 group-hover:scale-110 transition-transform">
              <Book className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">Biblioteca</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Ver todos exercícios</p>
            </div>
          </Link>

          <div className="flex items-center p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg mr-4">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">Histórico</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">12 treinos este mês</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Suas Fichas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-slate-900 dark:text-white">Treino {i === 1 ? 'A' : 'B'}</h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">45 min</span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                {i === 1 ? 'Peito, Ombros e Tríceps' : 'Costas, Bíceps e Pernas'}
              </p>
              <div className="flex gap-2">
                <button className="flex-1 py-2 text-sm font-medium text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/20 rounded-lg hover:bg-violet-100 dark:hover:bg-violet-900/30 transition-colors">
                  Editar
                </button>
                <button className="flex-1 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 bg-gray-50 dark:bg-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors">
                  Ver detalhes
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
