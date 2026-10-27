// import React, { useState } from "react";
// import Nav from "../components/Nav";
// import Category from "../Category.jsx";
// import Card from "../components/Card.jsx";

// const Home = () => {


//   return (
//     <div className=" bg-gray-100 min-h-screen">
//       <Nav />
//       <Category />
//       <Card/>
//     </div>
//   );
// };

// export default Home;

import React, { useState } from "react";
import Nav from "../components/Nav.jsx";
import Category from "../Category.jsx";
import Card from "../components/Card.jsx";
import Cart from "../components/Cart.jsx";

const Home = ({ cartItems, setCartItems, searchQuery, setSearchQuery, cartCount }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-stone-50">
      <Nav
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setCartOpen={setCartOpen}
        cartCount={cartCount}
      />

      {/* Hero banner */}
      <section className="mx-auto max-w-7xl px-4 pt-6 md:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-500 via-orange-500 to-red-500 px-6 py-8 text-white md:px-10 md:py-12">
          <div className="relative z-10 max-w-xl">
            <h1 className="text-3xl font-extrabold leading-tight md:text-4xl">Bhookh lagi hai? 🍔</h1>
            <p className="mt-2 text-white/90 md:text-lg">
              Apna favourite khana chuno aur seedha ghar mangwao.
            </p>
          </div>
          <span className="pointer-events-none absolute -bottom-6 right-4 select-none text-8xl opacity-30 md:text-[9rem]">🍕</span>
        </div>
      </section>

      <Category onSelect={setSelectedCategory} selectedCategory={selectedCategory} />

      <Card
        selectedCategory={selectedCategory}
        cartItems={cartItems}
        setCartItems={setCartItems}
        searchQuery={searchQuery}
      />

      {cartOpen && <Cart cartItems={cartItems} setCartItems={setCartItems} setCartOpen={setCartOpen} />}
    </div>
  );
};

export default Home;