import {KYC} from '../models/KYC.model.js';
import {Bank} from '../models/bank.model.js';


export const addKYC = async (req, res) => {
    try {
        const { aadharNumber, panNumber, dob, address, nomineeName, nomineeRelation } = req.body;
        if (!aadharNumber || !panNumber || !dob || !address || !nomineeName || !nomineeRelation) {
            return res.status(400).json({ message: 'All fields are required' , success: false });
        }
        const userId = req.user.userID;
        console.log(req.user);
        console.log(userId);
        

        const newKYC = new KYC({
            userId,
            aadharNumber,
            panNumber,
            dob,
            address,
            nomineeName,
            nomineeRelation
        });
        await newKYC.save();
        res.status(201).json({ message: 'KYC added successfully', success: true , newKYC });
    } catch (error) {
        console.log(error);
        
    }
}

export const addBankDetails = async (req, res) => {
    try {
        const { bankName, accountNumber, ifscCode, branchName, accountType } = req.body;
        if (!bankName || !accountNumber  || !ifscCode || !branchName || !accountType) {
            return res.status(400).json({ message: 'All fields are required' , success: false });
        }
        const newBank = new Bank({
            bankName,
            accountNumber,
            ifscCode,
            branchName,
            accountType
        });
        await newBank.save();
        res.status(201).json({ message: 'Bank details added successfully', success: true , newBank });
    } catch (error) {
        console.log(error);
        
    }
};