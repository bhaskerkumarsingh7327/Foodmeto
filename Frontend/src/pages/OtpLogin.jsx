// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { auth, signInWithPhoneNumber, setUpRecaptcha } from "../firebase"; // ✅ fixed import

// const OtpLogin = ({ setIsAuthenticated }) => {
//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const navigate = useNavigate();

//   // 📩 Send OTP
//   const sendOtp = async () => {
//     if (!phone) return alert("Enter phone number!");
//     try {
//       const recaptcha = setUpRecaptcha("recaptcha-container"); // ✅ fixed
//       const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha);
//       window.confirmationResult = confirmation;
//       setOtpSent(true);
//       alert("📲 OTP sent!");
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   // ✅ Verify OTP
//   const verifyOtp = async () => {
//     try {
//       await window.confirmationResult.confirm(otp);
//       localStorage.setItem("user", JSON.stringify({ phone }));
//       setIsAuthenticated(true);
//       navigate("/");
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-pink-300">
//       <div className="bg-white p-8 rounded-xl w-96 shadow-lg">
//         <h2 className="text-2xl font-bold mb-4 text-center">📲 OTP Login</h2>

//         {/* Phone Input */}
//         <input
//           type="text"
//           placeholder="Phone Number (+91...)"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//           className="w-full p-3 border rounded-lg"
//         />

//         {/* OTP Input */}
//         {otpSent && (
//           <input
//             type="text"
//             placeholder="Enter OTP"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             className="w-full p-3 border rounded-lg mt-3"
//           />
//         )}

//         {/* Button */}
//         {!otpSent ? (
//           <button
//             onClick={sendOtp}
//             className="w-full py-2 mt-3 bg-green-500 text-white rounded-lg"
//           >
//             Send OTP
//           </button>
//         ) : (
//           <button
//             onClick={verifyOtp}
//             className="w-full py-2 mt-3 bg-blue-500 text-white rounded-lg"
//           >
//             Verify OTP
//           </button>
//         )}

//         {/* Back Link */}
//         <p
//           className="mt-4 text-center text-sm text-gray-600 cursor-pointer"
//           onClick={() => navigate("/login")}
//         >
//           Back to Login
//         </p>

//         {/* 🔑 Recaptcha container */}
//         <div id="recaptcha-container"></div>
//       </div>
//     </div>
//   );
// };

// export default OtpLogin;





import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth, signInWithPhoneNumber, getRecaptcha } from "../firebase";

const OtpLogin = ({ setIsAuthenticated }) => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const navigate = useNavigate();

  // 🔑 Refs for OTP inputs
  const otpRefs = useRef([]);

  // ✅ Send OTP
  const sendOtp = async () => {
    if (!phone || !phone.startsWith("+")) {
      alert("📱 Number format: +91XXXXXXXXXX");
      return;
    }
    try {
      const verifier = getRecaptcha("recaptcha-container");
      const result = await signInWithPhoneNumber(auth, phone, verifier);
      console.log("Confirmation object:", result);
      setConfirmation(result); // ✅ OTP box trigger
      alert("📲 OTP sent!");
    } catch (err) {
      console.error(err);
      alert("❌ " + err.message);
    }
  };

  // ✅ Verify OTP
  const verifyOtp = async () => {
    if (!confirmation) return alert("Please send OTP first");
    if (!otp) return alert("Enter OTP");
    try {
      await confirmation.confirm(otp);
      localStorage.setItem("user", JSON.stringify({ phone }));
      setIsAuthenticated?.(true);
      alert("✅ Phone verified!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("❌ Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
      <div className="w-96 bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">📲 OTP Login</h2>

        {/* Phone input */}
        <input
          type="tel"
          placeholder="+91 9876543210"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-purple-300"
        />

        {/* OTP input (show only if confirmation exists) */}
        {confirmation && (
          <div className="flex justify-between mt-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <input
                key={i}
                ref={(el) => (otpRefs.current[i] = el)}
                type="text"
                maxLength="1"
                value={otp[i] || ""}
                onChange={(e) => {
                  let value = e.target.value.replace(/[^0-9]/g, "");
                  let newOtp = otp.split("");
                  newOtp[i] = value;
                  setOtp(newOtp.join(""));

                  // ✅ Auto move to next box
                  if (value && i < 5) {
                    otpRefs.current[i + 1]?.focus();
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !otp[i] && i > 0) {
                    otpRefs.current[i - 1]?.focus();
                  }
                }}
                className="w-10 h-12 text-center text-lg border rounded-lg focus:outline-none focus:ring focus:ring-purple-300"
              />
            ))}
          </div>
        )}

        {/* Button (changes after OTP sent) */}
        {confirmation === null ? (
          <button
            onClick={sendOtp}
            className="w-full mt-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Send OTP
          </button>
        ) : (
          <button
            onClick={verifyOtp}
            className="w-full mt-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Verify OTP
          </button>
        )}

        <button
          onClick={() => navigate("/login")}
          className="w-full mt-3 text-sm text-gray-600 hover:text-black"
        >
          ← Back to Login
        </button>

        {/* 🔑 Hidden Recaptcha container */}
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default OtpLogin;