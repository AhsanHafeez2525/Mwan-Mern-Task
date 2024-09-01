import React from "react";

const Sidebar = ({ filters, setFilters, products }) => {
  console.log("sidebar products", products);
  const handleCheckboxChange = (e, category, brand, item, variant) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      setFilters((prev) => [...prev, { category, brand, item, variant }]);
    } else {
      setFilters((prev) =>
        prev.filter(
          (filter) =>
            filter.item !== item ||
            filter.variant !== variant ||
            filter.category !== category ||
            filter.brand !== brand
        )
      );
    }
  };

  const isChecked = (category, brand, item, variant) => {
    return filters.some(
      (filter) =>
        filter.category === category &&
        filter.brand === brand &&
        filter.item === item &&
        filter.variant === variant
    );
  };

  return (
    <div className="w-56 h-full bg-white rounded-lg shadow-lg pt-8 pl-6">
      {products.map((product) => (
        <div key={product.id} className="mb-4">
          <h1 className="text-lg font-semibold mb-4 text-darkGray">
            {product.name}
          </h1>

          <hr className="border-t-2 border-gray mb-2" />

          {product.brands.map((brand) => (
            <div key={brand.id} className="mb-4">
              <h2 className="text-md font-medium mb-2 text-blackLight">
                {brand.name}
              </h2>
              {brand.models.map((model) => (
                <div key={model.id} className="ml-4">
                  <label className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={isChecked(
                        product.name,
                        brand.name,
                        model.name,
                        model.variants[0]
                      )}
                      onChange={(e) =>
                        handleCheckboxChange(
                          e,
                          product.name,
                          brand.name,
                          model.name,
                          model.variants[0]
                        )
                      }
                    />
                    {model.name}
                  </label>
                  <div className="ml-4">
                    {model.variants.map((variant) => (
                      <label key={variant} className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={isChecked(
                            product.name,
                            brand.name,
                            model.name,
                            variant
                          )}
                          onChange={(e) =>
                            handleCheckboxChange(
                              e,
                              product.name,
                              brand.name,
                              model.name,
                              variant
                            )
                          }
                        />
                        {variant}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
