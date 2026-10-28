import React from "react";
import { IoFastFoodSharp } from "react-icons/io5";

// Login / Signup / Forgot password / OTP sab isi layout me
export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Left: brand panel (sirf bade screen par) */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-brand-500 via-orange-500 to-red-500 p-12 text-white lg:flex">
        <div className="flex items-center gap-2">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
            <IoFastFoodSharp className="h-6 w-6" />
          </span>
          <span className="text-2xl font-extrabold tracking-tight">Foodmeto</span>
        </div>

        <div className="relative z-10">
          <h2 className="text-4xl font-extrabold leading-tight xl:text-5xl">
            Swaad seedha
            <br />
            aapke ghar tak.
          </h2>
          <p className="mt-4 max-w-sm text-lg text-white/90">
            Apna favourite khana chuno, cart me daalo, aur kuch hi der me order place karo.
          </p>
          <ul className="mt-8 space-y-3 text-white/95">
            <li className="flex items-center gap-3">🍕 <span>Pizza, pasta, burger aur bahut kuch</span></li>
            <li className="flex items-center gap-3">⚡ <span>Fast aur easy checkout</span></li>
            <li className="flex items-center gap-3">📦 <span>Apne saare orders ek jagah</span></li>
          </ul>
        </div>

        <span className="pointer-events-none absolute -bottom-10 -right-6 select-none text-[11rem] opacity-20">🍔</span>
        <span className="pointer-events-none absolute -top-8 right-10 select-none text-8xl opacity-20">🍜</span>
      </div>

      {/* Right: form */}
      <div className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-md animate-fade-up">
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 text-white shadow-md shadow-brand-500/30">
              <IoFastFoodSharp className="h-5 w-5" />
            </span>
            <span className="text-xl font-extrabold tracking-tight">
              Food<span className="text-brand-500">meto</span>
            </span>
          </div>

          <h1 className="text-3xl font-extrabold text-slate-900">{title}</h1>
          {subtitle && <p className="mt-2 text-slate-500">{subtitle}</p>}

          <div className="mt-8">{children}</div>

          {footer && <div className="mt-8 text-center text-sm text-slate-500">{footer}</div>}
        </div>
      </div>
    </div>
  );
}