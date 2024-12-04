import React from 'react';
import { Users, Target, TrendingUp, Clock } from 'lucide-react';

const metrics = [
  {
    label: 'Active Accounts',
    value: '12',
    change: '+2',
    icon: Users,
  },
  {
    label: 'Engagement Score',
    value: '78%',
    change: '+5.2%',
    icon: TrendingUp,
  },
  {
    label: 'Pipeline Value',
    value: '$2.4M',
    change: '+12.5%',
    icon: Target,
  },
  {
    label: 'Avg. Sales Cycle',
    value: '95 days',
    change: '-8 days',
    icon: Clock,
  },
];

const AccountPlanningMetrics = () => {
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

export default AccountPlanningMetrics;