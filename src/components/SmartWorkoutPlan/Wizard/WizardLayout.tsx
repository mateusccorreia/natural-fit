
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';
import clsx from 'clsx';

interface WizardLayoutProps {
  currentStep: number;
  totalSteps: number;
  title: string;
  description?: string;
  onBack: () => void;
  canGoBack: boolean;
  children: React.ReactNode;
}

export function WizardLayout({
  currentStep,
  totalSteps,
  title,
  description,
  onBack,
  canGoBack,
  children
}: WizardLayoutProps) {
  // Progress percentage
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="min-h-[600px] flex flex-col max-w-2xl mx-auto">
      {/* Header / Progress Bar */}
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            disabled={!canGoBack}
            className={clsx(
              "p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors",
              !canGoBack ? "opacity-0 cursor-default" : "opacity-100 text-slate-600 dark:text-slate-300"
            )}
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <div className="text-sm font-medium text-slate-400 dark:text-slate-500">
            Passo {currentStep + 1} de {totalSteps}
          </div>
          
          {/* Placeholder for symmetry or help button */}
          <div className="w-10" />
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-violet-600"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Content Area with Animation */}
      <div className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col space-y-6"
          >
            <div className="text-center space-y-2 mb-6">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                {title}
              </h2>
              {description && (
                <p className="text-lg text-slate-500 dark:text-slate-400">
                  {description}
                </p>
              )}
            </div>

            <div className="flex-1">
              {children}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// Reusable Option Card Component
interface OptionCardProps {
  label: string;
  description?: string;
  icon?: React.ReactNode;
  selected: boolean;
  onClick: () => void;
  color?: 'violet' | 'blue' | 'green' | 'red' | 'orange' | 'cyan';
}

export function OptionCard({ 
  label, 
  description, 
  icon, 
  selected, 
  onClick, 
  color = 'violet' 
}: OptionCardProps) {
  
  const colors = {
    violet: "border-violet-500 bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400",
    blue: "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400",
    green: "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400",
    red: "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400",
    orange: "border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400",
    cyan: "border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400",
  };

  const activeClass = colors[color];
  const inactiveClass = "border-gray-200 dark:border-slate-700 hover:border-violet-200 dark:hover:border-slate-600 text-slate-700 dark:text-slate-300";

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={clsx(
        "w-full p-6 text-left rounded-2xl border-2 transition-all flex items-center justify-between group",
        selected ? activeClass : "bg-white dark:bg-slate-800 " + inactiveClass
      )}
    >
      <div className="flex items-center gap-4">
        {icon && (
          <div className={clsx(
            "p-3 rounded-xl transition-colors",
            selected ? "bg-white/50" : "bg-gray-100 dark:bg-slate-700 group-hover:bg-violet-50 dark:group-hover:bg-slate-600"
          )}>
            {icon}
          </div>
        )}
        <div>
          <div className="text-xl font-bold">{label}</div>
          {description && (
            <div className={clsx("text-sm mt-1", selected ? "opacity-80" : "text-slate-500 dark:text-slate-400")}>
              {description}
            </div>
          )}
        </div>
      </div>
      
      {selected && (
        <div className="bg-white/20 p-1 rounded-full">
          <Check className="w-6 h-6" />
        </div>
      )}
    </motion.button>
  );
}
