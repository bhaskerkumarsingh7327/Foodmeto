import React from "react";
import { FaStar, FaPlus, FaMinus } from "react-icons/fa";

// Veg / Non-Veg ka chhota nishaan (hara = veg, laal = non-veg)
const VegMark = ({ type }) => {
  const veg = type === "Veg";
  return (
    <span
      title={type}
      className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border-2 ${
        veg ? "border-green-600" : "border-red-600"
      }`}
    >
      <span className={`h-2 w-2 rounded-full ${veg ? "bg-green-600" : "bg-red-600"}`} />
    </span>
  );
};

// Ek dish ka card. item.displayImage = dikhane wali photo (link ya local)
export default function FoodCard({ item, qty, onAdd, onDecrease, disabled = false }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-44 overflow-hidden bg-slate-100">
        {item.displayImage ? (
          <img
            src={item.displayImage}
            alt={item.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-100 to-orange-200 text-6xl">
            🍽️
          </div>
        )}
        {item.discountPercent > 0 && (
          <span className="absolute bottom-3 left-3 rounded-md bg-slate-900/80 px-2 py-1 text-xs font-bold text-white backdrop-blur">
            {item.discountPercent}% OFF
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold leading-snug text-slate-800">{item.name}</h3>
          <VegMark type={item.type} />
        </div>

        <div className="mt-1.5 flex items-center gap-2 text-sm text-slate-500">
          {item.rating > 0 && (
            <span className="flex items-center gap-1 rounded-md bg-green-600 px-1.5 py-0.5 text-xs font-bold text-white">
              <FaStar className="h-2.5 w-2.5" /> {item.rating}
            </span>
          )}
          <span>{item.category}</span>
        </div>

        {item.description && <p className="mt-2 line-clamp-2 text-sm text-slate-500">{item.description}</p>}

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-lg font-extrabold text-slate-800">₹{item.price}</span>

          {qty === 0 ? (
            <button
              onClick={onAdd}
              disabled={disabled}
              className="rounded-lg border border-brand-500 px-6 py-1.5 text-sm font-extrabold uppercase text-brand-600 transition hover:bg-brand-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-brand-600"
            >
              Add
            </button>
          ) : (
            <div className="flex items-center overflow-hidden rounded-lg border border-brand-500 bg-brand-500 text-white">
              <button onClick={onDecrease} aria-label="Decrease quantity" className="px-3 py-2 transition hover:bg-brand-600">
                <FaMinus className="h-3 w-3" />
              </button>
              <span className="min-w-[28px] text-center text-sm font-extrabold">{qty}</span>
              <button onClick={onAdd} aria-label="Increase quantity" className="px-3 py-2 transition hover:bg-brand-600">
                <FaPlus className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}