import { useAuthStore } from '../stores/authStore';
import { User, Settings, Award, LogOut } from 'lucide-react';

export function Profile() {
  const { user, logout } = useAuthStore();

  const badges = [
    { name: 'Iniciante', icon: '🌱', unlocked: true },
    { name: '1 Semana', icon: '🔥', unlocked: true },
    { name: 'Peso Pesado', icon: '💪', unlocked: false },
    { name: 'Nutricionista', icon: '🥗', unlocked: false },
  ];

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Perfil</h1>
          <p className="text-slate-500 dark:text-slate-400">Gerencie sua conta</p>
        </div>
        <button 
          onClick={logout}
          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
        >
          <LogOut className="w-6 h-6" />
        </button>
      </header>

      {/* User Info */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex items-center gap-6">
        <div className="h-20 w-20 bg-violet-100 dark:bg-violet-900/30 rounded-full flex items-center justify-center text-3xl">
          {user?.gender === 'female' ? '👩' : '👨'}
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">{user?.name}</h2>
          <p className="text-slate-500 dark:text-slate-400">{user?.email}</p>
          <div className="flex gap-2 mt-2">
            <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-slate-700 rounded text-slate-600 dark:text-slate-300">
              {user?.experienceLevel === 'beginner' ? 'Iniciante' : 'Intermediário'}
            </span>
            <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-slate-700 rounded text-slate-600 dark:text-slate-300">
              {user?.goal === 'gain_muscle' ? 'Hipertrofia' : 'Emagrecimento'}
            </span>
          </div>
        </div>
      </div>

      {/* Gamification */}
      <div className="space-y-4">
        <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-yellow-500" /> Conquistas
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge) => (
            <div 
              key={badge.name}
              className={`p-4 rounded-xl border flex flex-col items-center text-center gap-2 ${
                badge.unlocked 
                  ? 'bg-white dark:bg-slate-800 border-violet-200 dark:border-violet-900/50' 
                  : 'bg-gray-50 dark:bg-slate-800/50 border-gray-100 dark:border-slate-700 opacity-50 grayscale'
              }`}
            >
              <span className="text-3xl">{badge.icon}</span>
              <span className="font-medium text-sm text-slate-900 dark:text-white">{badge.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Settings List */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
        {[
          { label: 'Editar Perfil', icon: User },
          { label: 'Configurações do App', icon: Settings },
        ].map((item, i) => (
          <button 
            key={i}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors border-b last:border-0 border-gray-100 dark:border-slate-700"
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-5 h-5 text-slate-500" />
              <span className="text-slate-700 dark:text-slate-200">{item.label}</span>
            </div>
            <span className="text-slate-400">→</span>
          </button>
        ))}
      </div>
    </div>
  );
}
