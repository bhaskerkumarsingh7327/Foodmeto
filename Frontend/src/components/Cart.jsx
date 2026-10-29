// import React from 'react';

// export default function Cart({ cartItems, setCartItems, setCartOpen }) {
//   const totalPrice = cartItems.reduce((acc, item) => {
//     const price = parseInt(item.price.replace("₹",""));
//     return acc + price * item.quantity;
//   }, 0);

//   const removeItem = (id) => {
//     setCartItems(cartItems.filter(item => item.id !== id));
//   }

//   const changeQuantity = (id, delta) => {
//     setCartItems(cartItems.map(item =>
//       item.id === id 
//         ? { ...item, quantity: Math.max(item.quantity + delta, 1) } 
//         : item
//     ));
//   }

//   return (
//     <div className="fixed top-0 right-0 w-[350px] h-full bg-white shadow-2xl p-6 z-50 transition-transform animate-slide-in">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold">Cart</h2>
//         <button onClick={() => setCartOpen(false)} className="text-red-500 font-bold">X</button>
//       </div>

//       <div className="overflow-y-auto h-[70%] space-y-4">
//         {cartItems.map(item => (
//           <div key={item.id} className="flex justify-between items-center p-2 border rounded shadow-sm hover:shadow-lg transition">
//             <div>
//               <p className="font-semibold">{item.name}</p>
//               <p className="text-gray-500">{item.price} x {item.quantity}</p>
//               <div className="flex gap-2 mt-1">
//                 <button onClick={() => changeQuantity(item.id, -1)} className="px-2 py-1 bg-gray-200 rounded">-</button>
//                 <button onClick={() => changeQuantity(item.id, 1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
//               </div>
//             </div>
//             <button onClick={() => removeItem(item.id)} className="text-red-500 font-bold">Remove</button>
//           </div>
//         ))}
//       </div>

//       <div className="mt-4 border-t pt-4">
//         <p className="text-lg font-bold">Total: ₹{totalPrice}</p>
//         <button className="w-full mt-2 py-2 bg-pink-500 text-white font-semibold rounded hover:bg-pink-600 transition">
//           Checkout
//         </button>
//       </div>
//     </div>
//   );
// }


import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes, FaPlus, FaMinus, FaTrashAlt } from "react-icons/fa";
import { getItemImage } from "../menuImages";

const priceOf = (item) => parseInt(String(item.price).replace(/\D/g, ""), 10) || 0;

export default function Cart({ cartItems, setCartItems, setCartOpen }) {
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((acc, item) => acc + priceOf(item) * item.quantity, 0);
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // +1 / -1. Quantity 0 ho jaye to item cart se hat jata hai
  const changeQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Peeche ka dhundhla parda: click karne par cart band */}
      <div className="absolute inset-0 animate-fade-in bg-slate-900/40" onClick={() => setCartOpen(false)} />

      <aside className="relative flex h-full w-full animate-slide-in flex-col bg-white shadow-2xl sm:w-[400px]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <h2 className="text-lg font-extrabold text-slate-800">Your Cart</h2>
            <p className="text-sm text-slate-500">
              {cartItems[0]?.restaurantName ? `${cartItems[0].restaurantName} · ` : ""}
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {cartItems.length > 0 && (
              <button
                onClick={() => setCartItems([])}
                className="text-sm font-semibold text-red-500 transition hover:underline"
              >
                Clear cart
              </button>
            )}
            <button
              onClick={() => setCartOpen(false)}
              aria-label="Close cart"
              className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* Items */}
        {cartItems.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <span className="text-6xl">🛒</span>
            <h3 className="mt-4 text-lg font-bold text-slate-800">Your cart is empty</h3>
            <p className="mt-1 text-sm text-slate-500">Kuch tasty add karo aur yahan wapas aao.</p>
            <button
              onClick={() => setCartOpen(false)}
              className="mt-6 rounded-xl bg-brand-500 px-6 py-2.5 font-bold text-white shadow-lg shadow-brand-500/30 transition hover:bg-brand-600"
            >
              Browse food
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 rounded-2xl border border-slate-100 p-3">
                  {getItemImage(item) && (
                    <img src={getItemImage(item)} alt={item.name} className="h-16 w-16 shrink-0 rounded-xl object-cover" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-bold text-slate-800">{item.name}</p>
                    <p className="text-sm text-slate-500">₹{priceOf(item)} each</p>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex items-center overflow-hidden rounded-lg border border-brand-500">
                        <button
                          onClick={() => changeQuantity(item.id, -1)}
                          aria-label="Decrease quantity"
                          className="px-2.5 py-1.5 text-brand-600 transition hover:bg-brand-50"
                        >
                          <FaMinus className="h-3 w-3" />
                        </button>
                        <span className="min-w-[28px] text-center text-sm font-bold text-slate-800">{item.quantity}</span>
                        <button
                          onClick={() => changeQuantity(item.id, 1)}
                          aria-label="Increase quantity"
                          className="px-2.5 py-1.5 text-brand-600 transition hover:bg-brand-50"
                        >
                          <FaPlus className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        aria-label="Remove item"
                        className="text-slate-400 transition hover:text-red-500"
                      >
                        <FaTrashAlt className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <p className="font-extrabold text-slate-800">₹{priceOf(item) * item.quantity}</p>
                </div>
              ))}
            </div>

            {/* Bill + Checkout */}
            <div className="border-t border-slate-100 px-5 py-4">
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>Item total</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-lg font-extrabold text-slate-800">
                <span>To pay</span>
                <span>₹{totalPrice}</span>
              </div>
              <button
                onClick={() => {
                  setCartOpen(false);
                  navigate("/checkout");
                }}
                className="mt-4 w-full rounded-xl bg-brand-500 py-3 font-bold text-white shadow-lg shadow-brand-500/30 transition hover:bg-brand-600"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}