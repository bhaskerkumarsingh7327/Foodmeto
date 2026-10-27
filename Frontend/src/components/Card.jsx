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
//   { id: 1, name: "pancakes", price: "₹180", type: "Veg", rating: 4.5, discount: "-20%", image: img1, category: "Breakfast" },
//   { id: 2, name: "Chicken Soup", price: "₹220", type: "Non-Veg", rating: 4.7, discount: "-15%", image: img2, category: "Soups" },
//   { id: 3, name: "Minestrone Soup", price: "₹120", type: "Veg", rating: 4.2, discount: "-10%", image: img3, category: "Soups" },
//   { id: 4, name: " Spaghetti Carbonara", price: "₹200", type: "Veg", rating: 4.6, discount: "-25%", image: img4, category: "Pasta" },
//   { id: 5, name: "Veg Alfredo Pasta", price: "₹280", type: "Veg", rating: 4.8, discount: "-12%", image: img5, category: "Pasta" },
//   { id: 6, name: "Chicken Alfredo Pasta", price: "₹150", type: "Non-Veg", rating: 4.1, discount: "-18%", image: img6, category: "Pasta" },
//   { id: 7, name: "Paneer Butter Masala", price: "₹250", type: "Veg", rating: 4.4, discount: "-20%", image: img7, category: "Main course" },
//   { id: 8, name: " Chicken Biryani", price: "₹100", type: "Non-Veg", rating: 4.0, discount: "-15%", image: img8, category: "Main course" },
//   { id: 9, name: "Margherita Pizza", price: "₹40", type: "Veg", rating: 4.3, discount: "-5%", image: img9, category: "Pizza" },
//   { id: 10, name: "Pepperoni Pizza", price: "₹160", type: "Veg", rating: 4.2, discount: "-10%", image: img10, category: "Pizza" },
//   { id: 11, name: "Veggie Burger", price: "₹120", type: "Veg", rating: 4.5, discount: "-22%", image: img11, category: "Burger" },
//   { id: 12, name: "Chicken Burger", price: "₹300", type: "Non-Veg", rating: 4.6, discount: "-18%", image: img12, category: "Burger" },
//   { id: 13, name: "Tomato Soup", price: "₹180", type: "Veg", rating: 4.3, discount: "-12%", image: img13, category: "Soup" },
//   { id: 14, name: "Egg Sandwich", price: "₹90", type: "Non-Veg", rating: 4.1, discount: "-8%", image: img14, category: "Breakfast" },
//   { id: 15, name: "Mushroom Soup", price: "₹260", type: "Veg", rating: 4.8, discount: "-20%", image: img15, category: "soups" },
//   { id: 16, name: "Chicken Tikka Masala", price: "₹100", type: "Non-Veg", rating: 4.4, discount: "-15%", image: img16, category: "Main course" },
//   { id: 17, name: "Cheese Omelette", price: "₹280", type: "Veg", rating: 4.7, discount: "-18%", image: img17, category: "Breakfast" },
//   { id: 18, name: "Fettuccine Alfredo", price: "₹80", type: "Veg", rating: 4.2, discount: "-10%", image: img18, category: "Pasata" },
//   { id: 19, name: "Garlic Bread", price: "₹200", type: "Veg", rating: 4.5, discount: "-25%", image: img19, category: "Pizza" },
//   { id: 20, name: "Fish and Chips", price: "₹220", type: "Non-Veg", rating: 4.6, discount: "-20%", image: img20, category: "Main course" },
//   { id: 21, name: "Hash Browns", price: "₹90", type: "Veg", rating: 4.3, discount: "-15%", image: img21, category: "Breakfast" },
//   { id: 22, name: "Vegetable Soup", price: "₹110", type: "Veg", rating: 4.4, discount: "-12%", image: img22, category: "Soup" },
//   { id: 23, name: "Egg Fried Rice", price: "₹140", type: "Non-Veg", rating: 4.2, discount: "-18%", image: img23, category: "Main course" },
//   { id: 24, name: "Hawaiian Pizza", price: "₹180", type: "Non-Veg", rating: 4.5, discount: "-20%", image: img24, category: "Pizza" },
//   { id: 25, name: "Pasta Primavera", price: "₹60", type: "Veg", rating: 4.7, discount: "-10%", image: img25, category: "Pasta" },
// ];

