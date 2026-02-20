import { BadRequestException, Injectable } from '@nestjs/common';
import { mkdirSync, existsSync } from 'fs';
import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import { randomUUID } from 'crypto';

const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const CAFE_IMAGE_SERVE_ROOT = '/cafe-images';
export const UPLOADS_CAFE_PATH = join(process.cwd(), 'uploads', 'cafe');

export interface SaveCafeImageResult {
  imageUrl: string;
  originalName: string;
  identifiedName: string;
  extension: string;
}

@Injectable()
export class UploadService {
  async saveCafeImage(file: Express.Multer.File): Promise<SaveCafeImageResult> {
    if (!file?.buffer?.length) {
      throw new BadRequestException('No file uploaded');
    }

    const extFromName = this.getExtensionFromFileName(file.originalname);
    if (
      !extFromName ||
      !ALLOWED_EXTENSIONS.includes(extFromName.toLowerCase())
    ) {
      throw new BadRequestException(
        `Invalid file extension. Allowed: ${ALLOWED_EXTENSIONS.join(', ')}`,
      );
    }

    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      throw new BadRequestException(
        `Invalid file type. Allowed: ${ALLOWED_MIME_TYPES.join(', ')}`,
      );
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      throw new BadRequestException(
        `File too large. Max size: ${MAX_FILE_SIZE_BYTES / 1024 / 1024}MB`,
      );
    }

    const extension = extFromName.toLowerCase();
    const identifiedName = randomUUID();
    const filename = `${identifiedName}${extension}`;

    if (!existsSync(UPLOADS_CAFE_PATH)) {
      mkdirSync(UPLOADS_CAFE_PATH, { recursive: true });
    }

    const filePath = join(UPLOADS_CAFE_PATH, filename);
    await writeFile(filePath, file.buffer);

    const imageUrl = `${CAFE_IMAGE_SERVE_ROOT}/${filename}`;

    return {
      imageUrl,
      originalName: file.originalname,
      identifiedName,
      extension: extension.replace(/^\./, ''),
    };
  }

  async deleteCafeImageFile(imageUrl: string): Promise<void> {
    const filename = imageUrl.replace(/^\/cafe-images\//, '');
    if (!filename) return;
    const filePath = join(UPLOADS_CAFE_PATH, filename);
    if (existsSync(filePath)) {
      await unlink(filePath);
    }
  }

  private getExtensionFromFileName(originalname: string): string {
    const lastDot = originalname.lastIndexOf('.');
    if (lastDot === -1) return '';
    return originalname.slice(lastDot);
  }
}
