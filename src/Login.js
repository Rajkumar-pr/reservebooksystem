import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import CSS file for styling

function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('https://backend-server-8690.onrender.com/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const datas = await response.json();

    if (response.ok) {
      alert('Login successful!');
      navigate('/home', { state: { data } });
    } else {
      alert(datas.error || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="form">
        <h1 className="form-title">Login</h1>
        <input
          type="text"
          name="username"
          value={data.username}
          onChange={handleChange}
          placeholder="Username"
          className="form-input"
          required
        />
        <input
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          placeholder="Password"
          className="form-input"
          required
        />
        <button type="submit" className="form-button">Login</button>
      </form>
    </div>
  );
}

export default Login;
