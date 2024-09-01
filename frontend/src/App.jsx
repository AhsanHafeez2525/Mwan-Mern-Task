import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import ProductCards from "./components/ProductCards";

const App = () => {
  const [filters, setFilters] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:7000/api/products1");
        console.log("first response: ", response);
        setProducts(response.data[0].products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="flex">
      <Sidebar filters={filters} setFilters={setFilters} products={products} />
      <ProductCards
        filters={filters}
        setFilters={setFilters}
        products={products}
      />
    </div>
  );
};

export default App;
