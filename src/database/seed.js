import { getConnection } from './connection.js';
import { hashPassword } from '../utils/auth.js';

async function seed() {
  const db = getConnection();

  try {
    // Create admin user
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const hashedPassword = await hashPassword(adminPassword);

    db.prepare(`
      INSERT INTO users (username, password, is_admin)
      VALUES (?, ?, 1)
      ON CONFLICT (username) DO NOTHING
    `).run('admin', hashedPassword);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();