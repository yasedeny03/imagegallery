import { Album } from '../types';

const STORAGE_KEYS = {
  ALBUMS: 'gallery_albums'
};

export const loadAlbums = (): Album[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.ALBUMS);
  return stored ? JSON.parse(stored) : [];
};

export const saveAlbums = (albums: Album[]): void => {
  localStorage.setItem(STORAGE_KEYS.ALBUMS, JSON.stringify(albums));
};