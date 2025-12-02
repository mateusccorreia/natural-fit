import { Link } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useWorkoutStore } from '../stores/workoutStore';

import { Dumbbell, ArrowRight, BicepsFlexed } from 'lucide-react';

export function Home() {
  const user = useAuthStore((state) => state.user);
  const activeSession = useWorkoutStore((state) => state.activeSession);


  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Olá, {user?.name?.split(' ')[0] || 'Atleta'}! 👋
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Vamos manter o foco nos seus objetivos hoje.
        </p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Workout Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Dumbbell className="w-24 h-24 text-violet-500" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-violet-100 dark:bg-violet-900/30 rounded-lg text-violet-600 dark:text-violet-400">
                <Dumbbell className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Treino</h2>
            </div>

            {activeSession ? (
              <div className="mb-6">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Sessão Ativa</p>
                <p className="text-lg font-semibold text-violet-600 dark:text-violet-400">
                  Treino em andamento
                </p>
                <Link 
                  to="/workout"
                  className="mt-4 inline-flex items-center text-sm font-medium text-violet-600 hover:text-violet-700"
                >
                  Continuar <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            ) : (
              <div className="mb-6">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Próximo Treino</p>
                <p className="text-lg font-semibold text-slate-900 dark:text-white">
                  Peito e Tríceps
                </p>
              </div>
            )}

            <Link 
              to="/workout"
              className="w-full py-3 px-4 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center"
            >
              {activeSession ? 'Continuar Treino' : 'Iniciar Treino'}
            </Link>
          </div>
        </div>
        
        {/* Workout Generator Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <BicepsFlexed className="w-24 h-24 text-purple-500" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                <BicepsFlexed className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Gerador de Treinos</h2>
            </div>

            <div className="mb-6">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                Crie um plano de treino personalizado baseado no seu nível, objetivos e equipamentos disponíveis.
              </p>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <span className="w-2 h-2 rounded-full bg-violet-500"></span>
                IA Otimizada
              </div>
            </div>

            <Link 
              to="/workout/new"
              className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center"
            >
              Criar Novo Treino <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Actions or Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Peso Atual', value: `${user?.weight || 0} kg`, change: '+0.5kg' },
          { label: 'Treinos', value: '12', sub: 'este mês' },
          { label: 'Sequência', value: '3 dias', sub: 'fogo!' },
          { label: 'Próxima Meta', value: '80 kg', sub: 'falta 2kg' },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{stat.label}</p>
            <p className="text-xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
            {stat.change && <p className="text-xs text-violet-500 font-medium">{stat.change}</p>}
            {stat.sub && <p className="text-xs text-slate-400">{stat.sub}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