// export default function Card({ selectedCategory, cartItems, setCartItems, searchQuery }) {
//   const searchedFoods = foods.filter((item) => {
//     const matchesCategory =
//       selectedCategory === "All" || item.category.toLowerCase() === selectedCategory.toLowerCase();
//     const matchesSearch =
//       item.name.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   return (
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
//       {searchedFoods.map((item) => (
//         <div
//           key={item.id}
//           className="relative p-4 rounded-xl shadow-xl transition transform bg-pink-300 border-2 border-gray-200 hover:border-red-500 hover:scale-105 hover:shadow-red-500"
//         >
//           {/* ✅ Discount Tag with Animation */}
//           <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded animate-bounce">
//             {item.discount}
//           </span>

//           {/* Image */}
//           <img
//             src={item.image}
//             alt={item.name}
//             className="w-full h-36 object-cover rounded-lg"
//           />

//           {/* Food Name */}
//           <h3 className="text-center font-bold text-lg text-gray-800 mt-2">{item.name}</h3>

//           {/* Price & Type */}
//           <div className="flex justify-between items-center mt-2">
//             <span className="text-gray-700 font-semibold">{item.price}</span>
//             <span className="text-sm text-gray-500">{item.type}</span>
//           </div>

//           {/* Rating */}
//           <div className="flex justify-center mt-1 text-red-500">
//             {"⭐".repeat(Math.floor(item.rating))} ({item.rating})
//           </div>

//           {/* ✅ Add to Dish Button */}
//           <button
//             onClick={() => setCartItems([...cartItems, { ...item, quantity: 1 }])}
//             className={`w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-2 rounded-lg font-semibold mt-3 transition
//               ${item.type === "Veg"
//                 ? "hover:bg-green-500 hover:from-green-500 hover:to-green-500"
//                 : "hover:bg-red-600 hover:from-red-600 hover:to-red-600"}`}
//           >
//             Add to Dish
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }


import { useState, useEffect, useCallback } from "react";
import { API } from "../api";
import { FaStar, FaPlus, FaMinus } from "react-icons/fa";
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

// Image ka mapping: DB me image nahi hoti, frontend id se image chunta hai
const images = {
  1: img1,
  2: img2,
  3: img3,
  4: img4,
  5: img5,
  6: img6,
  7: img7,
  8: img8,
  9: img9,
  10: img10,
  11: img11,
  12: img12,
  13: img13,
  14: img14,
  15: img15,
  16: img16,
  17: img17,
  18: img18,
  19: img19,
  20: img20,
  21: img21,
  22: img22,
  23: img23,
  24: img24,
  25: img25
};

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

