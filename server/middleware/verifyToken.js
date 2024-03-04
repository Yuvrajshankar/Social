import jwt from "jsonwebtoken";
import User from "../models/User.js";


export const verifyToken = async (req, res, next) => {
    const token = req.cookies.social_token;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_TOKEN);

            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (err) {
            console.error(err.message);
            res.status(401).json({ error: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ error: 'Not authorized, no token' })
    }
}