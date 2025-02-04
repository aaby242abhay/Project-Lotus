import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.route.js';

dotenv.config();
const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
    origin: "*",
    credentials: true,
};
app.use(cors(corsOptions));


const PORT = process.env.PORT || 5000;

// API routes
app.use('/api/user', userRoutes);

app.listen(5000, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
}   );
