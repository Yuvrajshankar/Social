import React, { useEffect, useState } from 'react';
import "./Auth.css";
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        profileImage: '',
        userName: '',
        email: '',
        country: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            setFormData({ ...formData, profileImage: selectedImage });
        }
    };

    const register = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post("/auth/register", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/login');
        } catch (error) {
            if (error.response && error.response.status === 409) {
                toast.error('user already exist.');
            } else {
                console.error('Registration failed:', error.message);
            }
        }
        setLoading(false);
    };



    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                await axios.get('/auth/already', { withCredentials: true });
                navigate("/");
            } catch (error) {
                console.log("Please Create Profile")
            }
        }

        checkLoggedIn();
    }, []);

    return (
        <>
            <ToastContainer />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Icon_S_blue.svg/512px-Icon_S_blue.svg.png" className='logo__image' alt="logo" />
            <div className="auth">
                <h2>Register</h2>
                <form onSubmit={register}>
                    <input type="file" accept='image/*' placeholder='Profile Image' className='form-input' name='profileImage' onChange={handleImageChange} required />
                    <input type="text" placeholder='User Name' className='form-input' name='userName' onChange={handleChange} required />
                    <input type="email" placeholder='Email' className='form-input' name='email' onChange={handleChange} required />
                    <input type="text" placeholder='Country' className='form-input' name='country' onChange={handleChange} required />
                    <input type="password" placeholder='*********' className='form-input' name='password' onChange={handleChange} required />
                    <button type="submit" className='submit-button' disabled={loading}>{loading ? "Loading..." : "Register"}</button>
                </form>
                <p className="transfer">Already have an account?
                    <Link to="/login" style={{ textDecoration: "none" }}>
                        <span className="login-link"> Login</span>
                    </Link>
                </p>
            </div>
        </>
    )
}

export default Register;