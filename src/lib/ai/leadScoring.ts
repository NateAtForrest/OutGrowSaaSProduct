import { Lead, Visitor, CompanyInfo } from '../../types';

interface LeadScore {
  score: number;
  category: 'hot' | 'warm' | 'cold';
  factors: ScoreFactor[];
  nextActions: string[];
}

interface ScoreFactor {
  name: string;
  score: number;
  weight: number;
  impact: 'positive' | 'negative';
}

export const scoreLeads = (
  lead: Lead,
  visitorHistory: Visitor[] = [],
  companyInfo?: CompanyInfo
): LeadScore => {
  const factors: ScoreFactor[] = [];
  let totalScore = 0;

  // Engagement scoring
  const engagementScore = calculateEngagementScore(visitorHistory);
  factors.push({
    name: 'Engagement Level',
    score: engagementScore,
    weight: 0.3,
    impact: engagementScore > 50 ? 'positive' : 'negative'
  });
  totalScore += engagementScore * 0.3;

  // Company fit scoring
  if (companyInfo) {
    const fitScore = calculateCompanyFitScore(companyInfo);
    factors.push({
      name: 'Company Fit',
      score: fitScore,
      weight: 0.25,
      impact: fitScore > 50 ? 'positive' : 'negative'
    });
    totalScore += fitScore * 0.25;
  }

  // Behavioral scoring
  const behaviorScore = calculateBehaviorScore(visitorHistory);
  factors.push({
    name: 'Behavior Pattern',
    score: behaviorScore,
    weight: 0.25,
    impact: behaviorScore > 50 ? 'positive' : 'negative'
  });
  totalScore += behaviorScore * 0.25;

  // Intent scoring
  const intentScore = calculateIntentScore(visitorHistory);
  factors.push({
    name: 'Purchase Intent',
    score: intentScore,
    weight: 0.2,
    impact: intentScore > 50 ? 'positive' : 'negative'
  });
  totalScore += intentScore * 0.2;

  return {
    score: Math.round(totalScore),
    category: determineCategory(totalScore),
    factors,
    nextActions: recommendNextActions(totalScore, visitorHistory)
  };
};

const calculateEngagementScore = (history: Visitor[]): number => {
  if (!history?.length) return 0;
  
  let score = 0;
  
  // Score based on visit frequency
  score += Math.min(history.length * 10, 40);
  
  // Score based on time spent
  const avgDuration = history.reduce((sum, visit) => sum + visit.duration, 0) / history.length;
  score += Math.min(avgDuration / 60 * 10, 30);
  
  // Score based on page depth
  const uniquePages = new Set(history.flatMap(visit => visit.pages)).size;
  score += Math.min(uniquePages * 5, 30);

  return Math.min(score, 100);
};

const calculateCompanyFitScore = (company: CompanyInfo): number => {
  if (!company) return 0;
  
  let score = 0;

  // Industry fit
  const targetIndustries = ['Technology', 'Finance', 'Healthcare', 'Manufacturing'];
  if (targetIndustries.includes(company.industry)) {
    score += 30;
  }

  // Company size
  const size = parseInt(company.size.replace(/[^0-9]/g, ''));
  if (size > 1000) score += 30;
  else if (size > 500) score += 20;
  else if (size > 100) score += 10;

  // Revenue
  const revenue = company.revenue.includes('100M+') ? 100 : 
                 parseInt(company.revenue.replace(/[^0-9]/g, ''));
  if (revenue >= 100) score += 40;
  else if (revenue >= 50) score += 30;
  else if (revenue >= 10) score += 20;

  return Math.min(score, 100);
};

const calculateBehaviorScore = (history: Visitor[]): number => {
  if (!history?.length) return 0;
  
  let score = 0;

  // High-value page visits
  const highValuePages = ['/pricing', '/demo', '/enterprise', '/contact'];
  const hasHighValueVisits = history.some(visit => 
    visit.pages?.some(page => highValuePages.includes(page))
  );
  if (hasHighValueVisits) score += 40;

  // Return visits
  if (history.length > 5) score += 30;
  else if (history.length > 2) score += 20;

  // Recent activity
  const mostRecent = new Date(Math.max(...history.map(v => v.timestamp.getTime())));
  const daysSinceLastVisit = (Date.now() - mostRecent.getTime()) / (1000 * 60 * 60 * 24);
  if (daysSinceLastVisit < 7) score += 30;
  else if (daysSinceLastVisit < 30) score += 20;

  return Math.min(score, 100);
};

const calculateIntentScore = (history: Visitor[]): number => {
  if (!history?.length) return 0;
  
  let score = 0;

  // Check for high-intent pages
  const intentPages: Record<string, number> = {
    '/pricing': 30,
    '/demo': 40,
    '/contact': 35,
    '/enterprise': 25
  };

  history.forEach(visit => {
    visit.pages?.forEach(page => {
      const intentScore = intentPages[page] || 0;
      score += intentScore;
    });
  });

  // Recent engagement bonus
  const recentVisits = history.filter(visit => 
    (Date.now() - visit.timestamp.getTime()) < (7 * 24 * 60 * 60 * 1000)
  ).length;
  score += recentVisits * 10;

  return Math.min(score, 100);
};

const determineCategory = (score: number): 'hot' | 'warm' | 'cold' => {
  if (score >= 70) return 'hot';
  if (score >= 40) return 'warm';
  return 'cold';
};

const recommendNextActions = (score: number, history: Visitor[]): string[] => {
  const actions: string[] = [];

  if (score >= 70) {
    actions.push('Schedule sales call');
    actions.push('Send personalized case study');
  } else if (score >= 40) {
    actions.push('Send nurture email sequence');
    actions.push('Invite to webinar');
  } else {
    actions.push('Add to awareness campaign');
    actions.push('Monitor for increased activity');
  }

  // Add specific recommendations based on behavior
  if (history?.length > 0) {
    const hasViewedPricing = history.some(visit => 
      visit.pages?.includes('/pricing')
    );
    if (hasViewedPricing && score >= 40) {
      actions.push('Send ROI calculator');
    }
  }

  return actions;
};