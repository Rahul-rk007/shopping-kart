import React, { useState, useEffect, useRef, useContext } from "react";

import "./Header.css";
import LOGO from "../../assets/core-img/logo.png";
import product10 from "../../assets/product-img/product-10.jpg";
import product11 from "../../assets/product-img/product-11.jpg";
import { NavLink } from "react-router-dom";
import UserContext from "../../context/UserContext";

const Header = ({ onToggleMenu }) => {
  const user = useContext(UserContext);
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
                      <span className="cart_quantity">2</span>
                      <i className="ti-bag"></i> Your Bag $20
                    </NavLink>

                    {showCart && (
                      <ul className="cart-list">
                        <li>
                          <a href="#" className="image">
                            <img
                              src={product10}
                              className="cart-thumb"
                              alt=""
                            />
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
                            <img
                              src={product11}
                              className="cart-thumb"
                              alt=""
                            />
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
                        <li className="total total-price">
                          <NavLink to="/cart" className="btn btn-sm btn-cart">
                            Cart
                          </NavLink>
                          <NavLink
                            to="/checkout"
                            className="btn btn-sm btn-checkout"
                          >
                            Checkout
                          </NavLink>
                          <span className="pull-right">Total: $20.00</span>
                        </li>
                      </ul>
                    )}
                  </div>
                )}
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
