import React from 'react';
import IntegrationsList from '../components/Settings/IntegrationsList';
import { Settings as SettingsIcon } from 'lucide-react';

const Settings = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SettingsIcon className="w-8 h-8 text-gray-400" />
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex gap-8 px-6">
            <button className="border-b-2 border-blue-600 py-4 text-blue-600 font-medium">
              Integrations
            </button>
            <button className="border-b-2 border-transparent py-4 text-gray-500 hover:text-gray-700">
              General
            </button>
            <button className="border-b-2 border-transparent py-4 text-gray-500 hover:text-gray-700">
              Team
            </button>
            <button className="border-b-2 border-transparent py-4 text-gray-500 hover:text-gray-700">
              Billing
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          <IntegrationsList />
        </div>
      </div>
    </div>
  );
};

export default Settings;