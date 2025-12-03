import type { Anamnese, GeneratedWorkout, GeneratedWeek } from '../types/workout';

// --- 1. INTERFACES E TIPOS INTERNOS ---

type Sexo = 'masculino' | 'feminino';
type Objetivo = 'emagrecimento' | 'hipertrofia' | 'definicao' | 'resistencia' | 'saude' | 'forca';
type Nivel = 'iniciante' | 'intermediario' | 'avancado';
type FocoMuscular = 'peito' | 'costas' | 'pernas' | 'gluteos' | 'bracos' | 'ombros' | 'nenhum';

interface UserInput {
    sexo: Sexo;
    idade: number;
    objetivo: Objetivo;
    altura: number; // em cm
    peso: number; // em kg
    nivelInformado: Nivel;
    diasDisponiveis: number; // 2 a 6
    equipamentos: string[];
    focoMuscular: FocoMuscular;
    treinaAtualmente: boolean;
    tempoTreinoMeses?: number;
}

interface Exercicio {
    nome: string;
    series: number;
    repeticoes: string;
    rir: number;
    descanso: string;
    grupoMuscular: string;
    tag?: string;
    observacao?: string; // Compatibility
}

interface DiaTreino {
    dia: string;
    foco: string;
    exercicios: Exercicio[];
}

interface SemanaTreino {
    numero: number;
    fase: string;
    descricao: string;
    instrucoesGerais: string[];
    rotina: DiaTreino[];
}

interface PlanoMensal {
    resumoUsuario: {
        nivelReal: Nivel;
        focoPrincipal: string;
        enfaseMuscular: string;
    };
    ciclo: SemanaTreino[];
    mensagemFinal: string;
}

// --- 2. BANCO DE DADOS DE EXERCÍCIOS (Tired System) ---

const DB_COMMON = {
    quadriceps: ['Agachamento Livre', 'Leg Press 45', 'Cadeira Extensora', 'Passada Estática'],
    posterior: ['Stiff com Barra', 'Mesa Flexora', 'Cadeira Flexora'],
    gluteos: ['Elevação Pélvica', 'Cadeira Abdutora', 'Glúteo Polia (Coice)'],
    peito: ['Supino Reto (Barra/Halter)', 'Supino Inclinado (Halter)', 'Peck Deck', 'Crucifixo Máquina'],
    costas: ['Puxada Alta (Polia)', 'Remada Baixa (Triângulo)', 'Remada Curvada (Barra)', 'Puxada Triângulo'],
    ombros: ['Desenvolvimento Máquina', 'Elevação Lateral Halter', 'Elevação Frontal'],
    triceps: ['Tríceps Corda', 'Tríceps Testa', 'Tríceps Pulley Barra Reta'],
    biceps: ['Rosca Direta (Barra W)', 'Rosca Alternada', 'Rosca Martelo'],
    abdomen: ['Abdominal Supra', 'Prancha', 'Infra Solo'],
    panturrilha: ['Gêmeos Sentado', 'Gêmeos em Pé Máquina']
};

const DB_ADVANCED = {
    quadriceps: ['Agachamento Frontal', 'Agachamento Búlgaro (com Halteres)', 'Sissy Squat', 'Leg Press Unilateral'],
    posterior: ['Stiff Unilateral (B-Stance)', 'Nordic Hamstring Curl', 'Good Morning'],
    gluteos: ['Elevação Pélvica Unilateral', 'Agachamento Sumô (Amplitude Max)', 'Abdução com Caneleira (em pé)'],
    peito: ['Supino Guilhotina', 'Crucifixo no Cabo (Crossover)', 'Supino Inclinado com Rotação', 'Mergulho nas Paralelas (Foco Peito)'],
    costas: ['Barra Fixa (Strict)', 'Remada Pendlay', 'Remada Cavalinho Livre', 'Pull-down Braços Estendidos'],
    ombros: ['Desenvolvimento Arnold', 'Elevação Lateral no Cabo (Por trás)', 'Crucifixo Inverso no Banco 45'],
    triceps: ['Tríceps Francês Unilateral', 'Mergulho Banco (Com Peso)', 'Tríceps Testa (Banco Inclinado)'],
    biceps: ['Rosca Spider', 'Rosca Scott Unilateral', 'Rosca 21', 'Rosca Inclinada (Banco 45)'],
    abdomen: ['Abdominal Rodinha (Ab Wheel)', 'Elevação de Pernas na Barra', 'L-Sit', 'Woodchopper no Cabo'],
    panturrilha: ['Panturrilha no Leg Press (Unilateral)', 'Burrinho (Donkey Calf)']
};

// --- 3. LÓGICA DO MÓDULO ---

class SmartTrainingCycle {

