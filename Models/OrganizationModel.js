import mongoose from "mongoose";

const OrganizationSchema = new mongoose.Schema({
    organizationName: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contactNumber: { type: String, required: true },
    emergencyContact: { type: String, required: true },
    bloodRequirement: { type: String, required: true },
    about: { type: String, required: true },
    organizationImage: { type: String, default: null },
    organizationLogo: { type: String, default: null }
}, { timestamps: true });

export default mongoose.model("Organization", OrganizationSchema);
