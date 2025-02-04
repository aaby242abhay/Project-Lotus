import jwt from 'jsonwebtoken';


 const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ message: 'Unauthorized', success: false });

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        if (!decoded) return res.status(401).json({ message: 'Unauthorized', success: false });
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized', success: false });
    }
}

export default isAuth;