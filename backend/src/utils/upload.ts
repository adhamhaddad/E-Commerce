import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const UPLOADS = 'uploads/icons';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLocaleLowerCase().split(' ').join('-');
    cb(null, uuidv4() + '-' + fileName);
  }
});
export const upload = multer({ storage: storage });
