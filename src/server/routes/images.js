import express from 'express';
import { upload } from '../config/multer.js';
import { handleImageUpload } from '../controllers/imageController.js';

const router = express.Router();

router.post('/upload', upload.single('image'), handleImageUpload);

export default router;