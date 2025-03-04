import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { fetchCategoriesWithSubcategories } from "../../api/productApi";

const Sidebar = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [openCategoryId, setOpenCategoryId] = useState(null);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null);

  // Fetch categories and subcategories when the component mounts
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

  const handleCategoryClick = (categoryId) => {
    setOpenCategoryId((prevId) => (prevId === categoryId ? null : categoryId));
  };

  const handleSubcategoryClick = (subcategoryId) => {
    setSelectedSubcategoryId(subcategoryId); // Update selected subcategory
    onCategorySelect(subcategoryId); // Call the category select function
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
                          handleSubcategoryClick(subcategory.id); // Update selected subcategory
                        }}
                        className={
                          selectedSubcategoryId === subcategory.id
                            ? "active"
                            : ""
                        } // Highlight selected subcategory
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
