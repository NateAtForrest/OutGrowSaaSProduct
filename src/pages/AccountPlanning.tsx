import React from 'react';
import AccountList from '../components/ABM/AccountList';
import AccountPlanningMetrics from '../components/ABM/AccountPlanningMetrics';
import AccountJourneyMap from '../components/ABM/AccountJourneyMap';

const AccountPlanning = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Account Planning</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          New Account Plan
        </button>
      </div>

      <AccountPlanningMetrics />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AccountList />
        </div>
        <div>
          <AccountJourneyMap />
        </div>
      </div>
    </div>
  );
};

export default AccountPlanning;