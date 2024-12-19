import express from 'express';
import { uploadImage, getImages, deleteImage } from '../controllers/imageController.js';
import { upload } from '../middleware/upload.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/upload', auth, upload.single('image'), uploadImage);
router.get('/', auth, getImages);
router.delete('/:id', auth, deleteImage);

export default router;