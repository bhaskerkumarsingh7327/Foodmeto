import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import AuthLayout from "../components/AuthLayout";
import { inputClass, labelClass, primaryBtn } from "../ui";

const Signup = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      alert("Signup successful, please login!");
      navigate("/login");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Kuch hi seconds me account banao aur order shuru karo."
      footer={
        <>
          Already have an account?{" "}
          <button onClick={() => navigate("/login")} className="font-bold text-brand-600 hover:underline">
            Login
          </button>
        </>
      }
    >
      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <label className={labelClass} htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Kam se kam 6 characters"
            value={formData.password}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <button type="submit" disabled={loading} className={primaryBtn}>
          {loading ? "Please wait..." : "Register"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Signup;