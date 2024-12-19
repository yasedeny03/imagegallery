import { Image } from '../../types';
import { ApiError, handleResponse } from './common';

const API_BASE = '/api/images';

export const uploadImage = async (file: File, albumId: string): Promise<Image> => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('albumId', albumId);

  try {
    // Client-side validation
    if (file.size > 5 * 1024 * 1024) {
      throw new ApiError('File size exceeds 5MB limit');
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      throw new ApiError(`Invalid file type. Allowed types: ${allowedTypes.join(', ')}`);
    }

    // Upload image
    const response = await fetch(`${API_BASE}/upload`, {
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

export const getAlbumImages = async (albumId: string): Promise<Image[]> => {
  const response = await fetch(`${API_BASE}?albumId=${albumId}`);
  const result = await handleResponse(response);
  return result.data;
};

export const deleteImage = async (imageId: string): Promise<void> => {
  const response = await fetch(`${API_BASE}/${imageId}`, {
    method: 'DELETE'
  });
  await handleResponse(response);
};