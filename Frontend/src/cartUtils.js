// Cart ke saare rules ek jagah (test karna aasan rehta hai)
export const MAX_QTY = 50; // backend me bhi yahi limit hai

// Menu item -> cart item. Image ka sirf asli link rakhte hain (local photo build ke saath badal sakti hai)
export const toCartItem = (item, restaurant) => ({
  id: item.id,
  name: item.name,
  price: item.price,
  type: item.type,
  image: item.image,
  legacyId: item.legacyId,
  discountPercent: item.discountPercent,
  restaurantId: restaurant._id,
  restaurantName: restaurant.name,
  restaurantSlug: restaurant.slug,
  quantity: 1,
});

// Item add karo. Pehle se hai to quantity badhao (MAX_QTY tak)
export const addToCart = (cart, item, restaurant) => {
  const found = cart.find((c) => c.id === item.id);
  if (found) {
    if (found.quantity >= MAX_QTY) return cart;
    return cart.map((c) => (c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c));
  }
  return [...cart, toCartItem(item, restaurant)];
};

// Quantity ghatao, 0 ho jaye to item hata do
export const decreaseInCart = (cart, id) =>
  cart
    .map((c) => (c.id === id ? { ...c, quantity: c.quantity - 1 } : c))
    .filter((c) => c.quantity > 0);

// Swiggy rule: cart me ek time par ek hi restaurant. Dusre restaurant ka item add karna ho to true
export const needsReplace = (cart, restaurantId) =>
  cart.length > 0 && cart[0].restaurantId !== restaurantId;