import React from 'react';
import { X, Megaphone, Users, Target, DollarSign } from 'lucide-react';

interface CampaignTypeSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (type: string) => void;
}

const campaignTypes = [
  {
    id: 'awareness',
    name: 'Brand Awareness',
    description: 'Build market presence and increase brand recognition',
    icon: Megaphone,
    examples: 'Thought leadership, social media presence, industry events',
  },
  {
    id: 'top-funnel',
    name: 'Top of Funnel',
    description: 'Attract and educate potential prospects',
    icon: Users,
    examples: 'Content marketing, webinars, educational resources',
  },
  {
    id: 'mid-funnel',
    name: 'Middle of Funnel',
    description: 'Nurture leads and demonstrate value',
    icon: Target,
    examples: 'Case studies, product demos, technical whitepapers',
  },
  {
    id: 'bottom-funnel',
    name: 'Bottom of Funnel',
    description: 'Convert qualified leads into customers',
    icon: DollarSign,
    examples: 'ROI calculators, implementation guides, free trials',
  },
];

const CampaignTypeSelector: React.FC<CampaignTypeSelectorProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Select Campaign Type</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 gap-4">
            {campaignTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => onSelect(type.id)}
                  className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{type.name}</h3>
                    <p className="text-gray-600 mt-1">{type.description}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      <span className="font-medium">Examples:</span> {type.examples}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignTypeSelector;