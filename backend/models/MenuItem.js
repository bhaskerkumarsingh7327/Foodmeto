const mongoose = require("mongoose");

// Restaurant ke menu ka ek item
const menuItemSchema = new mongoose.Schema(
  {
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true, index: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true, min: 0 }, // rupees
    type: { type: String, enum: ["Veg", "Non-Veg"], required: true },
    category: { type: String, required: true, trim: true }, // jaise "Pizza", "Soup"
    rating: { type: Number, min: 0, max: 5 },
    discountPercent: { type: Number, min: 0, max: 90, default: 0 }, // 20 = 20% off (Step 3 me price me lagega)
    image: { type: String, trim: true }, // photo ka link (URL)
    legacyId: { type: Number }, // sirf purane 25 items ke liye: unki local photo pehchanne ke kaam aata hai
    available: { type: Boolean, default: true }, // false = menu se hat jata hai
  },
  { timestamps: true }
);

// Ek restaurant me ek purana item do baar nahi (naye items me legacyId hota hi nahi)
menuItemSchema.index(
  { restaurant: 1, legacyId: 1 },
  { unique: true, partialFilterExpression: { legacyId: { $type: "number" } } }
);

module.exports = mongoose.model("MenuItem", menuItemSchema);