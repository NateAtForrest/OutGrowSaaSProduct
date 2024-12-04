export interface User {
  id: string;
  role: 'admin' | 'marketing' | 'content';
  name: string;
  email: string;
}

export interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'draft';
  budget: number;
  spent: number;
  leads: number;
  roi: number;
  channels: string[];
  performance: {
    impressions: number;
    clicks: number;
    conversions: number;
  };
}

export interface Lead {
  id: string;
  company: string;
  score: number;
  status: 'new' | 'qualified' | 'contacted' | 'converted';
  value: number;
  lastActivity: Date;
  source: string;
}

export interface CompanyInfo {
  industry: string;
  size: string;
  revenue: string;
  contacts: Array<{
    role: string;
    email: string;
  }>;
}

export interface Visitor {
  id: string;
  company: string;
  location: string;
  pages: string[];
  duration: number;
  timestamp: Date;
  score: number;
  companyInfo?: CompanyInfo;
}

export interface AIRecommendation {
  id: string;
  type: 'campaign' | 'content' | 'budget' | 'audience' | 'analytics';
  priority: 'high' | 'medium' | 'low';
  message: string;
  impact: number;
  action: string;
  details: {
    currentMetric: string;
    potentialGain: string;
    timeframe: string;
  };
}