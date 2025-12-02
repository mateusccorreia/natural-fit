import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, User, Dumbbell, BarChart2 } from 'lucide-react';
import clsx from 'clsx';

export function Layout() {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Início' },
    { path: '/workout', icon: Dumbbell, label: 'Treino' },
    { path: '/progress', icon: BarChart2, label: 'Evolução' },
    { path: '/profile', icon: User, label: 'Perfil' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 pb-20 md:pb-0 md:pl-20 transition-colors duration-200">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full w-20 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 items-center py-6 z-50">
        <div className="mb-8 p-2 bg-violet-500 rounded-xl">
          <Dumbbell className="w-6 h-6 text-white" />
        </div>
        
        <nav className="flex flex-col gap-4 w-full px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={clsx(
                  "flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 group",
                  isActive 
                    ? "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400" 
                    : "text-slate-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-200"
                )}
                title={item.label}
              >
                <item.icon className={clsx("w-6 h-6", isActive && "fill-current")} />
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 z-50 pb-safe">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={clsx(
                  "flex flex-col items-center justify-center w-full h-full transition-colors duration-200",
                  isActive 
                    ? "text-violet-600 dark:text-violet-400" 
                    : "text-slate-500 dark:text-slate-400"
                )}
              >
                <item.icon className={clsx("w-6 h-6 mb-1", isActive && "fill-current")} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-4 md:p-8 pt-6 md:pt-8 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
