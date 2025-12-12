
import { useSmartWorkout } from '../../../context/SmartWorkoutContext';
import { OptionCard } from './WizardLayout';
import { AlertTriangle, Activity } from 'lucide-react';

// --- STEP 3 & 4: BIOMETRICS (Combined for flow) ---
export function StepBiometrics({ next }: { next: () => void }) {
  const { weight, height, setWeight, setHeight } = useSmartWorkout();

  // Local state handling often cleaner for inputs, but context is fine.
  
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <label className="block text-lg font-medium text-slate-700 dark:text-slate-200">
          Qual seu peso atual?
        </label>
        <div className="flex items-center justify-center p-6 bg-white dark:bg-slate-800 rounded-2xl border-2 border-gray-100 dark:border-slate-700">
             <input 
               type="number"
               value={weight}
               onChange={(e) => setWeight(Number(e.target.value))}
               className="text-4xl font-bold bg-transparent text-center w-32 focus:outline-none dark:text-white"
               autoFocus
             />
             <span className="text-xl text-slate-400">kg</span>
        </div>
      </div>

       <div className="space-y-4">
        <label className="block text-lg font-medium text-slate-700 dark:text-slate-200">
          Qual sua altura?
        </label>
        <div className="flex items-center justify-center p-6 bg-white dark:bg-slate-800 rounded-2xl border-2 border-gray-100 dark:border-slate-700">
             <input 
               type="number"
               value={height}
               onChange={(e) => setHeight(Number(e.target.value))}
               className="text-4xl font-bold bg-transparent text-center w-32 focus:outline-none dark:text-white"
             />
             <span className="text-xl text-slate-400">cm</span>
        </div>
      </div>

      <button 
        onClick={next}
        className="w-full py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-violet-500/30 transition-all"
      >
        Continuar
      </button>
    </div>
  );
}

// --- STEP 9: INJURIES ---
export function StepInjuries({ next }: { next: () => void }) {
    const { toggleLimitation, limitations, injuries, toggleInjury } = useSmartWorkout();
    
    // Simplifed Map: toggle UI
    // Since injuries can be multiple, we need a "Continue" button here.
    
    return (
        <div className="space-y-6">
            <div className="grid gap-3">
                 <OptionCard
                    label="Sem lesões"
                    selected={injuries.length === 0}
                    onClick={() => {
                        // Clear all
                        if (injuries.length > 0) injuries.forEach(i => toggleInjury(i));
                        setTimeout(next, 300);
                    }}
                    color="green"
                    icon={<Activity className="w-5 h-5" />}
                 />
                 <OptionCard
                    label="Joelho"
                    selected={limitations.joelho || injuries.includes('articular')}
                    onClick={() => { toggleLimitation('joelho'); toggleInjury('articular'); }}
                    color="orange"
                    icon={<AlertTriangle className="w-5 h-5" />}
                 />
                 <OptionCard
                    label="Lombar"
                    selected={limitations.lombar}
                    onClick={() => toggleLimitation('lombar')}
                    color="orange"
                     icon={<AlertTriangle className="w-5 h-5" />}
                 />
                 <OptionCard
                    label="Ombro"
                    selected={limitations.ombro}
                    onClick={() => toggleLimitation('ombro')}
                    color="orange"
                     icon={<AlertTriangle className="w-5 h-5" />}
                 />
            </div>
            
            <button 
                onClick={next}
                className="w-full py-4 bg-slate-900 dark:bg-slate-700 text-white rounded-xl font-bold hover:opacity-90 transition-opacity"
            >
                Continuar
            </button>
        </div>
    );
}

// --- STEP 10: AESTHETICS ---
export function StepAesthetics({ next }: { next: () => void }) {
    const { setAdvancedField, advanced } = useSmartWorkout();
    
    const options = [
        { id: 'shredded', label: 'Trincado', desc: 'Definição máxima' },
        { id: 'strong', label: 'Forte e Denso', desc: 'Volume com força' },
        { id: 'athletic', label: 'Atlético', desc: 'Funcional e ágil' },
        { id: 'voluminous', label: 'Cheio / Volumoso', desc: 'Hipertrofia máxima' }
    ];

    return (
        <div className="grid gap-4">
            {options.map(opt => (
                <OptionCard
                    key={opt.id}
                    label={opt.label}
                    description={opt.desc}
                    selected={advanced.aestheticGoal === opt.id}
                    onClick={() => {
                        setAdvancedField('aestheticGoal', opt.id);
                        setTimeout(next, 300);
                    }}
                    color="violet"
                />
            ))}
        </div>
    );
}

