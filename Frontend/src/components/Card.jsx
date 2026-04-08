// import img1 from "../assets/image1.avif";
// import img2 from "../assets/image2.avif";
// import img3 from "../assets/image3.avif";
// import img4 from "../assets/image4.avif";
// import img5 from "../assets/image5.avif";
// import img6 from "../assets/image6.avif";
// import img7 from "../assets/image7.avif";
// import img8 from "../assets/image8.avif";
// import img9 from "../assets/image9.avif";
// import img10 from "../assets/image10.avif";
// import img11 from "../assets/image11.avif";
// import img12 from "../assets/image12.avif";
// import img13 from "../assets/image13.avif";
// import img14 from "../assets/image14.webp";
// import img15 from "../assets/image15.avif";
// import img16 from "../assets/image16.avif";
// import img17 from "../assets/image17.avif";
// import img18 from "../assets/image18.avif";
// import img19 from "../assets/image19.avif";
// import img20 from "../assets/image20.avif";
// import img21 from "../assets/image21.avif";
// import img22 from "../assets/image22.avif";
// import img23 from "../assets/image23.avif";
// import img24 from "../assets/image24.avif";
// import img25 from "../assets/image25.avif";

// const foods = [
//   { id: 1, name: "pancakes", price: "₹180", type: "Veg", image: img1 },
//   { id: 2, name: "Chicken Biryani", price: "₹220", type: "Non-Veg", image: img2 },
//   { id: 3, name: "Dal Tadka", price: "₹120", type: "Veg", image: img3 },
//   { id: 4, name: "Shahi Paneer", price: "₹200", type: "Veg", image: img4 },
//   { id: 5, name: "Mutton Curry", price: "₹280", type: "Non-Veg", image: img5 },
//   { id: 6, name: "Veg Pulao", price: "₹150", type: "Veg", image: img6 },
//   { id: 7, name: "Fish Fry", price: "₹250", type: "Non-Veg", image: img7 },
//   { id: 8, name: "Aloo Gobi", price: "₹100", type: "Veg", image: img8 },
//   { id: 9, name: "Butter Naan", price: "₹40", type: "Veg", image: img9 },
//   { id: 10, name: "Egg Curry", price: "₹160", type: "Non-Veg", image: img10 },
//   { id: 11, name: "Chole Bhature", price: "₹120", type: "Veg", image: img11 },
//   { id: 12, name: "Prawn Masala", price: "₹300", type: "Non-Veg", image: img12 },
//   { id: 13, name: "Palak Paneer", price: "₹180", type: "Veg", image: img13 },
//   { id: 14, name: "Veg Burger", price: "₹90", type: "Veg", image: img14 },
//   { id: 15, name: "Chicken Tandoori", price: "₹260", type: "Non-Veg", image: img15 },
//   { id: 16, name: "Masala Dosa", price: "₹100", type: "Veg", image: img16 },
//   { id: 17, name: "Mutton Biryani", price: "₹280", type: "Non-Veg", image: img17 },
//   { id: 18, name: "Idli Sambar", price: "₹80", type: "Veg", image: img18 },
//   { id: 19, name: "Paneer Tikka", price: "₹200", type: "Veg", image: img19 },
//   { id: 20, name: "Chicken Curry", price: "₹220", type: "Non-Veg", image: img20 },
//   { id: 21, name: "Veg Momos", price: "₹90", type: "Veg", image: img21 },
//   { id: 22, name: "Chicken Momos", price: "₹110", type: "Non-Veg", image: img22 },
//   { id: 23, name: "Rajma Chawal", price: "₹140", type: "Veg", image: img23 },
//   { id: 24, name: "Keema Naan", price: "₹180", type: "Non-Veg", image: img24 },
//   { id: 25, name: "Gulab Jamun", price: "₹60", type: "Veg", image: img25 },
// ];

