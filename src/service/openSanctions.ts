import type { OpenSanctionsEntity } from '../types';
import { CONFIG_KEYS, getApiKey } from './config';

const BASE_URL = '/api/opensanctions';

export async function searchEntity(query: string): Promise<OpenSanctionsEntity | null> {
  const API_TOKEN = getApiKey(CONFIG_KEYS.OPENSANCTIONS_API_KEY);

  if (!API_TOKEN) {
    // Return mock data immediately if no token is provided to prevent API errors
    return getMockEntityData(query);
  }

  try {
    const response = await fetch(`${BASE_URL}/search/default?q=${encodeURIComponent(query)}`, {
      headers: {
        'Authorization': `ApiKey ${API_TOKEN}`,
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      console.warn(`OpenSanctions API Error: ${response.status}. Falling back to mock data for ${query}.`);
      return getMockEntityData(query);
    }
    
    const data = await response.json();
    const results = data.results || [];
    
    if (results.length > 0) {
      return results[0];
    }
    
    return getMockEntityData(query);
  } catch (error) {
    console.error('Failed to fetch from OpenSanctions:', error);
    return getMockEntityData(query);
  }
}

function getMockEntityData(query: string): OpenSanctionsEntity {
  return {
    id: 'mock-id-123',
    schema: 'Company',
    caption: query.toUpperCase() + ' INC.',
    properties: {
      jurisdiction: ['us'],
      incorporationDate: ['1990-01-01']
    },
    first_seen: '2023-01-01T00:00:00Z',
    last_seen: '2024-01-01T00:00:00Z',
    datasets: ['us_ofac']
  };
}
