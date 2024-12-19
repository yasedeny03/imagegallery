import rateLimit from 'express-rate-limit';

export const uploadLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 10 requests per minute
  message: 'Too many upload requests, please try again later'
});