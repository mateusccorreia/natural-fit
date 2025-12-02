import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import type { UserLevel, UserGoal, Gender } from '../types/auth';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import clsx from 'clsx';

export function Onboarding() {
  const navigate = useNavigate();
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: '',
    gender: 'male' as Gender,
    height: '',
    weight: '',
    experienceLevel: 'beginner' as UserLevel,
    goal: 'gain_muscle' as UserGoal,
  });

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else handleSubmit();
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    updateProfile({
      age: Number(formData.age),
      gender: formData.gender,
      height: Number(formData.height),
      weight: Number(formData.weight),
      experienceLevel: formData.experienceLevel,
      goal: formData.goal,
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={clsx(
                  "h-2 w-full rounded-full mx-1 transition-colors duration-300",
                  i <= step ? "bg-violet-500" : "bg-gray-200 dark:bg-slate-700"
                )}
              />
            ))}
          </div>
          <p className="text-center text-sm text-slate-500 dark:text-slate-400">
            Passo {step} de 3
          </p>
        </div>

        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white">
              Sobre você
            </h2>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Idade
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                placeholder="Ex: 25"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Sexo
              </label>
              <div className="grid grid-cols-2 gap-3">
                {(['male', 'female'] as const).map((g) => (
                  <button
                    key={g}
                    onClick={() => setFormData({ ...formData, gender: g })}
                    className={clsx(
                      "py-2 px-4 rounded-lg border transition-all",
                      formData.gender === g
                        ? "bg-violet-50 dark:bg-violet-900/20 border-violet-500 text-violet-700 dark:text-violet-400"
                        : "border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                    )}
                  >
                    {g === 'male' ? 'Masculino' : 'Feminino'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white">
              Medidas
            </h2>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Altura (cm)
              </label>
              <input
                type="number"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                placeholder="Ex: 175"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Peso (kg)
              </label>
              <input
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                placeholder="Ex: 75.5"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white">
              Objetivos
            </h2>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Nível de Experiência
              </label>
              <div className="space-y-2">
                {[
                  { value: 'beginner', label: 'Iniciante', desc: 'Nunca treinei ou treino há pouco tempo' },
                  { value: 'intermediate', label: 'Intermediário', desc: 'Treino regularmente há mais de 6 meses' },
                  { value: 'advanced', label: 'Avançado', desc: 'Treino sério há mais de 2 anos' },
                ].map((level) => (
                  <button
                    key={level.value}
                    onClick={() => setFormData({ ...formData, experienceLevel: level.value as UserLevel })}
                    className={clsx(
                      "w-full text-left p-3 rounded-lg border transition-all",
                      formData.experienceLevel === level.value
                        ? "bg-violet-50 dark:bg-violet-900/20 border-violet-500"
                        : "border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700"
                    )}
                  >
                    <div className={clsx("font-medium", formData.experienceLevel === level.value ? "text-violet-700 dark:text-violet-400" : "text-slate-900 dark:text-white")}>
                      {level.label}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {level.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Objetivo Principal
              </label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { value: 'lose_fat', label: 'Perder Gordura' },
                  { value: 'gain_muscle', label: 'Ganhar Massa' },
                  { value: 'definition', label: 'Definição' },
                  { value: 'strength', label: 'Força' },
                ].map((goal) => (
                  <button
                    key={goal.value}
                    onClick={() => setFormData({ ...formData, goal: goal.value as UserGoal })}
                    className={clsx(
                      "py-2 px-4 rounded-lg border transition-all text-sm font-medium",
                      formData.goal === goal.value
                        ? "bg-violet-50 dark:bg-violet-900/20 border-violet-500 text-violet-700 dark:text-violet-400"
                        : "border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                    )}
                  >
                    {goal.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-between">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className="flex items-center px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Voltar
          </button>
          <button
            onClick={handleNext}
            className="flex items-center px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
          >
            {step === 3 ? 'Concluir' : 'Próximo'}
            {step < 3 && <ChevronRight className="w-4 h-4 ml-1" />}
          </button>
        </div>
      </div>
    </div>
  );
}
