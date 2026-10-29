import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaStar, FaClock, FaMapMarkerAlt, FaArrowLeft } from "react-icons/fa";
import { API } from "../api";
import Nav from "../components/Nav";
import Cart from "../components/Cart";
import Category from "../Category";
import FoodCard from "../components/FoodCard";
import { getItemImage } from "../menuImages";
import { addToCart, decreaseInCart, needsReplace } from "../cartUtils";

// "Cart badalna hai?" wala popup
const ConfirmModal = ({ title, message, confirmLabel, onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
    <div className="absolute inset-0 animate-fade-in bg-slate-900/50" onClick={onCancel} />
    <div className="relative w-full max-w-md animate-fade-up rounded-2xl bg-white p-6 shadow-2xl">
      <h3 className="text-lg font-extrabold text-slate-800">{title}</h3>
      <p className="mt-2 text-sm text-slate-500">{message}</p>
      <div className="mt-6 flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 rounded-xl border border-slate-200 py-2.5 font-bold text-slate-700 transition hover:bg-slate-50"
        >
          No
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 rounded-xl bg-brand-500 py-2.5 font-bold text-white shadow-lg shadow-brand-500/30 transition hover:bg-brand-600"
        >
          {confirmLabel}
        </button>
      </div>
    </div>
  </div>
);

const Restaurant = ({ cartItems, setCartItems, cartCount }) => {
  const { slug } = useParams();

  const [data, setData] = useState(null); // { restaurant, menu }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // "notfound" ya koi message
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [vegFilter, setVegFilter] = useState("all"); // "all" | "Veg" | "Non-Veg"
  const [topRated, setTopRated] = useState(false); // sirf 4.5+
  const [sortBy, setSortBy] = useState("relevance"); // relevance | priceLow | priceHigh | rating
  const [cartOpen, setCartOpen] = useState(false);
  const [pendingItem, setPendingItem] = useState(null); // dusre restaurant ka item add karne se pehle poochna

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await API.get(`/api/restaurants/${encodeURIComponent(slug)}`);
      setData({
        restaurant: res.data.restaurant,
        menu: res.data.menu.map((m) => ({ ...m, displayImage: getItemImage(m) })),
      });
    } catch (err) {
      console.error(err);
      setData(null);
      setError(
        err.response?.status === 404
          ? "notfound"
          : "Menu load nahi ho paaya. Internet/backend check karke dobara try karo."
      );
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    load();
  }, [load]);

  const restaurant = data?.restaurant;
  const menu = useMemo(() => data?.menu || [], [data]);

  const categories = useMemo(() => ["All", ...new Set(menu.map((m) => m.category))], [menu]);

  const visibleItems = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return menu
      .filter((m) => selectedCategory === "All" || m.category === selectedCategory)
      .filter((m) => m.name.toLowerCase().includes(q))
      .filter((m) => vegFilter === "all" || m.type === vegFilter)
      .filter((m) => !topRated || m.rating >= 4.5)
      .sort((a, b) => {
        if (sortBy === "priceLow") return a.price - b.price;
        if (sortBy === "priceHigh") return b.price - a.price;
        if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
        return 0; // relevance: menu ka original order
      });
  }, [menu, selectedCategory, searchQuery, vegFilter, topRated, sortBy]);

  const filtersActive = vegFilter !== "all" || topRated || sortBy !== "relevance";
  const clearFilters = () => {
    setVegFilter("all");
    setTopRated(false);
    setSortBy("relevance");
  };

  const quantityOf = (id) => cartItems.find((c) => c.id === id)?.quantity || 0;

  // ADD dabane par: cart me dusre restaurant ke items hon to pehle poochho
  const handleAdd = (item) => {
    if (!restaurant.isOpen) return;
    if (needsReplace(cartItems, restaurant._id)) {
      setPendingItem(item);
      return;
    }
    setCartItems((prev) => addToCart(prev, item, restaurant));
  };

  const confirmReplace = () => {
    setCartItems(addToCart([], pendingItem, restaurant)); // purana cart khali, naya item
    setPendingItem(null);
  };

  const chipClass = (active) =>
    `flex items-center rounded-full border px-4 py-2 text-sm font-semibold transition ${
      active
        ? "border-brand-500 bg-brand-50 text-brand-600"
        : "border-slate-200 bg-white text-slate-600 hover:border-brand-300"
    }`;

  const wrapper = "mx-auto max-w-7xl px-4 py-6 md:px-6";

  let content;
  if (loading) {
    content = (
      <section className={wrapper}>
        <p className="mb-4 text-sm text-slate-500">Menu load ho raha hai... (pehli baar 30-60 sec lag sakte hain)</p>
        <div className="mb-6 h-36 animate-pulse rounded-3xl bg-slate-200" />
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
  } else if (error === "notfound") {
    content = (
      <section className={wrapper}>
        <div className="rounded-2xl border border-slate-100 bg-white p-10 text-center shadow-sm">
          <span className="text-5xl">🤷</span>
          <p className="mt-3 text-lg font-bold text-slate-800">Ye restaurant nahi mila</p>
          <Link
            to="/"
            className="mt-5 inline-block rounded-xl bg-brand-500 px-6 py-2.5 font-bold text-white shadow-lg shadow-brand-500/30 transition hover:bg-brand-600"
          >
            Go to Home
          </Link>
        </div>
      </section>
    );
  } else if (error) {
    content = (
      <section className={wrapper}>
        <div className="rounded-2xl border border-red-100 bg-white p-10 text-center shadow-sm">
          <span className="text-5xl">😕</span>
          <p className="mt-3 font-semibold text-red-600">{error}</p>
          <button
            onClick={load}
            className="mt-5 rounded-xl bg-brand-500 px-6 py-2.5 font-bold text-white shadow-lg shadow-brand-500/30 transition hover:bg-brand-600"
          >
            Retry
          </button>
        </div>
      </section>
    );
  } else {
    content = (
      <>
        {/* Restaurant ki jaankari */}
        <section className="mx-auto max-w-7xl px-4 pt-6 md:px-6">
          <Link
            to="/"
            className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-brand-600"
          >
            <FaArrowLeft className="h-3 w-3" /> All restaurants
          </Link>

          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900 md:text-3xl">{restaurant.name}</h1>
                {restaurant.cuisines?.length > 0 && (
                  <p className="mt-1 text-slate-500">{restaurant.cuisines.join(", ")}</p>
                )}
                {restaurant.area && (
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                    <FaMapMarkerAlt className="h-3 w-3" /> {restaurant.area}
                  </p>
                )}
                {restaurant.description && <p className="mt-3 max-w-xl text-sm text-slate-500">{restaurant.description}</p>}
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-700">
                {restaurant.rating > 0 && (
                  <span className="flex items-center gap-1 rounded-lg bg-green-600 px-2.5 py-1 text-white">
                    <FaStar className="h-3 w-3" /> {restaurant.rating}
                  </span>
                )}
                <span className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1">
                  <FaClock className="h-3 w-3" /> {restaurant.deliveryTimeMins} mins
                </span>
                {restaurant.costForTwo > 0 && (
                  <span className="rounded-lg bg-slate-100 px-2.5 py-1">₹{restaurant.costForTwo} for two</span>
                )}
              </div>
            </div>

            {!restaurant.isOpen && (
              <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                🔒 Ye restaurant abhi band hai. Abhi order nahi ho sakta.
              </p>
            )}
          </div>
        </section>

        <Category
          onSelect={setSelectedCategory}
          selectedCategory={selectedCategory}
          categories={categories}
          title="Menu"
        />

        <section className={wrapper}>
          {/* Filters */}
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <button onClick={() => setVegFilter("all")} className={chipClass(vegFilter === "all")}>
              All
            </button>
            <button onClick={() => setVegFilter("Veg")} className={chipClass(vegFilter === "Veg")}>
              <span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-green-600" /> Veg
            </button>
            <button onClick={() => setVegFilter("Non-Veg")} className={chipClass(vegFilter === "Non-Veg")}>
              <span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-red-600" /> Non-Veg
            </button>
            <button onClick={() => setTopRated((prev) => !prev)} className={chipClass(topRated)}>
              <FaStar className="mr-1.5 h-3 w-3 text-green-600" /> Rating 4.5+
            </button>

            <div className="ml-auto flex items-center gap-3">
              {filtersActive && (
                <button onClick={clearFilters} className="text-sm font-semibold text-brand-600 hover:underline">
                  Clear filters
                </button>
              )}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort dishes"
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 outline-none transition focus:border-brand-500"
              >
                <option value="relevance">Sort: Relevance</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="rating">Rating: High to Low</option>
              </select>
            </div>
          </div>

          <h2 className="mb-4 text-lg font-extrabold text-slate-800">
            {selectedCategory === "All" ? "All dishes" : selectedCategory}
            <span className="ml-2 text-sm font-medium text-slate-400">
              {visibleItems.length} {visibleItems.length === 1 ? "item" : "items"}
            </span>
          </h2>

          {visibleItems.length === 0 ? (
            <div className="rounded-2xl border border-slate-100 bg-white p-10 text-center shadow-sm">
              <span className="text-5xl">🔍</span>
              <p className="mt-3 font-semibold text-slate-700">Koi dish nahi mili</p>
              <p className="text-sm text-slate-500">Search, category ya filter badal ke dekho.</p>
              {filtersActive && (
                <button
                  onClick={clearFilters}
                  className="mt-4 rounded-xl bg-brand-500 px-5 py-2 font-bold text-white shadow-lg shadow-brand-500/30 transition hover:bg-brand-600"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visibleItems.map((item) => (
                <FoodCard
                  key={item.id}
                  item={item}
                  qty={quantityOf(item.id)}
                  onAdd={() => handleAdd(item)}
                  onDecrease={() => setCartItems((prev) => decreaseInCart(prev, item.id))}
                  disabled={!restaurant.isOpen}
                />
              ))}
            </div>
          )}
        </section>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <Nav
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setCartOpen={setCartOpen}
        cartCount={cartCount}
      />

      {content}

      {cartOpen && <Cart cartItems={cartItems} setCartItems={setCartItems} setCartOpen={setCartOpen} />}

      {pendingItem && (
        <ConfirmModal
          title="Replace cart items?"
          message={`Aapke cart me ${cartItems[0]?.restaurantName || "kisi aur restaurant"} ke items hain. Naya item add karne ke liye cart khali karna hoga. ${restaurant.name} se naya cart shuru karein?`}
          confirmLabel="Yes, start afresh"
          onConfirm={confirmReplace}
          onCancel={() => setPendingItem(null)}
        />
      )}
    </div>
  );
};

export default Restaurant;