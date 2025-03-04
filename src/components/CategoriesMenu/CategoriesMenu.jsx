import React, { useState, useEffect } from "react";
import "./CategoriesMenu.css";
import { fetchCategoriesWithSubcategories } from "../../api/productApi"; // Import the API function

const CategoriesMenu = ({ isOpen, onClose, onCategorySelect }) => {
  const [categories, setCategories] = useState([]);

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

    if (isOpen) {
      // Only fetch categories if the menu is open
      getCategories();
    }
  }, [isOpen]); // Dependency array includes isOpen

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
            {categories.map((category) => (
              <li
                key={category.id}
                data-toggle="collapse"
                data-target={`#category-${category.id}`}
                className="collapsed"
              >
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default anchor behavior
                  }}
                >
                  {category.name} <span className="arrow"></span>
                </a>
                <ul
                  className="sub-menu collapse"
                  id={`category-${category.id}`}
                >
                  {category.subcategories.map((subcategory) => (
                    <li key={subcategory.id}>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault(); // Prevent default anchor behavior
                          onCategorySelect(subcategory.id); // Call the function to handle subcategory selection
                        }}
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
    </div>
  );
};

export default CategoriesMenu;
