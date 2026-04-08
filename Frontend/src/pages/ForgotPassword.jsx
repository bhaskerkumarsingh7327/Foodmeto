import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleReset = async () => {
    if (!email) return alert("Enter email!");
    try {
      await sendPasswordResetEmail(auth, email);
      alert("📩 Password reset email sent!");
      navigate("/login");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-300">
      <div className="bg-white p-8 rounded-xl w-96 shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">🔑 Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />
        <button
          onClick={handleReset}
          className="w-full py-2 mt-4 bg-pink-500 text-white rounded-lg"
        >
          Send Reset Link
        </button>

        <p
          className="mt-4 text-center text-sm text-gray-600 cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Back to Login
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;