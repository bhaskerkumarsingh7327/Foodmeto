// Menu ko database me daalne ki script. Ek baar chalao: node seed.js
// Dobara chalaoge to same id wale items seed ke data se overwrite ho jayenge
// (DB me haath se kiye hue changes bhi), naye items add ho jayenge.
require("dotenv").config();
const mongoose = require("mongoose");
const Food = require("./models/Food");

const foods = [
  {"id": 1, "name": "pancakes", "price": 180, "type": "Veg", "rating": 4.5, "discount": "-20%", "category": "Breakfast"},
  {"id": 2, "name": "Chicken Soup", "price": 220, "type": "Non-Veg", "rating": 4.7, "discount": "-15%", "category": "Soup"},
  {"id": 3, "name": "Minestrone Soup", "price": 120, "type": "Veg", "rating": 4.2, "discount": "-10%", "category": "Soup"},
  {"id": 4, "name": "Spaghetti Carbonara", "price": 200, "type": "Veg", "rating": 4.6, "discount": "-25%", "category": "Pasta"},
  {"id": 5, "name": "Veg Alfredo Pasta", "price": 280, "type": "Veg", "rating": 4.8, "discount": "-12%", "category": "Pasta"},
  {"id": 6, "name": "Chicken Alfredo Pasta", "price": 150, "type": "Non-Veg", "rating": 4.1, "discount": "-18%", "category": "Pasta"},
  {"id": 7, "name": "Paneer Butter Masala", "price": 250, "type": "Veg", "rating": 4.4, "discount": "-20%", "category": "Main course"},
  {"id": 8, "name": "Chicken Biryani", "price": 100, "type": "Non-Veg", "rating": 4.0, "discount": "-15%", "category": "Main course"},
  {"id": 9, "name": "Margherita Pizza", "price": 40, "type": "Veg", "rating": 4.3, "discount": "-5%", "category": "Pizza"},
  {"id": 10, "name": "Pepperoni Pizza", "price": 160, "type": "Non-Veg", "rating": 4.2, "discount": "-10%", "category": "Pizza"},
  {"id": 11, "name": "Veggie Burger", "price": 120, "type": "Veg", "rating": 4.5, "discount": "-22%", "category": "Burger"},
  {"id": 12, "name": "Chicken Burger", "price": 300, "type": "Non-Veg", "rating": 4.6, "discount": "-18%", "category": "Burger"},
  {"id": 13, "name": "Tomato Soup", "price": 180, "type": "Veg", "rating": 4.3, "discount": "-12%", "category": "Soup"},
  {"id": 14, "name": "Egg Sandwich", "price": 90, "type": "Non-Veg", "rating": 4.1, "discount": "-8%", "category": "Breakfast"},
  {"id": 15, "name": "Mushroom Soup", "price": 260, "type": "Veg", "rating": 4.8, "discount": "-20%", "category": "Soup"},
  {"id": 16, "name": "Chicken Tikka Masala", "price": 100, "type": "Non-Veg", "rating": 4.4, "discount": "-15%", "category": "Main course"},
  {"id": 17, "name": "Cheese Omelette", "price": 280, "type": "Veg", "rating": 4.7, "discount": "-18%", "category": "Breakfast"},
  {"id": 18, "name": "Fettuccine Alfredo", "price": 80, "type": "Veg", "rating": 4.2, "discount": "-10%", "category": "Pasta"},
  {"id": 19, "name": "Garlic Bread", "price": 200, "type": "Veg", "rating": 4.5, "discount": "-25%", "category": "Pizza"},
  {"id": 20, "name": "Fish and Chips", "price": 220, "type": "Non-Veg", "rating": 4.6, "discount": "-20%", "category": "Main course"},
  {"id": 21, "name": "Hash Browns", "price": 90, "type": "Veg", "rating": 4.3, "discount": "-15%", "category": "Breakfast"},
  {"id": 22, "name": "Vegetable Soup", "price": 110, "type": "Veg", "rating": 4.4, "discount": "-12%", "category": "Soup"},
  {"id": 23, "name": "Egg Fried Rice", "price": 140, "type": "Non-Veg", "rating": 4.2, "discount": "-18%", "category": "Main course"},
  {"id": 24, "name": "Hawaiian Pizza", "price": 180, "type": "Non-Veg", "rating": 4.5, "discount": "-20%", "category": "Pizza"},
  {"id": 25, "name": "Pasta Primavera", "price": 60, "type": "Veg", "rating": 4.7, "discount": "-10%", "category": "Pasta"},
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: "foodapp" });
    const result = await Food.bulkWrite(
      foods.map((f) => ({
        updateOne: { filter: { id: f.id }, update: { $set: f }, upsert: true },
      }))
    );
    console.log(`✅ Seed done: ${result.upsertedCount} naye, ${result.modifiedCount} update, total ${foods.length}`);
  } catch (err) {
    console.error("❌ Seed fail:", err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
})();