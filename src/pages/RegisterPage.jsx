// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        fullName: '',
        membershipId: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const { username, email, password, fullName, membershipId } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setMessage('Registering...');
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const body = JSON.stringify(formData);
            
            // Send POST request to our backend API registration endpoint
            const res = await axios.post('http://localhost:5000/api/users/register', body, config);
            
            setMessage('Registration successful! Redirecting to login...');
            console.log(res.data);
            
            // Redirect to login page after a short delay
            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (err) {
            console.error(err.response.data);
            setMessage(err.response.data.msg || 'Registration failed. Please try again.');
        }
    };

    return (
        <div>
            <h2>Member Self-Registration</h2>
            <p>{message}</p>
            <form onSubmit={e => onSubmit(e)}>
                <input type="text" placeholder="Username" name="username" value={username} onChange={e => onChange(e)} required />
                <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} required />
                <input type="password" placeholder="Password (min 6 chars)" name="password" value={password} onChange={e => onChange(e)} required minLength="6" />
                <input type="text" placeholder="Full Name" name="fullName" value={fullName} onChange={e => onChange(e)} required />
                <input type="text" placeholder="Membership ID (e.g., FEGO02-003)" name="membershipId" value={membershipId} onChange={e => onChange(e)} required />
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <Link to="/login">Sign In</Link></p>
        </div>
    );
};

export default RegisterPage;
