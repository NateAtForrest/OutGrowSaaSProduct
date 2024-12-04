import React from 'react';
import { Flame, TrendingUp, Building2, Users } from 'lucide-react';
import { Lead, Visitor, CompanyInfo } from '../../types';
import { scoreLeads } from '../../lib/ai/leadScoring';

interface LeadScoreCardProps {
  lead: Lead;
  visitorHistory?: Visitor[];
  companyInfo?: CompanyInfo;
}

const LeadScoreCard: React.FC<LeadScoreCardProps> = ({
  lead,
  visitorHistory = [],
  companyInfo
}) => {
  const scoreResult = scoreLeads(lead, visitorHistory, companyInfo);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'hot':
        return 'text-red-600 bg-red-50 border-red-100';
      case 'warm':
        return 'text-orange-600 bg-orange-50 border-orange-100';
      default:
        return 'text-blue-600 bg-blue-50 border-blue-100';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Flame className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold">Lead Score</h2>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${
          getCategoryColor(scoreResult.category)
        }`}>
          {scoreResult.category.toUpperCase()}
        </span>
      </div>

      <div className="flex items-center justify-center mb-6">
        <div className="w-32 h-32 rounded-full border-8 border-blue-100 flex items-center justify-center">
          <div className="text-3xl font-bold">{scoreResult.score}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-6">
        {scoreResult.factors.map((factor, index) => (
          <div key={index} className="border rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">{factor.name}</span>
              <span className={`text-sm font-medium ${
                factor.impact === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {factor.score}
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  factor.impact === 'positive' ? 'bg-green-500' : 'bg-red-500'
                }`}
                style={{ width: `${factor.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="border rounded-lg p-4">
        <h3 className="font-medium mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-blue-600" />
          Recommended Actions
        </h3>
        <ul className="space-y-2">
          {scoreResult.nextActions.map((action, index) => (
            <li key={index} className="flex items-center gap-2 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
              {action}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LeadScoreCard;