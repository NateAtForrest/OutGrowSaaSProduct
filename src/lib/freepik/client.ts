import type { FreepikAsset } from '../../types/adGenerator';

const FREEPIK_API_BASE = 'https://api.freepik.com/v1';

interface SearchParams {
  query: string;
  type?: 'photo' | 'vector' | 'psd';
  page?: number;
  limit?: number;
  orientation?: 'square' | 'vertical' | 'horizontal';
  category?: string;
  color?: string;
  people?: 'with' | 'without';
}

interface FreepikResponse {
  data: Array<{
    id: string;
    title: string;
    description: string;
    type: 'photo' | 'vector' | 'psd';
    preview: {
      url: string;
      width: number;
      height: number;
    };
    width: number;
    height: number;
    thumbnail: string;
    url: string;
    license: {
      type: string;
      scope: string;
    };
    tags: string[];
  }>;
  meta: {
    pagination: {
      total: number;
      current_page: number;
      total_pages: number;
      per_page: number;
    };
  };
}

const makeRequest = async (endpoint: string, options: RequestInit = {}) => {
  const apiKey = import.meta.env.VITE_FREEPIK_API_KEY;
  
  if (!apiKey) {
    throw new Error('Freepik API key is not configured');
  }

  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  };

  try {
    const response = await fetch(FREEPIK_API_BASE + endpoint, {
      ...options,
      headers: {
        ...headers,
        ...options.headers
      }
    });

    if (!response.ok) {
      let errorMessage = 'An error occurred';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || `API Error: ${response.status}`;
      } catch {
        errorMessage = `API Error: ${response.status}`;
      }
      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error) {
    console.error('Freepik API error:', error instanceof Error ? error.message : 'Unknown error');
    throw error;
  }
};

export const searchAssets = async (params: SearchParams): Promise<{ resources: FreepikAsset[]; total: number; }> => {
  const queryParams = new URLSearchParams();
  queryParams.append('q', params.query);
  if (params.type) queryParams.append('type', params.type);
  if (params.page) queryParams.append('page', params.page.toString());
  if (params.limit) queryParams.append('limit', params.limit.toString());
  if (params.orientation) queryParams.append('orientation', params.orientation);
  if (params.category) queryParams.append('category', params.category);
  if (params.color) queryParams.append('color', params.color);
  if (params.people) queryParams.append('people', params.people);
  queryParams.append('locale', 'en-US');

  const data: FreepikResponse = await makeRequest(`/resources/search?${queryParams.toString()}`);
    
  return {
    resources: data.data.map(asset => ({
      id: asset.id,
      type: asset.type,
      url: asset.url,
      preview: asset.preview.url,
      dimensions: {
        width: asset.width,
        height: asset.height
      },
      license: asset.license.type,
      tags: asset.tags
    })),
    total: data.meta.pagination.total
  };
};

export const downloadAsset = async (assetId: string): Promise<{ url: string }> => {
  const data = await makeRequest(`/resources/${assetId}/download`);
    
  if (!data.url) {
    throw new Error('No download URL provided');
  }

  return data;
};