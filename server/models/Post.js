import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            ref: "User",
        },
        userName: {
            type: String,
            required: true,
            ref: "User",
        },
        profileImage: {
            type: String,
            default: "",
            ref: "User",
        },
        country: {
            type: String,
            ref: "User",
        },
        description: String,
        image: {
            type: String,
            required: true,
        },
        likes: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;