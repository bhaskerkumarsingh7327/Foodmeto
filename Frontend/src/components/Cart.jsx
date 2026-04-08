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


import React from 'react';
import { useNavigate } from 'react-router-dom';  // ✅ Add this

export default function Cart({ cartItems, setCartItems, setCartOpen }) {
  const navigate = useNavigate(); // ✅ Initialize navigate

  const totalPrice = cartItems.reduce((acc, item) => {
    const price = parseInt(item.price.replace("₹",""));
    return acc + price * item.quantity;
  }, 0);

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  }

  const changeQuantity = (id, delta) => {
    setCartItems(cartItems.map(item =>
      item.id === id 
        ? { ...item, quantity: Math.max(item.quantity + delta, 1) } 
        : item
    ));
  }

  return (
    <div className="fixed top-0 right-0 w-full sm:w-[350px] h-full bg-white shadow-2xl p-6 z-50 transition-transform animate-slide-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Cart</h2>
        <button onClick={() => setCartOpen(false)} className="text-red-500 font-bold">X</button>
      </div>

      <div className="overflow-y-auto h-[70%] space-y-4">
        {cartItems.map(item => (
          <div key={item.id} className="flex justify-between items-center p-2 border rounded shadow-sm hover:shadow-lg transition">
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-gray-500">{item.price} x {item.quantity}</p>
              <div className="flex gap-2 mt-1">
                <button onClick={() => changeQuantity(item.id, -1)} className="px-2 py-1 bg-gray-200 rounded">-</button>
                <button onClick={() => changeQuantity(item.id, 1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
              </div>
            </div>
            <button onClick={() => removeItem(item.id)} className="text-red-500 font-bold">Remove</button>
          </div>
        ))}
      </div>

      <div className="mt-4 border-t pt-4">
        <p className="text-lg font-bold">Total: ₹{totalPrice}</p>
        <button 
          onClick={() => { 
            setCartOpen(false);   // ✅ Cart band hoga
            navigate("/checkout"); // ✅ Checkout page khulega
          }} 
          className="w-full mt-2 py-2 bg-pink-500 text-white font-semibold rounded hover:bg-pink-600 transition"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}