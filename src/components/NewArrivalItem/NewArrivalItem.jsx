import React from "react";

const NewArrivalItem = ({ product, onQuickView }) => {
  return (
    <div
      className={`col-12 col-sm-6 col-md-4 single_gallery_item ${product.category} wow fadeInUpBig`}
      data-wow-delay={product.delay}
    >
      <div className="product-img">
        <img src={product.image} alt={product.name} />
        <div className="product-quicview">
          <a href="#" onClick={() => onQuickView(product)}>
            <i className="ti-plus"></i>
          </a>
        </div>
      </div>
      <div className="product-description">
        <h4 className="product-price">${product.price}</h4>
        <p>{product.description}</p>
        <a href="#" className="add-to-cart-btn">
          ADD TO CART
        </a>
      </div>
    </div>
  );
};

export default NewArrivalItem;
