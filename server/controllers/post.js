import Post from "../models/Post.js";
import User from "../models/User.js";
import cloudinary from "cloudinary";

// create post
export const createPost = async (req, res, next) => {
    try {
        const { description } = req.body;
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
            folder: "posts",
        });

        const userId = req.user._id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const newPost = new Post({
            userId: user._id,
            userName: user.userName,
            profileImage: user.profileImage,
            country: user.country,
            image: result.secure_url,
            description,
            likes: [],
        });

        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        next(error);
    }
};

// get all post
export const allPosts = async (req, res, next) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);
    } catch (error) {
        next(error);
    }
};

// get one user post
export const userPosts = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const post = await Post.find({ userId });
        res.status(200).json(post);
    } catch (error) {
        next(error);
    }
};

// get own post
export const ownPosts = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const post = await Post.find({ userId });
        res.status(200).json(post);
    } catch (error) {
        next(error);
    }
};

// like or dislike post
export const likePost = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const userId = req.user._id;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if the user has already liked the post
        const isLiked = post.likes.map(id => id.toString()).includes(userId.toString());

        if (isLiked) {
            // If already liked, dislike the post
            post.likes = post.likes.filter(id => id.toString() !== userId.toString());
        } else {
            // If not liked, like the post
            post.likes.push(userId);
        }

        await post.save();

        res.status(200).json(post);
    } catch (error) {
        next(error);
    }
};
