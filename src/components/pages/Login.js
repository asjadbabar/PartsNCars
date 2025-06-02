// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';


// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate(); 
//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const response = await fetch('http://localhost:5000/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await response.json();

//     if (response.ok) {
//       console.log('Login successful ✅',data);
//       localStorage.setItem('token', data.token); // Optional

//       // Redirect to dashboard or home page
//       navigate('/Home'); // 👈 change this to your target UI route
//     } else {
//       alert(data.message || 'Invalid credentials');
//     }
//   } catch (err) {
//     console.error('Login error:', err);
//     alert('Something went wrong. Please try again.');
//   }
// };

//   return (
//     <div className="d-flex align-items-center justify-content-center vh-100" style={{ background: '#f0f2f5' }}>
//       <div className="card shadow-lg border-0 p-4" style={{ maxWidth: '400px', width: '100%' }}>
//         <div className="text-center mb-4">
//           <h2 className="fw-bold">
//             <span style={{ color: '#0d6efd' }}>Parts</span><span style={{ color: '#343a40' }}>N</span><span style={{ color: '#0d6efd' }}>Cars</span>
//           </h2>
//           <p className="text-muted">Login to your account</p>
//         </div>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label className="form-label">Email address</label>
//             <input 
//               type="email" 
//               className="form-control" 
//               value={email} 
//               onChange={(e) => setEmail(e.target.value)} 
//               placeholder="Enter email"
//               required 
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Password</label>
//             <input 
//               type="password" 
//               className="form-control" 
//               value={password} 
//               onChange={(e) => setPassword(e.target.value)} 
//               placeholder="Enter password"
//               required 
//             />
//           </div>

//           <div className="d-flex justify-content-between align-items-center mb-3">
//             <div className="form-check">
//               <input type="checkbox" className="form-check-input" id="rememberMe" />
//               <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
//             </div>
//             <a href="#" className="small text-primary">Forgot password?</a>
//           </div>

//           <button type="submit" className="btn btn-primary w-100">Login</button>

//           <p className="text-center mt-3 mb-0">
//             Don't have an account? <a href="/signup" className="text-decoration-none text-primary">Sign up</a>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;


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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful ✅', data);
        localStorage.setItem('token', data.token);
        navigate('/Home');
      } else {
        alert(data.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{ background: '#121212' }} // deep black background
    >
      <div
        className="card shadow-lg border-0 p-4"
        style={{
          maxWidth: '400px',
          width: '100%',
          borderRadius: '1rem',
          background: 'linear-gradient(135deg, #1f1f1f 0%, #3b0000 100%)',
          color: '#f8f9fa',
          boxShadow: '0 0 15px 4px rgba(255, 0, 0, 0.4)',
        }}
      >
        <div className="text-center mb-4">
          <h2 className="fw-bold" style={{ letterSpacing: '0.1em' }}>
            Parts<span style={{ color: '#ff3b3b' }}>N</span>Cars
          </h2>
          <p className="text-muted" style={{ color: '#ff6b6b' }}>
            Login to your account
          </p>
        </div>
        <form onSubmit={handleSubmit} autoComplete="off">
          {/* Email */}
          <div className="mb-3 position-relative">
            <label htmlFor="email" className="form-label text-light">
              Email address
            </label>
            <div className="input-group">
              <span className="input-group-text bg-danger text-white border-danger">
                <i className="bi bi-envelope-fill"></i>
              </span>
              <input
                type="email"
                id="email"
                className="form-control bg-dark text-light border-danger"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-3 position-relative">
            <label htmlFor="password" className="form-label text-light">
              Password
            </label>
            <div className="input-group">
              <span className="input-group-text bg-danger text-white border-danger">
                <i className="bi bi-lock-fill"></i>
              </span>
              <input
                type="password"
                id="password"
                className="form-control bg-dark text-light border-danger"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>
          </div>

          {/* Remember & Forgot */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
                style={{ cursor: 'pointer' }}
              />
              <label
                className="form-check-label text-light"
                htmlFor="rememberMe"
                style={{ cursor: 'pointer' }}
              >
                Remember me
              </label>
            </div>
            <a
              href="#"
              className="small text-danger text-decoration-none"
              style={{ transition: 'color 0.3s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ff6b6b')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#dc3545')}
            >
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-danger w-100 fw-semibold"
            style={{
              letterSpacing: '0.05em',
              fontSize: '1.1rem',
              transition: 'background-color 0.3s, transform 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#ff4c4c';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#dc3545';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <i className="bi bi-box-arrow-in-right me-2"></i> Login
          </button>

          <p className="text-center mt-4 mb-0" style={{ color: '#ff6b6b' }}>
            Don't have an account?{' '}
            <a href="/signup" className="text-danger text-decoration-none fw-bold">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
