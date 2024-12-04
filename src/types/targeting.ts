export interface TargetingRecommendation {
  prospectId: string;
  name: string;
  title: string;
  priority: number;
  recommendedContent: string[];
  recommendedChannels: string[];
  engagementStrategy: string;
}

export interface ProspectCriteria {
  seniority: string[];
  titles: string[];
  industry?: string[];
  keywords?: string[];
  locations?: string[];
}

export interface EnrichedCompanyData {
  id: string;
  name: string;
  domain: string;
  industry: string;
  employee_count: number;
  technologies: string[];
  social_links: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
}