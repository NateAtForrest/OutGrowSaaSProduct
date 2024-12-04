import React from 'react';
import PerformanceOverview from '../components/Analytics/PerformanceOverview';
import ConversionFunnel from '../components/Analytics/ConversionFunnel';
import ChannelPerformance from '../components/Analytics/ChannelPerformance';
import LeadSourceAnalysis from '../components/Analytics/LeadSourceAnalysis';
import { Download } from 'lucide-react';

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <div className="flex items-center gap-4">
          <select className="bg-white border rounded-lg px-4 py-2 text-sm">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Custom Range</option>
          </select>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      <PerformanceOverview />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ConversionFunnel />
        <ChannelPerformance />
      </div>
      
      <LeadSourceAnalysis />
    </div>
  );
};

export default Analytics;