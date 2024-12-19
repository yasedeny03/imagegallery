import { logger } from '../utils/logger.js';
import { errorResponse } from '../utils/response.js';

export const errorHandler = (err, req, res, next) => {
  logger.error('Error:', {
    message: err.message,
    stack: err.stack,
    path: req.path
  });

  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return errorResponse(res, 413, 'File too large');
    }
    return errorResponse(res, 400, err.message);
  }

  if (err.name === 'ValidationError') {
    return errorResponse(res, 400, err.message);
  }

  return errorResponse(res, 500, 'Internal server error');
};