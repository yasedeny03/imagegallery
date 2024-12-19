import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import { errorHandler } from '../middleware/errorHandler.js';
import { setupRoutes } from './routes.js';
import { setupMiddleware } from './middleware.js';
import { setupStorage } from './storage.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const createApp = async () => {
  const app = express();

  // Setup middleware
  setupMiddleware(app);
  
  // Setup CORS and security
  app.use(helmet());
  app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:3000'
  }));
  
  // Setup storage
  await setupStorage();

  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, '../../dist')));
  
  // Setup routes
  setupRoutes(app);
  
  // Error handling
  app.use(errorHandler);

  return app;
};