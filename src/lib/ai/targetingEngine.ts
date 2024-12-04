import { enrichCompanyData, findProspects } from '../apollo/client';
import { Account, AccountScore, TargetingRecommendation } from '../../types';

export const generateTargetingRecommendations = async (
  account: Account,
  score: AccountScore
): Promise<TargetingRecommendation[]> => {
  try {
    // Enrich company data
    const enrichedData = await enrichCompanyData(account.domain);
    
    // Define targeting criteria based on account score
    const criteria = buildTargetingCriteria(score, account.industry);
    
    // Find relevant prospects
    const prospects = await findProspects(enrichedData.id, criteria);
    
    // Generate personalized recommendations
    return generatePersonalizedRecommendations(prospects, score, account);
  } catch (error) {
    console.error('Targeting engine error:', error);
    throw error;
  }
};

const buildTargetingCriteria = (score: AccountScore, industry: string) => {
  const criteria: any = {
    seniority: ['director', 'executive'],
    industry: [industry]
  };

  switch (score.intensity) {
    case 'boiling':
      criteria.titles = ['CXO', 'VP', 'Head'];
      criteria.seniority = ['executive'];
      break;
    case 'hot':
      criteria.titles = ['Director', 'Senior'];
      break;
    case 'warm':
      criteria.titles = ['Manager', 'Lead'];
      break;
    default:
      criteria.titles = ['Specialist', 'Analyst'];
  }

  return criteria;
};

const generatePersonalizedRecommendations = (
  prospects: any[],
  score: AccountScore,
  account: Account
): TargetingRecommendation[] => {
  return prospects.map(prospect => ({
    prospectId: prospect.id,
    name: prospect.name,
    title: prospect.title,
    priority: calculateProspectPriority(prospect, score),
    recommendedContent: selectContent(prospect, account),
    recommendedChannels: selectChannels(prospect, score),
    engagementStrategy: buildEngagementStrategy(prospect, score)
  }));
};

const calculateProspectPriority = (prospect: any, score: AccountScore): number => {
  let priority = 0;
  
  // Seniority boost
  if (prospect.seniority === 'executive') priority += 30;
  else if (prospect.seniority === 'director') priority += 20;
  
  // Account temperature boost
  if (score.intensity === 'boiling') priority += 40;
  else if (score.intensity === 'hot') priority += 30;
  else if (score.intensity === 'warm') priority += 20;
  
  // Engagement signals boost
  if (prospect.recent_interaction_count > 5) priority += 20;
  
  return Math.min(priority, 100);
};

const selectContent = (prospect: any, account: Account): string[] => {
  const content: string[] = [];
  
  // Role-based content
  if (prospect.title.includes('CTO')) {
    content.push('Technical Architecture Overview');
  } else if (prospect.title.includes('CFO')) {
    content.push('ROI Analysis');
  } else if (prospect.title.includes('CMO')) {
    content.push('Marketing Impact Report');
  }
  
  // Industry-specific content
  content.push(`${account.industry} Success Stories`);
  
  return content;
};

const selectChannels = (prospect: any, score: AccountScore): string[] => {
  const channels = ['linkedin'];
  
  if (score.intensity === 'hot' || score.intensity === 'boiling') {
    channels.push('email', 'sales_outreach');
  }
  
  if (prospect.social_presence?.includes('twitter')) {
    channels.push('twitter');
  }
  
  return channels;
};

const buildEngagementStrategy = (prospect: any, score: AccountScore): string => {
  if (score.intensity === 'boiling') {
    return 'Direct outreach with personalized demo offer';
  } else if (score.intensity === 'hot') {
    return 'Multi-channel approach with industry insights';
  } else if (score.intensity === 'warm') {
    return 'Content-driven nurture sequence';
  } else {
    return 'Awareness campaign with targeted ads';
  }
};