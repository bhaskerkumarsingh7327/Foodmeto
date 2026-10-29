const express = require("express");
const Restaurant = require("../models/Restaurant");
const MenuItem = require("../models/MenuItem");

const router = express.Router();

// User ka text regex me daalne se pehle special characters ko safe banate hain
const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const SORTS = {
  rating: { rating: -1 },
  deliveryTime: { deliveryTimeMins: 1 },
  costLow: { costForTwo: 1 },
  costHigh: { costForTwo: -1 },
};

const LIST_FIELDS =
  "name slug description image cuisines area rating ratingCount deliveryTimeMins deliveryFee costForTwo pureVeg isOpen";

// GET /api/restaurants?q=pizza&cuisine=Italian&pureVeg=true&sort=rating
router.get("/", async (req, res) => {
  try {
    const { q, cuisine, pureVeg, sort } = req.query;
    const filter = { isActive: true };

    // typeof check zaroori hai: ?q[$ne]=x jaisi query se DB filter ko bigadne se bachata hai
    if (typeof q === "string" && q.trim()) {
      const rx = new RegExp(escapeRegex(q.trim().slice(0, 50)), "i");
      filter.$or = [{ name: rx }, { cuisines: rx }];
    }
    if (typeof cuisine === "string" && cuisine.trim()) {
      filter.cuisines = new RegExp("^" + escapeRegex(cuisine.trim().slice(0, 50)) + "$", "i");
    }
    if (pureVeg === "true") filter.pureVeg = true;

    // Open restaurants hamesha upar, phir chuna hua sort
    const order =
      typeof sort === "string" && Object.hasOwn(SORTS, sort) ? SORTS[sort] : { rating: -1 };
    const restaurants = await Restaurant.find(filter)
      .sort({ isOpen: -1, ...order })
      .select(LIST_FIELDS)
      .lean();

    return res.json({ success: true, restaurants });
  } catch (err) {
    console.error("Restaurants list error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET /api/restaurants/:slug  ->  restaurant + uska poora menu
router.get("/:slug", async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({
      slug: String(req.params.slug).toLowerCase(),
      isActive: true,
    })
      .select(LIST_FIELDS)
      .lean();

    if (!restaurant) {
      return res.status(404).json({ success: false, message: "Restaurant not found" });
    }

    const items = await MenuItem.find({ restaurant: restaurant._id, available: true })
      .sort({ category: 1, name: 1 })
      .select("name description price type category rating discountPercent image legacyId")
      .lean();

    // _id ko "id" naam se bhejte hain
    const menu = items.map(({ _id, ...rest }) => ({ id: String(_id), ...rest }));

    return res.json({ success: true, restaurant, menu });
  } catch (err) {
    console.error("Restaurant detail error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;