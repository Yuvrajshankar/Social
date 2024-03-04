import React from 'react';
import "./Profile.css";
import LeftSide from '../../Components/LeftSide/LeftSide';
import Main from '../../Components/Main/Main';
import MyProfile from '../../Components/Main/MyProfile';

function Profile() {
    return (
        <div className="profile123">
            <LeftSide />
            <MyProfile />
        </div>
    )
}

export default Profile;