import React, { useState } from 'react';
import { MoreVertical, Building2, Calendar, ArrowUpRight } from 'lucide-react';
import type { Lead, Account, AccountScore } from '../../types';
import LeadDetails from './LeadDetails';

// Mock account data for demonstration
const mockAccount: Account = {
  id: '1',
  name: 'TechCorp Solutions',
  industry: 'Technology',
  size: '500-1000',
  interactions: {
    pageView: 45,
    formSubmission: 3,
    documentDownload: 5,
    demoRequest: 1
  },
  interactionHistory: [
    {
      type: 'pageView',
      date: new Date('2024-03-10'),
      details: { page: '/pricing' }
    },
    {
      type: 'formSubmission',
      date: new Date('2024-03-09'),
      details: { form: 'contact' }
    }
  ],
  lastInteraction: new Date('2024-03-10'),
  personas: [
    {
      role: 'CTO',
      seniority: 'executive',
      interests: ['security', 'scalability']
    },
    {
      role: 'VP Engineering',
      seniority: 'senior',
      interests: ['automation', 'integration']
    }
  ]
};

const mockScore: AccountScore = {
  score: 85,
  intensity: 'hot',
  lastUpdated: new Date(),
  details: {
    interactionScore: 75,
    recencyBonus: 1.2,
    significantActivities: ['Demo Requested', 'Multiple Form Submissions']
  }
};

const mockLeads: Lead[] = [
  {
    id: '1',
    company: 'TechCorp Solutions',
    score: 85,
    status: 'qualified',
    value: 25000,
    lastActivity: new Date('2024-03-10'),
    source: 'Campaign',
    companyInfo: {
      industry: 'Technology',
      size: '500-1000',
      revenue: '$50M-$100M',
      contacts: [
        { role: 'CTO', email: 'cto@techcorp.com' },
        { role: 'VP Engineering', email: 'vpe@techcorp.com' }
      ]
    }
  },
  {
    id: '2',
    company: 'Global Systems Inc',
    score: 92,
    status: 'contacted',
    value: 45000,
    lastActivity: new Date('2024-03-09'),
    source: 'Website',
    companyInfo: {
      industry: 'Finance',
      size: '1000+',
      revenue: '$100M+',
      contacts: [
        { role: 'CFO', email: 'cfo@globalsystems.com' },
        { role: 'Head of IT', email: 'it@globalsystems.com' }
      ]
    }
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'new':
      return 'text-blue-600 bg-blue-50';
    case 'qualified':
      return 'text-green-600 bg-green-50';
    case 'contacted':
      return 'text-purple-600 bg-purple-50';
    case 'converted':
      return 'text-indigo-600 bg-indigo-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
};

const LeadTable = () => {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-y">
              <tr>
                <th className="text-left text-sm font-medium text-gray-500 px-6 py-3">Company</th>
                <th className="text-left text-sm font-medium text-gray-500 px-6 py-3">Lead Score</th>
                <th className="text-left text-sm font-medium text-gray-500 px-6 py-3">Status</th>
                <th className="text-left text-sm font-medium text-gray-500 px-6 py-3">Value</th>
                <th className="text-left text-sm font-medium text-gray-500 px-6 py-3">Last Activity</th>
                <th className="text-left text-sm font-medium text-gray-500 px-6 py-3">Source</th>
                <th className="text-left text-sm font-medium text-gray-500 px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {mockLeads.map((lead) => (
                <tr
                  key={lead.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedLead(lead)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Building2 className="w-5 h-5 text-gray-400" />
                      <span className="font-medium">{lead.company}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium">
                        {lead.score}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                      {lead.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium">${lead.value.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{lead.lastActivity.toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <ArrowUpRight className="w-4 h-4 text-gray-400" />
                      <span>{lead.source}</span>
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

      {selectedLead && (
        <LeadDetails
          lead={selectedLead}
          account={mockAccount}
          score={mockScore}
          onClose={() => setSelectedLead(null)}
        />
      )}
    </>
  );
};

export default LeadTable;