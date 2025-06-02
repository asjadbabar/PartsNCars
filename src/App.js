import React from 'react';
import {Routes, Route } from 'react-router-dom';
import Navbar from './components/pages/Navbar';
import LandingPage from './components/pages/LandingPage'
//import Home from './components/pages/Home';
// import Contact from './components/pages/Contact';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import UserDashboard from './components/pages/UserDashboard';
import Home from './components/pages/Home';
//import AddProduct from './components/pages/AddProduct';
import UpdateProduct from './components/pages/UpdateProduct';
import Cart from './components/pages/CartPage';
import AddCar from './components/pages/AddCar.js';
import AddSparepart from './components/pages/AddSparepart';
const App = () => {
  //const token = localStorage.getItem('token');

  return (<>
     <Navbar />
  <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Login" element={ <Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/UserDashboard" element={<UserDashboard />} />
        <Route path="/AddSparepart" element={<AddSparepart />} />
        <Route path="/AddCar" element={<AddCar />} />
        <Route path="/UpdateProduct/:id" element={<UpdateProduct />} />
        <Route path="/Cart" element={<Cart />} />
      </Routes>
      </>
  );
};

export default App;
