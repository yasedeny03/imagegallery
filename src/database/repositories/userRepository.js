import { getConnection } from '../connection.js';

export const userRepository = {
  create({ username, password, isAdmin = false }) {
    const db = getConnection();
    const stmt = db.prepare(`
      INSERT INTO users (username, password, is_admin)
      VALUES (?, ?, ?)
      RETURNING *
    `);
    return stmt.get(username, password, isAdmin);
  },

  findByUsername(username) {
    const db = getConnection();
    return db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  },

  addAlbumPermission(userId, albumId) {
    const db = getConnection();
    const stmt = db.prepare(`
      INSERT INTO user_album_permissions (user_id, album_id)
      VALUES (?, ?)
      ON CONFLICT DO NOTHING
    `);
    return stmt.run(userId, albumId);
  },

  removeAlbumPermission(userId, albumId) {
    const db = getConnection();
    return db.prepare(`
      DELETE FROM user_album_permissions 
      WHERE user_id = ? AND album_id = ?
    `).run(userId, albumId);
  }
};