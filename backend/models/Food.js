const mongoose = require("mongoose");

// Menu ka ek item. Price yahan number me hota hai (₹ sign frontend lagata hai).
const foodSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true }, // frontend isi id se image pehchanta hai
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    type: { type: String, enum: ["Veg", "Non-Veg"], required: true },
    rating: { type: Number, min: 0, max: 5 },
    discount: { type: String }, // abhi sirf tag ("-20%"), price me apply nahi hota
    category: { type: String, required: true },
    available: { type: Boolean, default: true }, // false karoge to menu se hat jayega aur order nahi hoga
  },
  { timestamps: true }
);

module.exports = mongoose.model("Food", foodSchema);