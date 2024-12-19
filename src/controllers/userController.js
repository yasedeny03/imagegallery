import User from '../models/User.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const userController = {
  async getUsers(req, res) {
    try {
      const users = await User.find({ isAdmin: false })
        .populate('allowedAlbums')
        .sort({ createdAt: -1 });
      return successResponse(res, 200, 'Users retrieved successfully', users);
    } catch (error) {
      return errorResponse(res, 500, 'Failed to retrieve users');
    }
  },

  async createUser(req, res) {
    try {
      const { customerName, password, allowedAlbums } = req.body;
      const user = new User({
        customerName,
        password,
        allowedAlbums
      });
      await user.save();
      return successResponse(res, 201, 'User created successfully', user);
    } catch (error) {
      return errorResponse(res, 500, 'Failed to create user');
    }
  },

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { customerName, password, allowedAlbums } = req.body;
      
      const updateData = {
        customerName,
        allowedAlbums,
        lastModified: Date.now()
      };

      if (password) {
        updateData.password = password;
      }

      const user = await User.findByIdAndUpdate(id, updateData, { new: true });
      if (!user) {
        return errorResponse(res, 404, 'User not found');
      }
      return successResponse(res, 200, 'User updated successfully', user);
    } catch (error) {
      return errorResponse(res, 500, 'Failed to update user');
    }
  },

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        return errorResponse(res, 404, 'User not found');
      }
      return successResponse(res, 200, 'User deleted successfully');
    } catch (error) {
      return errorResponse(res, 500, 'Failed to delete user');
    }
  }
};