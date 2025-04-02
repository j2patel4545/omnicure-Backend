import express from "express";
import { addInventory, getAllInventory, removeInventory, updateApproveStatus ,updateIsDonneteSatus} from "../Controllers/InventoryController.js";

const router = express.Router();

// Routes
router.post("/add", addInventory);             // Add Inventory
router.get("/get", getAllInventory);           // Get All Inventory
router.delete("/delete/:id", removeInventory); // Delete Inventory by ID
router.put("/approve/:id", updateApproveStatus); // ✅ Correct method
router.put("/isdonnete/:id", updateIsDonneteSatus); // ✅ Correct method


export default router;
