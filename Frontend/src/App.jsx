  // import React from 'react'
  // import Home from './pages/Home'

  // // import Category  from './Category.jsx'

  // const App = () => {
  //   return (
  //     <div >
        
  //       <Home/>
  //     {/* <Category/> */}
      
  //     </div>
  //   )
  // }

  // export default App



import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';            // ✅ new
import ForgotPassword from './pages/ForgotPassword';  // ✅ new
import OtpLogin from './pages/OtpLogin';        // ✅ new
import Orders from './pages/Orders';            // ✅ new
import Account from './pages/Account';          // ✅ new

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  // ✅ Check local storage initially to persist login after refresh
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("user") ? true : false;
  }); 

  // 🔢 Cart Counter
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

        {/* Signup Page */}
        <Route path="/signup" element={<Signup />} />

        {/* Forgot Password Page */}
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* OTP Login Page */}
        <Route path="/otp-login" element={<OtpLogin setIsAuthenticated={setIsAuthenticated} />} />

        {/* Home Page */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Home
                cartItems={cartItems}
                setCartItems={setCartItems}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setIsAuthenticated={setIsAuthenticated} 
                cartCount={cartCount}   // ✅ pass counter to Home
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Checkout Page */}
        <Route
          path="/checkout"
          element={
            isAuthenticated ? (
              <Checkout cartItems={cartItems} setCartItems={setCartItems} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Orders Page */}
        <Route
          path="/orders"
          element={
            isAuthenticated ? (
              <Orders />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* My Account Page */}
        <Route
          path="/account"
          element={
            isAuthenticated ? (
              <Account />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;