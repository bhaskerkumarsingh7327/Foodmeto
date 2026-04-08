// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// require("dotenv").config();

// const app = express();

// // ====== Config ======
// const PORT = process.env.PORT || 8080;
// const MONGO_URI = process.env.MONGO_URI; // Atlas ya local se lega

// // ====== Middleware ======
// app.use(cors());
// app.use(express.json({ limit: "1mb" }));

// // ====== Mongo Connect ======
// mongoose
//   .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => {
//     console.error("❌ MongoDB connection error:", err.message);
//     process.exit(1);
//   });

// // ====== Schemas & Models ======
// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, trim: true },
//     email: { type: String, required: true, unique: true, lowercase: true, trim: true },
//     password: { type: String, required: true, minlength: 6 },
//   },
//   { timestamps: true }
// );

// const orderItemSchema = new mongoose.Schema(
//   {
//     id: Number,
//     name: String,
//     price: mongoose.Schema.Types.Mixed, // number ya string dono chalega
//     quantity: { type: Number, default: 1 },
//     type: String,
//     image: String,
//     category: String,
//     rating: Number,
//     discount: String,
//   },
//   { _id: false }
// );

// const orderSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     address: { type: String, required: true },
//     phone: { type: String, required: true },
//     payment: { type: String, enum: ["COD", "UPI", "Card"], default: "COD" },
//     cartItems: [orderItemSchema],
//     totalPrice: { type: Number, required: true },
//     email: { type: String }, // optional
//   },
//   { timestamps: true }
// );

// const User = mongoose.model("User", userSchema);
// const Order = mongoose.model("Order", orderSchema);

// // ====== Routes ======

// // Health check
// app.get("/", (_req, res) => {
//   res.send("🚀 Backend server is running!");
// });

// // Signup
// app.post("/api/auth/signup", async (req, res) => {
//   try {
//     const { name, email, password } = req.body || {};
//     if (!name || !email || !password) {
//       return res.status(400).json({ success: false, message: "All fields required" });
//     }

//     const exists = await User.findOne({ email });
//     if (exists) {
//       return res.status(409).json({ success: false, message: "Email already registered" });
//     }

//     const hash = await bcrypt.hash(password, 10);
//     await User.create({ name, email, password: hash });

//     return res.json({ success: true, message: "User registered!" });
//   } catch (err) {
//     console.error("Signup error:", err.message);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // Login
// app.post("/api/auth/login", async (req, res) => {
//   try {
//     const { email, password } = req.body || {};
//     if (!email || !password) {
//       return res.status(400).json({ success: false, message: "Email & password required" });
//     }

//     const user = await User.findOne({ email });
//     if (!user) return res.json({ success: false, message: "Invalid credentials" });

//     const ok = await bcrypt.compare(password, user.password);
//     if (!ok) return res.json({ success: false, message: "Invalid credentials" });

//     return res.json({
//       success: true,
//       user: { id: user._id, name: user.name, email: user.email },
//     });
//   } catch (err) {
//     console.error("Login error:", err.message);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // Place Order
// app.post("/api/order", async (req, res) => {
//   try {
//     const { name, address, phone, payment, cartItems, totalPrice, email } = req.body || {};

//     if (!name || !address || !phone || !Array.isArray(cartItems) || typeof totalPrice !== "number") {
//       return res.status(400).json({ success: false, message: "Invalid payload" });
//     }

//     const order = await Order.create({
//       name,
//       address,
//       phone,
//       payment,
//       cartItems,
//       totalPrice,
//       email: email || undefined,
//     });

//     return res.json({ success: true, message: "Order placed!", orderId: order._id });
//   } catch (err) {
//     console.error("Order error:", err.message);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // ====== Start ======
// app.listen(PORT, () => {
//   console.log(`Server started on http://localhost:${PORT}`);
// });



const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const app = express();

// ====== Config ======
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/foodapp";

// ====== Middleware ======
app.use(cors());
app.use(express.json({ limit: "1mb" }));

// ====== Mongo Connect ======
mongoose
  .connect(MONGO_URI, { dbName: "foodapp" })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// ====== Schemas & Models ======
const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
  },
  { timestamps: true }
);

const orderItemSchema = new mongoose.Schema(
  {
    id: Number,
    name: String,
    price: mongoose.Schema.Types.Mixed, // string "₹180" ya number dono chalega
    quantity: { type: Number, default: 1 },
    type: String,
    image: String,
    category: String,
    rating: Number,
    discount: String,
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    payment: { type: String, enum: ["COD", "UPI", "Card"], default: "COD" },
    cartItems: [orderItemSchema],
    totalPrice: { type: Number, required: true },
    email: { type: String }, // optional: user ke login email se link
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
const Order = mongoose.model("Order", orderSchema);

// ====== Routes ======

// Health check
app.get("/", (_req, res) => {
  res.send("🚀 Backend server is running!");
});

// Signup
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ success: false, message: "Email already registered" });
    }

    const hash = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hash });

    return res.json({ success: true, message: "User registered!" });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// Login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email & password required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.json({ success: false, message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.json({ success: false, message: "Invalid credentials" });

    return res.json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// Place Order
app.post("/api/order", async (req, res) => {
  try {
    const { name, address, phone, payment, cartItems, totalPrice, email } = req.body || {};

    if (!name || !address || !phone || !Array.isArray(cartItems) || typeof totalPrice !== "number") {
      return res.status(400).json({ success: false, message: "Invalid payload" });
    }

    const order = await Order.create({
      name,
      address,
      phone,
      payment,
      cartItems,
      totalPrice,
      email: email || undefined,
    });

    return res.json({ success: true, message: "Order placed!", orderId: order._id });
  } catch (err) {
    console.error("Order error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// ====== Start ======
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});