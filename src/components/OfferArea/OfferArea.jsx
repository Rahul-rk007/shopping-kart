import React from "react";

import "./OfferArea.css";
import bg5 from "../../assets/bg-img/bg-5.jpg";

const OfferArea = () => {
  return (
    <section
      className="offer_area height-700 section_padding_100 bg-img"
      style={{ backgroundImage: `url(${bg5})` }}
    >
      <div className="container h-100">
        <div className="row h-100 align-items-end justify-content-end">
          <div className="col-12 col-md-8 col-lg-6">
            <div
              className="offer-content-area wow fadeInUp"
              data-wow-delay="1s"
            >
              <h2>
                White t-shirt <span className="karl-level">Hot</span>
              </h2>
              <p>* Free shipping until 25 May 2025</p>
              <div className="offer-product-price">
                <h3>
                  <span className="regular-price">Rs. 250.00</span> Rs. 200.00
                </h3>
              </div>
              <a href="#" className="btn karl-btn mt-30">
                Shop Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferArea;
