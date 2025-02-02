import React from "react";

import "./CategoryArea.css";
import bgImage2 from "../../assets/bg-img/bg-2.jpg";
import bgImage3 from "../../assets/bg-img/bg-3.jpg";

const CategoryArea = () => {
  return (
    <section className="top_catagory_area d-md-flex clearfix">
      <div
        className="single_catagory_area d-flex align-items-center bg-img"
        style={{ backgroundImage: `url(${bgImage2})` }}
      >
        <div className="catagory-content">
          <h6>On Accessories</h6>
          <h2>Sale 30%</h2>
          <a href="#" className="btn karl-btn">
            SHOP NOW
          </a>
        </div>
      </div>

      <div
        className="single_catagory_area d-flex align-items-center bg-img"
        style={{ backgroundImage: `url(${bgImage3})` }}
      >
        <div className="catagory-content">
          <h6>In Bags Excepting the New Collection</h6>
          <h2>Designer Bags</h2>
          <a href="#" className="btn karl-btn">
            SHOP NOW
          </a>
        </div>
      </div>
    </section>
  );
};

export default CategoryArea;
