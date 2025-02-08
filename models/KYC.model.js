import mongoose from 'mongoose';

const KYCSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    aadharNumber: {
        type: String,
        required: true
    },
    panNumber: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    nomineeName: {
        type: String,
        required: true
    },
    nomineeRelation: {
        type: String,
        required: true
    },

});

export const KYC = mongoose.model("KYC", KYCSchema);