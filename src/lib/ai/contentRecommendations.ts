import { Account, AccountScore, ContentRecommendation, Platform } from '../../types';

export const generateRecommendations = (
  account: Account,
  score: AccountScore,
  platforms: Platform[]
): ContentRecommendation[] => {
  const recommendations: ContentRecommendation[] = [];
  const { industry, personas } = account;

  // Add intensity-based recommendations
  recommendations.push(...getIntensityRecommendations(score.intensity, industry));

  // Add persona-specific recommendations
  recommendations.push(...getPersonaRecommendations(personas));

  // Add platform-specific recommendations
  recommendations.push(...getPlatformRecommendations(platforms, score));

  return recommendations;
};

const getIntensityRecommendations = (
  intensity: AccountScore['intensity'],
  industry: string
): ContentRecommendation[] => {
  const recommendations: ContentRecommendation[] = [];

  switch (intensity) {
    case 'cold':
      recommendations.push({
        type: 'awareness',
        content: `${industry} Industry Trends Report`,
        reason: 'Initial industry engagement',
        channels: ['linkedin', 'meta']
      });
      break;
    case 'warm':
      recommendations.push({
        type: 'consideration',
        content: 'Interactive ROI Calculator',
        reason: 'Showing evaluation signals',
        channels: ['email', 'linkedin']
      });
      break;
    case 'hot':
      recommendations.push({
        type: 'decision',
        content: 'Customer Success Stories',
        reason: 'High purchase intent',
        channels: ['email', 'sales']
      });
      break;
    case 'boiling':
      recommendations.push({
        type: 'decision',
        content: 'Personalized Solution Demo',
        reason: 'Ready to purchase',
        channels: ['sales', 'email']
      });
      break;
  }

  return recommendations;
};

const getPersonaRecommendations = (
  personas: Account['personas']
): ContentRecommendation[] => {
  return personas.map(persona => ({
    type: 'persona',
    content: getPersonaContent(persona.role),
    reason: `Targeted content for ${persona.role}`,
    channels: getPersonaChannels(persona.role)
  }));
};

const getPersonaContent = (role: string): string => {
  switch (role.toLowerCase()) {
    case 'cto':
      return 'Technical Architecture Guide';
    case 'cfo':
      return 'Financial Impact Analysis';
    case 'cmo':
      return 'Marketing ROI Playbook';
    default:
      return 'Solution Overview';
  }
};

const getPersonaChannels = (role: string): string[] => {
  switch (role.toLowerCase()) {
    case 'cto':
      return ['linkedin', 'technical_forums'];
    case 'cfo':
      return ['linkedin', 'financial_publications'];
    case 'cmo':
      return ['linkedin', 'marketing_platforms'];
    default:
      return ['linkedin', 'email'];
  }
};

const getPlatformRecommendations = (
  platforms: Platform[],
  score: AccountScore
): ContentRecommendation[] => {
  const recommendations: ContentRecommendation[] = [];

  platforms.forEach(platform => {
    switch (platform) {
      case 'linkedin':
        recommendations.push({
          type: 'platform',
          content: 'Industry Leadership Series',
          reason: 'High LinkedIn engagement',
          channels: ['linkedin']
        });
        break;
      case 'meta':
        recommendations.push({
          type: 'platform',
          content: 'Video Success Stories',
          reason: 'Strong video engagement',
          channels: ['meta']
        });
        break;
    }
  });

  return recommendations;
};