// export default function Card() {
//   return (
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
//       {foods.map((item) => (
//         <div
//           key={item.id}
//           className={`p-4 rounded-xl shadow-lg hover:scale-105 transition border-2 ${
//             item.type === "Veg" ? "border-green-400" : "border-red-400 " 
//           }`}
//         >
//           <img
//             src={item.image}
//             alt={item.name}
//             className="w-full h-36 object-cover rounded-lg"
//           />
//           <p className="mt-3 text-center font-bold text-lg text-gray-800">
//             {item.name}
//           </p>
//           <p className="text-center flex flex-row text-gray-600">{item.price}</p>
//           <p
//             className={` flex item-center gap-2 font-semibold  justify-center ${
//               item.type === "Veg" ? "text-green-600" : "text-red-600"
//             }`}
//           >
//             {item.type}
//           </p>
//           <button className="mt-3 w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-2 rounded-lg hover:from-yellow-500 hover:to-orange-600 transition">
//             Add to Dish
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }





import img1 from "../assets/image1.avif";
import img2 from "../assets/image2.avif";
import img3 from "../assets/image3.avif";
import img4 from "../assets/image4.avif";
import img5 from "../assets/image5.avif";
import img6 from "../assets/image6.avif";
import img7 from "../assets/image7.avif";
import img8 from "../assets/image8.avif";
import img9 from "../assets/image9.avif";
import img10 from "../assets/image10.avif";
import img11 from "../assets/image11.avif";
import img12 from "../assets/image12.avif";
import img13 from "../assets/image13.avif";
import img14 from "../assets/image14.webp";
import img15 from "../assets/image15.avif";
import img16 from "../assets/image16.avif";
import img17 from "../assets/image17.avif";
import img18 from "../assets/image18.avif";
import img19 from "../assets/image19.avif";
import img20 from "../assets/image20.avif";
import img21 from "../assets/image21.avif";
import img22 from "../assets/image22.avif";
import img23 from "../assets/image23.avif";
import img24 from "../assets/image24.avif";
import img25 from "../assets/image25.avif";

