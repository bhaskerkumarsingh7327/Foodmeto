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
import AuthLayout from "../components/AuthLayout";
import { inputClass, labelClass, primaryBtn } from "../ui";

const OtpLogin = ({ setIsAuthenticated }) => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const navigate = useNavigate();

  // 🔥 Auto-focus ke liye refs
  const otpRefs = useRef([]);

  // 📌 Send OTP
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

  // 📌 Verify OTP
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
    <AuthLayout
      title="Login with OTP 📲"
      subtitle="Apna phone number daalo, hum OTP bhejenge."
      footer={
        <button onClick={() => navigate("/login")} className="font-bold text-brand-600 hover:underline">
          ← Back to Login
        </button>
      }
    >
      <div className="space-y-4">
        <div>
          <label className={labelClass} htmlFor="phone">Phone number</label>
          <input
            id="phone"
            type="tel"
            placeholder="+91 9876543210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* OTP boxes (OTP bhejne ke baad dikhte hain) */}
        {confirmation && (
          <div>
            <label className={labelClass}>Enter 6-digit OTP</label>
            <div className="flex justify-between gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <input
                  key={i}
                  ref={(el) => (otpRefs.current[i] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={otp[i] || ""}
                  onChange={(e) => {
                    let value = e.target.value.replace(/[^0-9]/g, "");
                    let newOtp = otp.split("");
                    newOtp[i] = value;
                    setOtp(newOtp.join(""));

                    // agle box par jao
                    if (value && i < 5) {
                      otpRefs.current[i + 1]?.focus();
                    }
                  }}
                  onKeyDown={(e) => {
                    // backspace par pichle box par
                    if (e.key === "Backspace" && !otp[i] && i > 0) {
                      otpRefs.current[i - 1]?.focus();
                    }
                  }}
                  className="h-12 w-full min-w-0 rounded-xl border border-slate-200 text-center text-lg font-bold outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                />
              ))}
            </div>
          </div>
        )}

        {confirmation === null ? (
          <button onClick={sendOtp} className={primaryBtn}>
            Send OTP
          </button>
        ) : (
          <button onClick={verifyOtp} className={primaryBtn}>
            Verify OTP
          </button>
        )}

        {/* 🔑 Hidden Recaptcha container */}
        <div id="recaptcha-container"></div>
      </div>
    </AuthLayout>
  );
};

export default OtpLogin;