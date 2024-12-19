import jwt from 'jsonwebtoken';
import { errorResponse } from '../utils/response.js';

export const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return errorResponse(res, 401, 'Authentication required');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Auth error:', error);
    return errorResponse(res, 401, 'Invalid token');
  }
};