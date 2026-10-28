// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Checkout = ({ cartItems, setCartItems }) => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     address: "",
//     phone: "",
//     payment: "COD",
//   });

//   // 🧮 Total price calculate
//   const totalPrice = cartItems.reduce((acc, item) => {
//     const price =
//       typeof item.price === "string"
//         ? parseInt(item.price.replace(/\D/g, "")) || 0
//         : Number(item.price) || 0;

//     const qty = item.quantity || 1;
//     return acc + price * qty;
//   }, 0);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // 📌 Handle Order
//   const handleOrder = async (e) => {
//     e.preventDefault();

//     if (!formData.name || !formData.address || !formData.phone) {
//       alert("⚠️ Please fill all details!");
//       return;
//     }

//     try {
//       // ✅ Order API call
//       const res = await axios.post("http://localhost:8080/api/order", {
//         ...formData,
//         cartItems,
//         totalPrice,
//       });

//       if (res.data?.success) {
//         alert(
//           "✅ Order Placed Successfully!\n\n" +
//             "Payment: " +
//             formData.payment +
//             "\n" +
//             "Total: ₹" +
//             totalPrice
//         );

//         // ✅ Save order locally to show in Orders page
//         const newOrder = {
//           id: res.data?.orderId || "ORD-" + Math.floor(Math.random() * 1000000),
//           date: new Date().toLocaleString(),
//           items: cartItems,
//           total: totalPrice,
//           status: "Processing"
//         };
//         const existingOrders = JSON.parse(localStorage.getItem("myOrders")) || [];
//         localStorage.setItem("myOrders", JSON.stringify([newOrder, ...existingOrders]));

//         setCartItems([]); // Empty cart
//         navigate("/");
//       } else {
//         alert(res.data?.message || "❌ Order failed, try again");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("⚠️ Server error, please try later");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white p-6">
//       <div className="bg-gray-200 shadow-2xl rounded-2xl p-8 w-full max-w-lg animate-fadeIn">
//         <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
//           🛒 Checkout
//         </h2>

//         {/* Cart Items */}
//         <div className="mb-6">
//           {cartItems.length === 0 ? (
//             <p className="text-gray-500 text-center">Cart is empty</p>
//           ) : (
//             <ul className="divide-y divide-gray-200">
//               {cartItems.map((item, index) => (
//                 <li
//                   key={index}
//                   className="flex justify-between py-2 text-gray-700"
//                 >
//                   <span>
//                     {item.name} × {item.quantity || 1}
//                   </span>
//                   <span>
//                     ₹
//                     {typeof item.price === "string"
//                       ? parseInt(item.price.replace(/\D/g, "")) *
//                         (item.quantity || 1)
//                       : item.price * (item.quantity || 1)}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           )}
//           <div className="flex justify-between mt-4 font-bold text-lg  text-gray-800">
//             <span>Total:</span>
//             <span>₹{totalPrice}</span>
//           </div>
//         </div>

//         {/* Checkout Form */}
//         <form onSubmit={handleOrder} className="space-y-4">
//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full px-4 border rounded-xl shadow-sm focus:outline-none hover:border-pink-400  focus:ring-2 focus:ring-pink-300 focus:border-pink-500 transition duration-300 "
//           />

//           <textarea
//             name="address"
//             placeholder="Address"
//             value={formData.address}
//             onChange={handleChange}
//             className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-pink-300 focus:border-red-500 hover:border-red-500"
//           />

//           <input
//             type="text"
//             name="phone"
//             placeholder="Phone Number"
//             value={formData.phone}
//             onChange={handleChange}
//             className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-pink-300 focus:border-red-500 hover:border-red-500"
//           />

//           {/* Payment Option */}
//           <select
//             name="payment"
//             value={formData.payment}
//             onChange={handleChange}
//             className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-pink-300 focus:border-red-500 hover:border-red-500"
//           >
//             <option value="COD">Cash on Delivery</option>
//             <option value="UPI">UPI</option>
//             <option value="Card">Card Payment</option>
//           </select>

//           {/* Buttons */}
//           <div className="flex justify-between mt-6">
//             <button
//               type="button"
//               onClick={() => navigate("/")}
//               className="px-5 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
//             >
//               ⬅ Back to Home
//             </button>

//             <button
//               type="submit"
//               className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//             >
//               ✅ Place Order
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Checkout;


// import React, { useState } from "react";




import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../api";
import PageHeader from "../components/PageHeader";
import { inputClass, labelClass, primaryBtn, cardClass } from "../ui";

