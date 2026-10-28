import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";
import { auth } from "../firebase.js";
import { signOut } from "firebase/auth";
import { API } from "../api.js";
import PageHeader from "../components/PageHeader";
import { FaBoxOpen, FaSignOutAlt } from "react-icons/fa";

const DEFAULT_AVATAR = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

const Account = () => {
  const { currentUser } = useAuth();

  // Hooks hamesha pehle, conditional return uske baad (React ka rule)
  const [profilePic, setProfilePic] = useState(() => {
    return localStorage.getItem("profilePic") || currentUser?.photoURL || DEFAULT_AVATAR;
  });
  const [orderCount, setOrderCount] = useState(null);

  useEffect(() => {
    if (!currentUser) return;
    API.get("/api/orders/my")
      .then(({ data }) => setOrderCount(data.orders?.length ?? 0))
      .catch(() => setOrderCount(null));
  }, [currentUser]);

  if (!currentUser) {
    return <div className="mt-20 text-center text-xl font-semibold">Please Login to view your account.</div>;
  }

  // 📸 Gallery se photo upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        localStorage.setItem("profilePic", reader.result);
        window.dispatchEvent(new Event("profilePicUpdated")); // Nav bar ko update karne ke liye
      };
      reader.readAsDataURL(file);
    }
  };

  // 🚪 Logout
  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <PageHeader title="My Account" />

      <main className="mx-auto max-w-2xl px-4 py-8 md:px-6">
        <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
          {/* Banner */}
          <div className="h-28 bg-gradient-to-r from-brand-500 via-orange-500 to-red-500" />

          <div className="flex flex-col items-center px-6 pb-8">
            {/* Profile photo (click karke badlo) */}
            <div className="group relative -mt-14 h-28 w-28 overflow-hidden rounded-full border-4 border-white bg-white shadow-lg">
              <label htmlFor="profile-upload" className="relative block h-full w-full cursor-pointer">
                <img src={profilePic} alt="User Avatar" className="h-full w-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="text-sm font-bold text-white">📷 Edit</span>
                </div>
              </label>
              <input type="file" id="profile-upload" accept="image/*" className="hidden" onChange={handleImageChange} />
            </div>

            <h2 className="mt-4 text-2xl font-extrabold text-slate-800">{currentUser.displayName || "Foodie User"}</h2>
            <p className="mt-1 text-slate-500">{currentUser.email || currentUser.phoneNumber || "No Contact Info"}</p>

            {/* Stats */}
            <div className="mt-8 grid w-full grid-cols-2 gap-4 text-center">
              <div className="rounded-2xl border border-green-100 bg-green-50 p-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-green-600">Account status</h3>
                <p className="mt-2 text-xl font-extrabold text-slate-800">Active ✅</p>
              </div>
              <div className="rounded-2xl border border-brand-100 bg-brand-50 p-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-600">Total orders</h3>
                <p className="mt-2 text-xl font-extrabold text-slate-800">{orderCount ?? "-"}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
              <Link
                to="/orders"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-brand-500 py-3 font-bold text-brand-600 transition hover:bg-brand-50"
              >
                <FaBoxOpen /> View Orders
              </Link>
              <Link
                to="/"
                className="flex flex-1 items-center justify-center rounded-xl bg-brand-500 py-3 font-bold text-white shadow-lg shadow-brand-500/30 transition hover:bg-brand-600"
              >
                Order Food
              </Link>
              <button
                onClick={handleLogout}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-50 py-3 font-bold text-red-600 transition hover:bg-red-100"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Account;