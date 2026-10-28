import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import AuthLayout from "../components/AuthLayout";
import { inputClass, labelClass, primaryBtn } from "../ui";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    if (!email) return alert("Enter email!");

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      alert("📩 Password reset email sent!");
      navigate("/login");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Forgot password?"
      subtitle="Apna email daalo, hum reset link bhej denge."
      footer={
        <button onClick={() => navigate("/login")} className="font-bold text-brand-600 hover:underline">
          ← Back to Login
        </button>
      }
    >
      <form onSubmit={handleReset} className="space-y-4">
        <div>
          <label className={labelClass} htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </div>

        <button type="submit" disabled={loading} className={primaryBtn}>
          {loading ? "Please wait..." : "Send Reset Link"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;