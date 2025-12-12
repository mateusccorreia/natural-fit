
import type {
    Anamnese,
    GeneratedWorkout,
    GeneratedWeek
} from '../types/workout';

// ============================================================================
// NATURAL-HYPERTROPHY ALGORITHM (V2.0)
// ============================================================================
// Autor: Assistente Antigravity
// Metodologia: Otimização Natural (Volume Cíclico, Frequência Otimizada, Gestão de Fadiga)

// ---------------------------
// 1. DOMÍNIO E TIPOS
// ---------------------------

export const AgeGroup = {
    Adolescente: "15-19",
    JovemAdulto: "20-39",
    Adulto: "40-59",
    Idoso: "60-79",
    OldestOld: "80+"
} as const;
export type AgeGroup = typeof AgeGroup[keyof typeof AgeGroup];

export const ExperienceLevel = {
    Iniciante: "iniciante", // 0-12 meses
    Intermediario: "intermediario", // 1-4 anos
    Avancado: "avancado" // 4+ anos
} as const;
export type ExperienceLevel = typeof ExperienceLevel[keyof typeof ExperienceLevel];

export const Goal = {
    Hipertrofia: "hipertrofia",
    Forca: "forca",
    PerdaDeGordura: "perda_de_gordura",
    Funcionalidade: "funcionalidade",
    Manutencao: "manutencao"
} as const;
export type Goal = typeof Goal[keyof typeof Goal];

export const Equipment = {
    Gym: "gym",
    Dumbbells: "dumbbells",
    Bands: "bands",
    Bodyweight: "bodyweight",
    Minimal: "minimal"
} as const;
export type Equipment = typeof Equipment[keyof typeof Equipment];

export const InjuryRegion = {
    Joelho: "joelho",
    Lombar: "lombar",
    Ombro: "ombro",
    Nenhuma: "nenhuma"
} as const;
export type InjuryRegion = typeof InjuryRegion[keyof typeof InjuryRegion];

// Estrutura do Usuário Normalizada
export interface UserProfile {
    id: string;
    age: number;
    gender: "male" | "female" | "other";
    weightKg: number;
    heightCm: number;
    experienceMonths: number;
    availableDaysPerWeek: number;
    timePerSessionMinutes: number;
    equipment: Equipment[];
    injuries: InjuryRegion[];
    goal: Goal;
    focusAreas: string[]; // ex: ['gluteos', 'ombros']

    // Advanced
    excludedExercises: string[];
    technicalComfort: 'low' | 'medium' | 'high';
    sleepHours: number;
    trainingStyle: 'machines' | 'free_weights' | 'mixed';
    hatedExercises: string[];
    needsQuickWorkout: boolean;
}

// Estrutura de Exercício (Internal)
export interface Exercise {
    id: string;
    templateId: string;
    name: string;
    primaryMuscle: string;
    secondaryMuscles: string[];
    equipmentRequired: Equipment;
    isCompound: boolean;
    // Parameters calculated
    sets: number;
    reps: string; // "8-12", "15-20"
    rir: number;
    tempo: string; // "2-0-2"
    rest: number; // segundos
    technique?: "straight" | "superset" | "myoreps" | "circuit";
    notes?: string;
}

// Estrutura de Sessão
export interface DailySession {
    dayIndex: number; // 0=Seg, ...
    label: string; // "Upper A", "Lower B"
    focus: string[]; // ["peito", "costas"]
    exercises: Exercise[];
    estimatedDuration: number;
}

// Estrutura de Microciclo (1 Semana)
export interface Microcycle {
    weekNumber: number;
    sessions: DailySession[];
    volumeByMuscle: Record<string, number>;
    phase: "Accumulation" | "Intensification" | "Deload";
}

// ---------------------------
// 2. CONSTANTES FISIOLÓGICAS
// ---------------------------

