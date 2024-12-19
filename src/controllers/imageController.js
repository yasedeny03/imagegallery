import { albumRepository } from '../database/repositories/albumRepository.js';
import { imageRepository } from '../database/repositories/imageRepository.js';
import { AppError } from '../utils/errors.js';
import { logger } from '../utils/logger.js';

export const handleImageUpload = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new AppError('No file uploaded', 400);
    }

    const { albumId } = req.body;
    if (!albumId) {
      throw new AppError('Album ID is required', 400);
    }

    // Verify album exists
    const album = await albumRepository.findById(albumId);
    if (!album) {
      throw new AppError('Album not found', 404);
    }

    // Create image record
    const image = await imageRepository.create({
      albumId: album.id,
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      fileSize: req.file.size
    });

    // Return success with image data
    res.status(201).json({
      success: true,
      data: {
        id: image.id,
        url: `/uploads/${image.filename}`,
        title: image.original_name
      }
    });

    logger.info('Image uploaded successfully', {
      imageId: image.id,
      albumId: album.id,
      filename: image.filename
    });
  } catch (error) {
    next(error);
  }
};

export const getAlbumImages = async (req, res, next) => {
  try {
    const { albumId } = req.params;
    
    // Verify album exists
    const album = await albumRepository.findById(albumId);
    if (!album) {
      throw new AppError('Album not found', 404);
    }

    // Get images for album
    const images = await imageRepository.findByAlbumId(albumId);
    
    // Transform image data for frontend
    const transformedImages = images.map(img => ({
      id: img.id,
      url: `/uploads/${img.filename}`,
      title: img.original_name
    }));

    res.json({
      success: true,
      data: transformedImages
    });
  } catch (error) {
    next(error);
  }
};