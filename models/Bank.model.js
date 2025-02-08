import mongoose from 'mongoose';

const bankSchema = new mongoose.Schema({
    bankName: {
        type: String,
        required: true
    },
    accountNumber: {
        type: String,
        required: true
    },
   
    ifscCode: {
        type: String,
        required: true
    },
    branchName: {
        type: String,
        required: true
    },
    accountType: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Bank = mongoose.model("Bank", bankSchema);