const BASE_VOLUME_MIN = 10; // sets/semana
const BASE_VOLUME_MAX = 20;
const RECOVERY_AGE_PENALTY_THRESHOLD = 50; // anos
const RECOVERY_AGE_PENALTY_FACTOR = 0.9; // 10% menos volume
const SLEEP_PENALTY_THRESHOLD = 6; // horas
const SLEEP_PENALTY_FACTOR = 0.85; // 15% menos volume se dorme pouco
const FEMALE_LOWER_BODY_BONUS = 1.2; // 20% mais volume tolerado em pernas
const FOCUS_SPECIALIZATION_FACTOR = 1.25; // +25% volume em áreas de foco
// const MAINTENANCE_FACTOR = 0.66; // 66% do volume para manutenção (Unused for now)

const MUSCLE_GROUPS = [
    "quadriceps", "hamstrings", "glutes", "chest", "back", "shoulders", "biceps", "triceps", "calves", "abs"
] as const;

// ---------------------------
// 3. BASE DE DADOS SIMPLIFICADA (TEMPLATE)
// ---------------------------

interface ExerciseMeta {
    id: string;
    name: string;
    muscle: string;
    type: "compound" | "isolation";
    equipment: Equipment;
    tier: "S" | "A" | "B"; // S = best builders, B = fillers
}

const EXERCISE_DB: ExerciseMeta[] = [
    // Perna (Quad)
    { id: "squat", name: "Agachamento Livre", muscle: "quadriceps", type: "compound", equipment: "gym", tier: "S" },
    { id: "goblet_squat", name: "Goblet Squat", muscle: "quadriceps", type: "compound", equipment: "dumbbells", tier: "A" },
    { id: "leg_press", name: "Leg Press 45", muscle: "quadriceps", type: "compound", equipment: "gym", tier: "A" },
    { id: "lunge", name: "Passada / Lunge", muscle: "quadriceps", type: "compound", equipment: "bodyweight", tier: "A" },
    { id: "leg_ext", name: "Cadeira Extensora", muscle: "quadriceps", type: "isolation", equipment: "gym", tier: "B" },

    // Perna (Post/Glut)
    { id: "rdl_bar", name: "RDL com Barra", muscle: "hamstrings", type: "compound", equipment: "gym", tier: "S" },
    { id: "rdl_db", name: "RDL com Halteres", muscle: "hamstrings", type: "compound", equipment: "dumbbells", tier: "A" },
    { id: "hip_thrust", name: "Elevação Pélvica (Hip Thrust)", muscle: "glutes", type: "compound", equipment: "gym", tier: "S" },
    { id: "leg_curl", name: "Mesa Flexora", muscle: "hamstrings", type: "isolation", equipment: "gym", tier: "A" },
    { id: "glute_bridge", name: "Glute Bridge", muscle: "glutes", type: "isolation", equipment: "bodyweight", tier: "B" },
    { id: "abductor", name: "Cadeira Abdutora", muscle: "glutes", type: "isolation", equipment: "gym", tier: "B" },

    // Empurrar
    { id: "bench_press", name: "Supino Reto Barra", muscle: "chest", type: "compound", equipment: "gym", tier: "S" },
    { id: "db_press", name: "Supino Reto Halteres", muscle: "chest", type: "compound", equipment: "dumbbells", tier: "S" },
    { id: "push_up", name: "Flexão de Braço", muscle: "chest", type: "compound", equipment: "bodyweight", tier: "A" },
    { id: "ohp_bar", name: "Desenvolvimento Militar", muscle: "shoulders", type: "compound", equipment: "gym", tier: "S" },
    { id: "ohp_db", name: "Desenvolvimento Halteres", muscle: "shoulders", type: "compound", equipment: "dumbbells", tier: "A" },
    { id: "lat_raise", name: "Elevação Lateral", muscle: "shoulders", type: "isolation", equipment: "dumbbells", tier: "A" },
    { id: "pec_deck", name: "Crucifixo Máquina (Peck Deck)", muscle: "chest", type: "isolation", equipment: "gym", tier: "B" },
    { id: "tricep_pushdown", name: "Tríceps Polia", muscle: "triceps", type: "isolation", equipment: "gym", tier: "A" },
    { id: "skullcrusher", name: "Tríceps Testa", muscle: "triceps", type: "isolation", equipment: "gym", tier: "A" },

    // Puxar
    { id: "pull_up", name: "Barra Fixa", muscle: "back", type: "compound", equipment: "bodyweight", tier: "S" },
    { id: "lat_pulldown", name: "Puxada Alta", muscle: "back", type: "compound", equipment: "gym", tier: "A" },
    { id: "bb_row", name: "Remada Curvada", muscle: "back", type: "compound", equipment: "gym", tier: "S" },
    { id: "db_row", name: "Remada Unilateral", muscle: "back", type: "compound", equipment: "dumbbells", tier: "A" },
    { id: "cable_row", name: "Remada Baixa Cabo", muscle: "back", type: "compound", equipment: "gym", tier: "A" },
    { id: "bicep_curl_bb", name: "Rosca Direta Barra", muscle: "biceps", type: "isolation", equipment: "gym", tier: "S" },
    { id: "bicep_curl_db", name: "Rosca Alternada", muscle: "biceps", type: "isolation", equipment: "dumbbells", tier: "A" },
    { id: "hammer_curl", name: "Rosca Martelo", muscle: "biceps", type: "isolation", equipment: "dumbbells", tier: "B" },
];

