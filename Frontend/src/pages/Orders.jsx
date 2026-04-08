import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // ✅ Fetch orders from local storage
    const savedOrders = JSON.parse(localStorage.getItem("myOrders")) || [];
    setOrders(savedOrders);
  }, []);

  return (
    <div className="min-h-screen bg-pink-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">My Orders</h2>
        
        {orders.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-pink-200 text-center">
            <p className="text-gray-600 text-lg mb-4">You don't have any past orders yet.</p>
            <Link to="/">
              <button className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:scale-105 transition-transform">
                Browse Food
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <div className="flex justify-between items-center mb-4 border-b pb-4">
                  <div>
                    <p className="text-gray-500 text-sm">Order ID: <span className="font-bold text-gray-800">{order.id}</span></p>
                    <p className="text-gray-400 text-xs">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-800">₹{order.total}</p>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">{order.status}</span>
                  </div>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  {order.items.map((item, i) => (
                    <li key={i}>{item.name} × {item.quantity}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;