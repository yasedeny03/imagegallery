import { mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const setupStorage = async () => {
  const uploadsDir = path.join(__dirname, '../../uploads');
  await mkdir(uploadsDir, { recursive: true });
};