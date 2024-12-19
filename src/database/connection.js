import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(process.cwd(), process.env.DB_PATH || 'data/gallery.db');
const dbDir = path.dirname(dbPath);

let db;

export const initializeDatabase = async () => {
  try {
    // Ensure database directory exists
    await fs.mkdir(dbDir, { recursive: true });
    
    // Create database connection
    db = new Database(dbPath, { 
      verbose: process.env.NODE_ENV === 'development' ? console.log : null 
    });
    
    // Enable foreign key support
    db.pragma('foreign_keys = ON');
    
    return db;
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
};

export const getConnection = () => {
  if (!db) {
    throw new Error('Database not initialized. Call initializeDatabase first.');
  }
  return db;
};

export const closeConnection = () => {
  if (db) {
    db.close();
    db = null;
  }
};

// Handle cleanup on process exit
process.on('SIGINT', () => {
  closeConnection();
  process.exit(0);
});

process.on('SIGTERM', () => {
  closeConnection();
  process.exit(0);
});