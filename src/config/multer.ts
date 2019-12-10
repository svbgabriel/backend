import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

export default {
  dest: path.resolve(__dirname, '..', '..', 'tmp'),
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'tmp'));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err, file.filename);

        cb(null, `${hash.toString('hex')}-${file.originalname}`);
      });
    },
  }),
};
