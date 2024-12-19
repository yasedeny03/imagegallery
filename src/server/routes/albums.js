import express from 'express';
import { 
  getAlbums, 
  createAlbum, 
  updateAlbum, 
  deleteAlbum,
  addImageToAlbum 
} from '../controllers/albumController.js';

const router = express.Router();

router.get('/', getAlbums);
router.post('/', createAlbum);
router.put('/:id', updateAlbum);
router.delete('/:id', deleteAlbum);
router.post('/:id/images', addImageToAlbum);

export default router;