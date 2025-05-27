import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <header
        className="bg-dark text-white text-center py-5"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1570129477492-45c003edd2be")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}
      >
        <div className="container h-100 d-flex flex-column justify-content-center align-items-center text-white">
          <h1 className="display-4 fw-bold">Drive the Future</h1>
          <p className="lead">Buy & sell cars and spare parts with ease</p>
          <a href="/shop" className="btn btn-primary btn-lg mt-3">
            Get Started
          </a>
        </div>
      </header>

      {/* Features Section */}

      <section className="py-5 bg-light">
        <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
          <div className="col d-flex align-items-start">
            <div className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                className="bi bi-collection-fill"
                viewBox="0 0 16 16"
              >
                <path d="M0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6zM2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3m2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1" />
              </svg>
            </div>
            <div>
              <h3 className="fs-2 text-body-emphasis">
                Extensive Car Collection
              </h3>
              <p>
                Explore a wide range of cars from top brands, including the
                latest models and certified pre-owned vehicles. Whether you're
                looking for a sleek sports car, a reliable family car, or an
                eco-friendly hybrid, we have something for everyone.
              </p>
              <Link to="/Signup" className="btn btn-primary">
                View
              </Link>
            </div>
          </div>
          <div className="col d-flex align-items-start">
            <div className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                className="bi bi-tags-fill"
                viewBox="0 0 16 16"
              >
                <path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                <path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043z" />
              </svg>
            </div>
            <div>
              <h3 className="fs-2 text-body-emphasis">Competitive Pricing</h3>
              <p>
                We offer the best prices in the market, along with flexible
                financing options to make owning your dream car a reality. Check
                out our special promotions and discounts that make your purchase
                even more affordable.
              </p>
              <a href="#" className="btn btn-primary">
                View
              </a>
            </div>
          </div>
          <div className="col d-flex align-items-start">
            <div className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                className="bi bi-person-raised-hand"
                viewBox="0 0 16 16"
              >
                <path d="M6 6.207v9.043a.75.75 0 0 0 1.5 0V10.5a.5.5 0 0 1 1 0v4.75a.75.75 0 0 0 1.5 0v-8.5a.25.25 0 1 1 .5 0v2.5a.75.75 0 0 0 1.5 0V6.5a3 3 0 0 0-3-3H6.236a1 1 0 0 1-.447-.106l-.33-.165A.83.83 0 0 1 5 2.488V.75a.75.75 0 0 0-1.5 0v2.083c0 .715.404 1.37 1.044 1.689L5.5 5c.32.32.5.754.5 1.207" />
                <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
              </svg>
            </div>
            <div>
              <h3 className="fs-2 text-body-emphasis">Expert Assistance</h3>
              <p>
                Our team of experienced professionals is here to help you every
                step of the way. From selecting the perfect car to securing
                financing and taking care of paperwork, we've got you covered.
              </p>
              <a href="#" className="btn btn-primary">
                View
              </a>
            </div>
          </div>

          <div className="col d-flex align-items-start">
            <div className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-tools" viewBox="0 0 16 16">
  <path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3q0-.405-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708M3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026z"/>
</svg>
            </div>
            <div>
              <h3 className="fs-2 text-body-emphasis">Genuine Spare Parts</h3>
              <p>
                Find a wide range of authentic spare parts for all major car
                brands. Our platform ensures quality and reliability, making
                vehicle maintenance hassle-free.
              </p>
              <a href="#" className="btn btn-primary">
                View
              </a>
            </div>
          </div>
        </div>
       
      </section>

      {/* Footer */}
      <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top bg-dark text-white">
    <div className="col mb-3">
      <a href="/" className="d-flex align-items-center mb-3 link-body-emphasis text-decoration-none">
      
       
      </a>
      <p className="text-body-secondary">© {new Date().getFullYear()} PartsNCars. All rights reserved.</p>
    </div>

    <div className="col mb-3">

    </div>

    <div className="col mb-3">
      <h5>Links</h5>
      <ul className="nav flex-column">
        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Home</a></li>
        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Features</a></li>
        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">FAQs</a></li>
        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">About</a></li>
      </ul>
    </div>

    <div className="col mb-3">
      <h5>Community</h5>
      <ul className="nav flex-column">
        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Home</a></li>
        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Features</a></li>
        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Pricing</a></li>
        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">FAQs</a></li>
        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">About</a></li>
      </ul>
    </div>

  </footer>

      {/* <footer className="bg-dark text-white text-center py-3">
        <p className="mb-0">
          © {new Date().getFullYear()} AutoMarket. All rights reserved.
        </p>
      </footer> */}
    </div>
  );
};

export default LandingPage;
