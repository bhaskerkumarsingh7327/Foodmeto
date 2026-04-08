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




import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";

const Login = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      localStorage.setItem("user", JSON.stringify({ email: formData.email }));
      setIsAuthenticated(true);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

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
    <div className="flex items-center justify-center min-h-screen bg-pink-300">
      <div className="bg-white p-8 rounded-xl w-96 shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">🔑 Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />
          <button
            type="submit"
            className="w-full py-2 bg-pink-500 text-white rounded-lg"
          >
            Login
          </button>
        </form>

        <button
          onClick={handleGoogle}
          className="w-full py-2 mt-3 bg-red-500 text-white rounded-lg"
        >
          Sign in with Google
        </button>

        <p
          className="mt-4 text-center text-sm text-gray-600 cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          New user? Create account
        </p>
        <p
          className="mt-2 text-center text-sm text-gray-600 cursor-pointer"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot password?
        </p>
        <p
          className="mt-2 text-center text-sm text-gray-600 cursor-pointer"
          onClick={() => navigate("/otp-login")}
        >
          Login with OTP
        </p>
      </div>
    </div>
  );
};

export default Login;