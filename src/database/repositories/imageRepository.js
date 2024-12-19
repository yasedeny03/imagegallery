import { getConnection } from '../connection.js';

export const imageRepository = {
  create({ albumId, filename, originalName, mimeType, fileSize }) {
    const db = getConnection();
    const stmt = db.prepare(`
      INSERT INTO images (album_id, filename, original_name, mime_type, file_size)
      VALUES (?, ?, ?, ?, ?)
      RETURNING *
    `);
    return stmt.get(albumId, filename, originalName, mimeType, fileSize);
  },

  findByAlbumId(albumId) {
    const db = getConnection();
    return db.prepare(`
      SELECT * FROM images 
      WHERE album_id = ? 
      ORDER BY created_at DESC
    `).all(albumId);
  },

  delete(id) {
    const db = getConnection();
    return db.prepare('DELETE FROM images WHERE id = ?').run(id);
  }
};