// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const Navbar = () => {
//   const token = localStorage.getItem('token');
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
//       <div className="container">
//         <Link className="navbar-brand fw-bold" to="/">
//           Parts<span className="text-primary">N</span>Cars
//         </Link>

//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarContent"
//           aria-controls="navbarContent"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className="collapse navbar-collapse" id="navbarContent">
//           <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
//             <li className="nav-item">
//               <Link className="nav-link active" to="/">Home</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/contact">Contact</Link>
//             </li>

//             {token ? (
//               <>
//                 <li className="nav-item">
//                   <Link className="btn btn-outline-warning ms-3" to="/Home">
//                     Listing
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="btn btn-outline-warning ms-3" to="/UserDashboard">
//                     Dashboard
//                   </Link>
//                 </li>

//                 {/* 🛒 Cart Icon */}
//                 <li className="nav-item d-flex align-items-center ms-3">
//                   <Link to="/Cart" className="nav-link position-relative">
//                     <i className="bi bi-cart-fill" style={{ color: 'red', fontSize: '1.4rem' }}></i>
//                   </Link>
//                 </li>

//                 <li className="nav-item">
//                   <button className="btn btn-outline-danger ms-3" onClick={handleLogout}>
//                     Logout
//                   </button>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li className="nav-item">
//                   <Link className="btn btn-outline-primary ms-3" to="/Login">
//                     Login
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="btn btn-outline-success ms-3" to="/Signup">
//                     SignUp
//                   </Link>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



// // import React from 'react';
// // import { Link, useNavigate } from 'react-router-dom';

// // const Navbar = () => {
// //   const token = localStorage.getItem('token');
// //   const navigate = useNavigate();

// //   const handleLogout = () => {
// //     localStorage.removeItem('token');
// //     navigate('/login');
// //   };

// //   return (
// //     <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
// //       <div className="container">
// //         <Link className="navbar-brand fw-bold" to="/">
// //           Parts<span className="text-primary">N</span>Cars
// //         </Link>

// //         <button
// //           className="navbar-toggler"
// //           type="button"
// //           data-bs-toggle="collapse"
// //           data-bs-target="#navbarContent"
// //           aria-controls="navbarContent"
// //           aria-expanded="false"
// //           aria-label="Toggle navigation"
// //         >
// //           <span className="navbar-toggler-icon"></span>
// //         </button>

// //         <div className="collapse navbar-collapse" id="navbarContent">
// //           <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
// //             <li className="nav-item">
// //               <Link className="nav-link active" to="/">Home</Link>
// //             </li>
// //             <li className="nav-item">
// //               <Link className="nav-link" to="/contact">Contact</Link>
// //             </li>

// //             {token ? (
// //               <>
// //               <li className="nav-item">
// //                   <Link className="btn btn-outline-warning ms-3" to="/Home">
// //                     Listing
// //                   </Link>
// //                 </li>
// //                 <li className="nav-item">
// //                   <Link className="btn btn-outline-warning ms-3" to="/UserDashboard">
// //                     Dashboard
// //                   </Link>
// //                 </li>
// //                 <li className="nav-item">
// //                   <button className="btn btn-outline-danger ms-3" onClick={handleLogout}>
// //                     Logout
// //                   </button>
// //                 </li>
// //               </>
// //             ) : (
// //               <>
// //                 <li className="nav-item">
// //                   <Link className="btn btn-outline-primary ms-3" to="/Login">
// //                     Login
// //                   </Link>
// //                 </li>
// //                 <li className="nav-item">
// //                   <Link className="btn btn-outline-success ms-3" to="/Signup">
// //                     SignUp
// //                   </Link>
// //                 </li>
// //               </>
// //             )}
// //           </ul>
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navbar;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on window resize to large screen
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4" to="/">
          Parts<span className="text-danger">N</span>Cars
        </Link>

        {/* Toggle button */}
        <button
          className="navbar-toggler border-0"
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <motion.div
            animate={menuOpen ? { rotate: 90 } : { rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            <i className="bi bi-list fs-2 text-light"></i>
          </motion.div>
        </button>

        {/* Menu */}
        <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`} id="navbarContent">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3 mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/" onClick={() => setMenuOpen(false)}>
                <i className="bi bi-house-door-fill me-1"></i> Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/contact" onClick={() => setMenuOpen(false)}>
                <i className="bi bi-envelope-fill me-1"></i> Contact
              </Link>
            </li>

            {token ? (
              <>
                <li className="nav-item">
                  <Link
                    className="btn btn-outline-warning px-3"
                    to="/Home"
                    onClick={() => setMenuOpen(false)}
                  >
                    <i className="bi bi-list-check me-1"></i> Listing
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="btn btn-outline-warning px-3"
                    to="/UserDashboard"
                    onClick={() => setMenuOpen(false)}
                  >
                    <i className="bi bi-speedometer2 me-1"></i> Dashboard
                  </Link>
                </li>

                <li className="nav-item d-flex align-items-center">
                  <Link
                    to="/Cart"
                    className="nav-link position-relative"
                    onClick={() => setMenuOpen(false)}
                  >
                    <i
                      className="bi bi-cart-fill"
                      style={{ color: '#ff4d4d', fontSize: '1.5rem' }}
                      title="Cart"
                    ></i>
                  </Link>
                </li>

                <li className="nav-item">
                  <button
                    className="btn btn-outline-danger px-3"
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                  >
                    <i className="bi bi-box-arrow-right me-1"></i> Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className="btn btn-outline-primary px-3"
                    to="/Login"
                    onClick={() => setMenuOpen(false)}
                  >
                    <i className="bi bi-box-arrow-in-right me-1"></i> Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="btn btn-outline-success px-3"
                    to="/Signup"
                    onClick={() => setMenuOpen(false)}
                  >
                    <i className="bi bi-person-plus-fill me-1"></i> SignUp
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
