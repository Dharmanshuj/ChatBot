import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LoginSignup.css'

import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'

const LoginSignup = () => {

    const [action,setAction] = useState("Sign Up");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        document.title = "Login/Signup";
    }, []);
    const handleSignUp = () => {
        if (name && email && password) {
            const userData = { name, email, password };
            localStorage.setItem("user", JSON.stringify(userData));
            setMessage("Sign-up successful! Please switch to login.");
            setName("");
            setEmail("");
            setPassword("");
        }
        else {
            setMessage("Please fill out all fields for sign-up.");
        }
    };

    const handleLogin = () => {
        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (!storedUser) {
            setMessage("No user found. Please sign up first.");
            return;
        }

        if (storedUser.email !== email) {
            setMessage("Invalid email.");
            return;
        }

        if (storedUser.password !== password) {
            setMessage("Incorrect password.");
            return;
        }
        
        setMessage(`Welcome back, ${storedUser.name}!`);
    };

    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>{action}</div>
                <div className='underline'></div>
            </div>
            <div className='submit-container'>
                <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
                <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>
            </div>
            <div className='inputs'>
                {action==="Login"?<div></div>:<div className='input'>
                    <img src={user_icon} alt='' />
                    <input 
                        type='text' 
                        placeholder='Name' 
                        value={name}
                        onChange={(e) => setName(e.target.value)} 
                    />
                </div>}
                <div className='input'>
                    <img src={email_icon} alt='' />
                    <input 
                        type='email' 
                        placeholder='Email Id' 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <div className='input'>
                    <img src={password_icon} alt='' />
                    <input 
                        type='password' 
                        placeholder='Password' 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
            </div>
            {action==="Sign Up"?<div></div>:<div className="forget-password">Forget Password? <span>Click Here</span></div>}
            
            <div className='submit-action'>
                {action === "Sign Up" ? (
                    <button className='button' onClick={handleSignUp}>Sign Up</button>
                ) : (
                    <Link to='/HomePage'>
                        <button className='button' onClick={handleLogin}>Login</button>
                    </Link>
                )}
            </div>
            <div className="message">{message}</div> 
        </div>
    );
}

export default LoginSignup;