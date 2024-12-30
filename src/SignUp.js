import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // Import CSS file for styling

export default function SignupForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('https://backend-server-8690.onrender.com/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      alert('Signup successful! Please log in.');
      navigate('/login');
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="form">
        <h1 className="form-title">Signup</h1>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
          className="form-input" 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          className="form-input" 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          className="form-input" 
        />
        <button type="submit" className="form-button">Signup</button>
      </form>
    </div>
  );
}
