import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url"; // ✅ Required for __dirname in ES Module
import DatabaseConnection from "./Database/Db.js";
import UserRouter from "./Routers/UserRouter.js";
import ProductRouter from "./Routers/ProductRouter.js";
import HospitalRouter from "./Routers/HospitalRoutes.js"; 
import OrganizationRouter from "./Routers/OrganizationRouter.js";
import InventoryRouter from "./Routers/InventoryRouter.js"; // ✅ Import Inventory Router

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6788;

// ✅ Get Correct __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Logger Middleware (Optional)
app.use((req, res, next) => {
    console.log(`📌 ${req.method} ${req.url}`);
    next();
});

// ✅ Serve Uploaded Files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Connect to Database
DatabaseConnection()
    .then(() => {
        console.log("✅ Database Connected Successfully!");

        // ✅ Routes
        app.get("/", (req, res) => {
            res.send("🚀 API is Working Successfully!");
        });

        // app.use("/user", UserRouter);
        app.use("/donner", ProductRouter);
        app.use("/hospital", HospitalRouter); 
        app.use("/org", OrganizationRouter);
        app.use("/inventory", InventoryRouter); // ✅ Add Inventory Routes

        // ✅ Start Server
        app.listen(PORT, () => {
            console.log(`🚀 Server is Running on: http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("❌ Database Connection Failed:", error);
        process.exit(1);
    });
