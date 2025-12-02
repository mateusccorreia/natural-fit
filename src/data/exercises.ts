import type { Exercise } from '../types/workout';

export const exercises: Exercise[] = [
    // --- PEITO (CHEST) ---
    {
        id: 'chest-1',
        name: 'Supino Reto',
        muscleGroup: 'chest',
        difficulty: 'intermediate',
        equipment: ['barbell', 'dumbbell'],
        description: 'Exercício fundamental para o desenvolvimento do peitoral maior.',
        instructions: ['Deite-se no banco plano', 'Segure a barra na largura dos ombros', 'Desça a barra até tocar o peito', 'Empurre de volta à posição inicial'],
        youtubeId: 'rT7DgCr-3pg' // Bench Press
    },
    {
        id: 'chest-2',
        name: 'Supino Inclinado',
        muscleGroup: 'chest',
        difficulty: 'intermediate',
        equipment: ['barbell', 'dumbbell'],
        description: 'Foco na porção superior do peitoral.',
        instructions: ['Ajuste o banco para 30-45 graus', 'Desça a barra até a parte superior do peito', 'Empurre para cima'],
        youtubeId: 'SrqOu55lrYU' // Incline Bench Press
    },
    {
        id: 'chest-3',
        name: 'Supino Declinado',
        muscleGroup: 'chest',
        difficulty: 'intermediate',
        equipment: ['barbell', 'dumbbell'],
        description: 'Foco na porção inferior do peitoral.',
        instructions: ['Deite-se no banco declinado', 'Mantenha os cotovelos levemente flexionados', 'Empurre a carga'],
        youtubeId: 'LfyQBUKR8SE' // Decline Bench Press
    },
    {
        id: 'chest-4',
        name: 'Crucifixo',
        muscleGroup: 'chest',
        difficulty: 'beginner',
        equipment: ['dumbbell', 'machine'],
        description: 'Exercício isolador para o peitoral, ótimo para alongamento.',
        instructions: ['Deite-se no banco', 'Abra os braços com leve flexão de cotovelo', 'Feche os braços no topo'],
        youtubeId: 'eozdVDA78K0' // Dumbbell Fly
    },
    {
        id: 'chest-5',
        name: 'Crossover',
        muscleGroup: 'chest',
        difficulty: 'intermediate',
        equipment: ['cables'],
        description: 'Excelente para finalizar o treino e gerar pump.',
        instructions: ['Posicione-se no centro da máquina', 'Puxe os cabos até cruzar as mãos à frente', 'Controle a volta'],
        youtubeId: 'taI4XduLpTk' // Cable Crossover
    },
    {
        id: 'chest-6',
        name: 'Peck-Deck (Voador)',
        muscleGroup: 'chest',
        difficulty: 'beginner',
        equipment: ['machine'],
        description: 'Isolador seguro e eficaz para o peitoral.',
        instructions: ['Ajuste o assento', 'Mantenha os cotovelos na altura dos ombros', 'Feche os braços à frente'],
        youtubeId: 'Z57CtFmRMxA' // Pec Deck
    },

    // --- COSTAS (BACK) ---
    {
        id: 'back-1',
        name: 'Barra Fixa',
        muscleGroup: 'back',
        difficulty: 'advanced',
        equipment: ['bodyweight'],
        description: 'O melhor exercício para largura de costas.',
        instructions: ['Pendure-se na barra', 'Puxe o corpo até o queixo passar da barra', 'Desça controlando'],
        youtubeId: 'eGo4IYlbE5g' // Pull Up
    },
    {
        id: 'back-2',
        name: 'Puxada Frontal',
        muscleGroup: 'back',
        difficulty: 'beginner',
        equipment: ['machine'],
        description: 'Variação da barra fixa feita na máquina.',
        instructions: ['Segure a barra aberta', 'Puxe em direção ao peito', 'Mantenha o tronco firme'],
        youtubeId: 'CAwf7n6Luuc' // Lat Pulldown
    },
    {
        id: 'back-3',
        name: 'Remada Curvada',
        muscleGroup: 'back',
        difficulty: 'advanced',
        equipment: ['barbell'],
        description: 'Construtor de densidade e espessura para as costas.',
        instructions: ['Incline o tronco à frente', 'Mantenha a coluna reta', 'Puxe a barra em direção ao abdômen'],
        youtubeId: '9efgcGunU90' // Bent Over Row
    },
    {
        id: 'back-4',
        name: 'Remada Baixa',
        muscleGroup: 'back',
        difficulty: 'beginner',
        equipment: ['cables'],
        description: 'Exercício controlado para o meio das costas.',
        instructions: ['Sente-se na máquina', 'Puxe o triângulo até o abdômen', 'Alongue bem na volta'],
        youtubeId: 'GZbfZ033f74' // Seated Cable Row
    },
    {
        id: 'back-5',
        name: 'Remada Unilateral (Serrote)',
        muscleGroup: 'back',
        difficulty: 'intermediate',
        equipment: ['dumbbell'],
        description: 'Foco unilateral para corrigir assimetrias.',
        instructions: ['Apoie-se no banco', 'Puxe o halter em direção ao quadril', 'Mantenha as costas retas'],
        youtubeId: 'pYcpY20QaE8' // Dumbbell Row
    },
    {
        id: 'back-6',
        name: 'Pulldown',
        muscleGroup: 'back',
        difficulty: 'intermediate',
        equipment: ['cables'],
        description: 'Isolador para o grande dorsal.',
        instructions: ['Mantenha os braços estendidos', 'Abaixe a barra até a coxa', 'Controle a subida'],
        youtubeId: 'JGeRYIZdojU' // Straight Arm Pulldown
    },

    // --- PERNAS (LEGS) - GERAL, QUADRICEPS, POSTERIOR, GLUTEOS ---
    {
        id: 'legs-1',
        name: 'Agachamento Livre',
        muscleGroup: 'legs',
        difficulty: 'advanced',
        equipment: ['barbell'],
        description: 'O rei dos exercícios de perna. Foco em quadríceps e glúteos.',
        instructions: ['Barra nas costas', 'Pés na largura dos ombros', 'Agache até quebrar a paralela', 'Suba explodindo'],
        risks: ['lombar', 'joelho'],
        youtubeId: 'MVMNk0HiTMk' // Squat
    },
    {
        id: 'legs-2',
        name: 'Leg Press 45',
        muscleGroup: 'legs',
        difficulty: 'intermediate',
        equipment: ['machine'],
        description: 'Ótimo para sobrecarga nas pernas com segurança.',
        instructions: ['Apoie as costas', 'Empurre a plataforma', 'Não estenda totalmente os joelhos'],
        youtubeId: 'IZxyjW7MPJQ' // Leg Press
    },
    {
        id: 'legs-3',
        name: 'Afundo (Lunge)',
        muscleGroup: 'legs',
        difficulty: 'intermediate',
        equipment: ['dumbbell', 'bodyweight'],
        description: 'Excelente para quadríceps e glúteos.',
        instructions: ['Dê um passo à frente', 'Desça o joelho de trás até quase tocar o chão', 'Retorne à posição'],
        youtubeId: 'D7KaZhft0Ds' // Lunges
    },
    {
        id: 'legs-4',
        name: 'Hack Machine',
        muscleGroup: 'legs',
        difficulty: 'intermediate',
        equipment: ['machine'],
        description: 'Variação de agachamento com suporte nas costas.',
        instructions: ['Apoie-se na máquina', 'Agache controladamente', 'Empurre com os calcanhares'],
        youtubeId: '0tn5K9NlCfo' // Hack Squat
    },
    {
        id: 'legs-5',
        name: 'Cadeira Extensora',
        muscleGroup: 'legs',
        difficulty: 'beginner',
        equipment: ['machine'],
        description: 'Isolador para quadríceps.',
        instructions: ['Ajuste o banco', 'Estenda os joelhos completamente', 'Segure 1s no topo'],
        youtubeId: 'YyvSfVjQeL0' // Leg Extension
    },
    {
        id: 'legs-6',
        name: 'Mesa Flexora',
        muscleGroup: 'legs',
        difficulty: 'beginner',
        equipment: ['machine'],
        description: 'Isolador para posterior de coxa.',
        instructions: ['Deite-se de bruços', 'Flexione os joelhos trazendo o apoio glúteo', 'Desça devagar'],
        youtubeId: '1Tq3QdYUuHs' // Lying Leg Curl
    },
    {
        id: 'legs-7',
        name: 'Stiff',
        muscleGroup: 'legs',
        difficulty: 'intermediate',
        equipment: ['barbell', 'dumbbell'],
        description: 'Foco total em posterior de coxa e glúteos.',
        instructions: ['Pés na largura do quadril', 'Desça a barra mantendo as pernas estendidas', 'Mantenha a coluna reta'],
        risks: ['lombar'],
        youtubeId: 'CN_7cz3P-1U' // Stiff Leg Deadlift
    },
    {
        id: 'legs-8',
        name: 'Hip Thrust (Elevação Pélvica)',
        muscleGroup: 'legs',
        difficulty: 'intermediate',
        equipment: ['barbell'],
        description: 'O melhor exercício para glúteos.',
        instructions: ['Apoie as costas no banco', 'Barra no quadril', 'Eleve o quadril contraindo os glúteos'],
        youtubeId: 'SEdqW1n0CVg' // Hip Thrust
    },
    {
        id: 'legs-9',
        name: 'Agachamento Sumô',
        muscleGroup: 'legs',
        difficulty: 'intermediate',
        equipment: ['dumbbell', 'barbell'],
        description: 'Foco em adutores e glúteos.',
        instructions: ['Pés bem afastados', 'Pontas dos pés para fora', 'Agache mantendo o tronco ereto'],
        youtubeId: '9ZuuNXRxMVE' // Sumo Squat
    },
    {
        id: 'legs-10',
        name: 'Cadeira Abdutora',
        muscleGroup: 'legs',
        difficulty: 'beginner',
        equipment: ['machine'],
        description: 'Isolador para glúteo médio.',
        instructions: ['Sente-se e apoie as costas', 'Abra as pernas contra a resistência', 'Controle o fechamento'],
        youtubeId: 'G_8L4d8d8aM' // Hip Abduction
    },
    {
        id: 'legs-11',
        name: 'Glute Ham Raise',
        muscleGroup: 'legs',
        difficulty: 'advanced',
        equipment: ['bodyweight', 'machine'],
        description: 'Exercício avançado para cadeia posterior.',
        instructions: ['Prenda os pés', 'Desça o corpo controladamente', 'Suba usando os posteriores'],
        youtubeId: 'l41So06-y4c' // Glute Ham Raise
    },
    {
        id: 'legs-12',
        name: 'Afundo Búlgaro',
        muscleGroup: 'legs',
        difficulty: 'advanced',
        equipment: ['dumbbell', 'bodyweight'],
        description: 'Unilateral poderoso para quadríceps e glúteos.',
        instructions: ['Apoie o pé de trás em um banco', 'Agache com a perna da frente', 'Mantenha o equilíbrio'],
        youtubeId: '2C-uNgKwPLE' // Bulgarian Split Squat
    },
    {
        id: 'legs-13',
        name: 'Panturrilha em Pé',
        muscleGroup: 'legs',
        difficulty: 'beginner',
        equipment: ['machine'],
        description: 'Básico para panturrilhas.',
        instructions: ['Apoie os ombros', 'Suba na ponta dos pés', 'Desça alongando bem'],
        youtubeId: 'ym8y7yC3QjE' // Standing Calf Raise
    },
    {
        id: 'legs-14',
        name: 'Panturrilha Sentado',
        muscleGroup: 'legs',
        difficulty: 'beginner',
        equipment: ['machine'],
        description: 'Foco no músculo sóleo.',
        instructions: ['Sente-se na máquina', 'Eleve os calcanhares', 'Desça controladamente'],
        youtubeId: 'JbyjNymZOtM' // Seated Calf Raise
    },

    // --- OMBROS (SHOULDERS) ---
    {
        id: 'shoulders-1',
        name: 'Desenvolvimento',
        muscleGroup: 'shoulders',
        difficulty: 'intermediate',
        equipment: ['dumbbell', 'barbell'],
        description: 'Construtor de massa para os ombros.',
        instructions: ['Sente-se com as costas apoiadas', 'Empurre o peso acima da cabeça', 'Desça até a altura das orelhas'],
        risks: ['ombro'],
        youtubeId: 'qEwKCR5JCog' // Overhead Press
    },
    {
        id: 'shoulders-2',
        name: 'Elevação Lateral',
        muscleGroup: 'shoulders',
        difficulty: 'beginner',
        equipment: ['dumbbell', 'cables'],
        description: 'Essencial para a largura do ombro (deltoide lateral).',
        instructions: ['Eleve os braços até a altura dos ombros', 'Cotovelos levemente flexionados', 'Não balance o corpo'],
        youtubeId: '3VcKaXpzqRo' // Lateral Raise
    },
    {
        id: 'shoulders-3',
        name: 'Elevação Frontal',
        muscleGroup: 'shoulders',
        difficulty: 'beginner',
        equipment: ['dumbbell', 'barbell'],
        description: 'Foco no deltoide anterior.',
        instructions: ['Eleve o peso à frente do corpo', 'Altura dos olhos', 'Desça devagar'],
        youtubeId: '-t7fuZ0KhDA' // Front Raise
    },
    {
        id: 'shoulders-4',
        name: 'Elevação Posterior (Crucifixo Inverso)',
        muscleGroup: 'shoulders',
        difficulty: 'intermediate',
        equipment: ['dumbbell', 'machine'],
        description: 'Foco no deltoide posterior.',
        instructions: ['Incline o tronco', 'Abra os braços para trás', 'Foque na parte de trás do ombro'],
        youtubeId: 'zM_xGp7n8hQ' // Reverse Fly
    },
    {
        id: 'shoulders-5',
        name: 'Arnold Press',
        muscleGroup: 'shoulders',
        difficulty: 'intermediate',
        equipment: ['dumbbell'],
        description: 'Variação completa que atinge todas as cabeças do ombro.',
        instructions: ['Comece com as palmas para você', 'Gire os punhos ao subir', 'Termine com palmas para frente'],
        youtubeId: '3ml7BH7mNwQ' // Arnold Press
    },
    {
        id: 'shoulders-6',
        name: 'Remada Alta',
        muscleGroup: 'shoulders',
        difficulty: 'intermediate',
        equipment: ['barbell', 'cables'],
        description: 'Trabalha ombros e trapézio.',
        instructions: ['Segure a barra próxima ao corpo', 'Puxe os cotovelos para cima', 'Até a altura do peito'],
        youtubeId: 'amCU-ziC5QE' // Upright Row
    },

    // --- BRAÇOS (ARMS) - BICEPS & TRICEPS ---
    {
        id: 'arms-1',
        name: 'Rosca Direta',
        muscleGroup: 'arms',
        difficulty: 'beginner',
        equipment: ['barbell'],
        description: 'O clássico para bíceps.',
        instructions: ['Segure a barra', 'Flexione os cotovelos', 'Não balance o tronco'],
        youtubeId: 'kwG2ipFRgfo' // Barbell Curl
    },
    {
        id: 'arms-2',
        name: 'Rosca Alternada',
        muscleGroup: 'arms',
        difficulty: 'beginner',
        equipment: ['dumbbell'],
        description: 'Permite foco individual em cada braço.',
        instructions: ['Gire o punho ao subir (supinação)', 'Alterne os braços'],
        youtubeId: 'sAq_ocpRh_I' // Alternating Dumbbell Curl
    },
    {
        id: 'arms-3',
        name: 'Rosca Martelo',
        muscleGroup: 'arms',
        difficulty: 'beginner',
        equipment: ['dumbbell'],
        description: 'Foco no braquial e antebraço.',
        instructions: ['Palmas voltadas uma para a outra', 'Suba o peso sem girar'],
        youtubeId: 'zC3nLlEvin4' // Hammer Curl
    },
    {
        id: 'arms-4',
        name: 'Rosca Scott',
        muscleGroup: 'arms',
        difficulty: 'intermediate',
        equipment: ['machine', 'barbell'],
        description: 'Isolamento total do bíceps.',
        instructions: ['Apoie os braços no banco', 'Estenda quase tudo', 'Flexione até o topo'],
        youtubeId: 'o9Zk-Yj5gE0' // Preacher Curl
    },
    {
        id: 'arms-5',
        name: 'Tríceps Testa',
        muscleGroup: 'arms',
        difficulty: 'intermediate',
        equipment: ['barbell', 'dumbbell'],
        description: 'Ótimo para a cabeça longa do tríceps.',
        instructions: ['Deite-se', 'Desça a barra em direção à testa', 'Estenda os cotovelos'],
        youtubeId: 'nRiJVZDpdL0' // Skullcrusher
    },
    {
        id: 'arms-6',
        name: 'Tríceps Pulley (Corda)',
        muscleGroup: 'arms',
        difficulty: 'beginner',
        equipment: ['cables'],
        description: 'Isolador finalizador para tríceps.',
        instructions: ['Mantenha cotovelos fixos', 'Estenda os braços para baixo', 'Abra a corda no final'],
        youtubeId: 'vB5OHsJ3EME' // Tricep Pushdown
    },
    {
        id: 'arms-7',
        name: 'Mergulho em Paralelas',
        muscleGroup: 'arms',
        difficulty: 'advanced',
        equipment: ['bodyweight'],
        description: 'Construtor de massa para tríceps.',
        instructions: ['Mantenha o corpo vertical', 'Desça até 90 graus', 'Empurre para subir'],
        youtubeId: '2z8JmcrW-As' // Dips
    },
    {
        id: 'arms-8',
        name: 'Tríceps Banco',
        muscleGroup: 'arms',
        difficulty: 'beginner',
        equipment: ['bodyweight'],
        description: 'Opção simples e eficaz.',
        instructions: ['Apoie as mãos no banco', 'Desça o quadril', 'Empurre com os braços'],
        youtubeId: '0326dy_-CzM' // Bench Dips
    },

    // --- ABDÔMEN (ABS) ---
    {
        id: 'abs-1',
        name: 'Abdominal Crunch',
        muscleGroup: 'abs',
        difficulty: 'beginner',
        equipment: ['bodyweight'],
        description: 'O básico bem feito.',
        instructions: ['Deite-se', 'Eleve os ombros do chão', 'Contraia o abdômen'],
        youtubeId: 'Xyd_fa5zoEU' // Crunch
    },
    {
        id: 'abs-2',
        name: 'Elevação de Pernas',
        muscleGroup: 'abs',
        difficulty: 'intermediate',
        equipment: ['bodyweight'],
        description: 'Foco na porção infra abdominal.',
        instructions: ['Deite-se ou pendure-se', 'Eleve as pernas retas ou flexionadas', 'Controle a descida'],
        youtubeId: 'JB2oyawG9KI' // Leg Raise
    },
    {
        id: 'abs-3',
        name: 'Prancha Isométrica',
        muscleGroup: 'abs',
        difficulty: 'intermediate',
        equipment: ['bodyweight'],
        description: 'Fortalecimento do core e estabilidade.',
        instructions: ['Apoie antebraços e pontas dos pés', 'Mantenha o corpo reto', 'Segure a posição'],
        youtubeId: 'pSHjTRCQxIw' // Plank
    },
    {
        id: 'abs-4',
        name: 'Ab Wheel (Rodinha)',
        muscleGroup: 'abs',
        difficulty: 'advanced',
        equipment: ['bodyweight'],
        description: 'Exercício intenso para todo o core.',
        instructions: ['Ajoelhe-se', 'Role a roda à frente', 'Retorne contraindo o abdômen'],
        youtubeId: 'rqiTPdK1cic' // Ab Wheel
    },
    {
        id: 'abs-5',
        name: 'Abdominal Oblíquo',
        muscleGroup: 'abs',
        difficulty: 'beginner',
        equipment: ['bodyweight'],
        description: 'Para a cintura e laterais.',
        instructions: ['Cruze a perna', 'Leve o cotovelo oposto ao joelho'],
        youtubeId: 'Q554J_385b0' // Oblique Crunch
    },
];
