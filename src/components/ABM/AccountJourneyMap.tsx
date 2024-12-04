import React from 'react';
import { CheckCircle2, Circle, Clock, ArrowRight } from 'lucide-react';
import type { AccountJourney } from '../../types/abm';

const mockJourney: AccountJourney = {
  stages: [
    {
      name: 'Awareness',
      status: 'completed',
      progress: 100,
      activities: [
        {
          date: new Date('2024-02-01'),
          type: 'content',
          description: 'Whitepaper download',
          impact: 25
        }
      ]
    },
    {
      name: 'Consideration',
      status: 'current',
      progress: 60,
      activities: [
        {
          date: new Date('2024-03-01'),
          type: 'demo',
          description: 'Product demo',
          impact: 40
        }
      ]
    },
    {
      name: 'Decision',
      status: 'upcoming',
      progress: 0,
      activities: []
    }
  ],
  nextBestActions: [
    {
      action: 'Schedule technical review',
      priority: 85,
      expectedImpact: 40,
      assignee: 'John Doe'
    },
    {
      action: 'Send ROI analysis',
      priority: 75,
      expectedImpact: 35
    }
  ]
};

const AccountJourneyMap = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Journey Progress</h2>

      <div className="space-y-6">
        {mockJourney.stages.map((stage, index) => (
          <div key={stage.name} className="relative">
            <div className="flex items-center gap-4">
              {stage.status === 'completed' ? (
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              ) : stage.status === 'current' ? (
                <Clock className="w-6 h-6 text-blue-600" />
              ) : (
                <Circle className="w-6 h-6 text-gray-300" />
              )}
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{stage.name}</span>
                  <span className="text-sm text-gray-500">
                    {stage.progress}%
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      stage.status === 'completed' ? 'bg-green-600' :
                      stage.status === 'current' ? 'bg-blue-600' :
                      'bg-gray-300'
                    }`}
                    style={{ width: `${stage.progress}%` }}
                  />
                </div>
              </div>
            </div>

            {index < mockJourney.stages.length - 1 && (
              <div className="absolute left-3 top-8 bottom-0 w-px bg-gray-200" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="font-medium mb-4">Next Best Actions</h3>
        <div className="space-y-3">
          {mockJourney.nextBestActions.map((action, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <ArrowRight className="w-4 h-4 text-blue-600" />
                <div>
                  <div className="font-medium">{action.action}</div>
                  {action.assignee && (
                    <div className="text-sm text-gray-500">
                      Assigned to {action.assignee}
                    </div>
                  )}
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                action.priority >= 80 ? 'bg-red-100 text-red-700' :
                'bg-orange-100 text-orange-700'
              }`}>
                P{action.priority}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountJourneyMap;