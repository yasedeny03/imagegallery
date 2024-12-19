import { useState, useEffect } from 'react';
import { Album } from '../types';
import { 
  getAlbums, 
  createAlbum as apiCreateAlbum,
  updateAlbum as apiUpdateAlbum,
  deleteAlbum as apiDeleteAlbum,
  uploadImage
} from '../utils/api';

export const useAlbums = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAlbums = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAlbums();
      setAlbums(data);
    } catch (err) {
      setError('Failed to load albums');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAlbums();
  }, []);

  const addAlbum = async (name: string, description: string) => {
    try {
      setError(null);
      const newAlbum = await apiCreateAlbum(name, description);
      setAlbums(prev => [...prev, newAlbum]);
      return newAlbum;
    } catch (err) {
      setError('Failed to create album');
      console.error(err);
      throw err;
    }
  };

  const editAlbum = async (updatedAlbum: Album) => {
    try {
      setError(null);
      const result = await apiUpdateAlbum(updatedAlbum);
      setAlbums(prev => prev.map(album => 
        album.id === result.id ? result : album
      ));
      return result;
    } catch (err) {
      setError('Failed to update album');
      console.error(err);
      throw err;
    }
  };

  const removeAlbum = async (albumId: string) => {
    try {
      setError(null);
      await apiDeleteAlbum(albumId);
      setAlbums(prev => prev.filter(album => album.id !== albumId));
    } catch (err) {
      setError('Failed to delete album');
      console.error(err);
      throw err;
    }
  };

  const addImages = async (albumId: string, files: File[]) => {
    try {
      setError(null);
      
      // Verify album exists
      const album = albums.find(a => a.id === albumId);
      if (!album) {
        throw new Error('Album not found');
      }

      const uploadPromises = files.map(file => uploadImage(file, albumId));
      const results = await Promise.allSettled(uploadPromises);
      
      const successfulUploads = results
        .filter((result): result is PromiseFulfilledResult<any> => 
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

      if (successfulUploads.length > 0) {
        setAlbums(prev => prev.map(album => {
          if (album.id === albumId) {
            return {
              ...album,
              images: [...album.images, ...successfulUploads]
            };
          }
          return album;
        }));
      }

      return successfulUploads;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add images';
      setError(message);
      console.error(err);
      throw err;
    }
  };

  return {
    albums,
    loading,
    error,
    addAlbum,
    editAlbum,
    deleteAlbum: removeAlbum,
    addImages,
    refreshAlbums: loadAlbums
  };
};