import React, { useState, useEffect } from "react";
import uploadImg from "../assets/imageupload.png";

const ProductCards = ({ filters, setFilters, products }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    filterProducts();
  }, [filters, products]);

  const filterProducts = () => {
    if (filters.length === 0) {
      setFilteredProducts(
        products.flatMap((product) =>
          product.brands.flatMap((brand) =>
            brand.models.map((model) => ({
              category: product.name,
              brand: brand.name,
              item: model.name,
              variants: model.variants || [],
              price: "$1,050", // Example price, update as needed
              description: `Description for ${model.name}`,
            }))
          )
        )
      );
      return;
    }

    const filtered = products.flatMap((product) =>
      product.brands.flatMap((brand) =>
        brand.models.flatMap((model) => {
          const matches = filters.some((filter) => {
            return (
              product.name === filter.category &&
              brand.name === filter.brand &&
              model.name === filter.item &&
              model.variants.includes(filter.variant)
            );
          });

          return matches
            ? {
                category: product.name,
                brand: brand.name,
                item: model.name,
                variants: model.variants || [],
                price: "$1,050", // Example price, update as needed
                description: `Description for ${model.name}`,
              }
            : null;
        })
      )
    );

    setFilteredProducts(filtered.filter((product) => product !== null));
  };

  const handleRemoveFilter = (filterToRemove) => {
    const updatedFilters = filters.filter(
      (filter) =>
        filter.category !== filterToRemove.category ||
        filter.item !== filterToRemove.item ||
        filter.variant !== filterToRemove.variant ||
        filter.brand !== filterToRemove.brand
    );
    setFilters(updatedFilters);
  };

  return (
    <div className="ml-8 mt-24">
      <div className="mb-4">
        <p className="text-xl font-semibold mb-4 text-darkGray">
          SHOWING RESULTS FOR THE FILTERS YOU APPLIED
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {filters.map((filter, index) => (
            <div
              key={index}
              className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full flex items-center"
            >
              <span className="text-sm">
                {filter.item} - {filter.variant}
              </span>
              <button
                onClick={() => handleRemoveFilter(filter)}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <p>No products match your filters.</p>
      ) : (
        filteredProducts.map((product, index) => (
          <div
            key={index}
            className="w-[900px] h-60 shadow-lg bg-white rounded-md flex mb-4"
          >
            <div className="flex-none">
              <img
                src={uploadImg}
                alt="Product"
                className="h-52 w-56 rounded-l-md ml-4 mt-4"
              />
            </div>
            <div className="flex-grow p-4 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="text-[#414141] font-semibold">
                    {product.item}
                  </h3>
                  <p className="text-sm">
                    {Array.isArray(product.variants)
                      ? product.variants.join(", ")
                      : ""}
                  </p>
                </div>
                <hr className="border-t-2 border-gray mt-4" />
                <p className="text-grayLight pt-4">{product.description}</p>
              </div>
              <div className="flex">
                <button className="bg-blue text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 mb-4">
                  Buy {product.price}
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductCards;
