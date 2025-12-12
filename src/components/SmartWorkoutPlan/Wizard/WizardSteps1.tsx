
import { useSmartWorkout } from '../../../context/SmartWorkoutContext';
import { OptionCard } from './WizardLayout';
import type { Goal, Level, Equipment } from '../../../types/workout';
import { Target, User, BarChart, Calendar, Clock, Dumbbell, AlertTriangle, Battery, Moon, Zap, Activity } from 'lucide-react';

// --- STEP 1: OBJECTIVE ---
export function StepObjective({ next }: { next: () => void }) {
  const { goals, toggleGoal } = useSmartWorkout();
  
  const handleSelect = (val: Goal) => {
    // Single select for wizard flow simplification, or multi if needed.
    // Logic: if not selected, select and clear others (single choice behavior for UI simplicity)
    // Or just toggle. Let's do Toggle + Next button or just auto-next?
    // User requested "Click option -> Advance automatically". So strict single choice is best for flow.
    if (!goals.includes(val)) {
        // Clear previous and set new (simulating radio)
        // Note: Context toggleGoal toggles. 
        // We'll trust the user might want multiple?
        // Let's implement single select behavior here for smoothness
        // Actually, for goals, multi is valid. But "advance automatically" implies single click.
        // Let's stick to single choice for primary goal to enable the "flow".
        // Or adding a "Continue" button if multi.
        // User said: "Quando o usuário clica em uma opção, avançar automaticamente." -> Implies Single Select.
        toggleGoal(val);
        setTimeout(next, 300);
    } else {
        next();
    }
  };

  return (
    <div className="grid gap-4">
      <OptionCard
        label="Hipertrofia"
        description="Ganhar massa muscular e volume"
        icon={<Target className="w-6 h-6" />}
        selected={goals.includes('hipertrofia')}
        onClick={() => handleSelect('hipertrofia')}
        color="violet"
      />
      <OptionCard
        label="Emagrecimento"
        description="Perder gordura e definir"
        icon={<Activity className="w-6 h-6" />}
        selected={goals.includes('emagrecimento')}
        onClick={() => handleSelect('emagrecimento')}
        color="green"
      />
      <OptionCard
        label="Força"
        description="Aumentar cargas e potência"
        icon={<Dumbbell className="w-6 h-6" />}
        selected={goals.includes('forca')}
        onClick={() => handleSelect('forca')}
        color="red"
      />
      <OptionCard
        label="Resistência / Saúde"
        description="Condicionamento e bem-estar"
        icon={<Battery className="w-6 h-6" />}
        selected={goals.includes('resistencia')}
        onClick={() => handleSelect('resistencia')}
        color="blue"
      />
    </div>
  );
}

// --- STEP 2: GENDER ---
export function StepGender({ next }: { next: () => void }) {
  const { gender, setGender } = useSmartWorkout();
  
  const handleSelect = (val: 'male' | 'female') => {
    setGender(val);
    setTimeout(next, 300);
  };

  return (
    <div className="grid gap-4">
      <OptionCard
        label="Masculino"
        icon={<User className="w-6 h-6" />}
        selected={gender === 'male'}
        onClick={() => handleSelect('male')}
        color="blue"
      />
      <OptionCard
        label="Feminino"
        icon={<User className="w-6 h-6" />}
        selected={gender === 'female'}
        onClick={() => handleSelect('female')}
        color="violet"
      />
    </div>
  );
}

// --- STEP 5: EXPERIENCE ---
export function StepExperience({ next }: { next: () => void }) {
  const { level, setLevel, setExperience } = useSmartWorkout();
  
  const handleSelect = (lvl: Level, exp: any) => {
    setLevel(lvl);
    setExperience(exp);
    setTimeout(next, 300);
  };

  return (
    <div className="grid gap-4">
      <OptionCard
        label="Iniciante"
        description="Menos de 1 ano de treino consistente"
        icon={<BarChart className="w-6 h-6" />}
        selected={level === 'iniciante'}
        onClick={() => handleSelect('iniciante', 'menos_1_ano')}
        color="green"
      />
      <OptionCard
        label="Intermediário"
        description="1 a 3 anos de treino sério"
        icon={<BarChart className="w-6 h-6" />}
        selected={level === 'intermediario'}
        onClick={() => handleSelect('intermediario', '1_3_anos')}
        color="blue"
      />
      <OptionCard
        label="Avançado"
        description="Mais de 3 anos de constância"
        icon={<BarChart className="w-6 h-6" />}
        selected={level === 'avancado'}
        onClick={() => handleSelect('avancado', 'mais_3_anos')}
        color="violet"
      />
    </div>
  );
}

// --- STEP 6: FREQUENCY ---
export function StepFrequency({ next }: { next: () => void }) {
  const { daysPerWeek, setDaysPerWeek } = useSmartWorkout();
  
  const handleSelect = (days: number) => {
    setDaysPerWeek(days);
    setTimeout(next, 300);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {[1, 2, 3, 4, 5, 6].map(days => (
        <OptionCard
          key={days}
          label={`${days} dias`}
          selected={daysPerWeek === days}
          onClick={() => handleSelect(days)}
           // Alternating colors for fun visual
          color={days % 2 === 0 ? 'violet' : 'blue'}
        />
      ))}
    </div>
  );
}

// --- STEP 7: DURATION ---
export function StepDuration({ next }: { next: () => void }) {
  const { timeAvailable, setTimeAvailable } = useSmartWorkout();
  
  const handleSelect = (time: number) => {
    setTimeAvailable(time);
    setTimeout(next, 300);
  };

  return (
    <div className="grid gap-4">
      {[30, 45, 60, 90].map(time => (
        <OptionCard
          key={time}
          label={`${time} minutos`}
          icon={<Clock className="w-6 h-6" />}
          selected={timeAvailable === time}
          onClick={() => handleSelect(time)}
          color="cyan"
        />
      ))}
    </div>
  );
}

// --- STEP 8: EQUIPMENT ---
export function StepEquipment({ next }: { next: () => void }) {
  const { equipment, setEquipment } = useSmartWorkout();
  
  const handleSelect = (eq: Equipment) => {
    // Assuming single choice for simplicity in wizard flow
    // Or allow multi but add "Continue"
    // Let's do single choice for main constraint
    setEquipment([eq]);
    setTimeout(next, 300);
  };

  return (
    <div className="grid gap-4">
      <OptionCard
        label="Academia Completa"
        description="Máquinas, barras, halteres"
        icon={<Dumbbell className="w-6 h-6" />}
        selected={equipment.includes('academia')}
        onClick={() => handleSelect('academia')}
        color="blue"
      />
      <OptionCard
        label="Halteres em Casa"
        description="Halteres reguláveis e banco"
        icon={<Dumbbell className="w-6 h-6" />}
        selected={equipment.includes('dumbbells' as Equipment)}
        onClick={() => handleSelect('dumbbells' as Equipment)}
        color="orange"
      />
      <OptionCard
        label="Peso do Corpo"
        description="Calistenia e barra fixa"
        icon={<Activity className="w-6 h-6" />}
        selected={equipment.includes('bodyweight')}
        onClick={() => handleSelect('bodyweight')}
        color="green"
      />
    </div>
  );
}