// --- STEP 11: STYLE ---
export function StepStyle({ next }: { next: () => void }) {
     const { setAdvancedField, advanced } = useSmartWorkout();
     
     return (
        <div className="grid gap-4">
             <OptionCard
                label="Máquinas"
                description="Estabilidade e isolamento"
                selected={advanced.trainingStyle === 'machines'}
                onClick={() => { setAdvancedField('trainingStyle', 'machines'); setTimeout(next, 300); }}
                color="blue"
            />
            <OptionCard
                label="Pesos Livres"
                description="Halteres e barras"
                selected={advanced.trainingStyle === 'free_weights'}
                onClick={() => { setAdvancedField('trainingStyle', 'free_weights'); setTimeout(next, 300); }}
                color="orange"
            />
            <OptionCard
                label="Misto (Recomendado)"
                description="O melhor dos dois mundos"
                selected={advanced.trainingStyle === 'mixed'}
                onClick={() => { setAdvancedField('trainingStyle', 'mixed'); setTimeout(next, 300); }}
                color="violet"
            />
        </div>
     );
}

// --- STEP 12: RECOVERY/SLEEP ---
export function StepRecovery({ next }: { next: () => void }) {
    const { setAdvancedField, advanced } = useSmartWorkout();
    
    return (
        <div className="space-y-8">
             <div className="space-y-4">
                <label className="block text-lg font-medium text-slate-700 dark:text-slate-200">
                    Média de sono por noite
                </label>
                <div className="flex items-center justify-center gap-4">
                    <button 
                        className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xl font-bold"
                        onClick={() => setAdvancedField('sleepHours', Math.max(4, advanced.sleepHours - 1))}
                    >-</button>
                    <div className="text-4xl font-bold text-slate-900 dark:text-white w-24 text-center">
                        {advanced.sleepHours}h
                    </div>
                    <button 
                        className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xl font-bold"
                        onClick={() => setAdvancedField('sleepHours', Math.min(12, advanced.sleepHours + 1))}
                    >+</button>
                </div>
            </div>

            <div className="space-y-4">
                <label className="block text-lg font-medium text-slate-700 dark:text-slate-200">
                   Precisa de treinos Express? (&lt;35 min)
                </label>
                 <div className="grid grid-cols-2 gap-4">
                    <OptionCard
                        label="Sim"
                        selected={advanced.needsQuickWorkout}
                        onClick={() => setAdvancedField('needsQuickWorkout', true)}
                        color="orange"
                    />
                     <OptionCard
                        label="Não"
                        selected={!advanced.needsQuickWorkout}
                        onClick={() => setAdvancedField('needsQuickWorkout', false)}
                        color="green"
                    />
                 </div>
            </div>

            <button 
                onClick={next}
                className="w-full py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-violet-500/30 transition-all"
            >
                Continuar
            </button>
        </div>
    );
}

// --- STEP 13: COMPANION & TECHNICAL ---
export function StepTechnical({ next }: { next: () => void }) {
    const { setAdvancedField, advanced } = useSmartWorkout();
    
    return (
         <div className="space-y-8">
             <div className="space-y-2">
                 <label className="text-lg font-medium">Você treina com quem?</label>
                 <div className="grid gap-2">
                     <OptionCard
                        label="Sozinho"
                        selected={advanced.trainingCompanion === 'solo'}
                        onClick={() => setAdvancedField('trainingCompanion', 'solo')}
                        color="blue"
                     />
                     <OptionCard
                        label="Parceiro / Instrutor"
                        selected={advanced.trainingCompanion !== 'solo'}
                        onClick={() => setAdvancedField('trainingCompanion', 'partner')}
                        color="green"
                     />
                 </div>
             </div>
             
             <button 
                onClick={next}
                className="w-full py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-violet-500/30 transition-all"
            >
                Continuar
            </button>
         </div>
    );
}
