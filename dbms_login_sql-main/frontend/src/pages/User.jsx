// frontend/src/User.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function User() {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get('http://localhost:5000/user', {
                    headers: { Authorization: localStorage.getItem('token') },
                });
                setUsername(res.data.username);
            } catch (err) {
                console.error('Error fetching user data', err);
                navigate('/');
            }
        };
        fetchUser();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <h2 style={{ fontWeight: 'bold', fontSize: '36px' }}>Welcome, {username}</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default User;
