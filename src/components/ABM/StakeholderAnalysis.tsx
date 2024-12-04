import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Mail, Phone, MessageSquare, ExternalLink, Loader2 } from 'lucide-react';
import { findProspects } from '../../lib/apollo/client';
import type { AccountStakeholder } from '../../types/abm';
import type { EnrichedCompanyData } from '../../types/targeting';
import StakeholderJourney from './StakeholderJourney';

interface StakeholderAnalysisProps {
  accountId: string;
  currentStakeholders: AccountStakeholder[];
  enrichedData: EnrichedCompanyData | null;
}

const StakeholderAnalysis: React.FC<StakeholderAnalysisProps> = ({
  accountId,
  currentStakeholders,
  enrichedData
}) => {
  const [recommendedProspects, setRecommendedProspects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProspects = async () => {
      if (!enrichedData) return;

      try {
        const criteria = {
          titles: ['CTO', 'VP Engineering', 'VP Technology', 'Head of IT'],
          seniority: ['director', 'executive']
        };

        const prospects = await findProspects(enrichedData.id, criteria);
        setRecommendedProspects(prospects);
      } catch (error) {
        console.error('Error fetching prospects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProspects();
  }, [enrichedData]);

  const getInfluenceColor = (influence: string) => {
    switch (influence) {
      case 'decision_maker':
        return 'bg-red-100 text-red-700';
      case 'influencer':
        return 'bg-orange-100 text-orange-700';
      case 'champion':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-blue-100 text-blue-700';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold">Stakeholder Analysis</h2>
          </div>
          <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
            <UserPlus className="w-4 h-4" />
            Add Stakeholder
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          {/* Current Stakeholders */}
          <div>
            <h3 className="text-lg font-medium mb-4">Current Stakeholders</h3>
            <div className="grid grid-cols-1 gap-4">
              {currentStakeholders.map((stakeholder) => (
                <div
                  key={stakeholder.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 space-y-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{stakeholder.name}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            getInfluenceColor(stakeholder.influence)
                          }`}>
                            {stakeholder.influence.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">{stakeholder.role}</div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button className="text-blue-600 hover:text-blue-700">
                          <Mail className="w-4 h-4" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-700">
                          <Phone className="w-4 h-4" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-700">
                          <MessageSquare className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {stakeholder.preferences.interests.map((interest, index) => (
                          <span
                            key={index}
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>

                      <div className="text-sm text-gray-500">
                        Last Contact: {new Date(stakeholder.lastContact).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="flex-1">
                      <StakeholderJourney stakeholder={stakeholder} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Stakeholders */}
          <div>
            <h3 className="text-lg font-medium mb-4">Recommended Stakeholders</h3>
            {loading ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendedProspects.map((prospect, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{prospect.name}</span>
                            <span className="text-sm text-gray-500">{prospect.title}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <button className="text-blue-600 hover:text-blue-700">
                            <Mail className="w-4 h-4" />
                          </button>
                          <button className="text-blue-600 hover:text-blue-700">
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        Add Contact
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakeholderAnalysis;