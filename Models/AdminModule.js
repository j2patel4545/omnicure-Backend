import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    email: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    Date: { type: Date, default: Date.now },
    Address:{type:String ,required:true},
    Username:{type:String,required:true}
});

export default mongoose.model("Admin", AdminSchema);


const Admincard = new mongoose.Schema({
    Product: { type:Array, required: true },
    
    Date: { type: Date, default: Date.now }
})