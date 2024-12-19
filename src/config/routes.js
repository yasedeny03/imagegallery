import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import imageRoutes from '../routes/imageRoutes.js';
import { auth } from '../middleware/auth.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const setupRoutes = (app) => {
  // Serve static files from uploads directory
  app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

  // API routes
  app.use('/api/v1/images', auth, imageRoutes);

  // Serve React app for all other routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
  });
};