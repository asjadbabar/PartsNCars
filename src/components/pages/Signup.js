// // import React, { useState } from 'react';

// // const Signup = () => {
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     email: '',
// //     phone:'',
// //     password: '',
// //     confirmPassword: ''
// //   });

// //   const handleChange = (e) => {
// //     setFormData({...formData, [e.target.name]: e.target.value });
// //   };
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
  
// //     if (formData.password !== formData.confirmPassword) {
// //       alert("Passwords do not match!");
// //       return;
// //     }
  
// //     try {
// //       const response = await fetch("http://localhost:5000/signup", 
// //         {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json"
// //         },
// //         body: JSON.stringify({
// //           name: formData.name,
// //           email: formData.email,
// //           phone: formData.phone,
// //           password: formData.password
// //         })
// //       });
  
// //       const data = await response.json();
  
// //       if (response.ok) {
// //         alert("Signup successful!");
// //         console.log(data);
// //        // console.log(data);
// //         // Optionally redirect or clear form
// //         setFormData({
// //           name: '',
// //           email: '',
// //           phone: '',
// //           password: '',
// //           confirmPassword: ''
// //         });
// //       } else {
// //         alert(data.error || "Signup failed.");
// //       }
// //     } catch (error) {
// //       console.error("Error during signup:", error);
// //       alert("Something went wrong. Please try again.");
// //     }
// //   };
  
  

// //   return (
// //     <div className="container d-flex justify-content-center align-items-center vh-100 m-4">
// //       <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
      
// //         <h3 className="text-center mb-4">Create Your Account</h3>
// //         <form method='POST' onSubmit={handleSubmit}>
// //           <div className="mb-3">
// //             <label className="form-label">Full Name</label>
// //             <input 
// //               type="text" 
// //               name="name" 
// //               className="form-control" 
// //               value={formData.name} 
// //               onChange={handleChange} 
// //               required 
// //             />
// //           </div>

// //           <div className="mb-3">
// //             <label className="form-label">Email Address</label>
// //             <input 
// //               type="email" 
// //               name="email" 
// //               className="form-control" 
// //               value={formData.email} 
// //               onChange={handleChange} 
// //               required 
// //             />
// //           </div>

// //           <div className="mb-3">
// //             <label className="form-label">Phone Number</label>
// //             <input 
// //               type="int" 
// //               name="phone" 
// //               className="form-control" 
// //               value={formData.phone} 
// //               onChange={handleChange} 
// //               required 
// //             />
// //           </div>
// //           <div className="mb-3">
// //             <label className="form-label">Password</label>
// //             <input 
// //               type="password" 
// //               name="password" 
// //               className="form-control" 
// //               value={formData.password} 
// //               onChange={handleChange} 
// //               required 
// //             />
// //           </div>

// //           <div className="mb-3">
// //             <label className="form-label">Confirm Password</label>
// //             <input 
// //               type="password" 
// //               name="confirmPassword" 
// //               className="form-control" 
// //               value={formData.confirmPassword} 
// //               onChange={handleChange} 
// //               required 
// //             />
// //           </div>

// //           <button type="submit" 
// //           className="btn btn-primary w-100">Sign Up</button>

// //           <p className="text-center mt-3">
// //             Already have an account? <a href="/login">Login</a>
// //           </p>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Signup;







// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import navigation hook

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: ''
//   });

//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate(); // For redirection

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Clear any previous messages
//     setSuccessMessage('');
//     setErrorMessage('');

//     if (formData.password !== formData.confirmPassword) {
//       setErrorMessage("Passwords do not match!");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:5000/signup", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           name: formData.name,
//           email: formData.email,
//           phone: formData.phone,
//           password: formData.password
//         })
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setSuccessMessage("Signup successful! Redirecting to login...");
//         setFormData({
//           name: '',
//           email: '',
//           phone: '',
//           password: '',
//           confirmPassword: ''
//         });

