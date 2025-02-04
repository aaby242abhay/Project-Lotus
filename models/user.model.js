import mongoose from "mongoose";

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
    code:{
        type: Number,
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    referralcode:{
        type: String,
        },
    termsAccepted: { 
        type: Boolean, 
        //required: true 
    },
    randomCode: {
        type: String,
    },

   
});

export const User = mongoose.model("User", userSchema);