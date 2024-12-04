export interface EngagementData {
  // Google Analytics metrics
  avgSessionDuration: number;
  pagesPerSession: number;
  returnVisits: number;
  
  // LinkedIn metrics
  adClicks?: number;
  contentInteractions?: number;
  profileViews?: number;
  
  // Meta metrics
  pageEngagements?: number;
  videoViews?: number;
}

export type Platform = 'googleAnalytics' | 'linkedin' | 'meta';

export interface AnalyticsConfig {
  googleAnalytics?: {
    measurementId: string;
    apiSecret: string;
  };
  linkedin?: {
    accountId: string;
    clientId: string;
    clientSecret: string;
  };
  meta?: {
    pixelId: string;
    accessToken: string;
    adAccountId: string;
  };
}