// ---------------------------
// 4. LÓGICA DE CÁLCULO DE VOLUME (CORE)
// ---------------------------

/**
 * Calcula o volume semanal alvo (séries) para cada grupo muscular
 * baseado nas características individuais e objetivos.
 */
function calculateVolumeTargets(user: UserProfile): Record<string, number> {
    const targets: Record<string, number> = {};

    // 1. Base por experiência
    let baseVol = 0;
    if (user.experienceMonths < 12) baseVol = BASE_VOLUME_MIN; // Iniciante
    else if (user.experienceMonths < 48) baseVol = 14;
    else baseVol = BASE_VOLUME_MAX; // Avançado

    for (const muscle of MUSCLE_GROUPS) {
        let vol = baseVol;

        // 2. Ajuste por Sexo (Mulheres toleram mais volume/frequência em inferiores)
        if (user.gender === "female") {
            if (["quadriceps", "glutes", "hamstrings"].includes(muscle)) {
                vol *= FEMALE_LOWER_BODY_BONUS;
            } else if (["chest", "shoulders"].includes(muscle)) {
                vol *= 0.9; // Leve redução em superiores se não for foco
            }
        }

        // 3. Ajuste por Idade (Recuperação)
        if (user.age > RECOVERY_AGE_PENALTY_THRESHOLD) {
            vol *= RECOVERY_AGE_PENALTY_FACTOR;
        }

        // 3.1 Ajuste por Sono (Recuperação)
        if (user.sleepHours < SLEEP_PENALTY_THRESHOLD) {
            vol *= SLEEP_PENALTY_FACTOR;
        }

        // 4. Especialização / Foco
        const isFocus = user.focusAreas.some(area => area.includes(muscle) || (area === "bracos" && ["biceps", "triceps"].includes(muscle)));
        if (isFocus) {
            vol *= FOCUS_SPECIALIZATION_FACTOR;
        } else if (user.focusAreas.length > 0) {
            // Se tem foco definido, os outros entram em manutenção relativa? 
            // Não necessariamente, mas podemos moderar.
            // Aqui mantemos neutro se não for foco.
        }

        // 5. Ajuste por Tempo Disponível
        // Se tempo é curto, não adianta prescrever 20 séries.
        // Heurística: Max séries viáveis = (mins * dias) / 4 (mins por série mds)
        // const weeklyTimeBudget = user.availableDaysPerWeek * user.timePerSessionMinutes; (Implemented via density technique)
        // Se volume total projetado estourar o tempo, reduzimos proporcionalmente depois.
        // Por hora definimos o alvo ideal fisiológico.

        targets[muscle] = Math.round(vol);
    }
    return targets;
}

