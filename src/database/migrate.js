import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { getConnection } from './connection.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function migrate() {
  try {
    const db = getConnection();
    const schema = await fs.readFile(
      path.join(__dirname, 'schema.sql'),
      'utf-8'
    );

    const statements = schema
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    for (const statement of statements) {
      db.prepare(statement).run();
    }

    console.log('Database migration completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate();