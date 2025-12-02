import { TrendingUp, ArrowUp, ArrowRight, AlertTriangle } from 'lucide-react';

export function ProgressionEngine() {
  return (
    <div className="bg-gray-50 dark:bg-slate-700/30 rounded-xl p-5 border border-gray-100 dark:border-slate-700">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-violet-500" />
        <h3 className="font-bold text-slate-900 dark:text-white">Lógica de Progressão</h3>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-start gap-3 text-sm">
          <div className="mt-0.5 p-1 bg-violet-100 dark:bg-violet-900/40 rounded text-violet-600 dark:text-violet-400">
            <ArrowUp className="w-3 h-3" />
          </div>
          <div>
            <span className="font-medium text-slate-900 dark:text-white">Aumentar Carga</span>
            <p className="text-slate-500 dark:text-slate-400 text-xs">
              Quando completar todas as séries com sobras (RIR ≥ 2).
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 text-sm">
          <div className="mt-0.5 p-1 bg-blue-100 dark:bg-blue-900/40 rounded text-blue-600 dark:text-blue-400">
            <ArrowRight className="w-3 h-3" />
          </div>
          <div>
            <span className="font-medium text-slate-900 dark:text-white">Aumentar Repetições</span>
            <p className="text-slate-500 dark:text-slate-400 text-xs">
              Se estagnar na carga, tente fazer mais repetições com o mesmo peso.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 text-sm">
          <div className="mt-0.5 p-1 bg-amber-100 dark:bg-amber-900/40 rounded text-amber-600 dark:text-amber-400">
            <AlertTriangle className="w-3 h-3" />
          </div>
          <div>
            <span className="font-medium text-slate-900 dark:text-white">Reduzir Carga</span>
            <p className="text-slate-500 dark:text-slate-400 text-xs">
              Se falhar na execução por 2 sessões consecutivas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
