// Listing.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Listing from './Listing';
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
          navigate("/Login"); // Redirect to login if token is invalid
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
    <div className="container mt-5">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="alert alert-info text-center">{message}</div>
      )}
    </div>
    <Listing/>
    </>
  );
};
export default Home;
