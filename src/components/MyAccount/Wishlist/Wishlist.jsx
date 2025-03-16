import React from "react";
import MyAccount from "../MyAccount";
import "./Wishlist.css";
import Product1 from "../../../assets/product-img/product-1.jpg";
import Product2 from "../../../assets/product-img/product-2.jpg";
import Product3 from "../../../assets/product-img/product-3.jpg";

const Wishlist = () => {
  return (
    <MyAccount>
      <div>
        <div className="wishlist-body-content">
          <div className="container">
            <div className="my-wishlist-page">
              <div className="row">
                <div className="col-md-10 my-wishlist wishlist-tablebody">
                  <div className="table-responsive">
                    <h2
                      colSpan="4"
                      className="wishlist-heading-title wishlist-title"
                    >
                      My Wishlist
                    </h2>
                    <div className="wishlist-table-container">
                    <table className="table wishlist-table">
                      <tbody>
                        <tr>
                          <td className="col-md-2 col-sm-6 col-xs-6">
                            <img src={Product1} alt="Product 1" />
                          </td>
                          <td className="col-md-7 col-sm-6 col-xs-6">
                            <div className="wishlist-product-name wishlist-product-details">
                              <a href="#">Floral Print Buttoned</a>
                            </div>
                            <div className="wishlist-rating wishlist-product-details">
                              <i className="fa fa-star rate"></i>
                              <i className="fa fa-star rate"></i>
                              <i className="fa fa-star rate"></i>
                              <i className="fa fa-star rate"></i>
                              <i className="fa fa-star non-rate"></i>
                              <span className="review wishlist-reviews">
                                ( 06 Reviews )
                              </span>
                            </div>
                            <div className="wishlist-price wishlist-price wishlist-product-details">
                            Rs. 400.00 <span>Rs. 900.00</span>
                            </div>
                          </td>
                          <td className="col-md-2">
                            <a
                              href="#"
                              className="wishlist-btn-upper btn btn-primary wishlist-btnaddtocart wishlist-btnaddtocart btn-red"
                            >
                              Add to cart
                            </a>
                          </td>
                          <td className="col-md-1 wishlist-close-btn">
                            <a href="#">
                              <i className="fa fa-times"></i>
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td className="col-md-2">
                            <img src={Product2} alt="Product 2" />
                          </td>
                          <td className="col-md-7">
                            <div className="wishlist-product-name wishlist-product-details">
                              <a href="#">Floral Print Buttoned</a>
                            </div>
                            <div className="wishlist-rating wishlist-product-details">
                              <i className="fa fa-star rate"></i>
                              <i className="fa fa-star rate"></i>
                              <i className="fa fa-star rate"></i>
                              <i className="fa fa-star rate"></i>
                              <i className="fa fa-star non-rate"></i>
                              <span className="review wishlist-reviews">
                                ( 06 Reviews )
                              </span>
                            </div>
                            <div className="wishlist-price  wishlist-price wishlist-product-details">
                            Rs. 450.00 <span>Rs. 900.00</span>
                            </div>
                          </td>
                          <td className="col-md-2">
                            <a
                              href="#"
                              className="wishlist-btn-upper btn  btn-primary wishlist-btnaddtocart btn-red"
                            >
                              Add to cart
                            </a>
                          </td>
                          <td className="col-md-1 wishlist-close-btn">
                            <a href="#">
                              <i className="fa fa-times"></i>
                            </a>
                          </td>
                        </tr>
                        
                      </tbody>
                      
                    </table>
                    </div>
                  </div>
                </div>
              </div>
              {/* Brands Carousel */}
              <div
                id="brands-carousel"
                className="wishlist-logo-slider wow fadeInUp"
              >
                <div className="wishlist-logo-slider-inner">
                  <div
                    id="brand-slider"
                    className="owl-carousel brand-slider custom-carousel owl-theme"
                  >
                    {/* Add brand images here */}
                    {Array.from({ length: 10 }, (_, index) => (
                      <div className="item m-t-15" key={index}>
                        <a href="#" className="image">
                          <img
                            data-echo={`assets/images/brands/brand${
                              (index % 6) + 1
                            }.png`}
                            src={Product3}
                            alt=""
                          />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MyAccount>
  );
};

export default Wishlist;
