import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API } from '../api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    API.get("/api/orders/my")
      .then(({ data }) => {
        if (!cancelled) setOrders(data.orders || []);
      })
      .catch((err) => {
        console.error(err);
        if (!cancelled) setError(err.response?.data?.message || "Orders load nahi ho paaye, thodi der baad try karo.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true; // page band hone ke baad state update na ho
    };
  }, []);

  return (
    <div className="min-h-screen bg-pink-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">My Orders</h2>
          <Link to="/" className="text-pink-600 font-semibold hover:underline">⬅ Home</Link>
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Loading orders...</p>
        ) : error ? (
          <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-red-200 text-center text-red-600">
            {error}
          </div>
        ) : orders.length === 0 ? (
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
            {orders.map((order) => (
              <div key={order._id} className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <div className="flex justify-between items-center mb-4 border-b pb-4">
                  <div>
                    <p className="text-gray-500 text-sm">
                      Order ID: <span className="font-bold text-gray-800">{order._id.slice(-8).toUpperCase()}</span>
                    </p>
                    <p className="text-gray-400 text-xs">{new Date(order.createdAt).toLocaleString()}</p>
                    <p className="text-gray-400 text-xs">Payment: {order.payment}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-800">₹{order.totalPrice}</p>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                      {order.status || "Placed"}
                    </span>
                  </div>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  {order.cartItems.map((item, i) => (
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