import { useState } from 'react';
import { searchFood } from '../services/openFoodFacts';
import type { OpenFoodFactsProduct } from '../services/openFoodFacts';
import { Search, Plus, Loader2, X } from 'lucide-react';
import type { Food } from '../types/nutrition';

interface FoodSearchProps {
  onSelect: (food: Food) => void;
  onClose: () => void;
}

export function FoodSearch({ onSelect, onClose }: FoodSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<OpenFoodFactsProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    const products = await searchFood(query);
    setResults(products);
    setIsLoading(false);
  };

  const handleSelect = (product: OpenFoodFactsProduct) => {
    const food: Food = {
      id: product.code,
      name: product.product_name,
      calories: product.nutriments['energy-kcal_100g'] || 0,
      protein: product.nutriments.proteins_100g || 0,
      carbs: product.nutriments.carbohydrates_100g || 0,
      fats: product.nutriments.fat_100g || 0,
      servingSize: product.serving_size || '100g',
    };
    onSelect(food);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-md max-h-[80vh] flex flex-col shadow-xl">
        <div className="p-4 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Adicionar Alimento</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="p-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Buscar alimento..."
                className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 dark:text-white"
                autoFocus
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="px-4 py-2 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Buscar'}
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 pt-0 space-y-2">
          {results.map((product) => (
            <button
              key={product.code}
              onClick={() => handleSelect(product)}
              className="w-full p-3 flex items-center justify-between bg-gray-50 dark:bg-slate-700/50 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl transition-colors text-left group"
            >
              <div className="flex items-center gap-3">
                {product.image_url ? (
                  <img src={product.image_url} alt={product.product_name} className="w-10 h-10 rounded-lg object-cover bg-white" />
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-slate-600 flex items-center justify-center text-xs text-slate-500">
                    Img
                  </div>
                )}
                <div>
                  <p className="font-medium text-slate-900 dark:text-white line-clamp-1">{product.product_name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {product.nutriments['energy-kcal_100g'] || 0} kcal • {product.serving_size || '100g'}
                  </p>
                </div>
              </div>
              <div className="p-2 bg-white dark:bg-slate-800 rounded-lg text-violet-600 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                <Plus className="w-4 h-4" />
              </div>
            </button>
          ))}
          {results.length === 0 && !isLoading && query && (
            <div className="text-center py-8 text-slate-500 dark:text-slate-400">
              Nenhum alimento encontrado.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
