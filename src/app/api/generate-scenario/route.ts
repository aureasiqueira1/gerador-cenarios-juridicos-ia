import { Scenario } from '@/app/page';
import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

// Configuração do OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Mapping de áreas jurídicas para contextos mais específicos
const areaContexts = {
  civil: 'direito civil, contratos, responsabilidade civil, direitos reais, família',
  trabalhista: 'direito do trabalho, CLT, relações trabalhistas, rescisões, assédio',
  empresarial: 'direito empresarial, societário, fusões, aquisições, compliance',
  consumidor: 'CDC, direito do consumidor, relações de consumo, defeitos, vícios',
  tributario: 'direito tributário, impostos, fiscalização, planejamento fiscal',
  penal: 'direito penal, crimes, defesa criminal, processo penal, medidas cautelares',
};

const difficultyPrompts = {
  Iniciante: 'cenário simples e direto, com poucos elementos complicadores',
  Intermediário: 'cenário com complexidade moderada, incluindo algumas nuances jurídicas',
  Avançado: 'cenário complexo com múltiplas questões jurídicas e partes envolvidas',
  Expert: 'cenário altamente complexo com questões controvertidas e aspectos técnicos avançados',
};

type LegalArea = keyof typeof areaContexts;
type Difficulty = keyof typeof difficultyPrompts;

interface GenerateScenarioRequest {
  area: LegalArea;
  difficulty: Difficulty;
  customPrompt?: string;
}

export async function POST(request: NextRequest) {
  try {
    // Verificar se a API key está configurada
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'API key do OpenAI não configurada' }, { status: 500 });
    }

    const { area, difficulty, customPrompt }: GenerateScenarioRequest = await request.json();

    // Validação dos parâmetros
    if (!area || !difficulty) {
      return NextResponse.json({ error: 'Área e dificuldade são obrigatórias' }, { status: 400 });
    }

    if (!(area in areaContexts) || !(difficulty in difficultyPrompts)) {
      return NextResponse.json({ error: 'Área ou dificuldade inválida' }, { status: 400 });
    }

    // Construir o prompt para a IA
    const systemPrompt = `Você é um especialista em direito brasileiro e criador de cenários de treinamento jurídico. Sua tarefa é criar cenários realistas e educativos para advogados praticarem suas habilidades.`;

    const userPrompt = `
Crie um cenário jurídico realista para treinamento de advogados com as seguintes características:

**Área:** ${areaContexts[area]}
**Dificuldade:** ${difficultyPrompts[difficulty]}
${customPrompt ? `**Requisitos adicionais:** ${customPrompt}` : ''}

O cenário deve ser retornado EXATAMENTE no seguinte formato JSON, sem texto adicional:

{
  "title": "Título conciso e atrativo do cenário",
  "description": "Breve descrição do que o cenário aborda (1-2 frases)",
  "context": "Contexto detalhado da situação jurídica, incluindo fatos relevantes, cronologia e circunstâncias (3-4 parágrafos)",
  "parties": {
    "plaintiff": "Nome e breve descrição do requerente/cliente",
    "defendant": "Nome e breve descrição do requerido/parte contrária",
    "lawyers": ["Nome do Advogado 1 (perfil)", "Nome do Advogado 2 (perfil)"]
  },
  "objectives": [
    "Objetivo específico 1 para o treinamento",
    "Objetivo específico 2 para o treinamento",
    "Objetivo específico 3 para o treinamento"
  ],
  "challenges": [
    "Desafio jurídico 1 que será encontrado",
    "Desafio jurídico 2 que será encontrado",
    "Desafio jurídico 3 que será encontrado"
  ],
  "suggestedStrategies": [
    "Estratégia recomendada 1",
    "Estratégia recomendada 2",
    "Estratégia recomendada 3"
  ],
  "estimatedTime": "Tempo estimado para completar o exercício (ex: 45-60 minutos)"
}

Certifique-se de que:
- Os nomes sejam brasileiros e realistas
- O contexto seja detalhado mas conciso
- Os desafios sejam apropriados para o nível de dificuldade
- As estratégias sejam práticas e aplicáveis
- O cenário seja educativo e relevante para a prática jurídica brasileira
`;

    // Chamar a API do OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.8, // Um pouco de criatividade
      max_tokens: 2000,
    });

    const aiResponse = completion.choices[0]?.message?.content;

    if (!aiResponse) {
      throw new Error('Resposta vazia da IA');
    }

    // Parse da resposta JSON
    let scenarioData;
    try {
      // Limpar possível formatação markdown
      const cleanResponse = aiResponse.replace(/```json\n?|\n?```/g, '').trim();
      scenarioData = JSON.parse(cleanResponse);
    } catch (parseError) {
      console.error('Erro ao fazer parse da resposta da IA:', parseError);
      console.error('Resposta recebida:', aiResponse);
      throw new Error('Resposta da IA não está em formato JSON válido');
    }

    // Criar o objeto Scenario completo
    const scenario: Scenario = {
      id: `scenario_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title: scenarioData.title,
      difficulty,
      description: scenarioData.description,
      context: scenarioData.context,
      parties: scenarioData.parties,
      objectives: scenarioData.objectives,
      challenges: scenarioData.challenges,
      suggestedStrategies: scenarioData.suggestedStrategies,
      estimatedTime: scenarioData.estimatedTime,
      createdAt: new Date(),
    };

    return NextResponse.json(scenario);
  } catch (error) {
    console.error('Erro ao gerar cenário:', error);

    // Diferentes tipos de erro
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return NextResponse.json({ error: 'Erro de configuração da API' }, { status: 500 });
      }
      if (error.message.includes('JSON')) {
        return NextResponse.json({ error: 'Erro ao processar resposta da IA' }, { status: 500 });
      }
    }

    return NextResponse.json(
      { error: 'Erro interno do servidor ao gerar cenário' },
      { status: 500 }
    );
  }
}
