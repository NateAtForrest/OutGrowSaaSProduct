import React from 'react';
import { Building2, X } from 'lucide-react';
import CompanyTargeting from './CompanyTargeting';
import LeadScoreCard from './LeadScoreCard';
import type { Lead, Account, AccountScore } from '../../types';

interface LeadDetailsProps {
  lead: Lead;
  account: Account;
  score: AccountScore;
  onClose: () => void;
}

const LeadDetails: React.FC<LeadDetailsProps> = ({
  lead,
  account,
  score,
  onClose
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-100 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Building2 className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold">{lead.company}</h2>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LeadScoreCard
              lead={lead}
              visitorHistory={account.interactionHistory}
              companyInfo={lead.companyInfo}
            />
            <CompanyTargeting
              account={account}
              score={score}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetails;