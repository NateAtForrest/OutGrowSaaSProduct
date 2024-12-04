import React, { useState } from 'react';
import { Building2, Users, TrendingUp, Calendar, ChevronRight } from 'lucide-react';
import type { AccountPlan } from '../../types/abm';
import AccountDetails from './AccountDetails';

const mockAccounts: AccountPlan[] = [
  {
    id: '1',
    accountId: 'TechCorp Solutions',
    status: 'active',
    goals: {
      revenue: 250000,
      timeline: 'Q2 2024',
      milestones: ['Technical Review', 'Contract Negotiation', 'Implementation Plan']
    },
    stakeholders: [
      {
        id: '1',
        name: 'John Smith',
        role: 'CTO',
        influence: 'decision_maker',
        engagement: 85,
        lastContact: new Date('2024-03-01'),
        preferences: {
          channels: ['email', 'linkedin'],
          interests: ['security', 'scalability'],
          contentTypes: ['whitepaper', 'case_study']
        },
        notes: 'Key technical decision maker'
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        role: 'VP Engineering',
        influence: 'influencer',
        engagement: 75,
        lastContact: new Date('2024-03-05'),
        preferences: {
          channels: ['email', 'webinar'],
          interests: ['automation', 'integration'],
          contentTypes: ['demo', 'webinar']
        },
        notes: 'Technical evaluator'
      }
    ],
    engagementStrategy: {
      channels: ['email', 'linkedin', 'webinar'],
      contentPlan: [
        {
          id: '1',
          type: 'whitepaper',
          title: 'Enterprise Security Guide',
          stage: 'consideration',
          personalization: {
            industry: 'Technology',
            role: 'CTO',
            painPoints: ['security', 'compliance']
          }
        }
      ],
      timeline: [
        {
          id: '1',
          date: new Date('2024-03-01'),
          type: 'meeting',
          title: 'Initial Technical Review',
          description: 'Deep dive into technical requirements',
          status: 'completed',
          assignee: 'Alex Thompson'
        },
        {
          id: '2',
          date: new Date('2024-03-15'),
          type: 'milestone',
          title: 'Security Assessment',
          description: 'Complete security evaluation',
          status: 'planned',
          assignee: 'Sarah Johnson'
        }
      ]
    },
    progress: {
      currentStage: 'Technical Evaluation',
      completedMilestones: ['Initial Meeting', 'Requirements Gathering'],
      nextActions: ['Schedule security review', 'Send implementation timeline']
    }
  },
  {
    id: '2',
    accountId: 'Global Systems Inc',
    status: 'active',
    goals: {
      revenue: 500000,
      timeline: 'Q3 2024',
      milestones: ['Executive Presentation', 'Pilot Program', 'Full Deployment']
    },
    stakeholders: [
      {
        id: '3',
        name: 'Michael Chen',
        role: 'CIO',
        influence: 'decision_maker',
        engagement: 90,
        lastContact: new Date('2024-03-08'),
        preferences: {
          channels: ['email', 'phone'],
          interests: ['digital transformation', 'cloud migration'],
          contentTypes: ['case_study', 'demo']
        },
        notes: 'Primary decision maker'
      }
    ],
    engagementStrategy: {
      channels: ['email', 'webinar', 'phone'],
      contentPlan: [
        {
          id: '2',
          type: 'case_study',
          title: 'Enterprise Digital Transformation',
          stage: 'decision',
          personalization: {
            industry: 'Finance',
            role: 'CIO',
            painPoints: ['scalability', 'integration']
          }
        }
      ],
      timeline: [
        {
          id: '3',
          date: new Date('2024-03-10'),
          type: 'meeting',
          title: 'Executive Presentation',
          description: 'Present solution to executive team',
          status: 'completed',
          assignee: 'David Wilson'
        }
      ]
    },
    progress: {
      currentStage: 'Executive Review',
      completedMilestones: ['Technical Evaluation', 'Security Review'],
      nextActions: ['Schedule pilot planning', 'Draft implementation plan']
    }
  }
];

const AccountList = () => {
  const [selectedAccount, setSelectedAccount] = useState<AccountPlan | null>(null);

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Active Account Plans</h2>
        </div>

        <div className="divide-y">
          {mockAccounts.map((account) => (
            <div
              key={account.id}
              className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => setSelectedAccount(account)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-gray-400" />
                  <div>
                    <h3 className="font-medium">{account.accountId}</h3>
                    <p className="text-sm text-gray-500">{account.progress.currentStage}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{account.stakeholders.length} Stakeholders</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <TrendingUp className="w-4 h-4" />
                  <span>${account.goals.revenue.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{account.goals.timeline}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {account.progress.completedMilestones.map((milestone, index) => (
                  <span
                    key={index}
                    className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full"
                  >
                    {milestone}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedAccount && (
        <AccountDetails
          account={selectedAccount}
          onClose={() => setSelectedAccount(null)}
        />
      )}
    </>
  );
};

export default AccountList;