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

export default function Category({ onSelect, selectedCategory }) {
  const categories = [
    { id: 1, name: "All", icon: <FaBorderAll size={28} /> },
    { id: 2, name: "Breakfast", icon: <MdFreeBreakfast size={28} /> },
    { id: 3, name: "Soup", icon: <TbSoup size={28} /> },
    { id: 4, name: "Pasta", icon: <FaPastafarianism size={28} /> },
    { id: 5, name: "Main Course", icon: <FaBorderAll size={28} /> },
    { id: 6, name: "Pizza", icon: <FaPizzaSlice size={28} /> },
    { id: 7, name: "Burger", icon: <PiHamburgerFill size={28} /> },
  ];

  return (
    <div className="flex flex-row space-x-4 p-4 overflow-x-auto">
      {categories.map((item) => (
        <div
          key={item.id}
          onClick={() => onSelect(item.name)}
          className={`relative flex flex-col items-center justify-center p-4 rounded-xl shadow-lg transition transform bg-pink-200 border-2 cursor-pointer hover:scale-105 hover:shadow-red-500 ${
            selectedCategory === item.name
              ? "bg-pink-500 text-white shadow-xl scale-105"
              : ""
          }`}
        >
          {item.icon}
          {item.name}
        </div>
      ))}
    </div>
  );
}