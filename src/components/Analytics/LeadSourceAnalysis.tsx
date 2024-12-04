import React from 'react';
import { PieChart, Building2, Globe2, Mail, Search } from 'lucide-react';

const sources = [
  {
    name: 'Organic Search',
    percentage: 35,
    count: 985,
    icon: Search,
    color: 'bg-blue-500',
  },
  {
    name: 'Direct Traffic',
    percentage: 28,
    count: 784,
    icon: Globe2,
    color: 'bg-green-500',
  },
  {
    name: 'Email Campaigns',
    percentage: 22,
    count: 617,
    icon: Mail,
    color: 'bg-purple-500',
  },
  {
    name: 'Referral',
    percentage: 15,
    count: 421,
    icon: Building2,
    color: 'bg-indigo-500',
  },
];

const LeadSourceAnalysis = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Lead Source Analysis</h2>
        <PieChart className="w-5 h-5 text-gray-400" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sources.map((source) => {
          const Icon = source.icon;
          return (
            <div
              key={source.name}
              className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg ${source.color} bg-opacity-10`}>
                  <Icon className={`w-5 h-5 ${source.color.replace('bg-', 'text-')}`} />
                </div>
                <span className="font-medium">{source.name}</span>
              </div>
              <div className="flex items-end justify-between">
                <div className="text-3xl font-bold">{source.percentage}%</div>
                <div className="text-sm text-gray-500">{source.count} leads</div>
              </div>
              <div className="mt-4 h-1 bg-gray-100 rounded-full">
                <div
                  className={`h-full rounded-full ${source.color}`}
                  style={{ width: `${source.percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeadSourceAnalysis;