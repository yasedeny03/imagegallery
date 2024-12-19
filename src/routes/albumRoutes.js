import express from 'express';
import { getAlbums, createAlbum, updateAlbum, deleteAlbum } from '../controllers/albumController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getAlbums);
router.post('/', auth, createAlbum);
router.put('/:id', auth, updateAlbum);
router.delete('/:id', auth, deleteAlbum);

export default router;