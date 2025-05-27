import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Login successful ✅',data);
      localStorage.setItem('token', data.token); // Optional

      // Redirect to dashboard or home page
      navigate('/Home'); // 👈 change this to your target UI route
    } else {
      alert(data.message || 'Invalid credentials');
    }
  } catch (err) {
    console.error('Login error:', err);
    alert('Something went wrong. Please try again.');
  }
};

  return (
    <div className="d-flex align-items-center justify-content-center vh-100" style={{ background: '#f0f2f5' }}>
      <div className="card shadow-lg border-0 p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold">
            <span style={{ color: '#0d6efd' }}>Parts</span><span style={{ color: '#343a40' }}>N</span><span style={{ color: '#0d6efd' }}>Cars</span>
          </h2>
          <p className="text-muted">Login to your account</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input 
              type="email" 
              className="form-control" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter email"
              required 
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter password"
              required 
            />
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="rememberMe" />
              <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
            </div>
            <a href="#" className="small text-primary">Forgot password?</a>
          </div>

          <button type="submit" className="btn btn-primary w-100">Login</button>

          <p className="text-center mt-3 mb-0">
            Don't have an account? <a href="/signup" className="text-decoration-none text-primary">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
