// import React from 'react'
// import { IoFastFoodSharp } from "react-icons/io5";
// import { FaSearch } from "react-icons/fa";
// import { MdOutlineShoppingCartCheckout } from "react-icons/md";
// const Nav = () => {
//   return (
//     <div className='w-full h-[100px]  flex justify-between items-center px-5 md:px-8'>
      
//       <div className='w-[60px] h-[60px] bg-white flex justify-center items-center  rounded-md shadow-xl '>
//         <IoFastFoodSharp className='w-[30px] h-[30px] text-green-500'/>
//       </div>
//       <form className='w-[40%] h-[60px] bg-white flex items-center px-5  gap-5  rounded-md shadow-xl md:w-[70%]'>
//         <FaSearch className='text-green-500 w-[20px] h-[20px] '/>
//         <input type="text" placeholder='Search Items....' className='w-[100%] outline-none text-[20px] '/>
//       </form>
//       <div className='w-[60px] h-[60px] bg-white flex justify-center items-center rounded-md shadow-xl relative'>
//         <span className='absolute top-0 right-2 text-green-500 font-bold text-[18px]' >0</span>
//           <MdOutlineShoppingCartCheckout className='w-[30px] h-[30px] text-green-500' />
//       </div>
//     </div>
//   )
// }

// export default Nav


// import React from 'react';
// import { IoFastFoodSharp } from "react-icons/io5";
// import { FaSearch } from "react-icons/fa";
// import { MdOutlineShoppingCartCheckout } from "react-icons/md";

// const Nav = ({ cartCount, setCartOpen, searchQuery, setSearchQuery }) => {
//   return (
//     <div className='w-full h-[100px] flex justify-between items-center px-5 md:px-8'>

//       {/* Logo */}
//       <div className='w-[60px] h-[60px] bg-white flex justify-center items-center rounded-md shadow-xl 
//         hover:scale-110 hover:bg-pink-200 hover:shadow-red-500 transition-all duration-300 cursor-pointer'>
//         <IoFastFoodSharp className='w-[30px] h-[30px] text-pink-500' />
//       </div>

//       {/* Search Bar */}
//       <form 
//         className='w-[40%] h-[60px] bg-white flex items-center px-5 gap-5 rounded-md shadow-xl md:w-[70%] 
//         hover:shadow-2xl hover:scale-105 hover:bg-pink-300 hover:shadow-red-500 transition-all duration-300'
//         onSubmit={(e) => e.preventDefault()}
//       >
//         <FaSearch className='text-pink-500 w-[20px] h-[20px] animate-pulse'/>
//         <input 
//           type="text" 
//           placeholder='Search Items....' 
//           className='w-[100%] outline-none text-[20px] placeholder-gray-400 focus:placeholder-transparent transition-all duration-300' 
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//       </form>

//       {/* Cart */}
//       <div className='w-[60px] h-[60px] bg-white flex justify-center items-center rounded-md shadow-xl relative 
//         hover:scale-110 hover:bg-pink-200 hover:shadow-red-500 transition-all duration-300 cursor-pointer'
//         onClick={() => setCartOpen(prev => !prev)}
//       >
//         <span className='absolute top-0 right-2 text-orange-500 font-bold text-[18px]'>{cartCount}</span>
//         <MdOutlineShoppingCartCheckout className='w-[30px] h-[30px] text-pink-500' />
//       </div>
//     </div>
//   )
// }

// export default Nav;





import React from "react";
import { FaSearch, FaShoppingBag } from "react-icons/fa";
import Logo from "./Logo";
import ProfileDropdown from "./ProfileDropdown";

const Nav = ({ cartCount, setCartOpen, searchQuery, setSearchQuery }) => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3 md:flex-nowrap md:gap-6 md:px-6">
        {/* Logo */}
        <Logo className="order-1" />

        {/* Search: mobile par neeche poori width me, desktop par beech me */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="order-3 flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 transition focus-within:border-brand-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-500/20 md:order-2 md:max-w-xl md:flex-1"
        >
          <FaSearch className="h-4 w-4 shrink-0 text-slate-400" />
          <input
            type="text"
            placeholder="Search for dishes..."
            className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        {/* Cart + Profile */}
        <div className="order-2 ml-auto flex items-center gap-3 md:order-3 md:ml-0">
          <button
            onClick={() => setCartOpen((prev) => !prev)}
            aria-label="Open cart"
            className="relative flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 font-semibold text-slate-700 transition hover:border-brand-500 hover:text-brand-600"
          >
            <FaShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-brand-500 px-1 text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
};

export default Nav;