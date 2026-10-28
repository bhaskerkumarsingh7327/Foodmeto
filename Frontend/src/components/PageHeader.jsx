import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Logo from "./Logo";

// Checkout / Orders / Account jaise andar ke pages ka upar wala bar
export default function PageHeader({ title, backTo = "/", backLabel = "Back to home" }) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <Link
            to={backTo}
            aria-label={backLabel}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-brand-500 hover:text-brand-600"
          >
            <FaArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-lg font-extrabold text-slate-800">{title}</h1>
        </div>
        <div className="hidden sm:block">
          <Logo />
        </div>
      </div>
    </header>
  );
}