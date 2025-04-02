import express from "express";
import { registerOrganization, getOrganizations, loginOrganization, upload } from "../Controllers/OrganizationController.js";

const router = express.Router();

// Route to register a new organization with file uploads
router.post("/register", upload.fields([
    { name: "organizationImage", maxCount: 1 },
    { name: "organizationLogo", maxCount: 1 }
]), registerOrganization);

// Route to get all organizations (GET method remains intact)
router.get("/list", getOrganizations);

// Route for organization login
router.post("/login", loginOrganization);

export default router;
