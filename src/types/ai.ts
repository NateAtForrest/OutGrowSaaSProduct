export interface Account {
  id: string;
  name: string;
  industry: string;
  size: string;
  interactions: {
    [key: string]: number;
  };
  interactionHistory: Array<{
    type: string;
    date: Date;
    details?: any;
  }>;
  lastInteraction: Date;
  personas: Array<{
    role: string;
    seniority: string;
    interests: string[];
  }>;
}

export interface AccountScore {
  score: number;
  intensity: 'cold' | 'warm' | 'hot' | 'boiling';
  lastUpdated: Date;
  details: {
    interactionScore: number;
    recencyBonus: number;
    significantActivities: string[];
  };
}

export interface ContentRecommendation {
  type: 'awareness' | 'consideration' | 'decision' | 'persona';
  content: string;
  reason: string;
  channels: string[];
}

export interface AccountTrends {
  momentum: {
    trend: 'increasing' | 'decreasing';
    changePercent: number;
  };
  engagementPattern: string;
  buyingStage: 'awareness' | 'consideration' | 'decision';
}