import mongoose from "mongoose";
import { string } from "zod";

const userSchema = new mongoose.Schema({
    title:{
        type: String,
        enum : ['Mr','Mrs','Miss'], 
        default: 'Mr',
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    countryCode:{
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    clientId: {
        type: String,
    },
    accountVerified: {
        type: Boolean,
        default: false
    },
    verificationCode: {
        type: Number,
    },
    verificationCodeExpires: {
        type: Date,
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },  
    termsAccepted: {
        type: Boolean,
        required: true
    } 
});

export const User = mongoose.model("User", userSchema);