// ---------------------------
// 5. SELEÇÃO DE SPLIT E ESTRUTURA
// ---------------------------

/**
 * Define a divisão de treino A/B, PPL, Upper/Lower, etc.
 */
function determineSplit(user: UserProfile): string[] {
    const days = user.availableDaysPerWeek;

    if (days === 1) return ["Full Body"];
    if (days === 2) return ["Full Body A", "Full Body B"];
    if (days === 3) return ["Full Body A", "Full Body B", "Full Body C"]; // Alta frequência natural
    if (days === 4) return ["Upper A", "Lower A", "Upper B", "Lower B"];
    if (days === 5) return ["Upper", "Lower", "Push", "Pull", "Legs"]; // Híbrido
    if (days >= 6) return ["Push A", "Pull A", "Legs A", "Push B", "Pull B", "Legs B"];

    return ["Full Body"];
}

/**
 * Mapeia Split -> Músculos Enfocados
 */
function getMusclesForSession(sessionLabel: string): string[] {
    const label = sessionLabel.toLowerCase();

    if (label.includes("full body")) return ["quadriceps", "hamstrings", "chest", "back", "shoulders"];
    if (label.includes("upper")) return ["chest", "back", "shoulders", "biceps", "triceps"];
    if (label.includes("lower")) return ["quadriceps", "hamstrings", "glutes", "calves"];
    if (label.includes("push")) return ["chest", "shoulders", "triceps", "quadriceps"]; // Push + Quad variation ou Classic Push
    if (label.includes("pull")) return ["back", "biceps", "hamstrings"];
    if (label.includes("legs")) return ["quadriceps", "hamstrings", "glutes", "calves"];

    return [];
}

// ---------------------------
// 6. ALGORITMO DE DISTRIBUIÇÃO E DENSIDADE
// ---------------------------

/**
 * Define técnica de intensidade baseada no tempo disponível e Preferencia.
 */
function getDensityTechnique(timeMinutes: number, experience: ExperienceLevel, needsQuick: boolean): "straight" | "superset" | "myoreps" {
    if (needsQuick || timeMinutes < 35) {
        return "myoreps"; // Alta densidade necessária
    } else if (timeMinutes < 55) {
        return experience === "iniciante" ? "straight" : "superset"; // Iniciantes podem não lidar bem com superset
    }
    return "straight";
}

/**
 * Preenche a sessão com exercícios
 */
