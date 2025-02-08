import express from 'express';
import{addKYC,addBankDetails} from '../controllers/KYC.controller.js';
import isAuth from '../middlewares/isAuth.js';

const router = express.Router();
router.route('/add').post(isAuth,addKYC);
//router.route('verify-kyc').get(isAuth,verifyKYC);
router.route('/bank-info').post(isAuth,addBankDetails);


export default router;