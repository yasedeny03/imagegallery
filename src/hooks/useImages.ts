import { useState, useCallback } from 'react';
import { Image } from '../types';
import { uploadImage } from '../utils/api';

export function useImages() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadMultipleImages = useCallback(async (files: FileList, albumId: string): Promise<Image[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const uploadPromises = Array.from(files).map(async file => {
        try {
          return await uploadImage(file, albumId);
        } catch (err) {
          console.error(`Failed to upload ${file.name}:`, err);
          throw err;
        }
      });

      const results = await Promise.allSettled(uploadPromises);
      
      const successfulUploads = results
        .filter((result): result is PromiseFulfilledResult<Image> => 
          result.status === 'fulfilled'
        )
        .map(result => result.value);

      const failedUploads = results
        .filter((result): result is PromiseRejectedResult => 
          result.status === 'rejected'
        );

      if (failedUploads.length > 0) {
        const errorMessages = failedUploads
          .map(result => result.reason.message)
          .join(', ');
        setError(`Some uploads failed: ${errorMessages}`);
      }

      return successfulUploads;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload images';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    uploadMultipleImages
  };
}