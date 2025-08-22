'use client';

import { Scenario } from '@/app/page';
import { Loader2, Settings, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface ScenarioGeneratorProps {
  onScenarioGenerated: (scenario: Scenario) => void;
  isGenerating: boolean;
  setIsGenerating: (generating: boolean) => void;
}

type LegalArea = 'civil' | 'trabalhista' | 'empresarial' | 'consumidor' | 'tributario' | 'penal';
type Difficulty = 'Iniciante' | 'Intermediário' | 'Avançado' | 'Expert';

const legalAreas: { value: LegalArea; label: string }[] = [
  { value: 'civil', label: 'Direito Civil' },
  { value: 'trabalhista', label: 'Direito Trabalhista' },
  { value: 'empresarial', label: 'Direito Empresarial' },
  { value: 'consumidor', label: 'Direito do Consumidor' },
  { value: 'tributario', label: 'Direito Tributário' },
  { value: 'penal', label: 'Direito Penal' },
];

const difficulties: { value: Difficulty; label: string; description: string }[] = [
  { value: 'Iniciante', label: 'Iniciante', description: 'Casos básicos e diretos' },
  {
    value: 'Intermediário',
    label: 'Intermediário',
    description: 'Situações com complexidade moderada',
  },
  { value: 'Avançado', label: 'Avançado', description: 'Casos complexos com múltiplas variáveis' },
  { value: 'Expert', label: 'Expert', description: 'Cenários altamente complexos e desafiadores' },
];

export default function ScenarioGenerator({
  onScenarioGenerated,
  isGenerating,
  setIsGenerating,
}: ScenarioGeneratorProps) {
  const [selectedArea, setSelectedArea] = useState<LegalArea>('civil');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('Intermediário');
  const [customPrompt, setCustomPrompt] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const generateScenario = async () => {
    setIsGenerating(true);

    try {
      const response = await fetch('/api/generate-scenario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          area: selectedArea,
          difficulty: selectedDifficulty,
          customPrompt: customPrompt.trim() || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao gerar cenário');
      }

      const scenario: Scenario = await response.json();
      onScenarioGenerated(scenario);
    } catch (error) {
      console.error('Erro ao gerar cenário:', error);
      alert('Erro ao gerar cenário. Verifique sua conexão e tente novamente.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="card p-8">
      <div className="flex items-center mb-6">
        <Sparkles className="w-6 h-6 text-primary-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900">Gerar Novo Cenário</h2>
      </div>

      <div className="space-y-6">
        {/* Area Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Área do Direito</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {legalAreas.map(area => (
              <button
                key={area.value}
                onClick={() => setSelectedArea(area.value)}
                className={`p-3 text-sm font-medium rounded-lg border-2 transition-colors ${
                  selectedArea === area.value
                    ? 'border-primary-600 bg-primary-50 text-primary-700'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                {area.label}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Nível de Dificuldade
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {difficulties.map(difficulty => (
              <button
                key={difficulty.value}
                onClick={() => setSelectedDifficulty(difficulty.value)}
                className={`p-4 text-left rounded-lg border-2 transition-colors ${
                  selectedDifficulty === difficulty.value
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-gray-900">{difficulty.label}</div>
                <div className="text-sm text-gray-600">{difficulty.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Advanced Options */}
        <div>
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 mb-3"
          >
            <Settings className="w-4 h-4 mr-2" />
            Opções Avançadas
            <span className="ml-1">{showAdvanced ? '▼' : '▶'}</span>
          </button>

          {showAdvanced && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prompt Personalizado (Opcional)
              </label>
              <textarea
                value={customPrompt}
                onChange={e => setCustomPrompt(e.target.value)}
                placeholder="Ex: Inclua aspectos de mediação empresarial, foque em contratos internacionais..."
                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                rows={3}
              />
              <p className="text-xs text-gray-500 mt-2">
                Use este campo para personalizar o cenário com requisitos específicos.
              </p>
            </div>
          )}
        </div>

        {/* Generate Button */}
        <div className="flex justify-center pt-4">
          <button
            onClick={generateScenario}
            disabled={isGenerating}
            className="btn-primary px-8 py-3 text-lg flex items-center"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Gerando Cenário...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Gerar Cenário
              </>
            )}
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isGenerating && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center">
            <div className="loading-dots w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
            <div
              className="loading-dots w-2 h-2 bg-blue-600 rounded-full mr-2"
              style={{ animationDelay: '0.2s' }}
            ></div>
            <div
              className="loading-dots w-2 h-2 bg-blue-600 rounded-full mr-4"
              style={{ animationDelay: '0.4s' }}
            ></div>
            <span className="text-blue-800 text-sm font-medium">
              Nossa IA está criando um cenário jurídico personalizado para você...
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
