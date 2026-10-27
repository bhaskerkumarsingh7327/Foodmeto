import React from "react";
import { Link } from "react-router-dom";
import { IoFastFoodSharp } from "react-icons/io5";

export default function Logo({ className = "" }) {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 text-white shadow-md shadow-brand-500/30">
        <IoFastFoodSharp className="h-5 w-5" />
      </span>
      <span className="text-xl font-extrabold tracking-tight text-slate-800">
        Food<span className="text-brand-500">meto</span>
      </span>
    </Link>
  );
}