//         setTimeout(() => {
//           navigate('/Login'); // Redirect after 2 seconds
//         }, 2000);
//       } else {
//         setErrorMessage(data.error || "Signup failed.");
//       }
//     } catch (error) {
//       console.error("Error during signup:", error);
//       setErrorMessage("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <div className="container d-flex justify-content-center align-items-center vh-100 m-4">
//       <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>

//         <h3 className="text-center mb-4">Create Your Account</h3>

//         {/* Success Alert */}
//         {successMessage && (
//           <div className="alert alert-success text-center" role="alert">
//             {successMessage}
//           </div>
//         )}

//         {/* Error Alert */}
//         {errorMessage && (
//           <div className="alert alert-danger text-center" role="alert">
//             {errorMessage}
//           </div>
//         )}

//         <form method="POST" onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label className="form-label">Full Name</label>
//             <input
//               type="text"
//               name="name"
//               className="form-control"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Email Address</label>
//             <input
//               type="email"
//               name="email"
//               className="form-control"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Phone Number</label>
//             <input
//               type="text"
//               name="phone"
//               className="form-control"
//               value={formData.phone}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Password</label>
//             <input
//               type="password"
//               name="password"
//               className="form-control"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Confirm Password</label>
//             <input
//               type="password"
//               name="confirmPassword"
//               className="form-control"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <button type="submit" className="btn btn-primary w-100">
//             Sign Up
//           </button>

//           <p className="text-center mt-3">
//             Already have an account? <a href="/login">Login</a>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Signup successful! Redirecting to login...");
        setFormData({
          name: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: ''
        });

        setTimeout(() => navigate('/Login'), 2000);
      } else {
        setErrorMessage(data.error || "Signup failed.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="container-fluid py-5 px-3"
      style={{
        backgroundColor: '#121212',
        minHeight: '100vh',
        paddingTop: '80px',
        overflowY: 'auto',
      }}
    >
      <div
        className="card mx-auto p-4 shadow-lg"
        style={{
          maxWidth: '420px',
          background: '#1e1e1e',
          borderRadius: '1rem',
          color: '#f8f9fa',
          border: '1px solid #ff4d4d',
        }}
      >
        <h4 className="text-center text-danger mb-3">
          <i className="bi bi-person-plus-fill me-2"></i>Create Account
        </h4>

        {successMessage && (
          <div className="alert alert-success text-center py-2">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="alert alert-danger text-center py-2">{errorMessage}</div>
        )}

        <form onSubmit={handleSubmit} autoComplete="off">
          {/* Name */}
          <div className="mb-3">
            <div className="input-group">
              <span className="input-group-text bg-danger text-white border-danger">
                <i className="bi bi-person-fill"></i>
              </span>
              <input
                type="text"
                name="name"
                className="form-control bg-dark text-light border-danger"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-3">
            <div className="input-group">
              <span className="input-group-text bg-danger text-white border-danger">
                <i className="bi bi-envelope-fill"></i>
              </span>
              <input
                type="email"
                name="email"
                className="form-control bg-dark text-light border-danger"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Phone */}
          <div className="mb-3">
            <div className="input-group">
              <span className="input-group-text bg-danger text-white border-danger">
                <i className="bi bi-telephone-fill"></i>
              </span>
              <input
                type="text"
                name="phone"
                className="form-control bg-dark text-light border-danger"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-3">
            <div className="input-group">
              <span className="input-group-text bg-danger text-white border-danger">
                <i className="bi bi-lock-fill"></i>
              </span>
              <input
                type="password"
                name="password"
                className="form-control bg-dark text-light border-danger"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <div className="input-group">
              <span className="input-group-text bg-danger text-white border-danger">
                <i className="bi bi-shield-lock-fill"></i>
              </span>
              <input
                type="password"
                name="confirmPassword"
                className="form-control bg-dark text-light border-danger"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-danger w-100 fw-semibold">
            <i className="bi bi-check-circle me-2"></i>Sign Up
          </button>

          <p className="text-center mt-3 mb-0" style={{ color: '#ff6b6b' }}>
            Already have an account?{' '}
            <a href="/login" className="text-danger text-decoration-none fw-bold">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
