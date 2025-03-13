import React, { useContext, useState } from "react";

import "./QuickViewModal.css";
import CartContext from "../../context/CartContext";
import UserContext from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const QuickViewModal = ({ isOpen, onClose, product }) => {
  const [quantity, setQuantity] = useState(1);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { addToCart } = useContext(CartContext);
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const handleQuantityChange = (change) => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + change;
      return newQuantity < 1 ? 1 : newQuantity; // Prevent quantity from going below 1
    });
  };

  if (!isOpen || !product) return null;

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent the default form submission
    console.log(user);

    if (user) {
      console.log("view", product);
      addToCart(product, quantity); // Call addToCart with the product and quantity
    } else {
      localStorage.setItem(
        "redirectAfterLogin",
        JSON.stringify({ product, quantity })
      ); // Store product and quantity
      navigate("/login"); // Redirect to login page
    }
  };

  return (
    <div
      id="quickview"
      className="modal fade show"
      style={{ display: "block", top: `${scrollPosition}px` }}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="quickview"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-lg modal-dialog-centered"
        role="document"
      >
        <div className="modal-content">
          <button
            type="button"
            className="close btn"
            onClick={onClose}
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>

          <div className="modal-body">
            <div className="quickview_body">
              <div className="container">
                <div className="row">
                  <div className="col-12 col-lg-5">
                    <div className="quickview_pro_img">
                      <img
                        src={product.ImageURLs[0]}
                        alt={product.ProductName}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-lg-7">
                    <div className="quickview_pro_des">
                      <h4 className="title">{product.ProductName}</h4>
                      <div className="top_seller_product_rating mb-15">
                        {[...Array(5)].map((_, index) => (
                          <i
                            key={index}
                            className="fa fa-star"
                            aria-hidden="true"
                          ></i>
                        ))}
                      </div>
                      <h5 className="price">
                        ${product.Price} <span>${product.originalPrice}</span>
                      </h5>
                      <p>{product.Description}</p>
                      <a href={`/product/${product._id}`}>
                        View Full Product Details
                      </a>
                    </div>
                    <form
                      className="cart"
                      onSubmit={handleAddToCart}
                      method="post"
                    >
                      <div className="quantity">
                        <span
                          className="qty-minus"
                          onClick={() => handleQuantityChange(-1)}
                        >
                          <i className="fa fa-minus" aria-hidden="true"></i>
                        </span>
                        <input
                          type="number"
                          className="qty-text"
                          id="qty"
                          step="1"
                          min="1"
                          max="12"
                          name="quantity"
                          value={quantity}
                          readOnly
                        />
                        <span
                          className="qty-plus"
                          onClick={() => handleQuantityChange(1)}
                        >
                          <i className="fa fa-plus" aria-hidden="true"></i>
                        </span>
                      </div>
                      <button
                        type="submit"
                        name="addtocart"
                        value="5"
                        className="cart-submit"
                      >
                        Add to cart
                      </button>
                      <div className="modal_pro_wishlist">
                        <a href="wishlist.html" target="_blank">
                          <i className="ti-heart"></i>
                        </a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
