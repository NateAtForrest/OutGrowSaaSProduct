import React from 'react';
import { Users, UserCheck, Target, TrendingUp } from 'lucide-react';

const metrics = [
  {
    label: 'Total Leads',
    value: '2,847',
    change: '+12.5%',
    icon: Users,
  },
  {
    label: 'Qualified Leads',
    value: '1,425',
    change: '+8.3%',
    icon: UserCheck,
  },
  {
    label: 'Conversion Rate',
    value: '32%',
    change: '+5.2%',
    icon: Target,
  },
  {
    label: 'Avg. Lead Value',
    value: '$4,200',
    change: '+15.8%',
    icon: TrendingUp,
  },
];

const LeadMetrics = () => {
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
              <div className="p-2 bg-blue-100 rounded-lg">
                <Icon className="w-6 h-6 text-blue-600" />
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

export default LeadMetrics;