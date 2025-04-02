import express from "express";
import multer from "multer";
import path from "path";
import { 
    registerDonor, 
    loginDonor, 
    getAllDonors, 
    getDonorById, 
    updateDonor, 
    deleteDonor 
} from "../Controllers/ProductController.js";

const router = express.Router();

// ✅ Configure Multer for Image Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Save uploaded images in "uploads" folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

const upload = multer({ storage });

// ✅ Routes
router.post("/upload", upload.single("image"), registerDonor);
router.post("/login", loginDonor);
router.get("/prd", getAllDonors);
router.get("/:id", getDonorById);
router.put("/:id", upload.single("image"), updateDonor);  // ✅ Update donor with image support
router.delete("/:id", deleteDonor);

export default router;
