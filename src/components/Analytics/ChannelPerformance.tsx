import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const channels = [
  {
    name: 'Paid Search',
    leads: 845,
    conversion: 3.2,
    cost: 12500,
    trend: 'up',
  },
  {
    name: 'Social Media',
    leads: 654,
    conversion: 2.8,
    cost: 8500,
    trend: 'up',
  },
  {
    name: 'Email',
    leads: 542,
    conversion: 4.1,
    cost: 5500,
    trend: 'up',
  },
  {
    name: 'Display',
    leads: 321,
    conversion: 1.8,
    cost: 7500,
    trend: 'down',
  },
];

const ChannelPerformance = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Channel Performance</h2>
      <div className="space-y-4">
        {channels.map((channel) => (
          <div
            key={channel.name}
            className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{channel.name}</span>
              <div className={`flex items-center gap-1 ${
                channel.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {channel.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-gray-500">Leads</div>
                <div className="font-medium">{channel.leads}</div>
              </div>
              <div>
                <div className="text-gray-500">Conv. Rate</div>
                <div className="font-medium">{channel.conversion}%</div>
              </div>
              <div>
                <div className="text-gray-500">Cost</div>
                <div className="font-medium">${channel.cost}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChannelPerformance;