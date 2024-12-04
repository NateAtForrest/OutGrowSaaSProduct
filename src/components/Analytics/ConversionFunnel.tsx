import React from 'react';
import { Users, UserCheck, UserPlus, DollarSign } from 'lucide-react';

const funnelStages = [
  {
    stage: 'Visitors',
    count: 125000,
    icon: Users,
    color: 'from-blue-500 to-blue-600',
    width: 'w-full',
  },
  {
    stage: 'Leads',
    count: 12500,
    icon: UserPlus,
    color: 'from-indigo-500 to-indigo-600',
    width: 'w-4/5',
  },
  {
    stage: 'Qualified',
    count: 2850,
    icon: UserCheck,
    color: 'from-purple-500 to-purple-600',
    width: 'w-3/5',
  },
  {
    stage: 'Converted',
    count: 850,
    icon: DollarSign,
    color: 'from-green-500 to-green-600',
    width: 'w-2/5',
  },
];

const ConversionFunnel = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Conversion Funnel</h2>
      <div className="space-y-6">
        {funnelStages.map((stage, index) => {
          const Icon = stage.icon;
          return (
            <div key={stage.stage} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">{stage.stage}</span>
                </div>
                <span className="font-medium">{stage.count.toLocaleString()}</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${stage.color} ${stage.width} transition-all duration-500`}
                />
              </div>
              {index < funnelStages.length - 1 && (
                <div className="text-xs text-gray-500 text-right">
                  {((funnelStages[index + 1].count / stage.count) * 100).toFixed(1)}% conversion
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ConversionFunnel;