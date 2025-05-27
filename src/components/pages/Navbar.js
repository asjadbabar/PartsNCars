import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          Parts<span className="text-primary">N</span>Cars
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>

            {token ? (
              <>
              <li className="nav-item">
                  <Link className="btn btn-outline-warning ms-3" to="/Home">
                    Listing
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-outline-warning ms-3" to="/UserDashboard">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-danger ms-3" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="btn btn-outline-primary ms-3" to="/Login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-outline-success ms-3" to="/Signup">
                    SignUp
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
