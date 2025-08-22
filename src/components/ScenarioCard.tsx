'use client';

import { Scenario } from '@/app/page';
import { ChevronRight, Clock, Target, Users } from 'lucide-react';

interface ScenarioCardProps {
  scenario: Scenario;
  onClick: () => void;
}

const difficultyColors = {
  Iniciante: 'bg-green-100 text-green-800 border-green-200',
  Intermediário: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Avançado: 'bg-orange-100 text-orange-800 border-orange-200',
  Expert: 'bg-red-100 text-red-800 border-red-200',
};

export default function ScenarioCard({ scenario, onClick }: ScenarioCardProps) {
  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    // Verificar se a data é válida
    if (isNaN(dateObj.getTime())) {
      return 'Data inválida';
    }

    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(dateObj);
  };

  return (
    <div
      className="card p-6 cursor-pointer transform hover:scale-105 transition-all duration-200"
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {scenario.title}
          </h3>
          <span
            className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${
              difficultyColors[scenario.difficulty]
            }`}
          >
            {scenario.difficulty}
          </span>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{scenario.description}</p>

      {/* Stats */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="w-4 h-4 mr-2" />
          <span>{scenario.estimatedTime}</span>
        </div>

        <div className="flex items-center text-sm text-gray-500">
          <Users className="w-4 h-4 mr-2" />
          <span>{scenario.parties.lawyers.length} advogado(s)</span>
        </div>

        <div className="flex items-center text-sm text-gray-500">
          <Target className="w-4 h-4 mr-2" />
          <span>{scenario.objectives.length} objetivo(s)</span>
        </div>
      </div>

      {/* Preview of parties */}
      <div className="bg-gray-50 rounded-lg p-3 mb-4">
        <div className="text-xs font-medium text-gray-700 mb-1">Partes:</div>
        <div className="text-xs text-gray-600">
          <span className="font-medium">Requerente:</span> {scenario.parties.plaintiff}
          <br />
          <span className="font-medium">Requerido:</span> {scenario.parties.defendant}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-500">Criado em {formatDate(scenario.createdAt)}</span>
        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
          Ver detalhes
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
}