function buildSession(
    label: string,
    muscles: string[],
    volumeTargets: Record<string, number>, // Volume SEMANAL restante/alvo
    user: UserProfile,
    sessionsPerWeekForMuscle: number
): Exercise[] {
    const exercises: Exercise[] = [];
    const technique = getDensityTechnique(user.timePerSessionMinutes, user.experienceMonths < 12 ? "iniciante" : "intermediario", user.needsQuickWorkout);

    // Para cada músculo da sessão
    for (const m of muscles) {
        // Quantas séries hoje? (Target Semanal / Frequencia)
        // Adicionamos aleatoriedade/variação A/B via seleção de exercício
        const weeklyVol = volumeTargets[m] || 10;
        const dailyVol = Math.ceil(weeklyVol / sessionsPerWeekForMuscle);

        if (dailyVol <= 0) continue;

        // Selecionar exercício
        // 1. Filtrar por músculo e equipamentos
        let candidates = EXERCISE_DB.filter(e => e.muscle === m && isEquipmentAvailable(e.equipment, user.equipment));

        // 2. Filtrar Excluded/Hated
        candidates = candidates.filter(e => !user.excludedExercises.includes(e.id) && !user.hatedExercises.includes(e.id));

        // 3. Aplicar Preferência de Estilo (Soft Filter - Prioriza, mas não exclui se for única opção)
        if (user.trainingStyle === 'machines') {
            const machines = candidates.filter(e => e.equipment === 'gym');
            if (machines.length > 0) candidates = [...machines, ...candidates.filter(e => e.equipment !== 'gym')];
        } else if (user.trainingStyle === 'free_weights') {
            const free = candidates.filter(e => e.equipment === 'dumbbells' || e.equipment === 'bodyweight');
            if (free.length > 0) candidates = [...free, ...candidates.filter(e => e.equipment === 'gym')];
        }

        // 4. Conforto Técnico: Se 'low', evitar Tier S complexos
        if (user.technicalComfort === 'low') {
            const complex = ['squat', 'deadlift', 'bb_row', 'ohp_bar'];
            candidates = candidates.sort((a, b) => {
                const aComplex = complex.includes(a.id);
                const bComplex = complex.includes(b.id);
                return aComplex === bComplex ? 0 : aComplex ? 1 : -1;
            });
        }

        // Prioriza Compostos (Tier S) primeiro
        const compounds = candidates.filter(e => e.type === "compound");
        const isolations = candidates.filter(e => e.type === "isolation");

        // Regra:
        // Se dailyVol > 5, Split em Composto + Isolado
        // Se dailyVol <= 5, Apenas Composto (se possível)

        let primaryEx: ExerciseMeta | undefined;

        // Variação A vs B baseada na label
        // Ex: Full Body A -> Prioriza Agachamento (Quad S)
        // Ex: Full Body B -> Prioriza Leg Press (Quad A) ou outro Tier S

        if (label.includes("A") || !label.includes("B")) {
            primaryEx = compounds.find(e => e.tier === "S") || compounds[0] || isolations[0];
        } else {
            // Tenta pegar um alternativo Tier S ou Tier A
            primaryEx = compounds.find(e => e.tier === "S" && e.id !== "squat") || compounds[1] || compounds[0] || isolations[0];
        }

        if (!primaryEx) continue;

        exercises.push({
            id: `${primaryEx.id}_${Date.now()}_${Math.random()}`,
            templateId: primaryEx.id,
            name: primaryEx.name,
            primaryMuscle: primaryEx.muscle,
            secondaryMuscles: [],
            equipmentRequired: primaryEx.equipment,
            isCompound: primaryEx.type === "compound",
            sets: Math.min(dailyVol, 4), // Cap de 4 sets por ex
            reps: primaryEx.type === "compound" ? "6-10" : "10-15",
            rir: 2,
            tempo: "2-0-1",
            rest: primaryEx.type === "compound" ? 120 : 60,
            technique: technique
        });

        // Se sobrou volume, adiciona acessório
        if (dailyVol > 4) {
            const secondaryEx = isolations[0] || compounds[1];
            if (secondaryEx) {
                exercises.push({
                    id: `${secondaryEx.id}_acc_${Date.now()}`,
                    templateId: secondaryEx.id,
                    name: secondaryEx.name,
                    primaryMuscle: secondaryEx.muscle,
                    secondaryMuscles: [],
                    equipmentRequired: secondaryEx.equipment,
                    isCompound: secondaryEx.type === "compound",
                    sets: dailyVol - 4,
                    reps: "12-20",
                    rir: 1,
                    tempo: "2-0-2",
                    rest: 60,
                    technique: technique
                });
            }
        }
    }

    // Otimização de Ordem (Compostos primeiro)
    return exercises.sort((a, b) => (a.isCompound === b.isCompound ? 0 : a.isCompound ? -1 : 1));
}

function isEquipmentAvailable(req: Equipment, available: Equipment[]): boolean {
    if (available.includes("gym")) return true; // Gym tem tudo
    return available.includes(req);
}

// ---------------------------
// 7. GERADOR DE MICROCICLO E PERIODIZAÇÃO
// ---------------------------

