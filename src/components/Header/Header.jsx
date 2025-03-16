import React, { useState, useEffect, useRef, useContext } from "react";
import "./Header.css";
import LOGO from "../../assets/core-img/logo.jpeg";
import { NavLink } from "react-router-dom";
import UserContext from "../../context/UserContext";
import CartContext from "../../context/CartContext";

const Header = ({ onToggleMenu }) => {
  const user = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const [showCart, setShowCart] = useState(false);
  const cartRef = useRef(null);

  const handleMouseEnter = () => {
    setShowCart(true);
  };

  const handleMouseLeave = () => {
    setShowCart(false);
  };

  const handleCartClick = () => {
    setShowCart((prevShowCart) => !prevShowCart);
  };

  const handleClickOutside = (event) => {
    if (cartRef.current && !cartRef.current.contains(event.target)) {
      setShowCart(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const totalPrice = cart?.cartTotal || 0; // Default to 0 if cartTotal is undefined
  const formattedPrice = totalPrice.toFixed(2);
  const itemCount = Array.isArray(cart?.products) ? cart.products.length : 0; // Check if products is an array

  return (
    <header className="header_area">
      <div className="main_header_area">
        <div className="container h-100">
          <div className="row h-100">
            <div className="col-12 d-flex align-items-md-center justify-content-between">
              <div className="top_logo header-logo">
                <a href="#">
                  <img src={LOGO} alt="" />
                </a>
              </div>

              <div className="main-menu-area">
                <nav className="navbar navbar-expand-lg align-items-start">
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#karl-navbar"
                    aria-controls="karl-navbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon">
                      <i className="ti-menu"></i>
                    </span>
                  </button>

                  <div
                    className="collapse navbar-collapse align-items-start"
                    id="karl-navbar"
                  >
                    <ul className="navbar-nav animated" id="nav">
                      <li className="nav-item active">
                        <NavLink className="nav-link" to="/">
                          Home
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink className="nav-link" to="/products">
                          Shop
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink className="nav-link" to="/aboutus">
                          About Us
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink className="nav-link" to="/contactus">
                          Contact Us
                        </NavLink>
                      </li>
                      {!user && (
                        <li className="nav-item">
                          <NavLink className="nav-link" to="/login">
                            Login
                          </NavLink>
                        </li>
                      )}
                      {user && (
                        <li className="nav-item">
                          <NavLink className="nav-link" to="/myaccount/profile">
                            My Account
                          </NavLink>
                        </li>
                      )}
                    </ul>
                  </div>
                </nav>
              </div>

              <div className="header-cart-menu d-flex align-items-center">
                {user && (
                  <div
                    className="cart"
                    ref={cartRef}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <NavLink
                      href="#"
                      id="header-cart-btn"
                      onClick={handleCartClick}
                    >
                      <span className="cart_quantity">{itemCount}</span>
                      <i className="ti-bag"></i> Your Bag Rs. {formattedPrice}
                    </NavLink>

                    {showCart && (
                      <ul className="cart-list">
                        {Array.isArray(cart?.products) &&
                          cart.products.map((item, index) => {
                            const product = item; // Assuming item is the product object
                            const imageUrl = product?.image || ""; // Safely access the image URL
                            const price = product?.price || 0; // Default to 0 if price is undefined
                            const quantity = item.quantity || 1; // Default to 1 if quantity is undefined
                            const totalItemPrice = price * quantity; // Calculate total price for the item

                            return (
                              <li key={index}>
                                <a href="#" className="image">
                                  <img
                                    src={imageUrl}
                                    className="cart-thumb"
                                    alt={
                                      product?.productName || "Product Image"
                                    } // Fallback alt text
                                  />
                                </a>
                                <div className="cart-item-desc">
                                  <h6>
                                    <a href="#">
                                      {product?.productName || "Product Name"}
                                    </a>{" "}
                                    {/* Fallback name */}
                                  </h6>
                                  <div className="product-price">
                                    <p>
                                      {quantity} x{" "}
                                      <span className="price">
                                        Rs. {price.toFixed(2) || "0.00"} =
                                      </span>
                                    </p>
                                    <span className="price product-total-price">
                                      Rs. {totalItemPrice.toFixed(2) || "0.00"} {/* Display total price */}
                                    </span>
                                  </div>
                                </div>
                                <span className="dropdown-product-remove">
                                  <i className="icon-cross"></i>
                                </span>
                              </li>
                            );
                          })}
                        <div className="cart-total-price-container">
                          <span className="pull-right">
                            Total: Rs. {totalPrice.toFixed(2)}
                          </span>
                          <div>
                            <li className="total total-price">
                              <NavLink
                                to="/cart"
                                className="btn btn-sm btn-cart"
                              >
                                Cart
                              </NavLink>
                              <NavLink
                                to="/checkout"
                                className="btn btn-sm btn-checkout"
                              >
                                Checkout
                              </NavLink>
                            </li>
                          </div>
                        </div>
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;