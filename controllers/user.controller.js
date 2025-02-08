import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";    
import { SendVerificationEmail } from "../middlewares/email.js";



export const signUp = async (req, res) => {
    try {
        const { title, fullName, countryCode , mobileNumber, email, password , termsAccepted } = req.body;

        if (!title || !fullName || !countryCode || !mobileNumber || !email || !password || !termsAccepted) {
            return res.status(400).json({ message: 'All fields are required' , success: false });
        }

        // const validData = signUpSchema.safeParse(req.body);
        // if (!validData.success) {
        //     return res.status(400).json({ message: 'Invalid input', success: false , errors: validUser.error.errors });
        // }

        if (!termsAccepted) {
            return res.status(400).json({ message: 'You must accept the Terms & Conditions.' , success: false });   
        }

        
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already registered', success: false });

        const hashedPassword = await bcrypt.hash(password, 10);
        const clientId = crypto.randomBytes(6).toString('hex'); // Generates a 12-character alphanumeric code
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();


        const newUser = new User({
            title,
            fullName,
            countryCode,
            mobileNumber,
            email,
            password: hashedPassword,
            clientId,
            termsAccepted,
            verificationCode,
        });
        await newUser.save();

        // Send verification email
        SendVerificationEmail(email, verificationCode);
        res.status(201).json({ message: 'Signup successful', success: true , newUser });
    } catch (error) {
       console.log(error);
       
    }
};   

export const verifyOTP = async (req, res) => {
    try {
        const { email, verificationCode } = req.body;
        if (!email || !verificationCode) return res.status(400).json({ message: 'All fields are required' , success: false });        


        const userAllEntries= await User.find({ email , accountVerified: false }).sort({ createdAt: -1 });
        if (!userAllEntries) return res.status(400).json({ message: 'User not found' , success: false });

       console.log({userAllEntries});
        let user;
        if(userAllEntries.length>1){
            user = userAllEntries[0];

            
            await User.deleteMany({
                _id: { $ne: user._id },
                $or: [{email , accountVerified: false}]
            })
        }
        else{
            user = userAllEntries[0];
        }
        
        console.log(user);
        

        if (user.verificationCode !== Number(verificationCode)) return res.status(400).json({ message: 'Invalid verification code' , success: false });

        const currentTime = Date.now();
        const verificationCodeExpires = new Date(user.verificationCodeExpires).getTime();

        if (currentTime > verificationCodeExpires) return res.status(400).json({ message: 'Verification code expired' , success: false });
        
        user.accountVerified = true;
        user.verificationCode = null;
        user.verificationCodeExpires = null;
        await user.save({validateModifiedOnly: true});

        return res.status(200).json({ message: 'Account verified successfully', success: true });


    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};

export const signIn = async (req, res) => {
    try {
        const { mobileNumber, password } = req.body;

        if (!mobileNumber || !password) return res.status(400).json({ message: 'All fields are required' , success: false });

        const user = await User.findOne({ mobileNumber });
        console.log({user});
        if (!user) return res.status(400).json({ message: 'User not found' , success: false });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch || !user.accountVerified) return res.status(400).json({ message: 'Invalid credentials' , success: false });

        // create token
        const tokendata = {
            userID: user._id,
            mobileNumber: user.mobileNumber,
        }

        const token = jwt.sign(tokendata, process.env.SECRET_KEY, { expiresIn: '1d' });
        return res.status(200).cookie("token", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({ message: "User logged in successfully", success: true });


    } catch (error) {
        res.status(500).json({ message: 'Login failed', error });
    }
};


export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({ message: "User logged out successfully", success: true });
    } catch (error) {
        console.log(error);

    }
};