    static calcularNivelReal(input: UserInput): Nivel {
        if (!input.treinaAtualmente) return 'iniciante';
        const meses = input.tempoTreinoMeses || 0;

        if (meses < 12) return 'iniciante';
        if (meses >= 12 && meses <= 36) return 'intermediario';
        return 'avancado';
    }

    static definirSplit(dias: number): string[] {
        switch (dias) {
            case 2: return ['Upper Body (Superior)', 'Lower Body (Inferior)'];
            case 3: return ['Full Body', 'Upper', 'Lower'];
            case 4: return ['Upper A', 'Lower A', 'Upper B', 'Lower B'];
            case 5: return ['Upper Body', 'Lower Body', 'Push (Empurrar)', 'Legs (Pernas)', 'Pull (Puxar)'];
            case 6: return ['Push (Empurrar)', 'Legs A', 'Pull (Puxar)', 'Legs B', 'Upper Body', 'Lower Body'];
            default: return ['Upper Body', 'Lower Body'];
        }
    }

    static getExercicio(
        grupo: keyof typeof DB_COMMON,
        index: number,
        nivel: Nivel,
        forceAdvanced: boolean = false
    ): string {
        const listCommon = DB_COMMON[grupo];
        const useAdvanced = (nivel === 'avancado' && index > 0) || forceAdvanced;

        if (useAdvanced && DB_ADVANCED[grupo]) {
            const listAdv = DB_ADVANCED[grupo];
            return listAdv[index % listAdv.length];
        }

        return listCommon[index % listCommon.length];
    }