const paymentOptions = [
  { value: "COD", label: "Cash on Delivery", hint: "Delivery par paise do", icon: "💵" },
  { value: "UPI", label: "UPI", hint: "GPay, PhonePe, Paytm", icon: "📲" },
  { value: "Card", label: "Card", hint: "Debit / Credit card", icon: "💳" },
];

const priceOf = (item) =>
  typeof item.price === "string"
    ? parseInt(item.price.replace(/\D/g, ""), 10) || 0
    : Number(item.price) || 0;

const Checkout = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    payment: "COD",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🧮 Total price calculate (sirf dikhane ke liye, asli total server nikalta hai)
  const totalPrice = cartItems.reduce((acc, item) => acc + priceOf(item) * (item.quantity || 1), 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 📌 Handle Order
  const handleOrder = async (e) => {
    e.preventDefault();
    setError("");

    if (cartItems.length === 0) {
      setError("Cart khali hai, pehle kuch add karo.");
      return;
    }
    if (!formData.name.trim() || !formData.address.trim() || !formData.phone.trim()) {
      setError("⚠️ Please fill all details!");
      return;
    }

    setLoading(true);
    try {
      // Sirf id aur quantity bhejte hain. Price server DB se khud nikalta hai.
      const res = await API.post("/api/order", {
        ...formData,
        cartItems: cartItems.map(({ id, quantity }) => ({ id, quantity })),
      });

      if (res.data?.success) {
        setCartItems([]); // Empty cart
        navigate("/orders", { state: { placed: true } }); // Orders page par success banner dikhega
      } else {
        setError(res.data?.message || "❌ Order failed, try again");
      }
    } catch (err) {
      console.error(err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.code === "ECONNABORTED" || err.message === "Network Error") {
        setError("Server se connect nahi ho paaya. Thodi der baad dobara try karo.");
      } else {
        setError("Order nahi ho paaya, dobara try karo.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <PageHeader title="Checkout" />

      <main className="mx-auto grid max-w-5xl gap-6 px-4 py-6 md:px-6 lg:grid-cols-5">
        {/* Left: details + payment */}
        <form id="checkout-form" onSubmit={handleOrder} className="space-y-6 lg:col-span-3">
          <section className={cardClass}>
            <h2 className="mb-4 text-lg font-extrabold text-slate-800">📍 Delivery details</h2>
            <div className="space-y-4">
              <div>
                <label className={labelClass} htmlFor="name">Full name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Apna naam"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="address">Address</label>
                <textarea
                  id="address"
                  name="address"
                  rows={3}
                  placeholder="House no, gali, area, city"
                  value={formData.address}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="phone">Phone number</label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="10 digit mobile number"
                  value={formData.phone}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          <section className={cardClass}>
            <h2 className="mb-4 text-lg font-extrabold text-slate-800">💰 Payment method</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {paymentOptions.map((opt) => {
                const selected = formData.payment === opt.value;
                return (
                  <label
                    key={opt.value}
                    className={`flex cursor-pointer flex-col gap-1 rounded-xl border-2 p-4 transition ${
                      selected
                        ? "border-brand-500 bg-brand-50"
                        : "border-slate-200 bg-white hover:border-brand-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={opt.value}
                      checked={selected}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span className="text-2xl">{opt.icon}</span>
                    <span className="font-bold text-slate-800">{opt.label}</span>
                    <span className="text-xs text-slate-500">{opt.hint}</span>
                  </label>
                );
              })}
            </div>
          </section>
        </form>

        {/* Right: order summary */}
        <aside className="lg:col-span-2">
          <div className={`${cardClass} lg:sticky lg:top-20`}>
            <h2 className="mb-4 text-lg font-extrabold text-slate-800">🧾 Order summary</h2>

            {cartItems.length === 0 ? (
              <div className="py-6 text-center">
                <span className="text-5xl">🛒</span>
                <p className="mt-2 font-semibold text-slate-700">Cart is empty</p>
                <Link to="/" className="mt-3 inline-block font-bold text-brand-600 hover:underline">
                  Browse food
                </Link>
              </div>
            ) : (
              <ul className="divide-y divide-slate-100">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex items-center justify-between gap-3 py-3">
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-slate-800">{item.name}</p>
                      <p className="text-sm text-slate-500">
                        {item.price} × {item.quantity || 1}
                      </p>
                    </div>
                    <span className="font-bold text-slate-800">₹{priceOf(item) * (item.quantity || 1)}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-lg font-extrabold text-slate-800">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>

            {error && (
              <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{error}</p>
            )}

            <button
              type="submit"
              form="checkout-form"
              disabled={loading || cartItems.length === 0}
              className={`${primaryBtn} mt-5`}
            >
              {loading ? "Placing order..." : "Place Order"}
            </button>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Checkout;