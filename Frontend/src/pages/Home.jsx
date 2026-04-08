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

const Home = ({ cartItems, setCartItems, searchQuery, setSearchQuery, setIsAuthenticated, cartCount }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div>

      {/* ✅ Cart Count Nav ko bheja */}
      <Nav 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        setCartOpen={setCartOpen} 
        cartCount={cartCount} 
      />

      <Category onSelect={setSelectedCategory} selectedCategory={selectedCategory} />

      <Card
        selectedCategory={selectedCategory}
        cartItems={cartItems}
        setCartItems={setCartItems}
        searchQuery={searchQuery}
      />

      {cartOpen && (
        <Cart cartItems={cartItems} setCartItems={setCartItems} setCartOpen={setCartOpen} />
      )}
    </div>
  );
};

export default Home;