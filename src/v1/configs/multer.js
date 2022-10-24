import multer from 'multer';
import {
  extname,
  resolve,
} from 'path';

const randomToken = () => Math.floor(Math.random() * 1000 + 10000);

export default {
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/webp') {
      return cb(new multer.MulterError('Arquivo Precisa ser PNG ou JPG'));
    }

    return cb(null, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', '..', 'uploads'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${randomToken()}${extname(file.originalname)}`);
    },
  }),
};
