// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Login = ({ setIsAuthenticated }) => {
//   const [isSignup, setIsSignup] = useState(false);
//   const [formData, setFormData] = useState({ email: "", password: "", name: "" });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleAuth = (e) => {
//     e.preventDefault();
//     if (isSignup && !formData.name) {
//       alert("⚠️ Name is required for signup!");
//       return;
//     }
//     if (!formData.email || !formData.password) {
//       alert("⚠️ Fill all fields!");
//       return;
//     }
//     // Simple demo auth (no backend)
//     setIsAuthenticated(true);
//     navigate("/");
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-400 to-red-500">
//       <div className="bg-white p-8 rounded-2xl shadow-2xl w-96">
//         <h2 className="text-2xl font-bold text-center mb-4">
//           {isSignup ? "📝 Create Account" : "🔑 Login"}
//         </h2>
//         <form onSubmit={handleAuth} className="space-y-4">
//           {isSignup && (
//             <input
//               type="text"
//               name="name"
//               placeholder="Full Name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-pink-300"
//             />
//           )}
//           <input
//             type="email"
//             name="email"
//             placeholder="Email Address"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-pink-300"
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-pink-300"
//           />
//           <button
//             type="submit"
//             className="w-full py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
//           >
//             {isSignup ? "✅ Register" : "➡ Login"}
//           </button>
//         </form>
//         <p
//           className="text-center text-sm text-gray-600 mt-4 cursor-pointer hover:text-pink-500"
//           onClick={() => setIsSignup(!isSignup)}
//         >
//           {isSignup
//             ? "Already have an account? Login"
//             : "New user? Create an account"}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios"; // ✅ ADD

// const Login = ({ setIsAuthenticated }) => {
//   const [isSignup, setIsSignup] = useState(false);
//   const [formData, setFormData] = useState({ email: "", password: "", name: "" });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleAuth = async (e) => {
//     e.preventDefault();
//     if (isSignup && !formData.name) {
//       alert("⚠️ Name is required for signup!");
//       return;
//     }
//     if (!formData.email || !formData.password) {
//       alert("⚠️ Fill all fields!");
//       return;
//     }

//     try {
//       if (isSignup) {
//         // ✅ Signup API call
//         const res = await axios.post("http://localhost:8080/api/auth/signup", {
//           name: formData.name,
//           email: formData.email,
//           password: formData.password,
//         });
//         if (res.data?.success) {
//           alert("✅ Signup successful! Please login.");
//           setIsSignup(false);
//         } else {
//           alert(res.data?.message || "❌ Signup failed");
//         }
//       } else {
//         // ✅ Login API call
//         const res = await axios.post("http://localhost:8080/api/auth/login", {
//           email: formData.email,
//           password: formData.password,
//         });
//         if (res.data?.success) {
//           setIsAuthenticated(true);
//           navigate("/");
//         } else {
//           alert(res.data?.message || "❌ Invalid credentials");
//         }
//       }
//     } catch (err) {
//       console.error(err);
//       alert("⚠️ Server error, please try later");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-400 to-red-500">
//       <div className="bg-white p-8 rounded-2xl shadow-2xl w-96">
//         <h2 className="text-2xl font-bold text-center mb-4">
//           {isSignup ? "📝 Create Account" : "🔑 Login"}
//         </h2>
//         <form onSubmit={handleAuth} className="space-y-4">
//           {isSignup && (
//             <input
//               type="text"
//               name="name"
//               placeholder="Full Name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-pink-300"
//             />
//           )}
//           <input
//             type="email"
//             name="email"
//             placeholder="Email Address"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-pink-300"
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-pink-300"
//           />
//           <button
//             type="submit"
//             className="w-full py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
//           >
//             {isSignup ? "✅ Register" : "➡ Login"}
//           </button>
//         </form>
//         <p
//           className="text-center text-sm text-gray-600 mt-4 cursor-pointer hover:text-pink-500"
//           onClick={() => setIsSignup(!isSignup)}
//         >
//           {isSignup
//             ? "Already have an account? Login"
//             : "New user? Create an account"}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;



// Poori app me same look rakhne ke liye shared Tailwind classes

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import AuthLayout from "../components/AuthLayout";
import { inputClass, labelClass, primaryBtn, secondaryBtn } from "../ui";

const Login = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 📌 Email + Password Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      localStorage.setItem("user", JSON.stringify({ email: formData.email }));
      setIsAuthenticated(true);
      navigate("/");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 📌 Google Login
  const handleGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      localStorage.setItem("user", JSON.stringify(res.user));
      setIsAuthenticated(true);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <AuthLayout
      title="Welcome back 👋"
      subtitle="Login karke apna favourite khana order karo."
      footer={
        <>
          New to Foodmeto?{" "}
          <button onClick={() => navigate("/signup")} className="font-bold text-brand-600 hover:underline">
            Create account
          </button>
        </>
      }
    >
      <form onSubmit={handleLogin} className="space-y-4">
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
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-sm font-semibold text-slate-700" htmlFor="password">Password</label>
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-sm font-semibold text-brand-600 hover:underline"
            >
              Forgot password?
            </button>
          </div>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <button type="submit" disabled={loading} className={primaryBtn}>
          {loading ? "Please wait..." : "Login"}
        </button>
      </form>

      <div className="my-6 flex items-center gap-3 text-xs font-semibold uppercase text-slate-400">
        <span className="h-px flex-1 bg-slate-200" />
        or
        <span className="h-px flex-1 bg-slate-200" />
      </div>

      <div className="space-y-3">
        <button onClick={handleGoogle} className={`${secondaryBtn} flex items-center justify-center gap-3`}>
          <FcGoogle className="h-5 w-5" /> Continue with Google
        </button>
        <button onClick={() => navigate("/otp-login")} className={secondaryBtn}>
          📲 Login with OTP
        </button>
      </div>
    </AuthLayout>
  );
};

export default Login;