// import React from "react";
// import { FaBorderAll } from "react-icons/fa";
// import { MdFreeBreakfast, MdDomain } from "react-icons/md";
// import { TbSoup } from "react-icons/tb";
// import { FaPastafarianism, FaPizzaSlice } from "react-icons/fa";
// import { PiHamburgerFill } from "react-icons/pi";

// export default function Category() {
//   // categories ka data
//   const categories = [
//     {
//       id: 1,
//       name: "All",
//       icon: <FaBorderAll className="w-[60px] h-[60px] text-green-600" />,
//     },
//     {
//       id: 2,
//       name: "Breakfast",
//       icon: <MdFreeBreakfast className="w-[60px] h-[60px] text-green-600" />,
//     },
//     {
//       id: 3,
//       name: "Soup",
//       icon: <TbSoup className="w-[60px] h-[60px] text-green-600" />,
//     },
//     {
//       id: 4,
//       name: "Pasta",
//       icon: <FaPastafarianism className="w-[60px] h-[60px] text-green-600" />,
//     },
//     {
//       id: 5,
//       name: "Main Course",
//       icon: <MdDomain className="w-[60px] h-[60px] text-green-600" />,
//     },
//     {
//       id: 6,
//       name: "Pizza",
//       icon: <FaPizzaSlice className="w-[60px] h-[60px] text-green-600" />,
//     },
//     {
//       id: 7,
//       name: "Burger",
//       icon: <PiHamburgerFill className="w-[60px] h-[60px] text-green-600" />,
//     },
//   ];

//   // render UI
//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Categories</h2>
//       <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-4">
//         {categories.map((item) => (
//           <div
//             key={item.id}
//             className=" flex flex-col items-center justify-center p-3 bg-gray-100 rounded-2xl shadow-xl hover:shadow-xl hover:scale-105 transition-all duration-300  hover:bg-green-300 cursor-pointer"
//           >
//             {item.icon}
//             <span className="mt-2 text-black-200font-medium">{item.name}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import React from "react";
import { FaBorderAll, FaPastafarianism, FaPizzaSlice } from "react-icons/fa";
import { MdFreeBreakfast } from "react-icons/md";
import { TbSoup } from "react-icons/tb";
import { PiHamburgerFill } from "react-icons/pi";
import { IoFastFoodSharp } from "react-icons/io5";

export default function Category({ onSelect, selectedCategory }) {
  const categories = [
    { id: 1, name: "All", icon: <FaBorderAll size={16} /> },
    { id: 2, name: "Breakfast", icon: <MdFreeBreakfast size={18} /> },
    { id: 3, name: "Soup", icon: <TbSoup size={18} /> },
    { id: 4, name: "Pasta", icon: <FaPastafarianism size={16} /> },
    { id: 5, name: "Main Course", icon: <IoFastFoodSharp size={18} /> },
    { id: 6, name: "Pizza", icon: <FaPizzaSlice size={16} /> },
    { id: 7, name: "Burger", icon: <PiHamburgerFill size={18} /> },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 pt-6 md:px-6">
      <h2 className="mb-3 text-lg font-extrabold text-slate-800">What's on your mind?</h2>
      <div className="no-scrollbar flex gap-3 overflow-x-auto pb-2">
        {categories.map((item) => {
          const active = selectedCategory === item.name;
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.name)}
              className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
                active
                  ? "border-brand-500 bg-brand-500 text-white shadow-md shadow-brand-500/30"
                  : "border-slate-200 bg-white text-slate-600 hover:border-brand-300 hover:text-brand-600"
              }`}
            >
              {item.icon}
              {item.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}