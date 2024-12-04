import React from 'react';
import MetricsGrid from '../components/Dashboard/MetricsGrid';
import VisitorFeed from '../components/Dashboard/VisitorFeed';
import AIRecommendations from '../components/Dashboard/AIRecommendations';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center gap-4">
          <select className="bg-white border rounded-lg px-4 py-2 text-sm">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            Export Report
          </button>
        </div>
      </div>

      <MetricsGrid />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VisitorFeed />
        <AIRecommendations />
      </div>
    </div>
  );
};

export default Dashboard;