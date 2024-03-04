import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        profileImage: {
            type: String,
            required: true,
        },
        userName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        country: String,
        friends: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;