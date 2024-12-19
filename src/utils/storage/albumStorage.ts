import { Album } from '../../types';

class AlbumStorage {
  private STORAGE_KEY = 'gallery_albums';

  async loadAlbums(): Promise<Album[]> {
    const stored = localStorage.getItem(this.STORAGE_KEY);
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
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(albums));
  }

  async deleteAlbum(id: string): Promise<void> {
    const albums = await this.loadAlbums();
    localStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify(albums.filter(a => a.id !== id))
    );
  }
}

export const albumStorage = new AlbumStorage();