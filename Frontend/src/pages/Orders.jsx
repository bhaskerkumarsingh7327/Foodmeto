import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { API } from "../api";
import PageHeader from "../components/PageHeader";

// Order status ke hisaab se rang
const statusStyle = {
  Placed: "bg-blue-100 text-blue-700",
  Preparing: "bg-amber-100 text-amber-700",
  "Out for delivery": "bg-purple-100 text-purple-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

const Orders = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [justPlaced] = useState(Boolean(location.state?.placed)); // Checkout se aane par true

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Banner sirf ek baar dikhe: refresh karne par dobara na aaye
  useEffect(() => {
    if (justPlaced) navigate(location.pathname, { replace: true, state: null });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <div className="min-h-screen bg-stone-50">
      <PageHeader title="My Orders" />

      <main className="mx-auto max-w-3xl px-4 py-6 md:px-6">
        {justPlaced && (
          <div className="mb-5 flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-green-800">
            <span className="text-2xl">✅</span>
            <div>
              <p className="font-bold">Order place ho gaya!</p>
              <p className="text-sm">Aapka order neeche sabse upar dikh raha hai.</p>
            </div>
          </div>
        )}

        {loading ? (
          <div className="space-y-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-32 animate-pulse rounded-2xl bg-slate-200" />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-100 bg-white p-8 text-center font-semibold text-red-600 shadow-sm">
            {error}
          </div>
        ) : orders.length === 0 ? (
          <div className="rounded-2xl border border-slate-100 bg-white p-10 text-center shadow-sm">
            <span className="text-6xl">🍽️</span>
            <p className="mt-3 text-lg font-bold text-slate-800">Abhi tak koi order nahi</p>
            <p className="text-sm text-slate-500">Pehla order place karo aur yahan dikhega.</p>
            <Link
              to="/"
              className="mt-5 inline-block rounded-xl bg-brand-500 px-6 py-2.5 font-bold text-white shadow-lg shadow-brand-500/30 transition hover:bg-brand-600"
            >
              Browse food
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const status = order.status || "Placed";
              return (
                <article key={order._id} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                  <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-4">
                    <div>
                      <p className="text-sm text-slate-500">
                        Order ID{" "}
                        <span className="font-bold text-slate-800">{order._id.slice(-8).toUpperCase()}</span>
                      </p>
                      <p className="mt-0.5 text-xs text-slate-400">{new Date(order.createdAt).toLocaleString()}</p>
                      <p className="text-xs text-slate-400">Payment: {order.payment}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-extrabold text-slate-800">₹{order.totalPrice}</p>
                      <span
                        className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-bold ${
                          statusStyle[status] || "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {status}
                      </span>
                    </div>
                  </div>

                  <ul className="mt-4 space-y-1.5 text-sm text-slate-600">
                    {order.cartItems.map((item, i) => (
                      <li key={i} className="flex justify-between">
                        <span>
                          {item.name} <span className="text-slate-400">× {item.quantity}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Orders;