import React, { useEffect, useState } from "react";
import "./NewArrivals.css";
import NewArrivalItem from "../NewArrivalItem/NewArrivalItem";
import { newArrivalProductList, productList } from "../../api/productApi"; // Adjust the import path as necessary

const NewArrivals = ({ onQuickView }) => {
  const [newArrivalProducts, setNewArrivalProducts] = useState([]); // Renamed state for products
  const [totalNewArrivals, setTotalNewArrivals] = useState(0); // Renamed state for total products
  const [newArrivalLimit] = useState(6); // Renamed limit state
  const [newArrivalOffset, setNewArrivalOffset] = useState(0); // Renamed offset state
  const [newArrivalCategory, setNewArrivalCategory] = useState("All"); // Renamed category state
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await newArrivalProductList(
          newArrivalLimit,
          newArrivalOffset,
          newArrivalCategory
        );

        setNewArrivalProducts(response.newArrivals);
        setTotalNewArrivals(response.total);
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
      }
    };

    fetchNewArrivals();
  }, [newArrivalCategory]);

  const handleCategoryChange = (newCategory) => {
    setNewArrivalCategory(newCategory);
    setNewArrivalOffset(0); // Reset offset when category changes
    setActiveCategory(newCategory);
  };

  return (
    <section className="new_arrivals_area section_padding_100_0 clearfix">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section_heading text-center">
              <h2>New Arrivals</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="karl-projects-menu mb-100">
        <div className="text-center portfolio-menu">
          <button
            className={`btn ${activeCategory === "All" ? "active" : ""}`}
            onClick={() => handleCategoryChange("All")}
          >
            ALL
          </button>
          <button
            className={`btn ${activeCategory === "Men" ? "active" : ""}`}
            onClick={() => handleCategoryChange("Men")}
          >
            MEN
          </button>
          <button
            className={`btn ${activeCategory === "Women" ? "active" : ""}`}
            onClick={() => handleCategoryChange("Women")}
          >
            WOMAN
          </button>
          <button
            className={`btn ${activeCategory === "Children" ? "active" : ""}`}
            onClick={() => handleCategoryChange("Children")}
          >
            CHILDREN
          </button>
        </div>
      </div>

      <div className="container">
        <div className="row karl-new-arrivals">
          {newArrivalProducts.map((product, index) => (
            <NewArrivalItem
              key={index}
              product={product}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
