import React, { useState } from 'react';
import "./Auth.css";
import axios from 'axios';
import { useAuth } from '../../Context/authContext';

function Update({ onClose }) {
    const [{ user }, dispatch] = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        profileImage: '',
        userName: '',
        email: '',
        country: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            setFormData({ ...formData, profileImage: selectedImage });
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.patch('/auth/update', formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            dispatch({ type: "SET_USER", payload: { user: response.data } });
            onClose();
        } catch (error) {
            console.error('Error during update:', error);
        }
        setLoading(false);
    };

    return (
        <div className="update">
            <div className="form">
                <h2>Update</h2>
                <form onSubmit={handleUpdate}>
                    <input type="file" accept='image/*' name='profileImage' onChange={handleImageChange} placeholder='Profile Image' className="form-input" />
                    <input type="text" placeholder='User Name' name='userName' onChange={handleChange} className="form-input" required />
                    <input type="email" placeholder='Email' name='email' onChange={handleChange} className="form-input" required />
                    <input type="text" placeholder='Country' name='country' onChange={handleChange} className="form-input" required />
                    <input type="password" placeholder='Password' name='password' onChange={handleChange} className="form-input" />
                    <button type='submit' className="submit-button" disabled={loading}>{loading ? "Loading..." : "Update"}</button>
                </form>
            </div>
        </div>
    )
}

export default Update;