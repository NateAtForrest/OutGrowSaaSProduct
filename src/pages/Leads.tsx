import React from 'react';
import LeadMetrics from '../components/Leads/LeadMetrics';
import LeadTable from '../components/Leads/LeadTable';
import LeadFilters from '../components/Leads/LeadFilters';
import { Download } from 'lucide-react';

const Leads = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Lead Management</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          <Download className="w-4 h-4" />
          Export Leads
        </button>
      </div>

      <LeadMetrics />
      <LeadFilters />
      <LeadTable />
    </div>
  );
};

export default Leads;