// Purane 25 items (foods collection) ko naye structure me le jaata hai:
//   1 restaurant ("Foodmeto Kitchen") + uske 25 menu items.
// Chalao: node migrate-restaurants.js
// Dobara chalana safe hai: jo pehle se ban chuka hai use overwrite nahi karta (admin ke changes bachte hain).
require("dotenv").config();
const mongoose = require("mongoose");
const Food = require("./models/Food");
const Restaurant = require("./models/Restaurant");
const MenuItem = require("./models/MenuItem");

// "-20%" -> 20
const parseDiscount = (d) => {
  const n = parseInt(String(d ?? "").replace(/\D/g, ""), 10);
  return Number.isFinite(n) ? Math.min(n, 90) : 0;
};

// "main course" / "Main course" -> "Main Course"
const titleCase = (s) =>
  String(s || "")
    .trim()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");

const foodToMenuItem = (food, restaurantId) => ({
  restaurant: restaurantId,
  legacyId: food.id,
  name: food.name,
  description: "",
  price: food.price,
  type: food.type,
  category: titleCase(food.category),
  rating: food.rating,
  discountPercent: parseDiscount(food.discount),
  available: food.available !== false,
});

async function run() {
  await mongoose.connect(process.env.MONGO_URI, { dbName: "foodapp" });

  const foods = await Food.find().sort({ id: 1 }).lean();
  if (foods.length === 0) {
    throw new Error("foods collection khali hai. Pehle `node seed.js` chalao.");
  }

  const avg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
  const avgRating = Math.round(avg(foods.map((f) => f.rating || 0)) * 10) / 10;
  const costForTwo = Math.round((avg(foods.map((f) => f.price)) * 2) / 10) * 10;

  // Ye sab starting values hain. Admin panel (Step 2) se kabhi bhi badal sakte ho.
  const restaurant = await Restaurant.findOneAndUpdate(
    { slug: "foodmeto-kitchen" },
    {
      $setOnInsert: {
        name: "Foodmeto Kitchen",
        slug: "foodmeto-kitchen",
        description: "Pizza, pasta, burger aur ghar jaisa khana",
        cuisines: ["Italian", "Indian", "Fast Food", "Continental"],
        area: "Main Road",
        rating: avgRating,
        ratingCount: 0,
        deliveryTimeMins: 30,
        deliveryFee: 30,
        costForTwo,
        pureVeg: false,
        isOpen: true,
        isActive: true,
      },
    },
    { upsert: true, returnDocument: "after", setDefaultsOnInsert: true }
  );

  const result = await MenuItem.bulkWrite(
    foods.map((f) => ({
      updateOne: {
        filter: { restaurant: restaurant._id, legacyId: f.id },
        update: { $setOnInsert: foodToMenuItem(f, restaurant._id) },
        upsert: true,
      },
    }))
  );

  const total = await MenuItem.countDocuments({ restaurant: restaurant._id });
  console.log(`✅ Restaurant: ${restaurant.name} (${restaurant.slug})`);
  console.log(`✅ Menu items: ${result.upsertedCount} naye, baaki pehle se the. Ab total ${total}`);
}

module.exports = { parseDiscount, titleCase, foodToMenuItem };

if (require.main === module) {
  run()
    .catch((err) => {
      console.error("❌ Migration fail:", err.message);
      process.exitCode = 1;
    })
    .finally(() => mongoose.disconnect());
}