    static selecionarExercicios(
        tipoDia: string,
        input: UserInput,
        nivel: Nivel
    ): Exercicio[] {
        let lista: Exercicio[] = [];
        const ehHomem = input.sexo === 'masculino';
        const foco = input.focoMuscular;

        const baseReps = nivel === 'iniciante' ? '12-15' : '8-12';
        const baseSeries = 3;

        const add = (grupo: string, dbKey: keyof typeof DB_COMMON, index: number, reps: string = baseReps, isFocus: boolean = false) => {
            const nomeExercicio = this.getExercicio(dbKey, index, nivel, isFocus);

            return {
                nome: nomeExercicio,
                series: isFocus ? baseSeries + 1 : baseSeries,
                repeticoes: reps,
                rir: 0,
                descanso: isFocus ? '120s' : '90s',
                grupoMuscular: grupo,
                tag: isFocus ? '🔥 ÊNFASE' : undefined,
                observacao: isFocus ? 'Foco total na contração' : undefined
            };
        };

        if (tipoDia.includes('Full Body')) {
            lista.push(add('Pernas', 'quadriceps', 0));
            lista.push(add('Costas', 'costas', 0));
            lista.push(add('Peito', 'peito', 0));
            lista.push(add('Ombros', 'ombros', 1));
            lista.push(add('Tríceps', 'triceps', 0));
            lista.push(add('Bíceps', 'biceps', 0));
            if (!ehHomem) lista.push(add('Glúteos', 'gluteos', 0));
        }

        else if (tipoDia.includes('Upper') || tipoDia.includes('Superior')) {
            lista.push(add('Peito', 'peito', 0));
            lista.push(add('Costas', 'costas', 1));
            lista.push(add('Ombros', 'ombros', 0));

            if (ehHomem) {
                lista.push(add('Peito', 'peito', 1));
                lista.push(add('Costas', 'costas', 0));
            } else {
                lista.push(add('Costas', 'costas', 0));
                lista.push(add('Ombros', 'ombros', 1));
            }

            lista.push(add('Tríceps', 'triceps', 0));
            lista.push(add('Bíceps', 'biceps', 0));
        }

        else if (tipoDia.includes('Lower') || tipoDia.includes('Inferior') || tipoDia.includes('Legs') || tipoDia.includes('Pernas')) {
            lista.push(add('Quadríceps Base', 'quadriceps', 0));
            lista.push(add('Quadríceps Maq', 'quadriceps', 1));
            lista.push(add('Posterior', 'posterior', 0));

            if (!ehHomem || foco === 'gluteos') {
                lista.push(add('Glúteos', 'gluteos', 0));
                lista.push(add('Glúteos', 'gluteos', 1));
            }

            lista.push(add('Quadríceps Isolado', 'quadriceps', 2));
            lista.push(add('Posterior Isolado', 'posterior', 1));
            lista.push(add('Panturrilha', 'panturrilha', 0));
        }

        else if (tipoDia.includes('Push')) {
            lista.push(add('Peito', 'peito', 0));
            lista.push(add('Peito', 'peito', 1));
            lista.push(add('Ombros', 'ombros', 0));
            lista.push(add('Ombros', 'ombros', 1));
            lista.push(add('Tríceps', 'triceps', 0));
            lista.push(add('Tríceps', 'triceps', 1));
        }

        else if (tipoDia.includes('Pull')) {
            lista.push(add('Costas', 'costas', 0));
            lista.push(add('Costas', 'costas', 1));
            lista.push(add('Posterior Ombro', 'ombros', 2));
            lista.push(add('Bíceps', 'biceps', 0));
            lista.push(add('Bíceps', 'biceps', 1));
            lista.push(add('Trapézio/Costas', 'costas', 3));
        }

        // --- LÓGICA DE INJEÇÃO DE FOCO (ESPECIALIZAÇÃO) ---

        const isUpperDay = tipoDia.includes('Upper') || tipoDia.includes('Push') || tipoDia.includes('Pull') || tipoDia.includes('Full');
        const isLowerDay = tipoDia.includes('Lower') || tipoDia.includes('Legs') || tipoDia.includes('Pernas') || tipoDia.includes('Full');
        const isPushDay = tipoDia.includes('Push') || tipoDia.includes('Upper') || tipoDia.includes('Full');
        const isPullDay = tipoDia.includes('Pull') || tipoDia.includes('Upper') || tipoDia.includes('Full');

        if (foco === 'peito' && isPushDay) {
            const chestCount = lista.filter(e => e.grupoMuscular.includes('Peito')).length;
            if (chestCount < 4) {
                lista.splice(2, 0, add('Peito (Foco)', 'peito', 2, '10-12', true));
                if (chestCount < 3) lista.splice(3, 0, add('Peito (Foco)', 'peito', 3, '12-15', true));
            }
        }

        if (foco === 'costas' && isPullDay) {
            const backCount = lista.filter(e => e.grupoMuscular.includes('Costas')).length;
            if (backCount < 4) {
                lista.splice(2, 0, add('Costas (Foco)', 'costas', 2, '8-10', true));
                if (backCount < 3) lista.push(add('Costas (Foco)', 'costas', 3, '12-15', true));
            }
        }

        if (foco === 'bracos' && isUpperDay) {
            if (!tipoDia.includes('Pull')) lista.push(add('Tríceps (Foco)', 'triceps', 2, '10-12', true));
            if (!tipoDia.includes('Push')) lista.push(add('Bíceps (Foco)', 'biceps', 2, '10-12', true));
        }

        if ((foco === 'gluteos' || foco === 'pernas') && isLowerDay) {
            if (foco === 'gluteos') {
                lista.push(add('Glúteos (Foco)', 'gluteos', 2, '10-12', true));
                lista.push(add('Glúteos (Foco)', 'gluteos', 3, '15-20', true));
            } else {
                lista.push(add('Quadríceps (Foco)', 'quadriceps', 3, '12-15', true));
            }
        }

        if (foco === 'ombros' && isUpperDay) {
            lista.splice(3, 0, add('Ombros (Foco)', 'ombros', 1, '12-15', true));
            lista.push(add('Ombros (Foco)', 'ombros', 2, '15-20', true));
        }

        // --- GARANTIA MÍNIMA E LIMPEZA ---

        const uniqueList: Exercicio[] = [];
        const namesSeen = new Set();
        for (const ex of lista) {
            if (!namesSeen.has(ex.nome)) {
                uniqueList.push(ex);
                namesSeen.add(ex.nome);
            }
        }
        lista = uniqueList;

        let fillerIndex = 0;
        while (lista.length < 5) {
            if (fillerIndex === 0) lista.push(add('Abdômen', 'abdomen', 0));
            else if (fillerIndex === 1) lista.push(add('Panturrilha', 'panturrilha', 1));
            else lista.push(add('Core', 'abdomen', 1));
            fillerIndex++;
        }

        return lista;
    }

