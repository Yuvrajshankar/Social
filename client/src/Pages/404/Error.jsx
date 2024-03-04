import React from 'react';
import "./Error.css";
import { Link } from "react-router-dom";

function Error() {
    return (
        <div className='error'>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Icon_S_blue.svg/512px-Icon_S_blue.svg.png" className='nav__image' alt="logo" />
            <h1 className='head'>You are misguided</h1>
            <p>Go back to
                <Link to="/">
                    <span> Home</span>
                </Link>
            </p>
        </div>
    )
}

export default Error;