import { Album, Image } from '../types';

const API_BASE = '/api';

export class ApiError extends Error {
  constructor(message: string, public details?: any) {
    super(message);
    this.name = 'ApiError';
  }
}

const handleResponse = async (response: Response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new ApiError(
      data.message || 'API request failed',
      data.details
    );
  }
  
  return data;
};

export const uploadImage = async (file: File, albumId: string): Promise<Image> => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('albumId', albumId);

  try {
    // Validate file before upload
    if (file.size > 5 * 1024 * 1024) {
      throw new ApiError('File size exceeds 5MB limit');
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      throw new ApiError(`Invalid file type. Allowed types: ${allowedTypes.join(', ')}`);
    }

    // Upload image
    const response = await fetch(`${API_BASE}/images/upload`, {
      method: 'POST',
      body: formData
    });

    const result = await handleResponse(response);
    
    if (!result.success) {
      throw new ApiError(result.message || 'Upload failed');
    }

    return result.data;
  } catch (error) {
    console.error('Upload error:', error);
    
    if (error instanceof ApiError) {
      throw error;
    }
    
    throw new ApiError(
      error instanceof Error ? error.message : 'Upload failed'
    );
  }
};

// ... rest of the file remains the same