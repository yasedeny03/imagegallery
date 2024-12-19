import { Album } from '../../types';
import { handleResponse } from './index';

const API_BASE = '/api/albums';

export const getAlbums = async (): Promise<Album[]> => {
  const response = await fetch(API_BASE);
  const result = await handleResponse(response);
  return result.data;
};

export const createAlbum = async (name: string, description: string): Promise<Album> => {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, description })
  });
  const result = await handleResponse(response);
  return result.data;
};

export const updateAlbum = async (album: Album): Promise<Album> => {
  const response = await fetch(`${API_BASE}/${album.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(album)
  });
  const result = await handleResponse(response);
  return result.data;
};

export const deleteAlbum = async (albumId: string): Promise<void> => {
  const response = await fetch(`${API_BASE}/${albumId}`, {
    method: 'DELETE'
  });
  await handleResponse(response);
};