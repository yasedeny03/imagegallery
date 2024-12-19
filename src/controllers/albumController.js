import Album from '../models/Album.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const getAlbums = async (req, res) => {
  try {
    const albums = await Album.find().sort({ createdAt: -1 });
    return successResponse(res, 200, 'Albums retrieved successfully', albums);
  } catch (error) {
    return errorResponse(res, 500, 'Failed to retrieve albums');
  }
};

export const createAlbum = async (req, res) => {
  try {
    const { name, description } = req.body;
    const album = new Album({ name, description });
    await album.save();
    return successResponse(res, 201, 'Album created successfully', album);
  } catch (error) {
    return errorResponse(res, 500, 'Failed to create album');
  }
};

export const updateAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const album = await Album.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );
    if (!album) {
      return errorResponse(res, 404, 'Album not found');
    }
    return successResponse(res, 200, 'Album updated successfully', album);
  } catch (error) {
    return errorResponse(res, 500, 'Failed to update album');
  }
};

export const deleteAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const album = await Album.findByIdAndDelete(id);
    if (!album) {
      return errorResponse(res, 404, 'Album not found');
    }
    return successResponse(res, 200, 'Album deleted successfully');
  } catch (error) {
    return errorResponse(res, 500, 'Failed to delete album');
  }
};