    static aplicarPeriodizacao(
        semana: number,
        rotinaBase: DiaTreino[],
        nivel: Nivel
    ): SemanaTreino {
        let fase = '';
        let descricao = '';
        let seriesMod = 0;
        let cargaNote = '';
        let instrucoes: string[] = [];

        switch (semana) {
            case 1:
                fase = 'Adaptation';
                descricao = 'Foco total na qualidade do movimento e conexão mente-músculo.';
                seriesMod = 0;
                cargaNote = 'Carga moderada';
                instrucoes = ['Não chegue à falha.', 'Concentre-se na execução perfeita.', 'RIR 3-4.'];
                break;
            case 2:
                fase = 'Base';
                descricao = 'Aumento moderado de volume para consolidar a técnica.';
                seriesMod = 1;
                cargaNote = 'Mantenha a carga ou suba levemente';
                instrucoes = ['+1 série nos básicos.', 'RIR 2-3.'];
                break;
            case 3:
                fase = 'Stimulus';
                descricao = 'Semana mais intensa do mês. Cargas mais altas.';
                seriesMod = 1;
                cargaNote = 'Aumente a carga em 2-5%';
                instrucoes = ['Tente bater recordes com técnica.', 'RIR 1 (Falha técnica).'];
                break;
            case 4:
                fase = 'Deload';
                descricao = 'Redução de volume para recuperação.';
                seriesMod = -100;
                cargaNote = 'Reduza 20% da carga';
                instrucoes = ['Treino leve.', 'Não busque fadiga.', 'Volume reduzido pela metade.'];
                break;
        }

        const rotinaSemana = rotinaBase.map(dia => ({
            ...dia,
            exercicios: dia.exercicios.map(ex => {
                let finalSeries = ex.series + seriesMod;
                if (semana === 4) finalSeries = Math.ceil(ex.series / 2);

                if (nivel === 'iniciante' && finalSeries > 4 && semana !== 4) finalSeries = 3;

                return {
                    ...ex,
                    series: finalSeries,
                    rir: semana === 1 ? 4 : semana === 2 ? 3 : semana === 3 ? 1 : 5,
                    observacao: ex.tag ? `${ex.tag} | ${cargaNote}` : cargaNote
                };
            })
        }));

        return { numero: semana, fase, descricao, instrucoesGerais: instrucoes, rotina: rotinaSemana };
    }

    static gerarPlano(input: UserInput): PlanoMensal {
        const nivelReal = this.calcularNivelReal(input);
        const splitEstrutura = this.definirSplit(input.diasDisponiveis);

        const rotinaBase: DiaTreino[] = splitEstrutura.map((nomeDia, index) => ({
            dia: `Dia ${index + 1}`,
            foco: nomeDia,
            exercicios: this.selecionarExercicios(nomeDia, input, nivelReal)
        }));

        const ciclo: SemanaTreino[] = [];
        for (let i = 1; i <= 4; i++) {
            ciclo.push(this.aplicarPeriodizacao(i, rotinaBase, nivelReal));
        }

        let focusMsg = '';
        if (input.objetivo === 'emagrecimento') focusMsg = 'Manter densidade de treino alta.';
        if (input.objetivo === 'hipertrofia') focusMsg = 'Maximizar tensão mecânica.';

        let enfaseMsg = 'Treino equilibrado.';
        if (input.focoMuscular !== 'nenhum') {
            enfaseMsg = `Ênfase especial em ${input.focoMuscular.toUpperCase()} adicionada à rotina.`;
        }

        return {
            resumoUsuario: {
                nivelReal: nivelReal,
                focoPrincipal: focusMsg,
                enfaseMuscular: enfaseMsg
            },
            ciclo: ciclo,
            mensagemFinal: "Ciclo gerado com sucesso. Ajuste as cargas conforme o RIR indicado."
        };
    }
}

// --- 4. ADAPTADOR PARA O SISTEMA EXISTENTE ---

export function generateWorkout(anamnese: Anamnese): GeneratedWorkout {
    // 1. Map Anamnese to UserInput
    const userInput: UserInput = {
        sexo: anamnese.sexo,
        idade: anamnese.idade,
        objetivo: anamnese.objetivos[0] || 'hipertrofia',
        altura: anamnese.altura,
        peso: anamnese.peso,
        nivelInformado: anamnese.nivelExperiencia,
        diasDisponiveis: anamnese.frequenciaTreino,
        equipamentos: anamnese.equipamentos,
        focoMuscular: (anamnese.focoMuscular[0] as FocoMuscular) || 'nenhum',
        treinaAtualmente: anamnese.isTraining,
        tempoTreinoMeses: anamnese.trainingDuration
    };

    // 2. Generate Plan
    const plano = SmartTrainingCycle.gerarPlano(userInput);

    // 3. Map PlanoMensal to GeneratedWorkout
    const periodization: GeneratedWeek[] = plano.ciclo.map(semana => ({
        weekNumber: semana.numero,
        phase: semana.fase as any,
        description: semana.descricao,
        days: semana.rotina.map((dia, index) => ({
            dia: index + 1,
            split: dia.foco,
            exercicios: dia.exercicios.map(ex => ({
                musculo: ex.grupoMuscular,
                nome: ex.nome,
                series: ex.series,
                reps: ex.repeticoes,
                rir: ex.rir.toString(),
                observacao: ex.observacao
            }))
        }))
    }));

    // Legacy support: use Week 2 (Base) as the default "diasDeTreino"
    const baseWeek = periodization.find(w => w.weekNumber === 2) || periodization[0];

    return {
        diasDeTreino: baseWeek.days,
        periodization: periodization
    };
}
