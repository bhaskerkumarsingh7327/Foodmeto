// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// require("dotenv").config();

// const app = express();

// // ====== Config ======
// const PORT = process.env.PORT || 8080;
// const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/foodapp";

// // ====== Middleware ======
// app.use(cors({
//   origin:[
//     "http://localhost:5173", // Local development ke liye
//     // "https://foodmeto-backend.onrender.com",
//     "https://foodmeto-frontend-lbgc.onrender.com",
    
//   ],
//   Credential:true
  
// }));


// app.use(express.json({ limit: "1mb" }));

// // ====== Mongo Connect ======
// mongoose
//   .connect(MONGO_URI, { dbName: "foodapp" })
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
//     price: mongoose.Schema.Types.Mixed, // string "₹180" ya number dono chalega
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
//     email: { type: String }, // optional: user ke login email se link
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
//     console.error("Signup error:", err);
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
//     console.error("Login error:", err);
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
//     console.error("Order error:", err);
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
const { initializeApp, cert } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const Food = require("./models/Food");
require("dotenv").config();

const app = express();

// ====== Config ======
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/foodapp";

// ====== Firebase Admin (token verify karne ke liye) ======
// .env me FIREBASE_SERVICE_ACCOUNT = service account JSON (ek line me, single quotes ke andar)
if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  console.error("❌ FIREBASE_SERVICE_ACCOUNT missing in .env / Render Environment");
  process.exit(1);
}
let serviceAccount;
try {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} catch (err) {
  console.error("❌ FIREBASE_SERVICE_ACCOUNT sahi JSON nahi hai:", err.message);
  process.exit(1);
}
try {
  initializeApp({ credential: cert(serviceAccount) });
} catch (err) {
  console.error("❌ Firebase Admin start nahi hua:", err.message);
  process.exit(1);
}

// ====== Middleware ======
app.use(cors({
  origin:[
    "http://localhost:5173", // Local development ke liye
    "https://foodmeto-frontend-lbgc.onrender.com",
    
  ],
}));


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
    userId: { type: String, required: true, index: true }, // Firebase uid (verified token se)
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    payment: { type: String, enum: ["COD", "UPI", "Card"], default: "COD" },
    cartItems: [orderItemSchema],
    totalPrice: { type: Number, required: true },
    email: { type: String }, // verified token se (phone login me khali ho sakta hai)
    status: {
      type: String,
      enum: ["Placed", "Preparing", "Out for delivery", "Delivered", "Cancelled"],
      default: "Placed",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
const Order = mongoose.model("Order", orderSchema);

// ====== Auth middleware: Firebase token check ======
const requireAuth = async (req, res, next) => {
  try {
    const header = req.headers.authorization || ""; // "Bearer <token>"
    const [scheme, token] = header.split(" ");

    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({ success: false, message: "Login required" });
    }

    // Google se verify: signature, expiry, project sab check hota hai
    const decoded = await getAuth().verifyIdToken(token);
    req.user = { uid: decoded.uid, email: decoded.email, name: decoded.name };
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired token, please login again" });
  }
};

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

// Menu (public): sirf available items
app.get("/api/foods", async (_req, res) => {
  try {
    const foods = await Food.find({ available: true })
      .sort({ id: 1 })
      .select("id name price type rating discount category -_id")
      .lean();
    return res.json({ success: true, foods });
  } catch (err) {
    console.error("Foods error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// Place Order (login required)
// Client sirf { id, quantity } bhejta hai. Naam, price, total sab server DB se nikalta hai.
app.post("/api/order", requireAuth, async (req, res) => {
  try {
    const { name, address, phone, payment, cartItems } = req.body || {};

    if (!name?.trim() || !address?.trim() || !phone?.trim()) {
      return res.status(400).json({ success: false, message: "Name, address & phone required" });
    }
    if (!/^[0-9+\-\s]{10,15}$/.test(phone.trim())) {
      return res.status(400).json({ success: false, message: "Enter a valid phone number" });
    }
    if (!Array.isArray(cartItems) || cartItems.length === 0 || cartItems.length > 50) {
      return res.status(400).json({ success: false, message: "Cart is empty or invalid" });
    }

    // Har line: id aur quantity valid honi chahiye
    const lines = [];
    for (const it of cartItems) {
      const id = Number(it?.id);
      const quantity = Number(it?.quantity);
      if (!Number.isInteger(id) || !Number.isInteger(quantity) || quantity < 1 || quantity > 50) {
        return res.status(400).json({ success: false, message: "Invalid item in cart" });
      }
      lines.push({ id, quantity });
    }

    // DB se asli items nikalo
    const ids = [...new Set(lines.map((l) => l.id))];
    const foods = await Food.find({ id: { $in: ids }, available: true }).lean();
    const foodById = new Map(foods.map((f) => [f.id, f]));

    const items = [];
    for (const l of lines) {
      const food = foodById.get(l.id);
      if (!food) {
        return res.status(400).json({ success: false, message: "Koi item ab available nahi hai, cart refresh karo" });
      }
      items.push({
        id: food.id,
        name: food.name,
        price: food.price, // DB ka price, client ka nahi
        quantity: l.quantity,
        type: food.type,
        category: food.category,
        rating: food.rating,
        discount: food.discount,
      });
    }
    const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const order = await Order.create({
      userId: req.user.uid, // body se nahi, verified token se
      name: name.trim(),
      address: address.trim(),
      phone: phone.trim(),
      payment: ["COD", "UPI", "Card"].includes(payment) ? payment : "COD",
      cartItems: items,
      totalPrice,
      email: req.user.email || undefined,
    });

    return res.json({ success: true, message: "Order placed!", orderId: order._id, totalPrice });
  } catch (err) {
    console.error("Order error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// My Orders: sirf logged-in user ke orders (userId verified token se aata hai)
app.get("/api/orders/my", requireAuth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.uid }).sort({ createdAt: -1 }).lean();
    return res.json({ success: true, orders });
  } catch (err) {
    console.error("Fetch orders error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// ====== Start ======
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});