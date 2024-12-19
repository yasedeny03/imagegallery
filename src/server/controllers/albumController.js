import { AppError } from '../utils/errors.js';
import { catchAsync } from '../utils/errors.js';
import { logger } from '../utils/logger.js';

// In-memory album storage (will be replaced with database later)
let albums = [];

export const getAlbums = catchAsync(async (req, res) => {
  logger.info('Fetching all albums');
  res.json({ success: true, data: albums });
});

export const createAlbum = catchAsync(async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    throw new AppError('Album name is required', 400);
  }

  const newAlbum = {
    id: Date.now().toString(),
    name,
    description,
    images: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  albums.push(newAlbum);
  logger.info('Album created', { albumId: newAlbum.id });

  res.status(201).json({ success: true, data: newAlbum });
});

export const updateAlbum = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  const albumIndex = albums.findIndex(a => a.id === id);
  if (albumIndex === -1) {
    throw new AppError('Album not found', 404);
  }

  albums[albumIndex] = {
    ...albums[albumIndex],
    name: name || albums[albumIndex].name,
    description: description || albums[albumIndex].description,
    updatedAt: new Date().toISOString()
  };

  logger.info('Album updated', { albumId: id });
  res.json({ success: true, data: albums[albumIndex] });
});

export const deleteAlbum = catchAsync(async (req, res) => {
  const { id } = req.params;
  const initialLength = albums.length;
  
  albums = albums.filter(a => a.id !== id);
  
  if (albums.length === initialLength) {
    throw new AppError('Album not found', 404);
  }

  logger.info('Album deleted', { albumId: id });
  res.json({ success: true });
});

export const addImageToAlbum = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { imageId, url, title } = req.body;

  if (!imageId || !url || !title) {
    throw new AppError('Image ID, URL, and title are required', 400);
  }

  const albumIndex = albums.findIndex(a => a.id === id);
  if (albumIndex === -1) {
    throw new AppError('Album not found', 404);
  }

  const newImage = {
    id: imageId,
    url,
    title,
    uploadedAt: new Date().toISOString()
  };

  albums[albumIndex].images.push(newImage);
  albums[albumIndex].updatedAt = new Date().toISOString();

  logger.info('Image added to album', { 
    albumId: id, 
    imageId: imageId 
  });

  res.json({ success: true, data: newImage });
});