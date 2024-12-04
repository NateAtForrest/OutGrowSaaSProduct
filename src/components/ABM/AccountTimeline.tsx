import React from 'react';
import { Calendar, CheckCircle2, Clock } from 'lucide-react';
import type { TimelineItem } from '../../types/abm';

interface AccountTimelineProps {
  timeline: TimelineItem[];
}

const AccountTimeline: React.FC<AccountTimelineProps> = ({ timeline }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold">Engagement Timeline</h2>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          {timeline.map((item, index) => (
            <div key={item.id} className="relative flex gap-4">
              {index !== timeline.length - 1 && (
                <div className="absolute left-[1.3125rem] top-10 bottom-0 w-px bg-gray-200" />
              )}
              
              <div className="mt-1">
                {item.status === 'completed' ? (
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                ) : (
                  <Clock className="w-6 h-6 text-blue-600" />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(item.date).toLocaleDateString()}
                  </div>
                </div>
                
                {item.assignee && (
                  <div className="mt-2 text-sm">
                    <span className="text-gray-500">Assigned to: </span>
                    <span className="font-medium">{item.assignee}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountTimeline;