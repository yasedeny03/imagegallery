import { Album, Image, User } from '../types';

class Storage {
  // Album operations
  async loadAlbums(): Promise<Album[]> {
    const stored = localStorage.getItem('gallery_albums');
    return stored ? JSON.parse(stored) : [];
  }

  async saveAlbum(album: Album): Promise<void> {
    const albums = await this.loadAlbums();
    const index = albums.findIndex(a => a.id === album.id);
    
    if (index === -1) {
      albums.push(album);
    } else {
      albums[index] = album;
    }
    
    localStorage.setItem('gallery_albums', JSON.stringify(albums));
  }

  async deleteAlbum(id: string): Promise<void> {
    const albums = await this.loadAlbums();
    localStorage.setItem(
      'gallery_albums',
      JSON.stringify(albums.filter(a => a.id !== id))
    );
  }

  // Image operations
  private async initIndexedDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('GalleryDB', 1);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('images')) {
          db.createObjectStore('images', { keyPath: 'id' });
        }
      };
    });
  }

  async saveImage(file: File): Promise<Image> {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const url = URL.createObjectURL(file);
    
    const image: Image = {
      id,
      url,
      title: file.name,
      description: ''
    };

    return image;
  }

  async getImage(id: string): Promise<string> {
    const albums = await this.loadAlbums();
    for (const album of albums) {
      const image = album.images.find(img => img.id === id);
      if (image) {
        return image.url;
      }
    }
    throw new Error('Image not found');
  }
}

export const storage = new Storage();