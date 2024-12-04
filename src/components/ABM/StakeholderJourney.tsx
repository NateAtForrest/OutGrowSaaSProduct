import React from 'react';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import type { AccountStakeholder } from '../../types/abm';

interface StakeholderJourneyProps {
  stakeholder: AccountStakeholder;
}

const journeyStages = [
  { id: 'awareness', label: 'Awareness' },
  { id: 'education', label: 'Education' },
  { id: 'consideration', label: 'Consideration' },
  { id: 'evaluation', label: 'Evaluation' },
  { id: 'decision', label: 'Decision' }
];

const StakeholderJourney: React.FC<StakeholderJourneyProps> = ({ stakeholder }) => {
  // Calculate current stage based on engagement score
  const getCurrentStage = (engagement: number): number => {
    if (engagement >= 90) return 4; // Decision
    if (engagement >= 70) return 3; // Evaluation
    if (engagement >= 50) return 2; // Consideration
    if (engagement >= 30) return 1; // Education
    return 0; // Awareness
  };

  const currentStageIndex = getCurrentStage(stakeholder.engagement);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
        <span>Journey Progress</span>
        <span className="font-medium">{stakeholder.engagement}% Engaged</span>
      </div>

      <div className="relative pt-2 pb-8">
        {/* Progress Line */}
        <div className="absolute left-0 right-0 top-5 h-0.5 bg-gray-200">
          <div
            className="absolute left-0 h-0.5 bg-blue-600 transition-all duration-500"
            style={{ width: `${stakeholder.engagement}%` }}
          />
        </div>

        {/* Stage Indicators */}
        <div className="relative flex justify-between">
          {journeyStages.map((stage, index) => {
            const isCompleted = index <= currentStageIndex;
            const isCurrent = index === currentStageIndex;

            return (
              <div
                key={stage.id}
                className="flex flex-col items-center"
              >
                <div className={`w-4 h-4 rounded-full border-2 z-10 ${
                  isCompleted
                    ? 'bg-blue-600 border-blue-600'
                    : 'bg-white border-gray-300'
                }`}>
                  {isCompleted && <CheckCircle2 className="w-4 h-4 text-white" />}
                </div>
                
                <div className="absolute top-8 text-center w-20 -ml-10">
                  <span className={`text-xs font-medium ${
                    isCurrent ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {stage.label}
                  </span>
                </div>

                {index < journeyStages.length - 1 && (
                  <div className="absolute w-full left-0 top-[0.6875rem] flex items-center pl-4">
                    <ArrowRight className={`w-4 h-4 ${
                      isCompleted ? 'text-blue-600' : 'text-gray-300'
                    }`} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Next Best Actions */}
      <div className="space-y-3">
        <div className="text-sm font-medium text-gray-700">Next Best Actions:</div>
        {stakeholder.preferences.contentTypes.slice(0, 2).map((type, index) => (
          <div
            key={index}
            className="text-sm flex items-center gap-2 text-gray-600"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
            Share {type} content aligned with {stakeholder.preferences.interests[0]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StakeholderJourney;