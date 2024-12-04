import React from 'react';
import { DollarSign, Target, Users, Percent } from 'lucide-react';

const metrics = [
  {
    label: 'Total Budget',
    value: '$45,000',
    change: '+8.2%',
    icon: DollarSign,
  },
  {
    label: 'Active Campaigns',
    value: '12',
    change: '+2',
    icon: Target,
  },
  {
    label: 'Total Leads',
    value: '486',
    change: '+12.5%',
    icon: Users,
  },
  {
    label: 'Avg. Conversion',
    value: '4.2%',
    change: '+0.8%',
    icon: Percent,
  },
];

const CampaignMetrics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <div
            key={metric.label}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Icon className="w-6 h-6 text-indigo-600" />
              </div>
              <span className="text-sm font-medium text-green-600">
                {metric.change}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-gray-600 text-sm font-medium">
                {metric.label}
              </h3>
              <p className="text-2xl font-bold mt-1">{metric.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CampaignMetrics;