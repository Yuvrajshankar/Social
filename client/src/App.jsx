import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import Error from './Pages/404/Error';
import Navbar from './Components/Navbar/Navbar';
import OtherProfile from './Pages/Profile/OtherProfile';
import Update from './Pages/Auth/Update';
import { useAuth } from './Context/authContext';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={
          <>
            <Navbar />
            <Home />
          </>
        } />
        <Route path='/profile' element={
          <>
            <Navbar />
            <Profile />
          </>
        } />
        <Route path='/profile/:id' element={
          <>
            <Navbar />
            <OtherProfile />
          </>
        } />

        <Route path='/update' element={
          <>
            <Navbar />
            <Update />
          </>
        } />
        <Route path='/*' element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;