// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const [formData, setFormData] = useState({ fullName: '', email: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // Fetch current profile data when the page loads
    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('fegoToken');
            try {
                const config = { headers: { 'x-auth-token': token } };
                const res = await axios.get('http://localhost:5000/api/users/profile', config);
                // Set the initial form data with current user info
                setFormData({ fullName: res.data.fullName, email: res.data.email });
            } catch (err) {
                console.error("Could not fetch profile data:", err);
            }
        };
        fetchProfile();
    }, []);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setMessage('Saving profile...');
        const token = localStorage.getItem('fegoToken');

        try {
            const config = { headers: { 'x-auth-token': token } };
            const res = await axios.put('http://localhost:5000/api/users/profile/update', formData, config);
            
            setMessage(res.data.msg);
            // Optional: Update global state or re-fetch dashboard data here

        } catch (err) {
            console.error(err.response.data);
            setMessage(err.response.data.msg || 'Update failed.');
        }
    };

    return (
        <div style={{ maxWidth: 500, margin: '30px auto' }}>
            <h2>Manage Your Profile</h2>
            {message && <p>{message}</p>}
            <form onSubmit={onSubmit}>
                <div style={{ marginBottom: 12 }}>
                    <label>Full Name:</label><br />
                    <input 
                        type="text" 
                        name="fullName" 
                        value={formData.fullName} 
                        onChange={onChange} 
                        required 
                        style={{ width: '100%', padding: 8 }}
                    />
                </div>
                <div style={{ marginBottom: 12 }}>
                    <label>Email Address:</label><br />
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={onChange} 
                        required 
                        style={{ width: '100%', padding: 8 }}
                    />
                </div>
                <button type="submit" style={{ padding: '8px 16px' }}>Save Changes</button>
                <button 
                    type="button" 
                    onClick={() => navigate('/dashboard')} 
                    style={{ marginLeft: 10, padding: '8px 16px' }}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default ProfilePage;