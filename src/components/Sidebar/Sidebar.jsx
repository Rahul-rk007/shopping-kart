import React, { useState, useEffect, useRef } from "react";
import "./Sidebar.css";
import {
  fetchCategoriesWithSubcategories,
  fetchColorCounts,
} from "../../api/productApi";

const Sidebar = ({
  onCategorySelect,
  onPriceRangeChange = () => {},
  onColorSelect = () => {},
}) => {
  const [categories, setCategories] = useState([]);
  const [openCategoryId, setOpenCategoryId] = useState(null);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null);
  const [colorCounts, setColorCounts] = useState([]);
  const [showAllColors, setShowAllColors] = useState(false);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(3000);
  const [priceGap] = useState(100);

  const minRangeRef = useRef(null);
  const maxRangeRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategoriesWithSubcategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    getCategories();
  }, []);

  const fetchColors = async () => {
    try {
      const response = await fetchColorCounts({
        subcategoryId: selectedSubcategoryId,
        minPrice,
        maxPrice,
      });
      setColorCounts(response);
    } catch (error) {
      console.error("Error fetching color counts:", error);
    }
  };

  useEffect(() => {
    fetchColors();
  }, [selectedSubcategoryId, minPrice, maxPrice]);

  const handleCategoryClick = (categoryId) => {
    setOpenCategoryId((prevId) => (prevId === categoryId ? null : categoryId));
  };

  const handleSubcategoryClick = (subcategoryId) => {
    setSelectedSubcategoryId(subcategoryId);
    onCategorySelect(subcategoryId);
  };

  const handleMinPriceChange = (e) => {
    const value = parseInt(e.target.value);
    if (maxPrice - value >= priceGap) {
      setMinPrice(value);
      onPriceRangeChange([value, maxPrice]);
    }
  };

  const handleMaxPriceChange = (e) => {
    const value = parseInt(e.target.value);
    if (value - minPrice >= priceGap) {
      setMaxPrice(value);
      onPriceRangeChange([minPrice, value]);
    }
  };

  const handleColorSelect = (color) => {
    onColorSelect(color);
  };

  return (
    <div className="shop_sidebar_area">
      <div className="widget catagory mb-50">
        <h6 className="mb-0">Categories</h6>
        <div className="menu-list">
          <ul id="menu-content2" className="menu-content collapse out">
            {categories.map((category) => (
              <li key={category.id}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCategoryClick(category.id);
                  }}
                >
                  {category.name}
                </a>
                <ul
                  className={`sub-menu ${
                    openCategoryId === category.id ? "show" : "collapse"
                  }`}
                >
                  {category.subcategories.map((subcategory) => (
                    <li key={subcategory.id}>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleSubcategoryClick(subcategory.id);
                        }}
                        className={
                          selectedSubcategoryId === subcategory.id
                            ? "active"
                            : ""
                        }
                      >
                        {subcategory.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="widget price mb-50">
        <h6 className="widget-title mb-30">Filter by Price</h6>
        <div className="widget-desc">
          <div className="slider-range">
            <div className="price-slider-container">
              <input
                type="range"
                min="0"
                max="3000"
                value={minPrice}
                onChange={handleMinPriceChange}
                className="price-slider price-slider-min"
                ref={minRangeRef}
              />
              <input
                type="range"
                min="0"
                max="3000"
                value={maxPrice}
                onChange={handleMaxPriceChange}
                className="price-slider price-slider-max"
                ref={maxRangeRef}
              />
              <div className="price-slider-track"></div>
              <div className="price-range-selected" ref={trackRef}></div>
            </div>
            <div className="range-price">
              Price: ${minPrice} - ${maxPrice}
            </div>
          </div>
        </div>
      </div>

      {/* <div className="widget color mb-70">
        <h6 className="widget-title mb-30">Filter by Color</h6>
        <div className="widget-desc">
          <ul className="d-flex justify-content-between">
            {colorCounts
              .slice(0, showAllColors ? colorCounts.length : 5)
              .map(({ color, count }) => (
                <li key={color}>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleColorSelect(color);
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: color,
                        width: "20px",
                        height: "20px",
                        display: "inline-block",
                        borderRadius: "50%",
                      }}
                    ></span>
                    <span className="color-count">{` (${count})`}</span>
                  </a>
                </li>
              ))}
          </ul>
          {!showAllColors && colorCounts.length > 5 && (
            <button
              className="btn btn-link"
              onClick={() => setShowAllColors(true)}
            >
              Show More
            </button>
          )}
          {showAllColors && (
            <button
              className="btn btn-link"
              onClick={() => setShowAllColors(false)}
            >
              Show Less
            </button>
          )}
        </div>
      </div> */}

      {/* <div className="widget recommended">
        <h6 className="widget-title mb-30">Recommended</h6>
        <div className="widget-desc">
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
                    ? "Men's T-shirt"
                    : product === "product-11"
                    ? "Blue mini top"
                    : "Women's T-shirt"}
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
      </div> */}
    </div>
  );
};

export default Sidebar;
