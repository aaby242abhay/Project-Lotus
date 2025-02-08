import express from 'express';
import { signUp , signIn , logout , verifyOTP } from '../controllers/user.controller.js';
import isAuth from '../middlewares/isAuth.js';

const router = express.Router();

router.route('/signup').post(signUp);
router.route('/verify').post(verifyOTP);
router.route('/signin').post(signIn);
router.route('/logout').get(logout);


export default router;