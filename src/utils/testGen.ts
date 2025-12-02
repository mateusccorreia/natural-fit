import { generateWorkout } from './workoutGenerator';
import type { Anamnese } from '../types/workout';

const sampleAnamnese: Anamnese = {
    sexo: "masculino",
    idade: 28,
    peso: 80,
    altura: 180,
    objetivos: ["hipertrofia"],
    frequenciaTreino: 5, // Push/Pull/Legs/Upper/Lower
    tempoPorTreino: 60,
    localTreino: "academia",
    equipamentos: ["academia"], // Full equipment
    nivelExperiencia: "intermediario",
    experiencia: "1_3_anos",
    focoMuscular: [],
    lesoes: [],
    limitacoes: {
        lombar: false,
        ombro: false,
        joelho: false,
        cervical: false
    },
    preferencias: {
        gosta: [],
        naoGosta: [],
        focoGluteos: false,
        focoPeito: false
    }
};

console.log("Generating workout with sample data...");
const result = generateWorkout(sampleAnamnese);
console.log(JSON.stringify(result, null, 2));

// Check for days with very few exercises
result.diasDeTreino.forEach(day => {
    console.log(`Day ${day.dia} (${day.split}): ${day.exercicios.length} exercises`);
    if (day.exercicios.length <= 1) {
        console.warn(`WARNING: Day ${day.dia} has only ${day.exercicios.length} exercise!`);
    }
});
