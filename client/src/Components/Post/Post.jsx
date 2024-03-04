
import React, { useState, useEffect } from 'react';
import "./Post.css";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../Context/authContext';

function Post({ userId, image, username, country, summary, likes, post, postId, authUser }) {
    const navigate = useNavigate();
    const [{ user }, dispatch] = useAuth();
    const [isLiked, setIsLiked] = useState(false);

    const addRemoveFriend = async (friendId) => {
        try {
            const response = await axios.patch(`/user/${friendId}`, {}, { withCredentials: true });
            const friends = response.data;
            dispatch({ type: "SET_FRIENDS", payload: { friends } });
        } catch (error) {
            console.error('error add-remove friend:', error);
        }
    };

    const likePost = async () => {
        console.log(postId);
        try {
            await axios.patch(`post/posts/${postId}/like`, {}, { withCredentials: true });
            setIsLiked(!isLiked);
        } catch (error) {
            console.error('error like-dislike post:', error);
        }
    };

    const redirect = (userId) => {
        navigate(`/profile/${userId}`);
    };

    return (
        <div className="post">

            <div className="heading">
                <div className="user" onClick={() => redirect(userId)}>
                    <img src={image} alt="image" />
                    <div className="details">
                        <h3>{username}</h3>
                        <h6>{country}</h6>
                    </div>
                </div>
                {user && user.friends && Array.isArray(user.friends) && user.friends.some(friend => friend._id === userId) ? (
                    <PersonRemoveIcon className='add' onClick={() => addRemoveFriend(userId)} />
                ) : (
                    <PersonAddIcon className='add' onClick={() => addRemoveFriend(userId)} />
                )}

            </div>

            <p>{summary}</p>
            <img src={post} className='post123' alt="" />

            <div className="bottom">
                <p onClick={likePost}>
                    {isLiked ? <FavoriteIcon style={{ color: "red" }} /> : <FavoriteBorderIcon />}</p>
                <p><ChatBubbleOutlineIcon /></p>
                <p><ShareIcon /></p>
            </div>

        </div>
    )
}

export default Post;




{/* <p onClick={() => likePost(post._id)}>
                    {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    {likes}
                </p> */}