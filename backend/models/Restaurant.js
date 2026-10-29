const mongoose = require("mongoose");

// Ek restaurant (Swiggy ke restaurant card jaisa)
const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true }, // URL me use hota hai: /restaurant/<slug>
    description: { type: String, trim: true },
    image: { type: String, trim: true }, // photo ka link (URL)
    cuisines: [{ type: String, trim: true }], // jaise ["Italian", "Fast Food"]
    area: { type: String, trim: true }, // jaise "Model Town"
    rating: { type: Number, min: 0, max: 5, default: 0 },
    ratingCount: { type: Number, min: 0, default: 0 },
    deliveryTimeMins: { type: Number, min: 0, default: 30 },
    deliveryFee: { type: Number, min: 0, default: 0 }, // Step 3 (bill) me use hoga
    costForTwo: { type: Number, min: 0, default: 0 },
    pureVeg: { type: Boolean, default: false },
    isOpen: { type: Boolean, default: true }, // false = "Closed" dikhega, order nahi ho payega
    isActive: { type: Boolean, default: true }, // false = list se poora hat jata hai
  },
  { timestamps: true }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);