import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";    

export const signUp = async (req, res) => {
    try {
        const { title, fullName, code , mobileNumber, email, password, referralId, termsAccepted } = req.body;

        if (!termsAccepted) {
            return res.status(400).json({ message: 'You must accept the Terms & Conditions.' , success: false });   
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already registered', success: false });

        const hashedPassword = await bcrypt.hash(password, 10);
        const randomCode = crypto.randomBytes(6).toString('hex'); // Generates a 12-character alphanumeric code

        const newUser = new User({
            title,
            fullName,
            code,
            mobileNumber,
            email,
            password: hashedPassword,
            referralId,
            termsAccepted,
            randomCode
        });
        await newUser.save();

        res.status(201).json({ message: 'Signup successful', success: true });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};   

export const signIn = async (req, res) => {
    try {
        const { mobileNumber, password } = req.body;

        if (!mobileNumber || !password) return res.status(400).json({ message: 'All fields are required' , success: false });

        const user = await User.findOne({ mobileNumber });
        if (!user) return res.status(400).json({ message: 'User not found' , success: false });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' , success: false });

        // create token
        const tokendata = {
            userID: user._id,
            mobileNumber: user.mobileNumber,
        }

        const token = jwt.sign(tokendata, process.env.SECRET_KEY, { expiresIn: '1d' });
        return res.status(200).cookie("token", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({ message: "User logged in successfully", success: true });


    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({ message: "User logged out successfully", success: true });
    } catch (error) {
        console.log(error);

    }
};