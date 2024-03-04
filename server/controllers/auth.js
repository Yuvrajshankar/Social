import bcrypt from "bcrypt";
import User from "../models/User.js";
import cloudinary from "cloudinary";
import { generateToken } from "../middleware/generateToken.js";

// register
export const register = async (req, res, next) => {
    try {
        const { userName, email, password, country } = req.body;
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
            folder: "avatars",
        });

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(409).json("User already exists");
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const user = await User.create({
            profileImage: result.secure_url,
            userName,
            email,
            country,
            password: passwordHash,
        });

        res.status(201).json({ user });
    } catch (error) {
        next(error);
    }
};

// login
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ msg: "User does not exist." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(404).json({ msg: "Invalid password" });
        }
        generateToken(res, user._id);
        delete user.password;
        res.status(200).json({ user });
    } catch (error) {
        next(error);
    }
};


// update
export const update = async (req, res, next) => {
    try {
        const userId = req.user._id;

        const { userName, email, password, country } = req.body;

        // If a new profile image is provided, upload it to Cloudinary
        let profileImage = req.file ? await cloudinary.v2.uploader.upload(req.file.path, {
            folder: "avatars",
        }) : null;

        // Find user by ID
        const user = await User.findById(userId);

        // If user not found
        if (!user) {
            return res.status(404).json({ msg: "User not found." });
        }

        // Update user information
        user.userName = userName || user.userName;
        user.email = email || user.email;
        user.country = country || user.country;

        // If a new profile image is provided, update it
        if (profileImage) {
            user.profileImage = profileImage.secure_url;
        }

        // If a new password is provided, update the password
        if (password) {
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt);
            user.password = passwordHash;
        }

        // Save updated user
        await user.save();

        res.status(200).json({ msg: 'Profile updated successfully', user });
    } catch (error) {
        next(error);
    }
};


// logout
export const logout = async (req, res, next) => {
    try {
        res.cookie('social_token', '', {
            httpOnly: true,
            expires: new Date(0),
        });
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        next(error);
    }
};


// already Logged in
export const alreadyLoggedIn = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);

        if (user) {
            return res.json({
                _id: user._id,
                profileImage: user.profileImage,
                userName: user.userName,
                email: user.email,
            });
        }
    } catch (error) {
        next(error);
    }
};