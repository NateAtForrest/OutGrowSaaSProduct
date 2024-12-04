import React from 'react';
import { MoreVertical, TrendingUp, AlertCircle } from 'lucide-react';
import type { Campaign } from '../../types';

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Enterprise Q1 Demand',
    status: 'active',
    budget: 15000,
    spent: 8750,
    leads: 145,
    roi: 2.8,
    channels: ['linkedin', 'email', 'content'],
    performance: {
      impressions: 45000,
      clicks: 2800,
      conversions: 145
    }
  },
  {
    id: '2',
    name: 'Mid-Market Awareness',
    status: 'active',
    budget: 12000,
    spent: 6200,
    leads: 98,
    roi: 2.1,
    channels: ['display', 'social', 'search'],
    performance: {
      impressions: 38000,
      clicks: 1950,
      conversions: 98
    }
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'text-green-600 bg-green-50';
    case 'paused':
      return 'text-yellow-600 bg-yellow-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
};

const CampaignList = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Active Campaigns</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-y">
            <tr>
              <th className="text-left text-sm font-medium text-gray-500 px-6 py-3">Campaign</th>
              <th className="text-left text-sm font-medium text-gray-500 px-6 py-3">Status</th>
              <th className="text-left text-sm font-medium text-gray-500 px-6 py-3">Budget</th>
              <th className="text-left text-sm font-medium text-gray-500 px-6 py-3">Leads</th>
              <th className="text-left text-sm font-medium text-gray-500 px-6 py-3">ROI</th>
              <th className="text-left text-sm font-medium text-gray-500 px-6 py-3">Channels</th>
              <th className="text-left text-sm font-medium text-gray-500 px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {mockCampaigns.map((campaign) => (
              <tr key={campaign.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {campaign.roi < 2.5 && (
                      <AlertCircle className="w-4 h-4 text-yellow-500" />
                    )}
                    <span className="font-medium">{campaign.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                    {campaign.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="text-sm font-medium">${campaign.spent.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">of ${campaign.budget.toLocaleString()}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{campaign.leads}</span>
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-medium">{campaign.roi}x</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-1">
                    {campaign.channels.map((channel) => (
                      <span
                        key={channel}
                        className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                      >
                        {channel}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CampaignList;