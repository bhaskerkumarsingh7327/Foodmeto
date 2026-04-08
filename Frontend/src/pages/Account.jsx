import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { Link } from 'react-router-dom';
import { auth } from "../firebase.js";
import { signOut } from "firebase/auth";

const Account = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <div className="text-center mt-20 text-xl font-semibold">Please Login to view your account.</div>;
  }

  // LocalStorage से फोटो फेच करें या डिफ़ॉल्ट फोटो दिखाएं
  const [profilePic, setProfilePic] = useState(() => {
    return localStorage.getItem("profilePic") || currentUser.photoURL || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
  });

  // गैलरी से फोटो अपलोड हैंडलर
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        localStorage.setItem("profilePic", reader.result);
        window.dispatchEvent(new Event("profilePicUpdated")); // Nav bar को अपडेट करने के लिए इवेंट
      };
      reader.readAsDataURL(file);
    }
  };

  // लॉगआउट हैंडलर
  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-pink-50 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-pink-100">
        
        {/* 🎨 Header Banner */}
        <div className="h-32 bg-gradient-to-r from-pink-500 to-red-400"></div>

        <div className="relative px-8 pb-10 flex flex-col items-center">
          
          {/* 📸 Profile Image */}
          <div className="relative -mt-16 w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white group">
            <label htmlFor="profile-upload" className="cursor-pointer w-full h-full block relative">
              <img src={profilePic} alt="User Avatar" className="w-full h-full object-cover group-hover:opacity-60 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-sm font-bold">📷 Edit</span>
              </div>
            </label>
            <input type="file" id="profile-upload" accept="image/*" className="hidden" onChange={handleImageChange} />
          </div>

          <h2 className="mt-4 text-3xl font-bold text-gray-800">{currentUser.displayName || "Foodie User"}</h2>
          <p className="text-gray-500 mt-1">{currentUser.email || currentUser.phoneNumber || "No Contact Info"}</p>

          {/* 📊 Details Section */}
          <div className="w-full mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
            <div className="p-5 bg-pink-50 rounded-2xl border border-pink-100 shadow-sm hover:shadow-md transition">
              <h3 className="text-sm font-bold text-pink-500 uppercase tracking-wider">Account Status</h3>
              <p className="mt-2 text-xl text-gray-800 font-bold">Active ✅</p>
            </div>
            <div className="p-5 bg-orange-50 rounded-2xl border border-orange-100 shadow-sm hover:shadow-md transition">
              <h3 className="text-sm font-bold text-orange-500 uppercase tracking-wider">Total Orders</h3>
              <p className="mt-2 text-xl text-gray-800 font-bold">
                {JSON.parse(localStorage.getItem("myOrders"))?.length || 0}
              </p>
            </div>
          </div>

          {/* 🔘 Actions Button */}
          <div className="mt-10 flex gap-4 w-full justify-center">
            <Link to="/orders" className="px-8 py-3 bg-white text-pink-600 border-2 border-pink-500 font-bold rounded-xl shadow-lg hover:bg-pink-50 transition hover:-translate-y-1">
              View Orders
            </Link>
            <Link to="/" className="px-8 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold rounded-xl shadow-lg hover:shadow-pink-500/50 transition hover:-translate-y-1">
              Order Food
            </Link>
            <button onClick={handleLogout} className="px-8 py-3 bg-red-100 text-red-600 font-bold rounded-xl shadow-sm hover:bg-red-200 transition hover:-translate-y-1">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;