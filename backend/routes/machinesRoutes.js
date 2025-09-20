  import express from 'express';
  import multer from 'multer';
  import path from 'path';
  import { fileURLToPath } from 'url';
  import { addMachine, getMachinesByLocation,deleteMachine, getMachineByID, updateMachineByID } from '../controllers/machinesController.js';

  const machinesRoutes = express.Router();

  // Setup multer để lưu file ảnh
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
  });

  const upload = multer({ storage });

  // Route thêm máy mới với ảnh
  machinesRoutes.post('/', upload.single('image_url'), addMachine);

  machinesRoutes.get("/", getMachinesByLocation);
  machinesRoutes.delete("/:id", deleteMachine);
  machinesRoutes.get("/:id", getMachineByID)
  machinesRoutes.put("/:id", updateMachineByID)


  export default machinesRoutes;