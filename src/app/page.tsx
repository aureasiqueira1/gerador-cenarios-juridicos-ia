'use client';

import ScenarioCard from '@/components/ScenarioCard';
import ScenarioGenerator from '@/components/ScenarioGenerator';
import { Brain, Play, Target, Users } from 'lucide-react';
import { useState } from 'react';

export type Scenario = {
  id: string;
  title: string;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado' | 'Expert';
  description: string;
  context: string;
  parties: {
    plaintiff: string;
    defendant: string;
    lawyers: string[];
  };
  objectives: string[];
  challenges: string[];
  suggestedStrategies: string[];
  estimatedTime: string;
  createdAt: Date | string;
};

export default function Home() {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);

  const handleNewScenario = (scenario: Scenario) => {
    setScenarios(prev => [scenario, ...prev]);
  };

  const difficultyColors = {
    Iniciante: 'bg-green-100 text-green-800',
    Intermediário: 'bg-yellow-100 text-yellow-800',
    Avançado: 'bg-orange-100 text-orange-800',
    Expert: 'bg-red-100 text-red-800',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Treine com Cenários Jurídicos Realistas
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Gere cenários jurídicos personalizados usando IA para aprimorar suas habilidades de
          negociação e estratégia legal.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card p-6 text-center">
          <Target className="w-8 h-8 text-primary-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900">Cenários Gerados</h3>
          <p className="text-2xl font-bold text-primary-600">{scenarios.length}</p>
        </div>
        <div className="card p-6 text-center">
          <Brain className="w-8 h-8 text-primary-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900">Powered by IA</h3>
          <p className="text-sm text-gray-600">GPT-4 Turbo</p>
        </div>
        <div className="card p-6 text-center">
          <Users className="w-8 h-8 text-primary-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900">Múltiplos Níveis</h3>
          <p className="text-sm text-gray-600">Iniciante ao Expert</p>
        </div>
        <div className="card p-6 text-center">
          <Play className="w-8 h-8 text-primary-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900">Pronto para Uso</h3>
          <p className="text-sm text-gray-600">Comece agora</p>
        </div>
      </div>

      {/* Generator Section */}
      <div className="mb-12">
        <ScenarioGenerator
          onScenarioGenerated={handleNewScenario}
          isGenerating={isGenerating}
          setIsGenerating={setIsGenerating}
        />
      </div>

      {/* Scenarios Grid */}
      {scenarios.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Cenários Gerados ({scenarios.length})
            </h3>
            <div className="flex gap-2">
              {(['Iniciante', 'Intermediário', 'Avançado', 'Expert'] as const).map(level => {
                const count = scenarios.filter(s => s.difficulty === level).length;
                return count > 0 ? (
                  <span
                    key={level}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColors[level]}`}
                  >
                    {level}: {count}
                  </span>
                ) : null;
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scenarios.map(scenario => (
              <ScenarioCard
                key={scenario.id}
                scenario={scenario}
                onClick={() => setSelectedScenario(scenario)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {scenarios.length === 0 && !isGenerating && (
        <div className="text-center py-12">
          <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
            <Target className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum cenário gerado ainda</h3>
          <p className="text-gray-600 mb-4">
            Use o gerador acima para criar seu primeiro cenário jurídico personalizado.
          </p>
        </div>
      )}

      {/* Scenario Modal/Detail View */}
      {selectedScenario && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900">{selectedScenario.title}</h3>
                <button
                  onClick={() => setSelectedScenario(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold bg-gray-100 hover:bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      difficultyColors[selectedScenario.difficulty]
                    }`}
                  >
                    {selectedScenario.difficulty}
                  </span>
                  <span className="ml-3 text-sm text-gray-600">
                    ⏱️ {selectedScenario.estimatedTime}
                  </span>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Contexto</h4>
                  <p className="text-gray-700 leading-relaxed">{selectedScenario.context}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3">Partes Envolvidas</h4>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p>
                        <strong className="text-gray-900">Requerente:</strong>{' '}
                        {selectedScenario.parties.plaintiff}
                      </p>
                      <p>
                        <strong className="text-gray-900">Requerido:</strong>{' '}
                        {selectedScenario.parties.defendant}
                      </p>
                      <p>
                        <strong className="text-gray-900">Advogados:</strong>{' '}
                        {selectedScenario.parties.lawyers.join(', ')}
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3">Objetivos</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      {selectedScenario.objectives.map((obj, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-primary-600 mr-2 mt-0.5">•</span>
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">Desafios</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {selectedScenario.challenges.map((challenge, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-orange-500 mr-2 mt-0.5">⚠️</span>
                        <span>{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">Estratégias Sugeridas</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {selectedScenario.suggestedStrategies.map((strategy, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-green-500 mr-2 mt-0.5">💡</span>
                        <span>{strategy}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setSelectedScenario(null)}
                    className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
