import React from 'react';
import { TrendingUp, TrendingDown, Users, Target, DollarSign, Percent } from 'lucide-react';

const metrics = [
  {
    label: 'Total Revenue',
    value: '$847,500',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
  },
  {
    label: 'Conversion Rate',
    value: '3.8%',
    change: '-0.4%',
    trend: 'down',
    icon: Percent,
  },
  {
    label: 'Qualified Leads',
    value: '2,847',
    change: '+8.3%',
    trend: 'up',
    icon: Users,
  },
  {
    label: 'Campaign ROI',
    value: '285%',
    change: '+15.3%',
    trend: 'up',
    icon: Target,
  },
];

const PerformanceOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        const TrendIcon = metric.trend === 'up' ? TrendingUp : TrendingDown;
        const trendColor = metric.trend === 'up' ? 'text-green-600' : 'text-red-600';
        
        return (
          <div
            key={metric.label}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Icon className="w-6 h-6 text-blue-600" />
              </div>
              <div className={`flex items-center gap-1 ${trendColor}`}>
                <TrendIcon className="w-4 h-4" />
                <span className="text-sm font-medium">{metric.change}</span>
              </div>
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

export default PerformanceOverview;