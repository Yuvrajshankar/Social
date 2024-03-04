import { ObjectId } from "mongodb";
import User from "../models/User.js";

// get user profile
export const getProfile = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: "User not found." });
        }
        res.status(200).json({ user });
    } catch (error) {
        next(error);
    }
};

// get other user's profile
export const getOtherProfile = async (req, res, next) => {
    try {
        const UserId = req.params.userId;
        const user = await User.findById(UserId);
        if (!user) {
            return res.status(404).json({ msg: "User not found." });
        }
        res.status(200).json({ user });
    } catch (error) {
        next(error);
    }
};


// get all friends
export const getAllFriends = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: "User not found." });
        }

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({ _id, userName, country, profileImage }) => {
                return { _id, userName, country, profileImage };
            }
        );
        res.status(200).json(formattedFriends);
    } catch (error) {
        next(error);
    }
};

// add-remove friend
export const addRemoveFriend = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const friendId = req.params.friendId;

        const user = await User.findById(userId);
        const friend = await User.findById(friendId);

        // Check if user is trying to add/remove themselves as a friend
        if (userId.toString() === friendId) {
            return res.status(444).json({ message: "Cannot add/remove yourself as a friend." });
        }

        // Check if the friend is already in the user's friend list
        const isFriend = user.friends.includes(friendId);

        if (isFriend) {
            // If the friend is already in the list, remove them
            user.friends = user.friends.filter(id => id.toString() !== friendId);
            friend.friends = friend.friends.filter(id => id.toString() !== userId);
        } else {
            // If the friend is not in the list, add them
            user.friends.push(friendId);
            friend.friends.push(userId);
        }

        await user.save();
        await friend.save();

        // Retrieve updated friends list for the current user
        const updatedUser = await User.findById(userId)
            .populate('friends', '_id userName profileImage');

        // Retrieve updated friends list for the friend
        const updatedFriend = await User.findById(friendId)
            .populate('friends', '_id userName profileImage');

        res.status(200).json({
            userFriends: updatedUser.friends,
            // friendFriends: updatedFriend.friends
        });
    } catch (error) {
        next(error);
    }
};