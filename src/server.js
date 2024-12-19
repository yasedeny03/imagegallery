import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { initializeDatabase } from './database/connection.js';
import { errorHandler } from './middleware/errorHandler.js';
import imageRoutes from './routes/imageRoutes.js';
import albumRoutes from './routes/albumRoutes.js';
import userRoutes from './routes/userRoutes.js';

// Load environment variables
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOADS_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR || 'uploads');

// Ensure uploads directory exists
await fs.mkdir(UPLOADS_DIR, { recursive: true });

// Initialize database
await initializeDatabase();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded files
app.use('/uploads', express.static(UPLOADS_DIR));

// API routes
app.use('/api/images', imageRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/users', userRoutes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});