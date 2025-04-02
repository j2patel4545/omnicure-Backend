// import {UserRegister} from '../Controlers/UserAuthControler.js'
// import express from 'express'

// const router = express.Router()

// router.post("/Reg",UserRegister);

// export default router

import { UserRegister,UserLogin,UserProfile } from '../Controllers/UserAuthControler.js'; // Fixed typo
import {DeleteUser,UpdateUser} from '../Controllers/UserControler.js'
import express from 'express';

const router = express.Router();

// User Registration Route
router.post("/register", UserRegister); // Changed "/Reg" to "/register"
router.post("/login", UserLogin); // Changed "/Reg" to "/register"
router.get("/profile/:id", UserProfile); // ✅ Corrected URL
router.delete("/dlt/:id", DeleteUser); // ✅ Corrected URL
router.put("/update/:id", UpdateUser); // ✅ Corrected URL




export default router;