export function generateNaturalPlan(user: UserProfile): GeneratedWeek[] {
    const volumeTargets = calculateVolumeTargets(user);
    const split = determineSplit(user);
    const weeks: GeneratedWeek[] = [];

    // Fases da Periodização (4 semanas)
    // Semana 1: Introdução (Volume Base, RIR 3)
    // Semana 2: Acumulação (Volume Base, RIR 2)
    // Semana 3: Pico (Volume + 10-20%, RIR 1) -> Overreaching funcional seguro
    // Semana 4: Deload (Volume -40%, RIR 4)

    const phases: { name: GeneratedWeek['phase'], rir: number, volMod: number }[] = [
        { name: "Adaptation", rir: 3, volMod: 1.0 },
        { name: "Base", rir: 2, volMod: 1.0 },
        { name: "Stimulus", rir: 1, volMod: 1.2 },
        { name: "Deload", rir: 4, volMod: 0.6 }
    ];

    phases.forEach((phase, index) => {
        const weekNum = index + 1;
        const weekDays = split.map((label, dayIdx) => {
            const musc = getMusclesForSession(label);

            // Frequencia do musculo na semana (para dividir volume)
            // Simplificação: count quantas vezes aparece no split
            const freq = split.filter(l => getMusclesForSession(l).some(m => musc.includes(m))).length || 1;

            // Aplicar modificador de volume da fase
            const targetMod: Record<string, number> = {};
            for (const k in volumeTargets) targetMod[k] = Math.ceil(volumeTargets[k] * phase.volMod);

            const exercises = buildSession(label, musc, targetMod, user, freq);

            // Aplicar RIR e ajustes da fase
            const adaptedExercises = exercises.map(ex => ({
                ...ex,
                rir: phase.rir,
                sets: Math.max(2, Math.floor(ex.sets * phase.volMod)) // Garante minimo 2 sets
            }));

            // Mapear para formato legado/output
            return {
                dia: dayIdx + 1,
                split: label,
                exercicios: adaptedExercises.map(ex => ({
                    musculo: ex.primaryMuscle,
                    nome: ex.name,
                    series: ex.sets,
                    reps: ex.reps, // Mantém range
                    rir: ex.rir.toString(),
                    observacao: ex.technique !== "straight" ? `Técnica: ${ex.technique}` : undefined
                }))
            };
        });

        weeks.push({
            weekNumber: weekNum,
            phase: phase.name,
            description: `Semana ${weekNum}: ${phase.name}`,
            days: weekDays
        });
    });

    return weeks;
}

// ---------------------------
// 8. ADAPTER (LEGACY COMPATIBILITY)
// ---------------------------

export function generateWorkout(anamnese: Anamnese): GeneratedWorkout {
    // Adapter Anamnese -> UserProfile
    const user: UserProfile = {
        id: "gen_" + Date.now(),
        age: anamnese.idade,
        gender: anamnese.sexo === 'masculino' ? 'male' : 'female',
        weightKg: anamnese.peso,
        heightCm: anamnese.altura,
        experienceMonths: anamnese.nivelExperiencia === 'avancado' ? 60 : (anamnese.nivelExperiencia === 'intermediario' ? 24 : 6),
        availableDaysPerWeek: anamnese.frequenciaTreino,
        timePerSessionMinutes: anamnese.tempoPorTreino,
        equipment: (anamnese.equipamentos.includes('academia') ? [Equipment.Gym] : [Equipment.Dumbbells]), // Simplificado pro adapter
        injuries: anamnese.limitacoes.joelho ? [InjuryRegion.Joelho] : [],
        goal: Goal.Hipertrofia, // Default
        focusAreas: anamnese.focoMuscular,
        // Mapping new advanced fields
        excludedExercises: anamnese.excludedExercises || [],
        hatedExercises: anamnese.hatedExercises || [],
        trainingStyle: anamnese.trainingStyle || 'mixed',
        technicalComfort: anamnese.technicalComfort || 'medium',
        needsQuickWorkout: anamnese.needsQuickWorkout || false,
        sleepHours: anamnese.sleepHours || 7
    };

    const periodization = generateNaturalPlan(user);

    return {
        diasDeTreino: periodization[0].days, // Retorna semana 1 como padrão visual
        periodization: periodization
    };
}

// Exportações auxiliares para UI (se necessário)
export function getVolumeRecommendations(user: UserProfile) {
    return calculateVolumeTargets(user);
}
