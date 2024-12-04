import { Account, AccountScore, EngagementData, Platform } from '../../types';

interface PlatformData {
  googleAnalytics?: EngagementData;
  linkedIn?: EngagementData;
  meta?: EngagementData;
}

export const analyzeAccountEngagement = (account: Account, platformData: PlatformData): AccountScore => {
  const score = calculateBaseScore(account);
  const platformScores = analyzePlatformData(platformData);
  const intensity = determineIntensity(score + platformScores.totalScore);

  return {
    score: score + platformScores.totalScore,
    intensity,
    details: {
      baseScore: score,
      platformContributions: platformScores.contributions,
      significantActivities: identifyKeyActivities(account, platformData)
    },
    lastUpdated: new Date()
  };
};

const calculateBaseScore = (account: Account): number => {
  let score = 0;
  
  // Weight different interaction types
  const weights = {
    pageView: 1,
    formSubmission: 5,
    documentDownload: 3,
    demoRequest: 10
  };

  Object.entries(account.interactions).forEach(([type, count]) => {
    score += (weights[type as keyof typeof weights] || 1) * count;
  });

  return score;
};

const analyzePlatformData = (data: PlatformData) => {
  const contributions: Record<string, number> = {};
  let totalScore = 0;

  // Google Analytics contribution
  if (data.googleAnalytics) {
    const gaScore = calculateGAScore(data.googleAnalytics);
    contributions.googleAnalytics = gaScore;
    totalScore += gaScore;
  }

  // LinkedIn contribution
  if (data.linkedIn) {
    const liScore = calculateLinkedInScore(data.linkedIn);
    contributions.linkedIn = liScore;
    totalScore += liScore;
  }

  // Meta contribution
  if (data.meta) {
    const metaScore = calculateMetaScore(data.meta);
    contributions.meta = metaScore;
    totalScore += metaScore;
  }

  return { contributions, totalScore };
};

const calculateGAScore = (data: EngagementData): number => {
  let score = 0;
  
  // Score based on session duration
  if (data.avgSessionDuration > 180) score += 20;
  else if (data.avgSessionDuration > 120) score += 15;
  else if (data.avgSessionDuration > 60) score += 10;

  // Score based on page depth
  if (data.pagesPerSession > 4) score += 20;
  else if (data.pagesPerSession > 2) score += 10;

  // Score based on return visits
  if (data.returnVisits > 3) score += 25;
  else if (data.returnVisits > 1) score += 15;

  return score;
};

const calculateLinkedInScore = (data: EngagementData): number => {
  let score = 0;

  // Score based on ad interactions
  if (data.adClicks > 5) score += 25;
  else if (data.adClicks > 2) score += 15;

  // Score based on content engagement
  if (data.contentInteractions > 3) score += 20;
  else if (data.contentInteractions > 1) score += 10;

  // Score based on profile views
  if (data.profileViews > 5) score += 15;
  else if (data.profileViews > 2) score += 10;

  return score;
};

const calculateMetaScore = (data: EngagementData): number => {
  let score = 0;

  // Score based on ad engagement
  if (data.adClicks > 3) score += 20;
  else if (data.adClicks > 1) score += 10;

  // Score based on page engagement
  if (data.pageEngagements > 5) score += 15;
  else if (data.pageEngagements > 2) score += 10;

  // Score based on video views
  if (data.videoViews > 2) score += 15;
  else if (data.videoViews > 0) score += 5;

  return score;
};

const determineIntensity = (score: number): AccountScore['intensity'] => {
  if (score > 150) return 'boiling';
  if (score > 100) return 'hot';
  if (score > 50) return 'warm';
  return 'cold';
};

const identifyKeyActivities = (account: Account, platformData: PlatformData): string[] => {
  const activities: string[] = [];

  // Base activities
  if (account.interactions.demoRequest > 0) {
    activities.push('Demo Requested');
  }
  if (account.interactions.formSubmission > 2) {
    activities.push('Multiple Form Submissions');
  }

  // Platform-specific activities
  if (platformData.googleAnalytics?.pagesPerSession > 4) {
    activities.push('High Page Engagement');
  }
  if (platformData.linkedIn?.adClicks > 3) {
    activities.push('High LinkedIn Ad Engagement');
  }
  if (platformData.meta?.videoViews > 2) {
    activities.push('Multiple Video Views');
  }

  return activities;
};