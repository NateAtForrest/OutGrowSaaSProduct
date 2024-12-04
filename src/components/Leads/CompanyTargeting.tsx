import React, { useState, useEffect } from 'react';
import { Users, Building2, Target, Briefcase, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { generateTargetingRecommendations } from '../../lib/ai/targetingEngine';
import type { Account, AccountScore, TargetingRecommendation } from '../../types';

interface CompanyTargetingProps {
  account: Account;
  score: AccountScore;
}

const CompanyTargeting: React.FC<CompanyTargetingProps> = ({ account, score }) => {
  const [recommendations, setRecommendations] = useState<TargetingRecommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const results = await generateTargetingRecommendations(account, score);
        setRecommendations(results);
      } catch (error) {
        console.error('Error fetching targeting recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [account, score]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Target className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold">Target Contacts</h2>
        </div>
        <span className="text-sm text-gray-500">
          {recommendations.length} recommended contacts
        </span>
      </div>

      <div className="space-y-4">
        {recommendations.map((recommendation) => (
          <div
            key={recommendation.prospectId}
            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-gray-400" />
                    <span className="font-medium">{recommendation.name}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    recommendation.priority >= 80 ? 'bg-red-100 text-red-700' :
                    recommendation.priority >= 60 ? 'bg-orange-100 text-orange-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {recommendation.priority}% Match
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    <span>{recommendation.title}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {recommendation.recommendedContent.map((content, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                    >
                      {content}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t">
                  <div className="text-sm text-gray-600 mb-2">
                    Recommended Approach
                  </div>
                  <p className="text-sm">{recommendation.engagementStrategy}</p>
                </div>
              </div>

              <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700">
                <Mail className="w-5 h-5" />
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyTargeting;