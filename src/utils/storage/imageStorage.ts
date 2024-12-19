import { Image } from '../../types';

class ImageStorage {
  private async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async saveImage(file: File): Promise<Image> {
    try {
      const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const base64Data = await this.fileToBase64(file);
      
      const image: Image = {
        id,
        url: base64Data,
        title: file.name,
        description: ''
      };

      return image;
    } catch (error) {
      console.error('Error saving image:', error);
      throw new Error('Failed to save image');
    }
  }

  async getImage(id: string): Promise<string> {
    const stored = localStorage.getItem('gallery_albums');
    if (!stored) return '';
    
    const albums = JSON.parse(stored);
    for (const album of albums) {
      const image = album.images.find(img => img.id === id);
      if (image) {
        return image.url;
      }
    }
    throw new Error('Image not found');
  }
}

export const imageStorage = new ImageStorage();