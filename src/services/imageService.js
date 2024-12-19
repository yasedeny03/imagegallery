import sharp from 'sharp';
import Image from '../models/Image.js';
import { calculateHash } from '../utils/hash.js';
import { logger } from '../utils/logger.js';

export class ImageService {
  async uploadImage(file) {
    try {
      const hash = await calculateHash(file.path);
      const existingImage = await Image.findOne({ hash });
      
      if (existingImage) {
        throw new Error('Duplicate image detected');
      }

      // Optimize image
      const optimizedPath = `${file.path}_optimized`;
      await this.optimizeImage(file.path, optimizedPath);

      const image = new Image({
        name: file.originalname,
        path: optimizedPath,
        size: file.size,
        type: file.mimetype,
        hash
      });

      await image.save();
      return image;
    } catch (error) {
      logger.error('Upload Error:', error);
      throw error;
    }
  }

  async optimizeImage(inputPath, outputPath) {
    return sharp(inputPath)
      .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toFile(outputPath);
  }

  async getImages(query = {}, options = {}) {
    const { limit = 20, offset = 0 } = options;
    
    try {
      const images = await Image.find(query)
        .sort({ uploadedAt: -1 })
        .skip(parseInt(offset))
        .limit(parseInt(limit));

      const total = await Image.countDocuments(query);
      
      return { images, total, offset: parseInt(offset), limit: parseInt(limit) };
    } catch (error) {
      logger.error('Fetch Error:', error);
      throw error;
    }
  }

  async getImage(id) {
    try {
      const image = await Image.findById(id);
      if (!image) {
        throw new Error('Image not found');
      }
      return image;
    } catch (error) {
      logger.error('Fetch Error:', error);
      throw error;
    }
  }
}

export const imageService = new ImageService();