const foods = [
  { id: 1, name: "pancakes", price: "₹180", type: "Veg", rating: 4.5, discount: "-20%", image: img1, category: "Breakfast" },
  { id: 2, name: "Chicken Soup", price: "₹220", type: "Non-Veg", rating: 4.7, discount: "-15%", image: img2, category: "Soups" },
  { id: 3, name: "Minestrone Soup", price: "₹120", type: "Veg", rating: 4.2, discount: "-10%", image: img3, category: "Soups" },
  { id: 4, name: " Spaghetti Carbonara", price: "₹200", type: "Veg", rating: 4.6, discount: "-25%", image: img4, category: "Pasta" },
  { id: 5, name: "Veg Alfredo Pasta", price: "₹280", type: "Veg", rating: 4.8, discount: "-12%", image: img5, category: "Pasta" },
  { id: 6, name: "Chicken Alfredo Pasta", price: "₹150", type: "Non-Veg", rating: 4.1, discount: "-18%", image: img6, category: "Pasta" },
  { id: 7, name: "Paneer Butter Masala", price: "₹250", type: "Veg", rating: 4.4, discount: "-20%", image: img7, category: "Main course" },
  { id: 8, name: " Chicken Biryani", price: "₹100", type: "Non-Veg", rating: 4.0, discount: "-15%", image: img8, category: "Main course" },
  { id: 9, name: "Margherita Pizza", price: "₹40", type: "Veg", rating: 4.3, discount: "-5%", image: img9, category: "Pizza" },
  { id: 10, name: "Pepperoni Pizza", price: "₹160", type: "Veg", rating: 4.2, discount: "-10%", image: img10, category: "Pizza" },
  { id: 11, name: "Veggie Burger", price: "₹120", type: "Veg", rating: 4.5, discount: "-22%", image: img11, category: "Burger" },
  { id: 12, name: "Chicken Burger", price: "₹300", type: "Non-Veg", rating: 4.6, discount: "-18%", image: img12, category: "Burger" },
  { id: 13, name: "Tomato Soup", price: "₹180", type: "Veg", rating: 4.3, discount: "-12%", image: img13, category: "Soup" },
  { id: 14, name: "Egg Sandwich", price: "₹90", type: "Non-Veg", rating: 4.1, discount: "-8%", image: img14, category: "Breakfast" },
  { id: 15, name: "Mushroom Soup", price: "₹260", type: "Veg", rating: 4.8, discount: "-20%", image: img15, category: "soups" },
  { id: 16, name: "Chicken Tikka Masala", price: "₹100", type: "Non-Veg", rating: 4.4, discount: "-15%", image: img16, category: "Main course" },
  { id: 17, name: "Cheese Omelette", price: "₹280", type: "Veg", rating: 4.7, discount: "-18%", image: img17, category: "Breakfast" },
  { id: 18, name: "Fettuccine Alfredo", price: "₹80", type: "Veg", rating: 4.2, discount: "-10%", image: img18, category: "Pasata" },
  { id: 19, name: "Garlic Bread", price: "₹200", type: "Veg", rating: 4.5, discount: "-25%", image: img19, category: "Pizza" },
  { id: 20, name: "Fish and Chips", price: "₹220", type: "Non-Veg", rating: 4.6, discount: "-20%", image: img20, category: "Main course" },
  { id: 21, name: "Hash Browns", price: "₹90", type: "Veg", rating: 4.3, discount: "-15%", image: img21, category: "Breakfast" },
  { id: 22, name: "Vegetable Soup", price: "₹110", type: "Veg", rating: 4.4, discount: "-12%", image: img22, category: "Soup" },
  { id: 23, name: "Egg Fried Rice", price: "₹140", type: "Non-Veg", rating: 4.2, discount: "-18%", image: img23, category: "Main course" },
  { id: 24, name: "Hawaiian Pizza", price: "₹180", type: "Non-Veg", rating: 4.5, discount: "-20%", image: img24, category: "Pizza" },
  { id: 25, name: "Pasta Primavera", price: "₹60", type: "Veg", rating: 4.7, discount: "-10%", image: img25, category: "Pasta" },
];

export default function Card({ selectedCategory, cartItems, setCartItems, searchQuery }) {
  const searchedFoods = foods.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
      {searchedFoods.map((item) => (
        <div
          key={item.id}
          className="relative p-4 rounded-xl shadow-xl transition transform bg-pink-300 border-2 border-gray-200 hover:border-red-500 hover:scale-105 hover:shadow-red-500"
        >
          {/* ✅ Discount Tag with Animation */}
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded animate-bounce">
            {item.discount}
          </span>

          {/* Image */}
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-36 object-cover rounded-lg"
          />

          {/* Food Name */}
          <h3 className="text-center font-bold text-lg text-gray-800 mt-2">{item.name}</h3>

          {/* Price & Type */}
          <div className="flex justify-between items-center mt-2">
            <span className="text-gray-700 font-semibold">{item.price}</span>
            <span className="text-sm text-gray-500">{item.type}</span>
          </div>

          {/* Rating */}
          <div className="flex justify-center mt-1 text-red-500">
            {"⭐".repeat(Math.floor(item.rating))} ({item.rating})
          </div>

          {/* ✅ Add to Dish Button */}
          <button
            onClick={() => setCartItems([...cartItems, { ...item, quantity: 1 }])}
            className={`w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-2 rounded-lg font-semibold mt-3 transition
              ${item.type === "Veg"
                ? "hover:bg-green-500 hover:from-green-500 hover:to-green-500"
                : "hover:bg-red-600 hover:from-red-600 hover:to-red-600"}`}
          >
            Add to Dish
          </button>
        </div>
      ))}
    </div>
  );
}