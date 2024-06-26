// src/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import backg from './assets/download.png';


function Login() {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setUsername(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (username.toLowerCase() === 'guest') {
            navigate('/tic-tac-toe');
        } else {
            alert('Wrong username'); // Display popup for wrong username
        }
    };

    return (
        <div className="login-container">
            <h1>   LETS PLAY FIC FAC FOE!!! </h1>
            <img className= "image1"src ={backg} alt="another picture"></img>
            <form className="login-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={handleInputChange}
                    className="login-input"
                />
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
}

export default Login;
