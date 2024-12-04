import React from 'react';
import { TrendingUp, AlertTriangle, DollarSign, Target } from 'lucide-react';
import { Campaign } from '../../types';
import { optimizeCampaign } from '../../lib/ai/campaignOptimizer';

interface CampaignOptimizerProps {
  campaign: Campaign;
}

const CampaignOptimizer: React.FC<CampaignOptimizerProps> = ({ campaign }) => {
  const optimization = optimizeCampaign(campaign);
  const budgetDiff = optimization.recommendedBudget - campaign.budget;
  const budgetChange = Math.round((budgetDiff / campaign.budget) * 100);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Target className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold">Campaign Optimization</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Confidence Score</span>
          <span className="text-sm font-medium">
            {Math.round(optimization.confidenceScore * 100)}%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="border rounded-lg p-4">
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <DollarSign className="w-4 h-4" />
            <span className="text-sm font-medium">Recommended Budget</span>
          </div>
          <div className="text-2xl font-bold">
            ${optimization.recommendedBudget.toLocaleString()}
          </div>
          <div className={`text-sm mt-1 ${
            budgetChange > 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {budgetChange > 0 ? '+' : ''}{budgetChange}% adjustment
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">Expected ROI</span>
          </div>
          <div className="text-2xl font-bold">
            {Math.round(optimization.expectedROI * 100)}%
          </div>
          <div className="text-sm mt-1 text-green-600">
            +{Math.round((optimization.expectedROI - campaign.roi) * 100)}% increase
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm font-medium">Action Required</span>
          </div>
          <div className="text-lg font-medium text-blue-600">
            {budgetChange > 0 ? 'Increase Budget' : 'Optimize Spend'}
          </div>
          <div className="text-sm mt-1 text-gray-500">
            High confidence recommendation
          </div>
        </div>
      </div>

      <div className="border rounded-lg p-4">
        <h3 className="font-medium mb-3">Optimization Reasoning</h3>
        <ul className="space-y-2">
          {optimization.reasoning.map((reason, index) => (
            <li key={index} className="flex items-center gap-2 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
              {reason}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CampaignOptimizer;