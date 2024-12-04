import React from 'react';
import { Lightbulb, TrendingUp, Target, Users, ArrowRight, DollarSign, BarChart } from 'lucide-react';
import type { AIRecommendation } from '../../types';

const mockRecommendations: AIRecommendation[] = [
  {
    id: '1',
    type: 'campaign',
    priority: 'high',
    message: 'Increase LinkedIn campaign budget by 30% - Current ROI is 285% above baseline',
    impact: 85,
    action: 'Optimize Budget',
    details: {
      currentMetric: '285% ROI',
      potentialGain: '+$45,000 Revenue',
      timeframe: 'Next 30 days'
    }
  },
  {
    id: '2',
    type: 'content',
    priority: 'medium',
    message: 'Create technical whitepaper for Financial Services - High engagement from enterprise visitors',
    impact: 72,
    action: 'Create Content',
    details: {
      currentMetric: '65% Engagement',
      potentialGain: '+125 MQLs',
      timeframe: 'Next quarter'
    }
  },
  {
    id: '3',
    type: 'audience',
    priority: 'high',
    message: 'Target FinTech companies in APAC - 45% higher conversion rate than other segments',
    impact: 78,
    action: 'Adjust Targeting',
    details: {
      currentMetric: '4.5% CVR',
      potentialGain: '+210 Leads',
      timeframe: 'Next 60 days'
    }
  }
];

const getIcon = (type: string) => {
  switch (type) {
    case 'campaign':
      return Target;
    case 'content':
      return Lightbulb;
    case 'budget':
      return DollarSign;
    case 'analytics':
      return BarChart;
    default:
      return Users;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'text-red-600 bg-red-50 border-red-100';
    case 'medium':
      return 'text-yellow-600 bg-yellow-50 border-yellow-100';
    default:
      return 'text-green-600 bg-green-50 border-green-100';
  }
};

const AIRecommendations = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Lightbulb className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold">AI Recommendations</h2>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">Impact Score</span>
          <TrendingUp className="w-4 h-4 text-blue-600" />
        </div>
      </div>
      
      <div className="space-y-4">
        {mockRecommendations.map((rec) => {
          const Icon = getIcon(rec.type);
          const priorityColor = getPriorityColor(rec.priority);
          
          return (
            <div
              key={rec.id}
              className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full border ${priorityColor}`}>
                      {rec.priority.toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-500">
                      Impact Score: {rec.impact}
                    </span>
                  </div>
                  <p className="text-gray-800 mb-3">{rec.message}</p>
                  
                  <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                    <div>
                      <div className="text-gray-500">Current</div>
                      <div className="font-medium">{rec.details.currentMetric}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Potential Gain</div>
                      <div className="font-medium text-green-600">{rec.details.potentialGain}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Timeframe</div>
                      <div className="font-medium">{rec.details.timeframe}</div>
                    </div>
                  </div>

                  <button className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700">
                    {rec.action}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AIRecommendations;