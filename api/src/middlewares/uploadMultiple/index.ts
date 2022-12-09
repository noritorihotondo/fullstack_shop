import multer from 'multer';
import util from 'util';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/images');
  },
  filename: (req, file, cb) => {
    const match = ['image/png', 'image/jpeg'];

    if (match.indexOf(file.mimetype) === -1) {
      const message = `${file.originalname} is invalid. Only accepts png/jpeg`;
      return cb(null, message);
    }

    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadFiles = multer({ storage }).array('upload', 10);
export const uploadFilesMiddleware = util.promisify(uploadFiles);
