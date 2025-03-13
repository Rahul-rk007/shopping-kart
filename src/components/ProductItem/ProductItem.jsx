import React from "react";

const ProductItem = ({ product, onQuickView }) => {
  return (
    <div className="col-12 col-sm-6 col-lg-4 single_gallery_item wow fadeInUpBig">
      <div className="product-img">
        <img src={product.image} alt={product.name} />
        <div className="product-quicview">
          <a href="#" onClick={() => onQuickView(product)}>
            <i className="ti-plus"></i>
          </a>
        </div>
      </div>
      <div className="product-description">
        <h4 className="product-price">Rs. {product.price}</h4>
        <p>{product.description}</p>
        <a href="#" className="add-to-cart-btn">
          ADD TO CART
        </a>
      </div>
    </div>
  );
};

export default ProductItem;
