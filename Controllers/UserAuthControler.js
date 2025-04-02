import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken'; // ✅ Import JWT
import User from '../Models/UserModule.js';

const SECRET_KEY = "your_secret_key"; // 🔹 Use environment variables in production

// ✅ User Registration
export const UserRegister = async (req, res) => {
    const { email, mobileNumber,Address,Username } = req.body;

    try {
        // ✅ Check if user already exists
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User Already Exists..!" });
        }

        // ✅ Hash the mobileNumber before storing
        const salt = await bcrypt.genSalt(10);
        const hashedmobileNumber = await bcrypt.hash(mobileNumber, salt);

        // ✅ Save new user with hashed mobileNumber
        const newUser = new User({Username,Address, email, mobileNumber: hashedmobileNumber });
        await newUser.save();

        return res.status(200).json({ message: "User Registered Successfully!" });

    } catch (error) {
        return res.status(500).json({ message: "Server Error, Registration Failed!" });
    }
};

// ✅ User Login
export const UserLogin = async (req, res) => {
    const { email, mobileNumber } = req.body;

    try {
        // ✅ Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User Not Exist..!" });
        }

        // ✅ Compare mobileNumber with hashed mobileNumber
        const isMatch = await bcrypt.compare(mobileNumber, user.mobileNumber);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials..!" });
        }

        // ✅ Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            SECRET_KEY,
            { expiresIn: "1h" } // 🔹 Token expires in 1 hour
        );

        return res.status(200).json({ message: "Login Successful!", token , student:user });

    } catch (error) {
        return res.status(500).json({ message: "Server ERROR LOGIN FAILED..! " });
    }
};

export const UserProfile = async (req, res) => {
    const { id } = req.params; // ✅ Extract user ID

    try {
        const user = await User.findById(id); // ✅ Correct findById usage

        if (!user) {
            return res.status(404).json({ message: "User Not Found!" });
        }

        return res.status(200).json({ message: "User Profile", user }); // ✅ Correct JSON response
    } catch (error) {
        return res.status(500).json({ message: "Server Error, User NOT Found!" });
    }
};
