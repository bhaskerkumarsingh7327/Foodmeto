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





import React from 'react';
import { IoFastFoodSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { RiSecurePaymentFill } from "react-icons/ri"; // ✅ Payment Icon
import { Link } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown"; // ✅ Profile Dropdown Import kiya

const Nav = ({ cartCount, setCartOpen, searchQuery, setSearchQuery }) => {
  return (
    <div className='w-full h-[100px] flex justify-between items-center px-5 md:px-8'>

      {/* 🍔 Left Section (Profile + Logo) */}
      <div className="flex items-center gap-4">
        {/* ✅ User Profile Dropdown Moved to Left */}
        <ProfileDropdown />

        {/* Logo */}
        <div className='w-[60px] h-[60px] bg-white flex justify-center items-center rounded-md shadow-xl 
          hover:scale-110 hover:bg-pink-200 hover:shadow-red-500 transition-all duration-300 cursor-pointer'>
          <IoFastFoodSharp className='w-[30px] h-[30px] text-pink-500' />
        </div>
      </div>

      {/* 🔍 Search Bar */}
      <form 
        className='w-[40%] h-[60px] bg-white flex items-center px-5 gap-5 rounded-md shadow-xl md:w-[70%] 
        hover:shadow-2xl hover:scale-105 hover:bg-pink-300 hover:shadow-red-500 transition-all duration-300'
        onSubmit={(e) => e.preventDefault()}
      >
        <FaSearch className='text-pink-500 w-[20px] h-[20px] animate-pulse'/>
        <input 
          type="text" 
          placeholder='Search Items....' 
          className='w-[100%] outline-none text-[20px] placeholder-gray-400 focus:placeholder-transparent transition-all duration-300' 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>

      {/* 🛒 Cart + Checkout */}
      <div className="flex gap-4 items-center">
        
        {/* Cart */}
        <div 
          className='w-[60px] h-[60px] bg-white flex justify-center items-center rounded-md shadow-xl relative 
          hover:scale-110 hover:bg-pink-200 hover:shadow-red-500 transition-all duration-300 cursor-pointer'
          onClick={() => setCartOpen(prev => !prev)}
        >
          <span className='absolute top-0 right-2 text-orange-500 font-bold text-[18px]'>
            {cartCount}
          </span>
          <MdOutlineShoppingCartCheckout className='w-[30px] h-[30px] text-pink-500' />
        </div>

        {/* ✅ Checkout Button with Gradient + Glow */}
        <Link to="/checkout">
          <div className='flex items-center gap-2 px-5 py-2 rounded-xl shadow-xl font-semibold text-white
            bg-gradient-to-r from-pink-500 via-red-400 to-orange-400
            hover:scale-110 hover:shadow-[0_0_20px_rgba(255,0,100,0.7)] transition-all duration-300 cursor-pointer'>
            <RiSecurePaymentFill className="w-[22px] h-[22px] text-white drop-shadow-lg" />
            <span className="tracking-wide">Checkout</span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Nav;