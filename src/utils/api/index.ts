import { Album, Image } from '../../types';
import { ApiError } from './common';

const API_BASE = '/api';

// Re-export all API functions
export * from './albums';
export * from './images';
export * from './common';

// Common response handler
export const handleResponse = async (response: Response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new ApiError(
      data.message || 'API request failed',
      data.details
    );
  }
  
  return data;
};