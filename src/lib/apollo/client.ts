import type { EnrichedCompanyData } from '../../types/targeting';
import { mockEnrichedData, mockProspects } from './mockData';

const USE_MOCK = true; // Toggle this to switch between mock and real API

export const enrichCompanyData = async (domain: string): Promise<EnrichedCompanyData | null> => {
  if (USE_MOCK) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockEnrichedData;
  }

  try {
    // Real API implementation would go here
    const response = await fetch(`https://api.apollo.io/v1/organizations/enrich`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.VITE_APOLLO_API_KEY}`
      },
      body: JSON.stringify({ domain })
    });

    if (!response.ok) {
      throw new Error(`Apollo API error: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      id: data.id,
      name: data.name,
      domain: data.domain,
      industry: data.industry,
      employee_count: data.employee_count,
      technologies: data.technologies || [],
      social_links: {
        linkedin: data.linkedin_url,
        twitter: data.twitter_url,
        facebook: data.facebook_url
      }
    };
  } catch (error) {
    console.error('Apollo enrichment error:', error instanceof Error ? error.message : 'Unknown error');
    return null;
  }
};

export const findProspects = async (companyId: string, criteria: any) => {
  if (USE_MOCK) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockProspects;
  }

  try {
    // Real API implementation would go here
    const response = await fetch(`https://api.apollo.io/v1/mixed_people/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.VITE_APOLLO_API_KEY}`
      },
      body: JSON.stringify({
        organization_ids: [companyId],
        ...criteria
      })
    });

    if (!response.ok) {
      throw new Error(`Apollo API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.people?.map((person: any) => ({
      id: person.id,
      name: person.name,
      title: person.title,
      email: person.email,
      linkedin_url: person.linkedin_url
    })) || [];
  } catch (error) {
    console.error('Apollo prospect search error:', error instanceof Error ? error.message : 'Unknown error');
    return [];
  }
};