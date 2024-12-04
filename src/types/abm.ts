export interface AccountPlan {
  id: string;
  accountId: string;
  status: 'draft' | 'active' | 'completed';
  goals: {
    revenue: number;
    timeline: string;
    milestones: string[];
  };
  stakeholders: AccountStakeholder[];
  engagementStrategy: {
    channels: string[];
    contentPlan: ContentItem[];
    timeline: TimelineItem[];
  };
  progress: {
    currentStage: string;
    completedMilestones: string[];
    nextActions: string[];
  };
}

export interface AccountStakeholder {
  id: string;
  name: string;
  role: string;
  influence: 'decision_maker' | 'influencer' | 'champion' | 'user';
  engagement: number;
  lastContact: Date;
  preferences: {
    channels: string[];
    interests: string[];
    contentTypes: string[];
  };
  notes: string;
}

export interface ContentItem {
  id: string;
  type: 'whitepaper' | 'case_study' | 'demo' | 'webinar' | 'email';
  title: string;
  stage: 'awareness' | 'consideration' | 'decision';
  personalization: {
    industry: string;
    role: string;
    painPoints: string[];
  };
  performance?: {
    views: number;
    engagement: number;
    conversions: number;
  };
}

export interface TimelineItem {
  id: string;
  date: Date;
  type: 'meeting' | 'content' | 'milestone' | 'task';
  title: string;
  description: string;
  status: 'planned' | 'completed' | 'delayed';
  assignee?: string;
}

export interface EngagementMetrics {
  overall: number;
  byChannel: {
    [key: string]: number;
  };
  byStakeholder: {
    [key: string]: number;
  };
  trending: 'up' | 'down' | 'stable';
  recentActivities: {
    date: Date;
    type: string;
    description: string;
  }[];
}

export interface AccountJourney {
  stages: {
    name: string;
    status: 'completed' | 'current' | 'upcoming';
    progress: number;
    activities: {
      date: Date;
      type: string;
      description: string;
      impact: number;
    }[];
  }[];
  nextBestActions: {
    action: string;
    priority: number;
    expectedImpact: number;
    assignee?: string;
  }[];
}