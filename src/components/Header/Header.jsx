import React, { useState, useEffect, useRef } from "react";

import "./Header.css";
import LOGO from "../../assets/core-img/logo.png";
import product10 from "../../assets/product-img/product-10.jpg";
import product11 from "../../assets/product-img/product-11.jpg";

const Header = ({ onToggleMenu }) => {
  const [showCart, setShowCart] = useState(false);
  const cartRef = useRef(null);

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
  return (
    <header className="header_area">
      <div className="main_header_area">
        <div className="container h-100">
          <div className="row h-100">
            <div className="col-12 d-md-flex align-items-md-center justify-content-between">
              <div className="top_logo">
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
                        <a className="nav-link" href="index.html">
                          Home
                        </a>
                      </li>
                      <li className="nav-item dropdown">
                        <a
                          className="nav-link dropdown-toggle"
                          href="#"
                          id="karlDropdown"
                          role="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          Pages
                        </a>
                        <div
                          className="dropdown-menu"
                          aria-labelledby="karlDropdown"
                        >
                          <a className="dropdown-item" href="index.html">
                            Home
                          </a>
                          <a className="dropdown-item" href="shop.html">
                            Shop
                          </a>
                          <a
                            className="dropdown-item"
                            href="product-details.html"
                          >
                            Product Details
                          </a>
                          <a className="dropdown-item" href="cart.html">
                            Cart
                          </a>
                          <a className="dropdown-item" href="checkout.html">
                            Check out
                          </a>
                        </div>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">
                          Dresses
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">
                          <span className="karl-level">hot</span> Shoes
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">
                          Contact
                        </a>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>

              <div className="header-cart-menu d-flex align-items-center">
                <div className="cart">
                  <a href="#" id="header-cart-btn" onClick={handleCartClick}>
                    <span className="cart_quantity">2</span>
                    <i className="ti-bag"></i> Your Bag $20
                  </a>

                  {showCart && (
                    <ul className="cart-list">
                      <li>
                        <a href="#" className="image">
                          <img src={product10} className="cart-thumb" alt="" />
                        </a>
                        <div className="cart-item-desc">
                          <h6>
                            <a href="#">Women's Fashion</a>
                          </h6>
                          <p>
                            1x - <span className="price">$10</span>
                          </p>
                        </div>
                        <span className="dropdown-product-remove">
                          <i className="icon-cross"></i>
                        </span>
                      </li>
                      <li>
                        <a href="#" className="image">
                          <img src={product11} className="cart-thumb" alt="" />
                        </a>
                        <div className="cart-item-desc">
                          <h6>
                            <a href="#">Women's Fashion</a>
                          </h6>
                          <p>
                            1x - <span className="price">$10</span>
                          </p>
                        </div>
                        <span className="dropdown-product-remove">
                          <i className="icon-cross"></i>
                        </span>
                      </li>
                      <li className="total">
                        <span className="pull-right">Total: $20.00</span>
                        <a href="cart.html" className="btn btn-sm btn-cart">
                          Cart
                        </a>
                        <a
                          href="checkout-1.html"
                          className="btn btn-sm btn-checkout"
                        >
                          Checkout
                        </a>
                      </li>
                    </ul>
                  )}
                </div>
                <div className="header-right-side-menu ml-15">
                  <a href="#" id="sideMenuBtn" onClick={onToggleMenu}>
                    <i className="ti-menu" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
