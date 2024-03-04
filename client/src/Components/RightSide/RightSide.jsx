import React, { useEffect } from 'react';
import "./RightSide.css";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import axios from 'axios';
import { useAuth } from '../../Context/authContext';
import { useNavigate } from 'react-router-dom';

function RightSide() {
    const [{ user }, dispatch] = useAuth();
    const navigate = useNavigate();

    const fetchFriends = async () => {
        try {
            const response = await axios.get('/user/all');
            const friends = response.data;
            dispatch({ type: "SET_FRIENDS", payload: { friends } });
        } catch (error) {
            console.error('Error during fetching friends:', error);
        }
    };

    const addRemoveFriend = async (friendId) => {
        try {
            const response = await axios.patch(`/user/${friendId}`, {}, { withCredentials: true });
            const friends = response.data;
            dispatch({ type: "SET_FRIENDS", payload: { friends } });
        } catch (error) {
            console.error('error add-remove friend:', error);
        }
    };

    useEffect(() => {
        fetchFriends();
    }, []);

    useEffect(() => {
        if (user && user.friends) {
            fetchFriends();
        }
    }, [user]);

    const redirect = (userId) => {
        navigate(`/profile/${userId}`);
    };

    return (
        <div className="right__side">
            <div className="title">
                <h3>Friends</h3>
            </div>

            {user && user.friends && user.friends.length > 0 ? (
                user.friends.map(friend => (
                    <div className="details" key={friend._id}>
                        <img src={friend.profileImage} alt="ad" />
                        <div className="user">
                            <div className="user-details" onClick={() => redirect(friend._id)}>
                                <h6>{friend.userName}</h6>
                                <p>{friend.country}</p>
                            </div>
                            <PersonRemoveIcon className='remove' onClick={() => addRemoveFriend(friend._id)} />
                        </div>
                    </div>
                ))
            ) : (
                <p style={{ display: "flex", justifyContent: "center" }}>You have no friends.</p>
            )}

        </div>
    )
}

export default RightSide;