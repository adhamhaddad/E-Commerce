import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const ICONS = 'uploads/icons';
const PRODUCTS = 'uploads/products';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,ICONS);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLocaleLowerCase().split(' ').join('-');
    cb(null, uuidv4() + '-' + fileName);
  }
});
const productStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,PRODUCTS);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLocaleLowerCase().split(' ').join('-');
    cb(null, uuidv4() + '-' + fileName);
  }
})

export const upload = multer({ storage: storage }).single('icon_url');
export const products = multer({storage: productStorage}).single('image_url');