import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    Date: { type: Date, default: Date.now },
    Address:{type:String ,required:true},
    Username:{type:String,required:true}
});

export default mongoose.model("User", UserSchema);


const UserCard = new mongoose.Schema({
    Product: { type:Array, required: true },
    
    Date: { type: Date, default: Date.now }
})