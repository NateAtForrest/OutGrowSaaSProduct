import React, { useState } from 'react';
import { X, Image, Type, Palette, Users, Download } from 'lucide-react';
import type { AdDesign, AdGeneratorState } from '../../types/adGenerator';
import AssetSelector from './AssetSelector';
import DesignCustomizer from './DesignCustomizer';
import AdPreview from './AdPreview';

interface AdGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (design: AdDesign) => void;
}

const steps = [
  { id: 'template', label: 'Choose Template', icon: Image },
  { id: 'assets', label: 'Select Assets', icon: Image },
  { id: 'customize', label: 'Customize Design', icon: Palette },
  { id: 'preview', label: 'Preview & Export', icon: Download }
];

const AdGeneratorModal: React.FC<AdGeneratorModalProps> = ({
  isOpen,
  onClose,
  onComplete
}) => {
  const [state, setState] = useState<AdGeneratorState>({
    currentStep: 0,
    design: null,
    selectedAssets: [],
    searchResults: [],
    loading: false,
    error: null
  });

  if (!isOpen) return null;

  const handleNext = () => {
    setState(prev => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, steps.length - 1)
    }));
  };

  const handleBack = () => {
    setState(prev => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 0)
    }));
  };

  const handleComplete = () => {
    if (state.design) {
      onComplete(state.design);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <Image className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold">Create Ad Design</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b bg-gray-50">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCurrent = index === state.currentStep;
              const isCompleted = index < state.currentStep;

              return (
                <div
                  key={step.id}
                  className="flex items-center gap-2"
                >
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    isCurrent ? 'bg-blue-600 text-white' :
                    isCompleted ? 'bg-green-600 text-white' :
                    'bg-gray-200 text-gray-500'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-sm font-medium ${
                    isCurrent ? 'text-blue-600' :
                    isCompleted ? 'text-green-600' :
                    'text-gray-500'
                  }`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {state.currentStep === 0 && (
            <AssetSelector
              onSelect={(assets) => setState(prev => ({
                ...prev,
                selectedAssets: assets
              }))}
            />
          )}
          {state.currentStep === 1 && (
            <DesignCustomizer
              assets={state.selectedAssets}
              onChange={(design) => setState(prev => ({
                ...prev,
                design
              }))}
            />
          )}
          {state.currentStep === 2 && (
            <AdPreview
              design={state.design}
              onExport={handleComplete}
            />
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <button
            onClick={handleBack}
            disabled={state.currentStep === 0}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
          >
            Back
          </button>
          <button
            onClick={state.currentStep === steps.length - 1 ? handleComplete : handleNext}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {state.currentStep === steps.length - 1 ? 'Complete' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdGeneratorModal;</content>