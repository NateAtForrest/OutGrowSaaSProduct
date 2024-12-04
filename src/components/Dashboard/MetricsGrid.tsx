import React from 'react';
import { TrendingUp, Users, Target, DollarSign } from 'lucide-react';

const metrics = [
  {
    label: 'Total Revenue',
    value: '$124,500',
    change: '+12.5%',
    icon: DollarSign,
    trend: 'up'
  },
  {
    label: 'Active Leads',
    value: '1,240',
    change: '+8.2%',
    icon: Users,
    trend: 'up'
  },
  {
    label: 'Campaign ROI',
    value: '285%',
    change: '+15.3%',
    icon: Target,
    trend: 'up'
  },
  {
    label: 'Conversion Rate',
    value: '3.2%',
    change: '+2.1%',
    icon: TrendingUp,
    trend: 'up'
  }
];

const MetricsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <div
            key={metric.label}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 bg-gray-light bg-opacity-20 rounded-lg">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm font-medium text-primary">
                {metric.change}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-gray-dark text-sm font-medium">
                {metric.label}
              </h3>
              <p className="text-2xl font-bold mt-1 text-black">{metric.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MetricsGrid;