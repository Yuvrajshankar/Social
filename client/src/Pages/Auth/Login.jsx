import React, { useEffect, useState } from 'react';
import "./Auth.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });


  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/auth/login", formData, { withCredentials: true });
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error('Check Credentials');
      } else {
        console.error('Login failed:', error.message);
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
        <h2>Login</h2>
        <form onSubmit={login}>
          <input type="email" placeholder='Email' className='form-input' name='email' onChange={handleChange} required />
          <input type="password" placeholder='*********' className='form-input' name='password' onChange={handleChange} required />

          <button type="submit" className='submit-button' disabled={loading}>{loading ? "Loading..." : "Login"}</button>
        </form>
        <p className="transfer">Don't have an account?
          <Link to="/register" style={{ textDecoration: "none" }}>
            <span className="login-link"> Register</span>
          </Link>
        </p>
      </div>
    </>
  )
}

export default Login