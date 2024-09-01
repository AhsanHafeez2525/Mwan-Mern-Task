const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VariantSchema = new Schema({
  type: String,
});

const ModelSchema = new Schema({
  id: String,
  name: String,
  variants: [VariantSchema],
});

const BrandSchema = new Schema({
  id: String,
  name: String,
  models: [ModelSchema],
});

const ProductSchema = new Schema({
  id: String,
  name: String,
  brands: [BrandSchema],
});

const Product = mongoose.model("ProductNew", ProductSchema, "TestProject");

module.exports = Product;
