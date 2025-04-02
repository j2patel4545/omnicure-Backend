import mongoose from "mongoose";

const InventorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        moNo: { type: String, required: true },
        email: { type: String, required: true },
        address: { type: String, required: true },
        bloodType: { type: String, required: true },
        approveStatus: { type: Boolean, required: true, default: false },
        isdonneted: { type: Boolean, required: true, default: false },

        user: { type: String, required: true },
        details: { type: String },
        hospital: { 
            type: String, 
            required: function() { return this.userType === "donate"; } 
        },
        age: { 
            type: Number, 
            required: function() { return this.userType === "donate"; } 
        },
        donationDate: { 
            type: Date, 
            required: function() { return this.userType === "donate"; } 
        },
        userType: { type: String, enum: ["require", "donate"], required: true },
        updatedDate: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

// Middleware to update `updatedDate` before saving
InventorySchema.pre("save", function (next) {
    this.updatedDate = new Date();
    next();
});

export default mongoose.model("Inventory", InventorySchema);
