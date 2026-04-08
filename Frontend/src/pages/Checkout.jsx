// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

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

//   // 📌 Handle input change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // 📌 Handle Order
//   const handleOrder = (e) => {
//     e.preventDefault();

//     if (!formData.name || !formData.address || !formData.phone) {
//       alert("⚠️ Please fill all details!");
//       return;
//     }

//     // alert(
//     //   ✅ Order Placed Successfully!\n\nPayment: ${formData.payment}\nTotal: ₹${totalPrice}
//     // );
//     alert(
//   "✅ Order Placed Successfully!\n\n" +
//   "Payment: " + formData.payment + "\n" +
//   "Total: ₹" + totalPrice
// );

//     setCartItems([]); // cart empty
//     navigate("/"); // home pe redirect
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
//             className="w-full px-4 border rounded-xl shadow-sm focus:outline-none hover:border-pink400  focus:ring-2 focus:ring-pink-300 focus:border-pink-500 transition duration-300 "
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




import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    payment: "COD",
  });

  // 🧮 Total price calculate
  const totalPrice = cartItems.reduce((acc, item) => {
    const price =
      typeof item.price === "string"
        ? parseInt(item.price.replace(/\D/g, "")) || 0
        : Number(item.price) || 0;

    const qty = item.quantity || 1;
    return acc + price * qty;
  }, 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 📌 Handle Order
  const handleOrder = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.address || !formData.phone) {
      alert("⚠️ Please fill all details!");
      return;
    }

    try {
      // ✅ Order API call
      const res = await axios.post("http://localhost:8080/api/order", {
        ...formData,
        cartItems,
        totalPrice,
      });

      if (res.data?.success) {
        alert(
          "✅ Order Placed Successfully!\n\n" +
            "Payment: " +
            formData.payment +
            "\n" +
            "Total: ₹" +
            totalPrice
        );

        // ✅ Save order locally to show in Orders page
        const newOrder = {
          id: res.data?.orderId || "ORD-" + Math.floor(Math.random() * 1000000),
          date: new Date().toLocaleString(),
          items: cartItems,
          total: totalPrice,
          status: "Processing"
        };
        const existingOrders = JSON.parse(localStorage.getItem("myOrders")) || [];
        localStorage.setItem("myOrders", JSON.stringify([newOrder, ...existingOrders]));

        setCartItems([]); // Empty cart
        navigate("/");
      } else {
        alert(res.data?.message || "❌ Order failed, try again");
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Server error, please try later");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="bg-gray-200 shadow-2xl rounded-2xl p-8 w-full max-w-lg animate-fadeIn">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          🛒 Checkout
        </h2>

        {/* Cart Items */}
        <div className="mb-6">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center">Cart is empty</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between py-2 text-gray-700"
                >
                  <span>
                    {item.name} × {item.quantity || 1}
                  </span>
                  <span>
                    ₹
                    {typeof item.price === "string"
                      ? parseInt(item.price.replace(/\D/g, "")) *
                        (item.quantity || 1)
                      : item.price * (item.quantity || 1)}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <div className="flex justify-between mt-4 font-bold text-lg  text-gray-800">
            <span>Total:</span>
            <span>₹{totalPrice}</span>
          </div>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleOrder} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 border rounded-xl shadow-sm focus:outline-none hover:border-pink-400  focus:ring-2 focus:ring-pink-300 focus:border-pink-500 transition duration-300 "
          />

          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-pink-300 focus:border-red-500 hover:border-red-500"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-pink-300 focus:border-red-500 hover:border-red-500"
          />

          {/* Payment Option */}
          <select
            name="payment"
            value={formData.payment}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-pink-300 focus:border-red-500 hover:border-red-500"
          >
            <option value="COD">Cash on Delivery</option>
            <option value="UPI">UPI</option>
            <option value="Card">Card Payment</option>
          </select>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-5 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
            >
              ⬅ Back to Home
            </button>

            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              ✅ Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;