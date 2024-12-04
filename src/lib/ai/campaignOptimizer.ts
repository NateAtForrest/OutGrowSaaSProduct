import { Campaign } from '../../types';

interface OptimizationResult {
  recommendedBudget: number;
  expectedROI: number;
  confidenceScore: number;
  reasoning: string[];
}

interface ChannelPerformance {
  channel: string;
  roi: number;
  conversion: number;
  cpl: number; // Cost per lead
  engagement: number;
}

export const optimizeCampaign = (campaign: Campaign): OptimizationResult => {
  const channelPerformance = analyzeChannelPerformance(campaign);
  const currentROI = campaign.roi;
  const spendEfficiency = campaign.leads / campaign.spent;
  
  // Calculate optimal budget based on performance metrics
  const recommendedBudget = calculateOptimalBudget(campaign, channelPerformance);
  const expectedROI = predictROI(campaign, recommendedBudget);
  
  const reasoning = generateOptimizationReasoning(
    campaign,
    channelPerformance,
    recommendedBudget,
    expectedROI
  );

  return {
    recommendedBudget,
    expectedROI,
    confidenceScore: calculateConfidenceScore(campaign),
    reasoning
  };
};

const analyzeChannelPerformance = (campaign: Campaign): ChannelPerformance[] => {
  return campaign.channels.map(channel => ({
    channel,
    roi: calculateChannelROI(campaign, channel),
    conversion: calculateChannelConversion(campaign, channel),
    cpl: calculateChannelCPL(campaign, channel),
    engagement: calculateChannelEngagement(campaign, channel)
  }));
};

const calculateOptimalBudget = (
  campaign: Campaign,
  channelPerformance: ChannelPerformance[]
): number => {
  let optimalBudget = campaign.budget;

  // Increase budget if performing well
  if (campaign.roi > 2.5 && campaign.spent < campaign.budget) {
    optimalBudget *= 1.3; // 30% increase
  }

  // Decrease budget if performing poorly
  if (campaign.roi < 1.5 && campaign.spent > campaign.budget * 0.5) {
    optimalBudget *= 0.8; // 20% decrease
  }

  // Adjust based on channel performance
  const bestChannels = channelPerformance.filter(cp => cp.roi > 2.0);
  if (bestChannels.length > 0) {
    optimalBudget *= 1.1; // 10% increase for good channel performance
  }

  return Math.round(optimalBudget);
};

const predictROI = (campaign: Campaign, newBudget: number): number => {
  const currentROI = campaign.roi;
  const budgetRatio = newBudget / campaign.budget;
  
  // Apply diminishing returns for budget increases
  if (budgetRatio > 1) {
    return currentROI * (1 + Math.log10(budgetRatio));
  }
  
  return currentROI * budgetRatio;
};

const calculateConfidenceScore = (campaign: Campaign): number => {
  let confidence = 0.7; // Base confidence

  // Adjust based on data volume
  if (campaign.performance.impressions > 10000) confidence += 0.1;
  if (campaign.leads > 100) confidence += 0.1;
  if (campaign.spent > campaign.budget * 0.5) confidence += 0.1;

  return Math.min(confidence, 1);
};

const generateOptimizationReasoning = (
  campaign: Campaign,
  channelPerformance: ChannelPerformance[],
  recommendedBudget: number,
  expectedROI: number
): string[] => {
  const reasoning: string[] = [];

  // Budget recommendations
  const budgetDiff = recommendedBudget - campaign.budget;
  if (budgetDiff > 0) {
    reasoning.push(
      `Increase budget by ${Math.round((budgetDiff / campaign.budget) * 100)}% based on strong performance`
    );
  } else if (budgetDiff < 0) {
    reasoning.push(
      `Decrease budget by ${Math.round((Math.abs(budgetDiff) / campaign.budget) * 100)}% to optimize spend`
    );
  }

  // Channel recommendations
  const bestChannel = channelPerformance.reduce((a, b) => 
    a.roi > b.roi ? a : b
  );
  reasoning.push(
    `${bestChannel.channel} is the best performing channel with ${Math.round(bestChannel.roi * 100)}% ROI`
  );

  // Performance predictions
  reasoning.push(
    `Expected ROI of ${Math.round(expectedROI * 100)}% with recommended budget`
  );

  return reasoning;
};

const calculateChannelROI = (campaign: Campaign, channel: string): number => {
  // Simplified ROI calculation per channel
  return campaign.roi * (1 + Math.random() * 0.5);
};

const calculateChannelConversion = (campaign: Campaign, channel: string): number => {
  return campaign.performance.conversions / campaign.performance.clicks;
};

const calculateChannelCPL = (campaign: Campaign, channel: string): number => {
  return campaign.spent / campaign.leads;
};

const calculateChannelEngagement = (campaign: Campaign, channel: string): number => {
  return campaign.performance.clicks / campaign.performance.impressions;
};