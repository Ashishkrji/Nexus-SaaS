import multer from 'multer';
import path from 'path';
import sharp from 'sharp';
import fs from 'fs';
import { logger } from '../config/logger.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = process.env.UPLOAD_DIR || './uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  }
});

export const upload = multer({
  storage,
  limits: { fileSize: Number(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024 },  // Default 5MB
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG and WebP are allowed.'));
    }
  }
});

// Image compression with Sharp (free)
export async function compressImage(filePath: string): Promise<string> {
  try {
    const compressed = filePath.replace(/\.(jpg|jpeg|png)$/, '-compressed.webp');
    await sharp(filePath)
      .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(compressed);
    
    // Optionally delete original
    // fs.unlinkSync(filePath);
    
    return compressed;
  } catch (error) {
    logger.error('Error compressing image:', error);
    return filePath; // Fallback to original
  }
}
