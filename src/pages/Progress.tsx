import { useAuthStore } from '../stores/authStore';
import { useWorkoutStore } from '../stores/workoutStore';
import { LineChart, TrendingUp, Calendar, Trophy } from 'lucide-react';

export function Progress() {
  const user = useAuthStore((state) => state.user);
  const history = useWorkoutStore((state) => state.history);

  // Mock data for weight chart since we don't have a weight history store yet
  const weightHistory = [
    { date: '01/11', weight: 74.0 },
    { date: '08/11', weight: 74.2 },
    { date: '15/11', weight: 74.5 },
    { date: '22/11', weight: 74.8 },
    { date: '29/11', weight: 75.0 },
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Evolução</h1>
        <p className="text-slate-500 dark:text-slate-400">Acompanhe seus resultados</p>
      </header>

      {/* Weight Chart Card */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Peso Corporal</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Últimos 30 dias</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{user?.weight} kg</p>
            <p className="text-sm text-violet-500 font-medium">+1.0 kg</p>
          </div>
        </div>

        {/* Simple CSS Chart */}
        <div className="h-48 flex items-end justify-between gap-2 pt-4 border-t border-gray-100 dark:border-slate-700">
          {weightHistory.map((point, i) => (
            <div key={i} className="flex flex-col items-center gap-2 w-full group">
              <div className="relative w-full flex justify-center items-end h-32">
                <div 
                  className="w-full max-w-[20px] bg-purple-500 rounded-t-lg transition-all group-hover:bg-purple-600"
                  style={{ height: `${((point.weight - 70) / 10) * 100}%` }} // Normalized for display
                />
                <div className="absolute -top-8 bg-slate-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {point.weight}kg
                </div>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">{point.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 flex items-center gap-4">
          <div className="p-3 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-full">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Treinos Concluídos</p>
            <p className="text-xl font-bold text-slate-900 dark:text-white">{history.length}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 flex items-center gap-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Dias Ativos</p>
            <p className="text-xl font-bold text-slate-900 dark:text-white">12</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 flex items-center gap-4">
          <div className="p-3 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full">
            <LineChart className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Volume Total</p>
            <p className="text-xl font-bold text-slate-900 dark:text-white">12.5 ton</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-slate-700">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Histórico Recente</h2>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-slate-700">
          {history.length > 0 ? (
            history.map((session) => (
              <div key={session.id} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-gray-100 dark:bg-slate-700 rounded-lg flex items-center justify-center text-slate-500">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">Treino Realizado</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {new Date(session.date).toLocaleDateString()} • {session.duration} min
                    </p>
                  </div>
                </div>
                <span className="text-violet-600 font-medium text-sm">Concluído</span>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-slate-500 dark:text-slate-400">
              Nenhum treino registrado ainda.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
