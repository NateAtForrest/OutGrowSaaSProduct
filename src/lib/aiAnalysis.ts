import { Account, AccountScore, ContentRecommendation } from '../types';

export const calculateAccountScore = (account: Account): AccountScore => {
  const { interactions } = account;
  let score = 0;
  let intensity = 'cold';

  // Weight different interaction types
  const weights = {
    pageView: 1,
    formSubmission: 5,
    documentDownload: 3,
    emailOpen: 2,
    emailClick: 3,
    adClick: 2,
    socialEngagement: 2,
    demoRequest: 10
  };

  // Calculate total weighted score
  Object.entries(interactions).forEach(([type, count]) => {
    score += (weights[type as keyof typeof weights] || 1) * count;
  });

  // Determine intensity based on score
  if (score > 100) intensity = 'boiling';
  else if (score > 75) intensity = 'hot';
  else if (score > 50) intensity = 'warm';

  // Calculate recency factor (more recent interactions increase score)
  const recencyBonus = calculateRecencyBonus(account.lastInteraction);
  score = Math.round(score * recencyBonus);

  return {
    score,
    intensity,
    lastUpdated: new Date(),
    details: {
      interactionScore: score,
      recencyBonus,
      significantActivities: identifySignificantActivities(account)
    }
  };
};

const calculateRecencyBonus = (lastInteraction: Date): number => {
  const daysSinceInteraction = Math.floor(
    (Date.now() - lastInteraction.getTime()) / (1000 * 60 * 60 * 24)
  );
  
  if (daysSinceInteraction <= 1) return 1.5;
  if (daysSinceInteraction <= 7) return 1.3;
  if (daysSinceInteraction <= 30) return 1.1;
  return 1;
};

const identifySignificantActivities = (account: Account) => {
  return Object.entries(account.interactions)
    .filter(([type, count]) => {
      if (type === 'demoRequest' && count > 0) return true;
      if (type === 'formSubmission' && count > 2) return true;
      if (type === 'documentDownload' && count > 3) return true;
      return false;
    })
    .map(([type]) => type);
};

export const generateContentRecommendations = (
  account: Account,
  score: AccountScore
): ContentRecommendation[] => {
  const recommendations: ContentRecommendation[] = [];
  const { industry, interactions, personas } = account;

  // Recommend based on industry and interaction patterns
  if (score.intensity === 'cold') {
    recommendations.push({
      type: 'awareness',
      content: `Industry Overview: ${industry} Digital Transformation`,
      reason: 'Initial industry engagement',
      channels: ['linkedin', 'display']
    });
  }

  if (score.intensity === 'warm') {
    recommendations.push({
      type: 'consideration',
      content: 'ROI Calculator Tool',
      reason: 'Showing interest in solution evaluation',
      channels: ['email', 'linkedin']
    });
  }

  if (score.intensity === 'hot' || score.intensity === 'boiling') {
    recommendations.push({
      type: 'decision',
      content: 'Customer Success Stories',
      reason: 'High intent signals detected',
      channels: ['email', 'sales']
    });
  }

  // Persona-specific recommendations
  personas.forEach(persona => {
    recommendations.push({
      type: 'persona',
      content: `${persona.role} Specific Whitepaper`,
      reason: `Targeted content for ${persona.role}`,
      channels: ['linkedin', 'email']
    });
  });

  return recommendations;
};

export const analyzeAccountTrends = (account: Account) => {
  const trends = {
    momentum: calculateMomentum(account),
    engagementPattern: identifyEngagementPattern(account),
    buyingStage: determineBuyingStage(account)
  };

  return trends;
};

const calculateMomentum = (account: Account) => {
  // Calculate week-over-week interaction growth
  const thisWeek = countRecentInteractions(account, 7);
  const lastWeek = countRecentInteractions(account, 14) - thisWeek;
  
  return {
    trend: thisWeek > lastWeek ? 'increasing' : 'decreasing',
    changePercent: lastWeek ? ((thisWeek - lastWeek) / lastWeek) * 100 : 0
  };
};

const countRecentInteractions = (account: Account, days: number) => {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  
  return account.interactionHistory
    .filter(interaction => interaction.date > cutoff)
    .length;
};

const identifyEngagementPattern = (account: Account) => {
  // Analyze interaction patterns to identify engagement type
  const patterns = {
    research: 0,
    evaluation: 0,
    purchase: 0
  };

  account.interactionHistory.forEach(interaction => {
    if (['pageView', 'documentDownload'].includes(interaction.type)) {
      patterns.research++;
    } else if (['formSubmission', 'demoRequest'].includes(interaction.type)) {
      patterns.evaluation++;
    } else if (['pricing', 'sales'].includes(interaction.type)) {
      patterns.purchase++;
    }
  });

  return Object.entries(patterns)
    .sort(([,a], [,b]) => b - a)[0][0];
};

const determineBuyingStage = (account: Account) => {
  const { interactions } = account;
  
  if (interactions.demoRequest > 0 || interactions.pricing > 3) {
    return 'decision';
  }
  if (interactions.formSubmission > 0 || interactions.documentDownload > 2) {
    return 'consideration';
  }
  return 'awareness';
};