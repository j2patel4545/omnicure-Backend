import Organization from "../Models/OrganizationModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage });

// Register a new organization
const registerOrganization = async (req, res) => {
    try {
        const {
            organizationName, address, email, password,
            contactNumber, emergencyContact, bloodRequirement, about
        } = req.body;

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const organizationImage = req.files["organizationImage"] ? req.files["organizationImage"][0].path : null;
        const organizationLogo = req.files["organizationLogo"] ? req.files["organizationLogo"][0].path : null;

        const newOrganization = new Organization({
            organizationName, address, email,
            password: hashedPassword, // Store hashed password
            contactNumber, emergencyContact, bloodRequirement, about,
            organizationImage, organizationLogo
        });

        await newOrganization.save();
        res.status(201).json({ message: "Organization registered successfully!", organization: newOrganization });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};

// Login organization
const loginOrganization = async (req, res) => {
    try {
        const { email, password } = req.body;

        const organization = await Organization.findOne({ email });
        if (!organization) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Compare password with hashed password in DB
        const isPasswordValid = await bcrypt.compare(password, organization.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: organization._id, email: organization.email }, "your_jwt_secret", { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful!", token });
    } catch (error) {
        res.status(500).json({ error: "Login failed", details: error.message });
    }
};

// Get all organizations
const getOrganizations = async (req, res) => {
    try {
        const organizations = await Organization.find();
        res.status(200).json({ organizations });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch organizations" });
    }
};

export { registerOrganization, loginOrganization, getOrganizations, upload };
