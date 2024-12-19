import { Album, Image } from '../types';
import { storage } from '../utils/storage';

class AlbumService {
  async getAlbums(): Promise<Album[]> {
    return storage.loadAlbums();
  }

  async createAlbum(name: string, description: string): Promise<Album> {
    const newAlbum: Album = {
      id: Date.now().toString(),
      name,
      description,
      images: []
    };
    await storage.saveAlbum(newAlbum);
    return newAlbum;
  }

  async updateAlbum(album: Album): Promise<Album> {
    await storage.saveAlbum(album);
    return album;
  }

  async deleteAlbum(id: string): Promise<void> {
    await storage.deleteAlbum(id);
  }

  async addImages(albumId: string, images: Image[]): Promise<Album> {
    const album = await this.getAlbumById(albumId);
    if (!album) throw new Error('Album not found');

    const updatedAlbum = {
      ...album,
      images: [...album.images, ...images]
    };

    await storage.saveAlbum(updatedAlbum);
    return updatedAlbum;
  }

  async deleteImage(albumId: string, imageId: string): Promise<Album> {
    const album = await this.getAlbumById(albumId);
    if (!album) throw new Error('Album not found');

    const updatedAlbum = {
      ...album,
      images: album.images.filter(img => img.id !== imageId)
    };

    await storage.saveAlbum(updatedAlbum);
    return updatedAlbum;
  }

  private async getAlbumById(id: string): Promise<Album | null> {
    const albums = await this.getAlbums();
    return albums.find(album => album.id === id) || null;
  }
}

export const albumService = new AlbumService();