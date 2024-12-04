import React, { useState, useEffect } from 'react';
import { X, Users, Building2, Calendar, TrendingUp, Loader2 } from 'lucide-react';
import { enrichCompanyData } from '../../lib/apollo/client';
import type { AccountPlan } from '../../types/abm';
import type { EnrichedCompanyData } from '../../types/targeting';
import StakeholderAnalysis from './StakeholderAnalysis';
import AccountTimeline from './AccountTimeline';

interface AccountDetailsProps {
  account: AccountPlan;
  onClose: () => void;
}

const AccountDetails: React.FC<AccountDetailsProps> = ({ account, onClose }) => {
  const [enrichedData, setEnrichedData] = useState<EnrichedCompanyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEnrichedData = async () => {
      try {
        // Extract domain from account ID or other identifier
        const domain = `${account.accountId.toLowerCase().replace(/\s+/g, '')}.com`;
        const data = await enrichCompanyData(domain);
        setEnrichedData(data);
      } catch (error) {
        setError('Unable to fetch company data');
        console.error('Error fetching enriched data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrichedData();
  }, [account.accountId]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-100 rounded-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Building2 className="w-6 h-6 text-blue-600" />
              <div>
                <h2 className="text-xl font-semibold">{account.accountId}</h2>
                {enrichedData && (
                  <p className="text-sm text-gray-500">
                    {enrichedData.industry} · {enrichedData.employee_count.toLocaleString()} employees
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Account Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold">Goals</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-500">Target Revenue</div>
                  <div className="font-medium">${account.goals.revenue.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Timeline</div>
                  <div className="font-medium">{account.goals.timeline}</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold">Engagement</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-500">Active Stakeholders</div>
                  <div className="font-medium">{account.stakeholders.length}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Current Stage</div>
                  <div className="font-medium">{account.progress.currentStage}</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold">Next Steps</h3>
              </div>
              <div className="space-y-2">
                {account.progress.nextActions.map((action, index) => (
                  <div
                    key={index}
                    className="text-sm flex items-center gap-2"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                    {action}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stakeholder Analysis */}
          <StakeholderAnalysis
            accountId={account.accountId}
            currentStakeholders={account.stakeholders}
            enrichedData={enrichedData}
          />

          {/* Account Timeline */}
          <AccountTimeline timeline={account.engagementStrategy.timeline} />
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;