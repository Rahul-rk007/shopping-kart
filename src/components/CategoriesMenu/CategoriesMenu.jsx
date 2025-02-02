import React from "react";

import "./CategoriesMenu.css";

const CategoriesMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Don't render if not open

  return (
    <div className="catagories-side-menu">
      {/* Close Icon */}
      <div id="sideMenuClose" onClick={onClose}>
        <i className="ti-close"></i>
      </div>
      {/* Side Nav */}
      <div className="nav-side-menu">
        <div className="menu-list">
          <h6>Categories</h6>
          <ul id="menu-content" className="menu-content collapse out">
            <li
              data-toggle="collapse"
              data-target="#women"
              className="collapsed active"
            >
              <a href="#">
                Woman wear <span className="arrow"></span>
              </a>
              <ul className="sub-menu collapse" id="women">
                <li>
                  <a href="#">Midi Dresses</a>
                </li>
                <li>
                  <a href="#">Maxi Dresses</a>
                </li>
                <li>
                  <a href="#">Prom Dresses</a>
                </li>
                <li>
                  <a href="#">Little Black Dresses</a>
                </li>
                <li>
                  <a href="#">Mini Dresses</a>
                </li>
              </ul>
            </li>
            <li data-toggle="collapse" data-target="#man" className="collapsed">
              <a href="#">
                Man Wear <span className="arrow"></span>
              </a>
              <ul className="sub-menu collapse" id="man">
                <li>
                  <a href="#">Man Dresses</a>
                </li>
                <li>
                  <a href="#">Man Black Dresses</a>
                </li>
                <li>
                  <a href="#">Man Mini Dresses</a>
                </li>
              </ul>
            </li>
            <li
              data-toggle="collapse"
              data-target="#kids"
              className="collapsed"
            >
              <a href="#">
                Children <span className="arrow"></span>
              </a>
              <ul className="sub-menu collapse" id="kids">
                <li>
                  <a href="#">Children Dresses</a>
                </li>
                <li>
                  <a href="#">Mini Dresses</a>
                </li>
              </ul>
            </li>
            <li
              data-toggle="collapse"
              data-target="#bags"
              className="collapsed"
            >
              <a href="#">
                Bags &amp; Purses <span className="arrow"></span>
              </a>
              <ul className="sub-menu collapse" id="bags">
                <li>
                  <a href="#">Bags</a>
                </li>
                <li>
                  <a href="#">Purses</a>
                </li>
              </ul>
            </li>
            <li
              data-toggle="collapse"
              data-target="#eyewear"
              className="collapsed"
            >
              <a href="#">
                Eyewear <span className="arrow"></span>
              </a>
              <ul className="sub-menu collapse" id="eyewear">
                <li>
                  <a href="#">Eyewear Style 1</a>
                </li>
                <li>
                  <a href="#">Eyewear Style 2</a>
                </li>
                <li>
                  <a href="#">Eyewear Style 3</a>
                </li>
              </ul>
            </li>
            <li
              data-toggle="collapse"
              data-target="#footwear"
              className="collapsed"
            >
              <a href="#">
                Footwear <span className="arrow"></span>
              </a>
              <ul className="sub-menu collapse" id="footwear">
                <li>
                  <a href="#">Footwear 1</a>
                </li>
                <li>
                  <a href="#">Footwear 2</a>
                </li>
                <li>
                  <a href="#">Footwear 3</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CategoriesMenu;
