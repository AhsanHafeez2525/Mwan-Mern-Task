const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const productRoutes = require("./routes/ProductRoutes.js");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/api", productRoutes);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
