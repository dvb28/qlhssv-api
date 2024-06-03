import { diskStorage } from 'multer';

export const storageConfig = (folder: string) =>
  diskStorage({
    destination: `public/${folder}`,
    filename: (req, file, cb) => {
      // File name
      const name = Buffer.from(file.originalname, 'latin1').toString('utf8');
      // Cn filename
      cb(null, `${Date.now()}-${name}`);
    },
  });
