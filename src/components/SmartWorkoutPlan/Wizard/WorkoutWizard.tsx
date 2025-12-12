
import React, { useState } from 'react';
import { WizardLayout } from './WizardLayout';
import { useSmartWorkout } from '../../../context/SmartWorkoutContext';
import { BicepsFlexed } from 'lucide-react';

// Import Steps
import { StepObjective, StepGender, StepExperience, StepFrequency, StepDuration, StepEquipment } from './WizardSteps1';
import { StepBiometrics, StepInjuries, StepAesthetics, StepStyle, StepRecovery, StepTechnical } from './WizardSteps2';
import { WorkoutPreview } from '../WorkoutPreview';

export function WorkoutWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const { generateWorkout, isGenerating, currentPlan, resetPlan } = useSmartWorkout();

  // Navigation Handlers
  const next = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  const prev = () => setCurrentStep(prev => Math.max(prev - 1, 0));
  
  // Step Configuration
  const steps = [
    {
      title: "Qual seu objetivo principal?",
      description: "Vamos focar todo o plano nesta meta.",
      component: <StepObjective next={next} />
    },
    {
      title: "Como você se identifica?",
      description: "Para calibração de volume e recuperação.",
      component: <StepGender next={next} />
    },
    {
      title: "Suas medidas atuais",
      description: "Para calcularmos seu IMC e necessidades.",
      component: <StepBiometrics next={next} />
    },
    {
      title: "Nível de Experiência",
      description: "Há quanto tempo você treina consistentemente?",
      component: <StepExperience next={next} />
    },
    {
      title: "Frequência Semanal",
      description: "Quantos dias você tem disponíveis para treinar?",
      component: <StepFrequency next={next} />
    },
    {
       title: "Duração do Treino",
       description: "Quanto tempo você tem por sessão?",
       component: <StepDuration next={next} />
    },
    {
        title: "Equipamentos",
        description: "O que você tem disponível?",
        component: <StepEquipment next={next} />
    },
    {
        title: "Lesões ou Limitações",
        description: "Vamos adaptar o treino para sua segurança.",
        component: <StepInjuries next={next} />
    },
    {
        title: "Estética Desejada",
        description: "Qual o 'shape' que você busca?",
        component: <StepAesthetics next={next} />
    },
    {
        title: "Estilo de Treino",
        description: "O que você prefere usar?",
        component: <StepStyle next={next} />
    },
    {
        title: "Recuperação & Rotina",
        description: "Como é seu descanso e dia a dia?",
        component: <StepRecovery next={next} />
    },
    {
        title: "Contexto de Treino",
        description: "Treina sozinho ou acompanhado?",
        component: <StepTechnical next={next} />
    },
    {
        title: "Gerar seu Plano Premium",
        description: "Tudo pronto! Vamos criar sua periodização baseada em ciência.",
        component: (
            <div className="flex flex-col items-center justify-center space-y-8 animate-in zoom-in duration-500">
                <div className="w-24 h-24 bg-violet-100 dark:bg-violet-900/30 rounded-3xl flex items-center justify-center mb-4">
                    <BicepsFlexed className="w-12 h-12 text-violet-600 dark:text-violet-400" />
                </div>
                <button
                    onClick={generateWorkout}
                    disabled={isGenerating}
                    className="w-full py-6 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-2xl font-bold text-2xl shadow-xl shadow-violet-500/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center scale-100 hover:scale-105 active:scale-95"
                >
                    {isGenerating ? "Processando..." : "Gerar Treino Agora"}
                </button>
                <p className="text-center text-slate-500 max-w-sm">
                    Ao continuar, você receberá uma planilha completa de 4 semanas com periodização e cargas.
                </p>
            </div>
        )
    }
  ];

  // If plan is generated, show Preview instead of Wizard
  if (currentPlan) {
      return (
          <div className="max-w-4xl mx-auto py-8">
            <WorkoutPreview />
             <div className="flex gap-4 mt-8">
                <button
                    onClick={() => { resetPlan(); setCurrentStep(0); }}
                    className="flex-1 py-3 px-4 rounded-xl border border-gray-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-medium hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                >
                    Criar Novo Treino
                </button>
            </div>
          </div>
      );
  }

  const activeStep = steps[currentStep];

  return (
    <WizardLayout
      currentStep={currentStep}
      totalSteps={steps.length}
      title={activeStep.title}
      description={activeStep.description}
      onBack={prev}
      canGoBack={currentStep > 0}
    >
      {activeStep.component}
    </WizardLayout>
  );
}
