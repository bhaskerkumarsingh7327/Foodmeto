import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";
import { FaUserCircle, FaBoxOpen } from "react-icons/fa";

const DEFAULT_AVATAR = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

const ProfileDropdown = () => {
  const { currentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [photoURL, setPhotoURL] = useState(DEFAULT_AVATAR);

  useEffect(() => {
    if (currentUser) {
      setPhotoURL(localStorage.getItem("profilePic") || currentUser.photoURL || DEFAULT_AVATAR);
    }

    // Account page se photo badalne par yahan bhi update ho
    const handleStorageChange = () => {
      setPhotoURL(localStorage.getItem("profilePic") || currentUser?.photoURL || DEFAULT_AVATAR);
    };

    window.addEventListener("profilePicUpdated", handleStorageChange);
    return () => window.removeEventListener("profilePicUpdated", handleStorageChange);
  }, [currentUser]);

  if (!currentUser) {
    return null;
  }

  const displayName = currentUser.displayName || "User";
  const contact = currentUser.email || currentUser.phoneNumber || "";

  const linkClass =
    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-brand-50 hover:text-brand-600";

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Profile menu"
        className="h-11 w-11 overflow-hidden rounded-full border-2 border-brand-500 bg-white shadow-sm transition hover:scale-105"
      >
        <img src={photoURL} alt="Profile" className="h-full w-full object-cover" />
      </button>

      {isOpen && (
        <>
          {/* Bahar click karne par band ho jaye */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          <div className="absolute right-0 z-50 mt-3 w-60 animate-fade-up overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl">
            <div className="border-b border-slate-100 bg-brand-50 px-4 py-3">
              <p className="text-xs text-slate-500">Logged in as</p>
              <p className="truncate text-sm font-bold text-slate-800">{displayName}</p>
              {contact && <p className="truncate text-xs text-slate-500">{contact}</p>}
            </div>
            <div className="space-y-1 p-2">
              <Link to="/account" onClick={() => setIsOpen(false)} className={linkClass}>
                <FaUserCircle className="h-4 w-4" /> My Account
              </Link>
              <Link to="/orders" onClick={() => setIsOpen(false)} className={linkClass}>
                <FaBoxOpen className="h-4 w-4" /> My Orders
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileDropdown;