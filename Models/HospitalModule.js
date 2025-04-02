import mongoose from "mongoose";

const HospitalSchema = new mongoose.Schema({
    hospitalName: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
    contactNumber: { type: String, required: true },
    emergencyContact: { type: String },
    bloodRequirement: { type: String }, // Optional field for needed blood types

    hospitalImage: { type: String, required: true }, // Image of the hospital
    hospitalLogo: { type: String, required: true }, // Logo of the hospital
    about: { type: String, required: true }, // Description of the hospital

    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Hospital", HospitalSchema);
