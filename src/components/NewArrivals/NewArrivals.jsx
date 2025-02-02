import React from "react";
import "./NewArrivals.css";
import NewArrivalItem from "../NewArrivalItem/NewArrivalItem";

const NewArrivals = ({ products, onQuickView }) => {
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
          <button className="btn active" data-filter="*">
            ALL
          </button>
          <button className="btn" data-filter=".women">
            WOMAN
          </button>
          <button className="btn" data-filter=".man">
            MAN
          </button>
          <button className="btn" data-filter=".access">
            ACCESSORIES
          </button>
          <button className="btn" data-filter=".shoes">
            SHOES
          </button>
          <button className="btn" data-filter=".kids">
            KIDS
          </button>
        </div>
      </div>

      <div className="container">
        <div className="row karl-new-arrivals">
          {products.map((product, index) => (
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
