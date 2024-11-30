import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (_req, file, cb) {
    
    cb(null, Date.now() + path.extname(file.originalname)); // Ejemplo: 1632203023254.jpg
  },
});


const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, 
  },
  fileFilter: (_req, file, cb) => {
    const fileTypes = /jpg|jpeg|png|gif/; 
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extname && mimeType) {
      return cb(null, true); 
    } else {
      cb(new Error('Solo se permiten imágenes (JPG, JPEG, PNG, GIF)'));
    }
  },
});

export { upload };