export default function Card({ selectedCategory, cartItems = [], setCartItems, searchQuery }) {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadFoods = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await API.get("/api/foods");
      // Cart/Checkout abhi price ko "₹180" string me padhte hain, isliye yahan same format banaya hai
      setFoods(
        data.foods.map((f) => ({ ...f, price: "₹" + f.price, image: images[f.id] }))
      );
    } catch (err) {
      console.error(err);
      setError("Menu load nahi ho paaya. Internet/backend check karke dobara try karo.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFoods();
  }, [loadFoods]);

  const searchedFoods = foods.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const quantityOf = (id) => cartItems.find((c) => c.id === id)?.quantity || 0;

  // Same item dobara add karo to quantity badhe, duplicate entry na bane
  const addToCart = (item) => {
    setCartItems((prev) => {
      const found = prev.find((c) => c.id === item.id);
      if (found) {
        return prev.map((c) => (c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // Quantity ghatao, 0 ho jaye to cart se hata do
  const decreaseFromCart = (id) => {
    setCartItems((prev) =>
      prev
        .map((c) => (c.id === id ? { ...c, quantity: c.quantity - 1 } : c))
        .filter((c) => c.quantity > 0)
    );
  };

  const wrapper = "mx-auto max-w-7xl px-4 py-6 md:px-6";

  // Loading: skeleton cards
  if (loading) {
    return (
      <section className={wrapper}>
        <p className="mb-4 text-sm text-slate-500">
          Menu load ho raha hai... (pehli baar 30-60 sec lag sakte hain)
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse overflow-hidden rounded-2xl border border-slate-100 bg-white">
              <div className="h-44 bg-slate-200" />
              <div className="space-y-3 p-4">
                <div className="h-4 w-3/4 rounded bg-slate-200" />
                <div className="h-3 w-1/2 rounded bg-slate-200" />
                <div className="h-8 w-full rounded bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={wrapper}>
        <div className="rounded-2xl border border-red-100 bg-white p-10 text-center shadow-sm">
          <span className="text-5xl">😕</span>
          <p className="mt-3 font-semibold text-red-600">{error}</p>
          <button
            onClick={loadFoods}
            className="mt-5 rounded-xl bg-brand-500 px-6 py-2.5 font-bold text-white shadow-lg shadow-brand-500/30 transition hover:bg-brand-600"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className={wrapper}>
      <h2 className="mb-4 text-lg font-extrabold text-slate-800">
        {selectedCategory === "All" ? "All dishes" : selectedCategory}
        <span className="ml-2 text-sm font-medium text-slate-400">
          {searchedFoods.length} {searchedFoods.length === 1 ? "item" : "items"}
        </span>
      </h2>

      {searchedFoods.length === 0 ? (
        <div className="rounded-2xl border border-slate-100 bg-white p-10 text-center shadow-sm">
          <span className="text-5xl">🔍</span>
          <p className="mt-3 font-semibold text-slate-700">Koi dish nahi mili</p>
          <p className="text-sm text-slate-500">Search ya category badal ke dekho.</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {searchedFoods.map((item) => {
            const qty = quantityOf(item.id);
            return (
              <article
                key={item.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Image + discount */}
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  {item.discount && (
                    <span className="absolute bottom-3 left-3 rounded-md bg-slate-900/80 px-2 py-1 text-xs font-bold text-white backdrop-blur">
                      {item.discount.replace("-", "")} OFF
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold leading-snug text-slate-800">{item.name}</h3>
                    <VegMark type={item.type} />
                  </div>

                  <div className="mt-1.5 flex items-center gap-2 text-sm text-slate-500">
                    <span className="flex items-center gap-1 rounded-md bg-green-600 px-1.5 py-0.5 text-xs font-bold text-white">
                      <FaStar className="h-2.5 w-2.5" /> {item.rating}
                    </span>
                    <span>{item.category}</span>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-4">
                    <span className="text-lg font-extrabold text-slate-800">{item.price}</span>

                    {qty === 0 ? (
                      <button
                        onClick={() => addToCart(item)}
                        className="rounded-lg border border-brand-500 px-6 py-1.5 text-sm font-extrabold uppercase text-brand-600 transition hover:bg-brand-500 hover:text-white"
                      >
                        Add
                      </button>
                    ) : (
                      <div className="flex items-center overflow-hidden rounded-lg border border-brand-500 bg-brand-500 text-white">
                        <button
                          onClick={() => decreaseFromCart(item.id)}
                          aria-label="Decrease quantity"
                          className="px-3 py-2 transition hover:bg-brand-600"
                        >
                          <FaMinus className="h-3 w-3" />
                        </button>
                        <span className="min-w-[28px] text-center text-sm font-extrabold">{qty}</span>
                        <button
                          onClick={() => addToCart(item)}
                          aria-label="Increase quantity"
                          className="px-3 py-2 transition hover:bg-brand-600"
                        >
                          <FaPlus className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}