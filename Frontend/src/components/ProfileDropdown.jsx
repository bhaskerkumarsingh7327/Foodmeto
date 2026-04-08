import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";

const ProfileDropdown = () => {
  const { currentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [photoURL, setPhotoURL] = useState("");

  // Profile pic अपडेट होने पर Navbar की फोटो रिफ्रेश करें
  useEffect(() => {
    if (currentUser) {
      setPhotoURL(localStorage.getItem("profilePic") || currentUser.photoURL || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png");
    }
    const handleStorageChange = () => {
      setPhotoURL(localStorage.getItem("profilePic") || currentUser?.photoURL || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png");
    };
    window.addEventListener("profilePicUpdated", handleStorageChange);
    return () => window.removeEventListener("profilePicUpdated", handleStorageChange);
  }, [currentUser]);

  if (!currentUser) {
    // अगर यूजर लॉग-इन नहीं है, तो कुछ भी न दिखाएँ या 'Login' बटन दिखाएँ
    return null;
  }

  // Google से साइन-इन करने पर displayName अपने आप मिल जाता है
  const displayName = currentUser.displayName || "User";

  return (
    <div className="relative inline-block z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-pink-500 shadow-md hover:scale-110 transition-transform duration-300 overflow-hidden bg-white"
      >
        <img src={photoURL} alt="Profile" className="w-full h-full object-cover" />
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-3 w-48 bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden">
          <div className="px-4 py-3 bg-pink-50 border-b border-gray-200">
            <p className="text-sm text-gray-500">Logged in as</p>
            <p className="text-sm font-bold text-gray-800 truncate">{displayName}</p>
          </div>
          <ul className="list-none m-0 p-2 space-y-1 text-gray-700">
            <Link to="/account" onClick={() => setIsOpen(false)} className="block px-4 py-2 hover:bg-pink-100 rounded-lg transition-colors cursor-pointer">
              <li>👤 My Account</li>
            </Link>
            <Link to="/orders" onClick={() => setIsOpen(false)} className="block px-4 py-2 hover:bg-pink-100 rounded-lg transition-colors cursor-pointer">
              <li>📦 Orders</li>
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;