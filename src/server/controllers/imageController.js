import { AppError } from '../utils/errors.js';
import { logger } from '../utils/logger.js';
import { catchAsync } from '../utils/errors.js';

export const handleImageUpload = catchAsync(async (req, res) => {
  if (!req.file) {
    throw new AppError('No file uploaded', 400);
  }

  // Log successful upload
  logger.info('Image upload successful', {
    filename: req.file.filename,
    originalName: req.file.originalname,
    size: req.file.size,
    mimetype: req.file.mimetype
  });

  // Return the image data
  res.status(201).json({
    success: true,
    data: {
      _id: Date.now().toString(),
      path: `/uploads/${req.file.filename}`,
      originalName: req.file.originalname,
      size: req.file.size,
      type: req.file.mimetype
    }
  });
});