import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f3f4f6',
    // padding:"10px"
  },
  formContainer: {
    padding: '70px',
    textAlign: 'left',
    backgroundColor: 'white',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    borderRadius: '8px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '16px',
  },
  inputContainer: {
    marginTop: '5px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    padding: '8px 16px',
    border: '2px solid #d1d5db',
    borderRadius: '4px',
    outline: 'none',
    margin: "10px"
  },
  button: {
    padding: '10px 24px',
    marginTop: '24px',
    width: '100%',
    color: 'white',
    backgroundColor: '#2563eb',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
  },
  message: {
    marginTop: '16px',
    textAlign: 'center',
    color: '#d32f2f',
  },
};

export default function Login({ apiUrl = 'http://localhost:5000/login' }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await axios.post(
        apiUrl,
        { username, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      localStorage.setItem('token', res.data.token);
      navigate('/user');
    } catch (error) {
      console.log("Login Error:", error);
      setMessage('Error logging in');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h3 style={styles.title}>Login to Your Account</h3>
        <form onSubmit={handleLogin}>
          <div style={styles.inputContainer}>
            <label style={styles.label} htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="Username"
              style={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div style={styles.inputContainer}>
            <label style={styles.label} htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" style={styles.button}>Login</button>
        </form>
        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
}
