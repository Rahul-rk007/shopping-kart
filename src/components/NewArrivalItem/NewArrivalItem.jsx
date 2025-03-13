import React, { useContext } from "react";
import CartContext from "../../context/CartContext";

const NewArrivalItem = ({ product, onQuickView }) => {
  const { addToCart } = useContext(CartContext);
  return (
    <div
      className={`col-12 col-sm-6 col-md-4 single_gallery_item ${product.category} wow fadeInUpBig`}
      data-wow-delay={product.delay}
    >
      <div className="product-img">
        <img src={product.ImageURLs[0]} alt={product.ProductName} />
        <div className="product-quicview">
          <a href="#" onClick={() => onQuickView(product)}>
            <i className="ti-plus"></i>
          </a>
        </div>
      </div>
      <div className="product-description">
        <h4 className="product-price">Rs. {product.Price}</h4>
        <p>{product.Description}</p>
        <button
          className="add-to-cart-btn"
          onClick={() => addToCart(product, 1)}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default NewArrivalItem;
