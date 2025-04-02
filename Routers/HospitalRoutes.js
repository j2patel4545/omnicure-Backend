import express from "express";
import multer from "multer";
import path from "path";
import { 
    registerHospital, 
    getHospitals, 
    getHospitalById, 
    updateHospital, 
    loginHospital,
    deleteHospital ,getAllHospitals
} from "../Controllers/HospitalController.js";

const router = express.Router();

// ✅ Configure Multer for Image & Logo Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Save images in "uploads" directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename file with timestamp
    }
});

const upload = multer({ storage });

// ✅ Routes
router.post(
    "/register", 
    upload.fields([{ name: "hospitalImage", maxCount: 1 }, { name: "hospitalLogo", maxCount: 1 }]), 
    registerHospital
);
router.post("/login",loginHospital);
router.get("/hospitals", getHospitals);
router.get("/:id", getHospitalById);
router.get("/allhospi",getAllHospitals)
router.put(
    "/update/:id", 
    upload.fields([{ name: "hospitalImage", maxCount: 1 }, { name: "hospitalLogo", maxCount: 1 }]), 
    updateHospital
);
router.delete("/:id", deleteHospital);

export default router;
