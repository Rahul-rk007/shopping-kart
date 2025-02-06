import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="shop_sidebar_area">
      <div className="widget catagory mb-50">
        <h6 className="mb-0">Categories</h6>
        <div className="menu-list">
          <ul id="menu-content2" className="menu-content collapse out">
            <li data-toggle="collapse" data-target="#women2">
              <a href="#">Woman wear</a>
              <ul className="sub-menu collapse show" id="women2">
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
            <li
              data-toggle="collapse"
              data-target="#man2"
              className="collapsed"
            >
              <a href="#">Man Wear</a>
              <ul className="sub-menu collapse" id="man2">
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
              data-target="#kids2"
              className="collapsed"
            >
              <a href="#">Children</a>
              <ul className="sub-menu collapse" id="kids2">
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
              data-target="#bags2"
              className="collapsed"
            >
              <a href="#">Bags &amp; Purses</a>
              <ul className="sub-menu collapse" id="bags2">
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
              data-target="#eyewear2"
              className="collapsed"
            >
              <a href="#">Eyewear</a>
              <ul className="sub-menu collapse" id="eyewear2">
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
              data-target="#footwear2"
              className="collapsed"
            >
              <a href="#">Footwear</a>
              <ul className="sub-menu collapse" id="footwear2">
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

      <div className="widget price mb-50">
        <h6 className="widget-title mb-30">Filter by Price</h6>
        <div className="widget-desc">
          <div className="slider-range">
            <div
              className="slider-range-price"
              data-min="0"
              data-max="3000"
              data-unit="$"
              data-value-min="0"
              data-value-max="1350"
              data-label-result="Price:"
            >
              <div className="ui-slider-range"></div>
              <span className="ui-slider-handle" tabIndex="0"></span>
              <span className="ui-slider-handle" tabIndex="0"></span>
            </div>
            <div className="range-price">Price: 0 - 1350</div>
          </div>
        </div>
      </div>

      <div className="widget color mb-70">
        <h6 className="widget-title mb-30">Filter by Color</h6>
        <div className="widget-desc">
          <ul className="d-flex justify-content-between">
            <li className="gray">
              <a href="#">
                <span>(3)</span>
              </a>
            </li>
            <li className="red">
              <a href="#">
                <span>(25)</span>
              </a>
            </li>
            <li className="yellow">
              <a href="#">
                <span>(112)</span>
              </a>
            </li>
            <li className="green">
              <a href="#">
                <span>(72)</span>
              </a>
            </li>
            <li className="teal">
              <a href="#">
                <span>(9)</span>
              </a>
            </li>
            <li className="cyan">
              <a href="#">
                <span>(29)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="widget size mb-50">
        <h6 className="widget-title mb-30">Filter by Size</h6>
        <div className="widget-desc">
          <ul className="d-flex justify-content-between">
            <li>
              <a href="#">XS</a>
            </li>
            <li>
              <a href="#">S</a>
            </li>
            <li>
              <a href="#">M</a>
            </li>
            <li>
              <a href="#">L</a>
            </li>
            <li>
              <a href="#">XL</a>
            </li>
            <li>
              <a href="#">XXL</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="widget recommended">
        <h6 className="widget-title mb-30">Recommended</h6>
        <div className="widget-desc">
          {/* Recommended Products */}
          {["product-10", "product-11", "product-12"].map((product, index) => (
            <div
              className="single-recommended-product d-flex mb-30"
              key={index}
            >
              <div className="single-recommended-thumb mr-3">
                <img src={`img/product-img/${product}.jpg`} alt="" />
              </div>
              <div className="single-recommended-desc">
                <h6>
                  {product === "product-10"
                    ? "Men’s T-shirt"
                    : product === "product-11"
                    ? "Blue mini top"
                    : "Women’s T-shirt"}
                </h6>
                <p>
                  ${" "}
                  {product === "product-10"
                    ? "39.99"
                    : product === "product-11"
                    ? "19.99"
                    : "39.99"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
