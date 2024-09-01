const express = require("express");
const router = express.Router();
const Product = require("../models/Products");

// Api logic
router.get("/products1", async (req, res) => {
  try {
    const products = await Product.find({});
    // console.log(products);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
