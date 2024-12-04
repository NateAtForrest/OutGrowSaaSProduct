import React from 'react';
import { Building2, Globe, Clock, TrendingUp, ExternalLink, Mail, Phone } from 'lucide-react';
import type { Visitor } from '../../types';

const mockVisitors: Visitor[] = [
  {
    id: '1',
    company: 'Tech Solutions Inc.',
    location: 'San Francisco, US',
    pages: ['/pricing', '/enterprise', '/demo'],
    duration: 340,
    timestamp: new Date(),
    score: 85,
    companyInfo: {
      industry: 'Technology',
      size: '500-1000',
      revenue: '$50M-$100M',
      contacts: [
        { role: 'CTO', email: 'cto@techsolutions.com' },
        { role: 'VP Engineering', email: 'vpe@techsolutions.com' }
      ]
    }
  },
  {
    id: '2',
    company: 'Global Systems Ltd',
    location: 'London, UK',
    pages: ['/features', '/case-studies', '/pricing'],
    duration: 280,
    timestamp: new Date(),
    score: 92,
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

const VisitorFeed = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Live Visitor Feed</h2>
        <span className="flex items-center gap-2 text-sm text-green-600">
          <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
          Live
        </span>
      </div>
      
      <div className="space-y-4">
        {mockVisitors.map((visitor) => (
          <div
            key={visitor.id}
            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">{visitor.company}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    visitor.score >= 90 ? 'bg-red-100 text-red-700' : 
                    visitor.score >= 80 ? 'bg-orange-100 text-orange-700' : 
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {visitor.score} Intent Score
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Globe className="w-4 h-4" />
                    <span>{visitor.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{Math.floor(visitor.duration / 60)}m {visitor.duration % 60}s</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {visitor.pages.map((page, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                    >
                      {page}
                    </span>
                  ))}
                </div>

                {visitor.companyInfo && (
                  <div className="mt-3 pt-3 border-t">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Industry:</span>
                        <span className="ml-2 font-medium">{visitor.companyInfo.industry}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Size:</span>
                        <span className="ml-2 font-medium">{visitor.companyInfo.size}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Revenue:</span>
                        <span className="ml-2 font-medium">{visitor.companyInfo.revenue}</span>
                      </div>
                    </div>
                    
                    <div className="mt-2 space-y-1">
                      {visitor.companyInfo.contacts.map((contact, index) => (
                        <div key={index} className="flex items-center gap-3 text-sm">
                          <span className="font-medium">{contact.role}</span>
                          <div className="flex items-center gap-2">
                            <a href={`mailto:${contact.email}`} className="text-blue-600 hover:text-blue-700">
                              <Mail className="w-4 h-4" />
                            </a>
                            <a href="#" className="text-blue-600 hover:text-blue-700">
                              <Phone className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button className="text-blue-600 hover:text-blue-700">
                <ExternalLink className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisitorFeed;