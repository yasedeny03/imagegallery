import { getConnection } from '../connection.js';

export const albumRepository = {
  create(name, description) {
    const db = getConnection();
    const stmt = db.prepare(`
      INSERT INTO albums (name, description)
      VALUES (?, ?)
      RETURNING *
    `);
    return stmt.get(name, description);
  },

  findById(id) {
    const db = getConnection();
    return db.prepare('SELECT * FROM albums WHERE id = ?').get(id);
  },

  findAll() {
    const db = getConnection();
    return db.prepare('SELECT * FROM albums ORDER BY created_at DESC').all();
  },

  update(id, { name, description }) {
    const db = getConnection();
    const stmt = db.prepare(`
      UPDATE albums 
      SET name = ?, description = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
      RETURNING *
    `);
    return stmt.get(name, description, id);
  },

  delete(id) {
    const db = getConnection();
    return db.prepare('DELETE FROM albums WHERE id = ?').run(id);
  },

  // Get albums accessible to a user
  findByUserId(userId) {
    const db = getConnection();
    return db.prepare(`
      SELECT a.* 
      FROM albums a
      JOIN user_album_permissions uap ON a.id = uap.album_id
      WHERE uap.user_id = ?
      ORDER BY a.created_at DESC
    `).all(userId);
  }
};