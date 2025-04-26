import { asyncHandler } from "../utils/index.js";
import User from "../models/user.model.js"; // Import the User model
import bcrypt from "bcrypt"; // For password hashing
import jwt from "jsonwebtoken"; // For generating tokens

// Register User
export const registerUser = asyncHandler(async (req, res, next) => {
    const { name, email, password, age, gender, role} = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        age,
        gender,
        role,
    });

    if(!user) return res(400).json({message: "Error while creating user..."})

    res.status(201).json({ message: "User registered successfully", user });
});

// Login User
export const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // Find the user
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate a token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30d' });

    user.accessToken = token;
    await user.save()
    res.status(200).json({ message: "Login successful", token });
});

// Logout User
export const logoutUser = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    await User.findOneAndUpdate({id: userId}, {
        accessToken: null
    })
    res.status(200).json({ message: "Logout successful" });
});


export const changePassword = asyncHandler(async (req, res, next) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const userId = req.user._id; // Assuming you have middleware to set req.user

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Check if the old password is correct
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Old password is incorrect" });
    }

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: "New password and confirm password do not match" });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
});


