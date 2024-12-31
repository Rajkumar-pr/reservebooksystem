import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // Import CSS file for styling

export default function SignupForm() {
  const [data, setData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        'https://backend-server-8690.onrender.com/api/auth/signup',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data), // Send the `data` object directly
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert('Signup successful! Please log in.');
        navigate('/login');
      } else {
        // Handle errors sent by the server
        alert(result.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      // Handle network or unexpected errors
      console.error('Error during signup:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="form">
        <h1 className="form-title">Signup</h1>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={data.username}
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={data.email}
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={data.password}
          onChange={handleChange}
          required
          className="form-input"
        />
        <button type="submit" className="form-button">
          Signup
        </button>
      </form>
    </div>
  );
}
