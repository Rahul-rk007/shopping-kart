import React from "react";
import ProductItem from "../ProductItem/ProductItem";
import NewArrivalItem from "../NewArrivalItem/NewArrivalItem";

const ProductGrid = ({ products, onQuickView }) => {
  return (
    <div className="shop_grid_product_area">
      <div className="row">
        {products.map((product, index) => (
          <NewArrivalItem
            key={index}
            product={product}
            onQuickView={onQuickView}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
