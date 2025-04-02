import Inventory from "../Models/InventoryModel.js";

// 📌 Add Inventory
export const addInventory = async (req, res) => {
    try {
        const {
            name,
            user,
            moNo,
            email,
            address,
            bloodType,
            details,
            hospital,
            age,
            donationDate,
            userType
        } = req.body;

        const newInventory = new Inventory({
            name,
            user,
            moNo,
            email,
            address,
            bloodType,
            details,
            hospital,
            age,
            donationDate,
            userType
        });

        const savedInventory = await newInventory.save();
        res.status(201).json({ message: "Inventory added successfully!", savedInventory });
    } catch (error) {
        res.status(500).json({ message: "Error adding inventory", error });
    }
};

// 📌 Get All Inventory
export const getAllInventory = async (req, res) => {
    try {
        const inventory = await Inventory.find().sort({ createdAt: -1 });
        res.status(200).json(inventory);
    } catch (error) {
        res.status(500).json({ message: "Error fetching inventory", error });
    }
};

// 📌 Remove Inventory by ID
export const removeInventory = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedInventory = await Inventory.findByIdAndDelete(id);

        if (!deletedInventory) {
            return res.status(404).json({ message: "Inventory not found" });
        }

        res.status(200).json({ message: "Inventory removed successfully", deletedInventory });
    } catch (error) {
        res.status(500).json({ message: "Error removing inventory", error });
    }
};

// 📌 Update Approve Status by ID
export const updateApproveStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { approveStatus } = req.body;

        // Find and update the inventory item
        const updatedInventory = await Inventory.findByIdAndUpdate(
            id,
            { approveStatus },
            { new: true, runValidators: true }
        );

        if (!updatedInventory) {
            return res.status(404).json({ message: "Inventory not found" });
        }

        res.status(200).json({ message: "Approve Status updated successfully!", updatedInventory });
    } catch (error) {
        res.status(500).json({ message: "Error updating Approve Status", error });
    }
};

export const updateIsDonneteSatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { isdonneted } = req.body;

        // Find and update the inventory item
        const updatedInventory = await Inventory.findByIdAndUpdate(
            id,
            { isdonneted },
            { new: true, runValidators: true }
        );

        if (!updatedInventory) {
            return res.status(404).json({ message: "Inventory not found" });
        }

        res.status(200).json({ message: "IsDonnate status updated successfully!", updatedInventory });
    } catch (error) {
        res.status(500).json({ message: "Error updating IsDonnete Status", error });
    }
};
