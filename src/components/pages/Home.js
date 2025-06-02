// // Listing.jsx
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Listing from './Listing';
// const Home = () => {
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchListing = async () => {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         setMessage("No token found. Please login.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await fetch("http://localhost:5000/home", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const data = await response.json();

//         if (response.ok) {
//           setMessage(data.message);
//         } else if (response.status === 401 || response.status === 403) {
//           localStorage.removeItem("token");
//           navigate("/Login"); // Redirect to login if token is invalid
//         }
//       } catch (err) {
//         console.error("Error fetching listing:", err);
//         setMessage("Something went wrong.");
//       }

//       setLoading(false);
//     };

//     fetchListing();
//   }, []);

//   return (
//     <>
//     <div className="container mt-5">
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div className="alert alert-info text-center">{message}</div>
//       )}
//     </div>
//     <Listing/>
//     </>
//   );
// };
// export default Home;
import React, { useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import Listing from "./Listing";

const Home = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListing = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("No token found. Please login.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/home", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setMessage(data.message);
        } else if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("token");
          navigate("/Login");
        }
      } catch (err) {
        console.error("Error fetching listing:", err);
        setMessage("Something went wrong.");
      }

      setLoading(false);
    };

    fetchListing();
  }, []);

  return (
    <>
    <div style={{background:"linear-gradient(to right,rgb(220, 8, 8),rgb(89, 0, 0))"}}>
      {/* Hero Section */}
      <section className="py-5  text-light text-center"
      style={{background:"linear-gradient(to right,rgb(220, 8, 8),rgb(89, 0, 0))"}}>
        <div className="container">
          <h1 className="display-4 fw-bold">
            {message} to <span className="text-dark">PartsNcars</span>
          </h1>
          <p className="lead mt-3">
            Buy & sell car parts and vehicles effortlessly with trust and speed.
          </p>
          <a href="#listings" className="btn btn-warning btn-lg mt-3">
            <i className="bi bi-cart-plus me-2"></i> Start Shopping
          </a>
        </div>
      </section>

      {/* Message
      {!loading && message && (
        <div className="container mt-2">
          <div className="alert alert-info text-center">{message}</div>
        </div>
      )} */}

      {/* Features Section
      <section className="py-5 bg-light text-center">
        <div className="container">
          
        </div>
      </section> */}

      {/* Listing Component */}
      <section id="listings" className="py-5 bg-white" style={{background:"linear-gradient(to right,rgb(220, 8, 8),rgb(89, 0, 0))"}}>
        <div className="container">
          <Listing />
        </div>
      </section>
      </div>
    </>
  );
};

export default Home;
