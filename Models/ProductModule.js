import mongoose from "mongoose";
import { type } from "os";

const ProductSchema = new mongoose.Schema({
    donnerName: { type: String, required: true },
    donnerMobileNo: { type: String, required: true },
    donnerDOB: { type: String, required: true },
    donnerEmail: { type: String, required: true },
    donnerBloodGroup: { type: String, required: true },
    donnerAddress: { type: String, required: true },
    donnerPassword :{type:String ,required:true},
    
    image: { type: String, required: true }, // Stores image file path
    donationHistory: { type: Number, default: 0 }, // Tracks donation history
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Donor", ProductSchema);
