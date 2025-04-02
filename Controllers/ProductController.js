import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Donor from "../Models/ProductModule.js"

dotenv.config();

// ✅ Register Donor
export const registerDonor = async (req, res) => {
    try {
        const { donnerName, donnerDOB,donnerMobileNo, donnerEmail, donnerBloodGroup, donnerAddress, donnerPassword } = req.body;
        
        if (!req.file) return res.status(400).json({ error: "Image is required" });

        // Check if user already exists
        const existingUser = await Donor.findOne({ donnerEmail });
        if (existingUser) return res.status(400).json({ error: "Email already in use!" });

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(donnerPassword, salt);

        // Create new donor
        const newDonor = new Donor({
            donnerName,
            donnerDOB,
            donnerMobileNo,
            donnerEmail,
            donnerBloodGroup,
            donnerAddress,
            donnerPassword: hashedPassword,
            image: `/uploads/${req.file.filename}`
        });

        await newDonor.save();
        res.status(201).json({ message: "Donor registered successfully!", donor: newDonor });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Login Donor
export const loginDonor = async (req, res) => {
    const { donnerEmail, donnerPassword } = req.body;

    try {
        const user = await Donor.findOne({ donnerEmail });
        if (!user) return res.status(400).json({ error: "User does not exist!" });

        // Check password
        const isMatch = await bcrypt.compare(donnerPassword, user.donnerPassword);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials!" });

        // Generate JWT Token
        const token = jwt.sign(
            { id: user._id, donnerEmail: user.donnerEmail },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({ message: "Login successful!", token, user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Get All Donors
export const getAllDonors = async (req, res) => {
    try {
        const donors = await Donor.find();
        res.json(donors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Get Single Donor by ID
export const getDonorById = async (req, res) => {
    try {
        const donor = await Donor.findById(req.params.id);
        if (!donor) return res.status(404).json({ error: "Donor not found" });

        res.json(donor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Update Donor by ID
export const updateDonor = async (req, res) => {
    try {
        const { donnerName, donnerMobileNo, donnerEmail, donnerBloodGroup, donnerAddress } = req.body;
        const updateFields = { donnerName, donnerMobileNo, donnerEmail, donnerBloodGroup, donnerAddress };

        if (req.file) {
            updateFields.image = `/uploads/${req.file.filename}`;
        }

        const updatedDonor = await Donor.findByIdAndUpdate(req.params.id, updateFields, { new: true });

        if (!updatedDonor) return res.status(404).json({ error: "Donor not found" });

        res.json({ message: "Donor updated successfully!", donor: updatedDonor });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Delete Donor by ID
export const deleteDonor = async (req, res) => {
    try {
        const donor = await Donor.findByIdAndDelete(req.params.id);
        if (!donor) return res.status(404).json({ error: "Donor not found" });

        res.json({ message: "Donor deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
