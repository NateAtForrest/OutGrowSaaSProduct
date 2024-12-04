import React, { useState } from 'react';
import CampaignList from '../components/Campaigns/CampaignList';
import CampaignMetrics from '../components/Campaigns/CampaignMetrics';
import CampaignTypeSelector from '../components/Campaigns/CampaignTypeSelector';
import AssetLibrary from '../components/Campaigns/AssetLibrary';
import { PlusCircle, Image } from 'lucide-react';

const Campaigns = () => {
  const [showTypeSelector, setShowTypeSelector] = useState(false);
  const [showAssetLibrary, setShowAssetLibrary] = useState(false);

  const handleCampaignTypeSelect = (type: string) => {
    console.log('Selected campaign type:', type);
    setShowTypeSelector(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setShowAssetLibrary(true)}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            <Image className="w-4 h-4" />
            Asset Library
          </button>
          <button
            onClick={() => setShowTypeSelector(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            New Campaign
          </button>
        </div>
      </div>

      <CampaignMetrics />
      <CampaignList />

      <CampaignTypeSelector
        isOpen={showTypeSelector}
        onClose={() => setShowTypeSelector(false)}
        onSelect={handleCampaignTypeSelect}
      />

      {showAssetLibrary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            <AssetLibrary />
            <div className="p-6 border-t bg-gray-50">
              <button
                onClick={() => setShowAssetLibrary(false)}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Campaigns;