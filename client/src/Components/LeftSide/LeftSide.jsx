import React, { useEffect, useState } from 'react';
import "./LeftSide.css";
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import Update from '../../Pages/Auth/Update';
import { useAuth } from '../../Context/authContext';

function LeftSide() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [{ user: authUser, posts }, dispatch] = useAuth();

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const fetchUserPosts = async () => {
        try {
            const response = await axios.get('/post/posts', { withCredentials: true });
            dispatch({ type: "SET_POSTS", payload: { posts: response.data } });
            // console.log(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        fetchUserPosts();
    }, []);

    return (
        <div className="left__side">

            <EditIcon className='edit' onClick={openPopup} />
            {isPopupOpen && <Update onClose={closePopup} />}

            {authUser ? (
                <div className="up">

                    <img src={authUser.user.profileImage} alt="profile-img" />
                    <h4>{authUser.user.userName}</h4>
                    <p>{authUser.user.friends.length} friends</p>

                </div>
            ) : (
                <p>Loading profile data...</p>
            )}

            <div className="users-posts-wrapper">

                <div className="users-posts">
                    {posts && posts.length > 0 ? (
                        posts.slice(0).reverse().map((postItem) => (
                            <img key={postItem._id} src={postItem.image} alt='img' />
                        ))
                    ) : (
                        <p style={{ margin: "30px", color: "grey" }}>No posts created.</p>
                    )}
                </div>

            </div>

        </div>
    )
}

export default LeftSide;
