// ProductList.js

import React from "react";
import PropertyCard from "./Card/propertyCard"; // Import the PropertyCard component if needed

const ProductList = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:mx-0 mx-8">
      {products.length > 0 ? (
        products.map((property) => (
          <PropertyCard key={property.p_id} property={property} />
        ))
      ) : (
        <div className="text-center text-2xl font-bold text-gray-400 mb-10">
          No properties found
        </div>
      )}
    </div>
  );
};

export default ProductList;
