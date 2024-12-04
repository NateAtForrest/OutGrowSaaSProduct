import React, { useState } from 'react';
import { 
  BarChart3, 
  LinkedinIcon, 
  Facebook,
  CheckCircle2,
  XCircle,
  ExternalLink
} from 'lucide-react';
import IntegrationModal from './IntegrationModal';
import { integrationConfigs } from './integrationConfigs';
import { initGoogleAnalytics, initLinkedInAds, initMetaAds } from '../../lib/analytics';

const integrations = [
  {
    name: 'Google Analytics',
    description: 'Track website traffic and user behavior',
    icon: BarChart3,
    color: 'text-yellow-500',
    status: 'disconnected'
  },
  {
    name: 'LinkedIn Ads',
    description: 'Track and optimize LinkedIn ad campaigns',
    icon: LinkedinIcon,
    color: 'text-blue-600',
    status: 'disconnected'
  },
  {
    name: 'Meta Ads',
    description: 'Connect Facebook and Instagram ad data',
    icon: Facebook,
    color: 'text-blue-500',
    status: 'disconnected'
  }
];

const IntegrationsList = () => {
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);
  const [connectedIntegrations, setConnectedIntegrations] = useState<string[]>([]);

  const handleConfigureIntegration = (name: string) => {
    setSelectedIntegration(name);
  };

  const handleCloseModal = () => {
    setSelectedIntegration(null);
  };

  const handleSubmitConfig = async (data: any) => {
    const integration = selectedIntegration;
    
    try {
      switch (integration) {
        case 'Google Analytics':
          await initGoogleAnalytics(data.measurementId);
          break;
        case 'LinkedIn Ads':
          await initLinkedInAds(data.accountId);
          break;
        case 'Meta Ads':
          await initMetaAds(data.pixelId);
          break;
      }
      
      setConnectedIntegrations(prev => [...prev, integration!]);
      handleCloseModal();
    } catch (error) {
      console.error('Failed to initialize integration:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Connected Platforms</h2>
        <a href="#" className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
          View Documentation
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {integrations.map((integration) => {
          const Icon = integration.icon;
          const isConnected = connectedIntegrations.includes(integration.name);
          
          return (
            <div
              key={integration.name}
              className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg bg-gray-100`}>
                    <Icon className={`w-6 h-6 ${integration.color}`} />
                  </div>
                  <div>
                    <h3 className="font-medium">{integration.name}</h3>
                    <p className="text-sm text-gray-500">{integration.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {isConnected ? (
                    <>
                      <span className="flex items-center gap-1 text-green-600 text-sm">
                        <CheckCircle2 className="w-4 h-4" />
                        Connected
                      </span>
                      <button
                        onClick={() => handleConfigureIntegration(integration.name)}
                        className="text-sm text-gray-600 hover:text-gray-800"
                      >
                        Configure
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="flex items-center gap-1 text-gray-500 text-sm">
                        <XCircle className="w-4 h-4" />
                        Disconnected
                      </span>
                      <button
                        onClick={() => handleConfigureIntegration(integration.name)}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        Connect
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedIntegration && (
        <IntegrationModal
          isOpen={true}
          onClose={handleCloseModal}
          integration={integrationConfigs[selectedIntegration]}
          onSubmit={handleSubmitConfig}
        />
      )}
    </div>
  );
};

export default IntegrationsList;