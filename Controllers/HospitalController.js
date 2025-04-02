import Hospital from "../Models/HospitalModule.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ✅ Register New Hospital
export const registerHospital = async (req, res) => {
    try {
        const { hospitalName, address, email, password, contactNumber, emergencyContact, bloodRequirement, about } = req.body;

        if (!req.files || !req.files.hospitalImage || !req.files.hospitalLogo) {
            return res.status(400).json({ error: "Hospital image and logo are required" });
        }

        // Hash Password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newHospital = new Hospital({
            hospitalName,
            address,
            email,
            password: hashedPassword,
            contactNumber,
            emergencyContact,
            bloodRequirement,
            about,
            hospitalImage: `/uploads/${req.files.hospitalImage[0].filename}`,
            hospitalLogo: `/uploads/${req.files.hospitalLogo[0].filename}`
        });

        await newHospital.save();
        res.json({ message: "Hospital registered successfully!", hospital: newHospital });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Hospital Login
export const loginHospital = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the hospital exists
        const hospital = await Hospital.findOne({ email });
        if (!hospital) {
            return res.status(404).json({ error: "Hospital not found" });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, hospital.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: hospital._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.json({ message: "Login successful!", token, hospital });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Get All Hospitals
export const getHospitals = async (req, res) => {
    try {
        const hospitals = await Hospital.find();
        res.json(hospitals);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Get Single Hospital by ID
export const getHospitalById = async (req, res) => {
    try {
        const hospital = await Hospital.findById(req.params.id);
        if (!hospital) return res.status(404).json({ error: "Hospital not found" });
        res.json(hospital);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Update Hospital by ID
export const updateHospital = async (req, res) => {
    try {
        const { hospitalName, address, email, contactNumber, emergencyContact, bloodRequirement, about } = req.body;

        let updateFields = { hospitalName, address, email, contactNumber, emergencyContact, bloodRequirement, about };

        if (req.files?.hospitalImage) {
            updateFields.hospitalImage = `/uploads/${req.files.hospitalImage[0].filename}`;
        }
        if (req.files?.hospitalLogo) {
            updateFields.hospitalLogo = `/uploads/${req.files.hospitalLogo[0].filename}`;
        }

        const updatedHospital = await Hospital.findByIdAndUpdate(req.params.id, updateFields, { new: true });
        if (!updatedHospital) return res.status(404).json({ error: "Hospital not found" });

        res.json({ message: "Hospital updated successfully!", hospital: updatedHospital });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Delete Hospital by ID
export const deleteHospital = async (req, res) => {
    try {
        const hospital = await Hospital.findByIdAndDelete(req.params.id);
        if (!hospital) return res.status(404).json({ error: "Hospital not found" });
        res.json({ message: "Hospital deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllHospitals = async (req, res) => {
    try {
        const hospitals = await Hospital.find(); // Fetch all hospitals from the database
        
        if (!hospitals || hospitals.length === 0) {
            return res.status(404).json({ message: "No hospitals found." });
        }

        res.status(200).json({ message: "Hospitals fetched successfully", hospitals });
    } catch (error) {
        console.error("Error fetching hospitals:", error);
        res.status(500).json({ message: "Server error", error });
    }
};
