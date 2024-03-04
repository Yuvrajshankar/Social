import React, { useEffect } from 'react';
import "./Navbar.css";
import { Search } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../Context/authContext';

function Navbar() {
    const navigate = useNavigate();
    const [{ user }, dispatch] = useAuth();

    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                await axios.get('/auth/already', { withCredentials: true });
            } catch (error) {
                navigate("/login");
            }
        }


        const fetchUser = async () => {
            try {
                const response = await axios.get('/user', { withCredentials: true });
                dispatch({ type: "SET_USER", payload: { user: response.data } });
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        checkLoggedIn();
        fetchUser();
    }, []);

    const logout = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/auth/logout", { withCredentials: true });
            dispatch({ type: "SET_LOGOUT" });
            navigate("/login");
        } catch (error) {
            console.error('error in LogOut:', error.message);
        }
    };

    return (
        <nav>
            <Link to="/" >
                <div className="brand">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Icon_S_blue.svg/512px-Icon_S_blue.svg.png" className='nav__image' alt="logo" />
                </div>
            </Link>

            <div className="search-bar">
                <div className="search-container">
                    <input type="text" placeholder='Search...' className="search__input" />
                    <Search className='search' />
                </div>
            </div>

            <div className="profile">
                <h3 className="logout" onClick={logout}>Logout</h3>
                <Link to="/profile" style={{ textDecoration: "none" }}>
                    {user && <img src={user.user.profileImage} alt="profile" className='profile__logo' />}
                </Link>
            </div>

        </nav>
    )
}

export default Navbar;