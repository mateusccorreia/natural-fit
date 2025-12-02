import { useState } from 'react';
import { useWorkoutStore } from '../stores/workoutStore';
import { Users, Dumbbell, FileText, Plus, Trash2 } from 'lucide-react';

export function Admin() {
  const [activeTab, setActiveTab] = useState<'users' | 'exercises' | 'content'>('exercises');
  const exercises = useWorkoutStore((state) => state.exercises);
  
  // Mock users data since we don't have a full backend
  const users = [
    { id: 1, name: 'Usuário Teste', email: 'teste@naturalfit.com', role: 'user' },
    { id: 2, name: 'Admin', email: 'admin@naturalfit.com', role: 'admin' },
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Painel Administrativo</h1>
        <p className="text-slate-500 dark:text-slate-400">Gerenciamento do sistema</p>
      </header>

      <div className="flex gap-4 border-b border-gray-200 dark:border-slate-700 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('exercises')}
          className={`pb-3 px-4 font-medium text-sm transition-colors whitespace-nowrap ${
            activeTab === 'exercises'
              ? 'border-b-2 border-violet-500 text-violet-600 dark:text-violet-400'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <Dumbbell className="w-4 h-4" />
            Exercícios
          </div>
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`pb-3 px-4 font-medium text-sm transition-colors whitespace-nowrap ${
            activeTab === 'users'
              ? 'border-b-2 border-violet-500 text-violet-600 dark:text-violet-400'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Usuários
          </div>
        </button>
        <button
          onClick={() => setActiveTab('content')}
          className={`pb-3 px-4 font-medium text-sm transition-colors whitespace-nowrap ${
            activeTab === 'content'
              ? 'border-b-2 border-violet-500 text-violet-600 dark:text-violet-400'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Conteúdo
          </div>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
        {activeTab === 'exercises' && (
          <div>
            <div className="p-4 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center">
              <h3 className="font-bold text-slate-900 dark:text-white">Lista de Exercícios</h3>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors">
                <Plus className="w-4 h-4" />
                Novo Exercício
              </button>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-slate-700">
              {exercises.map((ex) => (
                <div key={ex.id} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-700/50">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">{ex.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{ex.muscleGroup} • {ex.difficulty}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-slate-400 hover:text-violet-600 transition-colors">Editar</button>
                    <button className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div>
            <div className="p-4 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center">
              <h3 className="font-bold text-slate-900 dark:text-white">Usuários Registrados</h3>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-slate-700">
              {users.map((u) => (
                <div key={u.id} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-700/50">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-violet-100 dark:bg-violet-900/30 rounded-full flex items-center justify-center text-violet-700 dark:text-violet-400 font-bold text-xs">
                      {u.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">{u.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{u.email}</p>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-slate-700 rounded text-slate-600 dark:text-slate-300 capitalize">
                    {u.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="p-8 text-center text-slate-500 dark:text-slate-400">
            <FileText className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>Gerenciamento de conteúdo em breve.</p>
          </div>
        )}
      </div>
    </div>
  );
}
