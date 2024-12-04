import React from 'react';
import { Flame, Thermometer, TrendingUp, AlertCircle } from 'lucide-react';
import type { Account, AccountScore } from '../../types/ai';

interface AccountScoringProps {
  account: Account;
  score: AccountScore;
}

const getIntensityColor = (intensity: string) => {
  switch (intensity) {
    case 'boiling':
      return 'text-red-600 bg-red-50';
    case 'hot':
      return 'text-orange-600 bg-orange-50';
    case 'warm':
      return 'text-yellow-600 bg-yellow-50';
    default:
      return 'text-blue-600 bg-blue-50';
  }
};

const AccountScoring: React.FC<AccountScoringProps> = ({ account, score }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Thermometer className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold">Account Temperature</h2>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getIntensityColor(score.intensity)}`}>
          {score.intensity.toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border rounded-lg p-4">
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <Flame className="w-4 h-4" />
            <span className="text-sm font-medium">Engagement Score</span>
          </div>
          <div className="text-3xl font-bold">{score.score}</div>
        </div>

        <div className="border rounded-lg p-4">
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">Recency Bonus</span>
          </div>
          <div className="text-3xl font-bold">
            {(score.details.recencyBonus * 100 - 100).toFixed(0)}%
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Key Activities</span>
          </div>
          <div className="space-y-1">
            {score.details.significantActivities.map((activity, index) => (
              <div key={index} className="text-sm bg-gray-100 rounded px-2 py-1">
                {activity}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountScoring;