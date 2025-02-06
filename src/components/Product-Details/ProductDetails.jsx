import React, { useState } from "react";

import "./ProductDetails.css";
import Layout from "../Layout/Layout";
import Product2 from "../../assets/product-img/product-2.jpg";
import Product3 from "../../assets/product-img/product-3.jpg";
import Product4 from "../../assets/product-img/product-4.jpg";
import Product1 from "../../assets/product-img/product-1.jpg";
import Product5 from "../../assets/product-img/product-5.jpg";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (change) => {
    setQuantity((prev) => {
      const newQuantity = prev + change;
      return newQuantity < 1 ? 1 : newQuantity > 12 ? 12 : newQuantity;
    });
  };

  return (
    <Layout>
      <div className="breadcumb_area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <ol className="breadcrumb d-flex align-items-center">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">Dresses</a>
                </li>
                <li className="breadcrumb-item active">Long Dress</li>
              </ol>

              <a href="#" className="backToHome d-block">
                <i className="fa fa-angle-double-left"></i> Back to Category
              </a>
            </div>
          </div>
        </div>
      </div>

      <section className="single_product_details_area section_padding_0_100">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="single_product_thumb">
                <div
                  id="product_details_slider"
                  className="carousel slide"
                  data-ride="carousel"
                >
                  <ol className="carousel-indicators">
                    <li
                      className="active"
                      data-target="#product_details_slider"
                      data-slide-to="0"
                      style={{ backgroundImage: `url(${Product1})` }}
                    ></li>
                    <li
                      data-target="#product_details_slider"
                      data-slide-to="1"
                      style={{ backgroundImage: `url(${Product2})` }}
                    ></li>
                    <li
                      data-target="#product_details_slider"
                      data-slide-to="2"
                      style={{ backgroundImage: `url(${Product3})` }}
                    ></li>
                    <li
                      data-target="#product_details_slider"
                      data-slide-to="3"
                      style={{ backgroundImage: `url(${Product4})` }}
                    ></li>
                  </ol>

                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <a className="gallery_img" href={Product1}>
                        <img
                          className="d-block w-100"
                          src={Product1}
                          alt="First slide"
                        />
                      </a>
                    </div>
                    <div className="carousel-item">
                      <a className="gallery_img" href={Product2}>
                        <img
                          className="d-block w-100"
                          src={Product2}
                          alt="Second slide"
                        />
                      </a>
                    </div>
                    <div className="carousel-item">
                      <a className="gallery_img" href={Product3}>
                        <img
                          className="d-block w-100"
                          src={Product3}
                          alt="Third slide"
                        />
                      </a>
                    </div>
                    <div className="carousel-item">
                      <a className="gallery_img" href={Product4}>
                        <img
                          className="d-block w-100"
                          src={Product4}
                          alt="Fourth slide"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="single_product_desc">
                <h4 className="title">
                  <a href="#">Long Yellow Dress</a>
                </h4>
                <h4 className="price">$39.99</h4>
                <p className="available">
                  Available: <span className="text-muted">In Stock</span>
                </p>

                <div className="single_product_ratings mb-15">
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star-o" aria-hidden="true"></i>
                </div>

                <div className="widget size mb-50">
                  <h6 className="widget-title">Size</h6>
                  <div className="widget-desc">
                    <ul>
                      {[32, 34, 36, 38, 40, 42].map((size) => (
                        <li key={size}>
                          <a href="#">{size}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <form className="cart clearfix mb-50 d-flex" method="post">
                  <div className="quantity">
                    <span
                      className="qty-minus"
                      onClick={() => handleQuantityChange(-1)}
                    >
                      <i className="fa fa-minus" aria-hidden="true"></i>
                    </span>
                    <input
                      type="number"
                      className="qty-text"
                      id="qty"
                      step="1"
                      min="1"
                      max="12"
                      name="quantity"
                      value={quantity}
                      readOnly
                    />
                    <span
                      className="qty-plus"
                      onClick={() => handleQuantityChange(1)}
                    >
                      <i className="fa fa-plus" aria-hidden="true"></i>
                    </span>
                  </div>
                  <button
                    type="submit"
                    name="addtocart"
                    value="5"
                    className="btn cart-submit d-block"
                  >
                    Add to cart
                  </button>
                </form>

                <div id="accordion" role="tablist">
                  <div className="card">
                    <div className="card-header" role="tab" id="headingOne">
                      <h6 className="mb-0">
                        <a
                          data-toggle="collapse"
                          href="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          Information
                        </a>
                      </h6>
                    </div>

                    <div
                      id="collapseOne"
                      className="collapse show"
                      role="tabpanel"
                      aria-labelledby="headingOne"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Proin pharetra tempor sodales. Phasellus
                          sagittis auctor gravida. Integer bibendum sodales arcu
                          id tempus. Ut consectetur lacus.
                        </p>
                        <p>
                          Approx length 66cm/26" (Based on a UK size 8 sample)
                          Mixed fibres
                        </p>
                        <p>
                          The Model wears a UK size 8/ EU size 36/ US size 4 and
                          her height is 5'8"
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header" role="tab" id="headingTwo">
                      <h6 className="mb-0">
                        <a
                          className="collapsed"
                          data-toggle="collapse"
                          href="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          Cart Details
                        </a>
                      </h6>
                    </div>
                    <div
                      id="collapseTwo"
                      className="collapse"
                      role="tabpanel"
                      aria-labelledby="headingTwo"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Explicabo quis in veritatis officia inventore,
                          tempore provident dignissimos nemo, nulla quaerat.
                          Quibusdam non, eos, voluptatem reprehenderit hic nam!
                          Laboriosam, sapiente! Praesentium.
                        </p>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Officia magnam laborum eaque.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header" role="tab" id="headingThree">
                      <h6 className="mb-0">
                        <a
                          className="collapsed"
                          data-toggle="collapse"
                          href="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          Shipping &amp; Returns
                        </a>
                      </h6>
                    </div>
                    <div
                      id="collapseThree"
                      className="collapse"
                      role="tabpanel"
                      aria-labelledby="headingThree"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Esse quo sint repudiandae suscipit ab soluta
                          delectus voluptate, vero vitae, tempore maxime rerum
                          iste dolorem mollitia perferendis distinctio.
                          Quibusdam laboriosam rerum distinctio. Repudiandae
                          fugit odit, sequi id!
                        </p>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Beatae qui maxime consequatur laudantium
                          temporibus ad et. A optio inventore deleniti ipsa.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="you_may_like_area clearfix">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section_heading text-center">
                <h2>related Products</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="you_make_like_slider owl-carousel">
                <div className="single_gallery_item">
                  <div className="product-img">
                    <img src={Product1} alt="" />
                    <div className="product-quicview">
                      <a href="#" data-toggle="modal" data-target="#quickview">
                        <i className="ti-plus"></i>
                      </a>
                    </div>
                  </div>

                  <div className="product-description">
                    <h4 className="product-price">$39.90</h4>
                    <p>Jeans midi cocktail dress</p>

                    <a href="#" className="add-to-cart-btn">
                      ADD TO CART
                    </a>
                  </div>
                </div>

                <div className="single_gallery_item">
                  <div className="product-img">
                    <img src={Product2} alt="" />
                    <div className="product-quicview">
                      <a href="#" data-toggle="modal" data-target="#quickview">
                        <i className="ti-plus"></i>
                      </a>
                    </div>
                  </div>

                  <div className="product-description">
                    <h4 className="product-price">$39.90</h4>
                    <p>Jeans midi cocktail dress</p>

                    <a href="#" className="add-to-cart-btn">
                      ADD TO CART
                    </a>
                  </div>
                </div>

                <div className="single_gallery_item">
                  <div className="product-img">
                    <img src={Product3} alt="" />
                    <div className="product-quicview">
                      <a href="#" data-toggle="modal" data-target="#quickview">
                        <i className="ti-plus"></i>
                      </a>
                    </div>
                  </div>

                  <div className="product-description">
                    <h4 className="product-price">$39.90</h4>
                    <p>Jeans midi cocktail dress</p>

                    <a href="#" className="add-to-cart-btn">
                      ADD TO CART
                    </a>
                  </div>
                </div>

                <div className="single_gallery_item">
                  <div className="product-img">
                    <img src={Product4} alt="" />
                    <div className="product-quicview">
                      <a href="#" data-toggle="modal" data-target="#quickview">
                        <i className="ti-plus"></i>
                      </a>
                    </div>
                  </div>

                  <div className="product-description">
                    <h4 className="product-price">$39.90</h4>
                    <p>Jeans midi cocktail dress</p>

                    <a href="#" className="add-to-cart-btn">
                      ADD TO CART
                    </a>
                  </div>
                </div>

                <div className="single_gallery_item">
                  <div className="product-img">
                    <img src={Product5} alt="" />
                    <div className="product-quicview">
                      <a href="#" data-toggle="modal" data-target="#quickview">
                        <i className="ti-plus"></i>
                      </a>
                    </div>
                  </div>

                  <div className="product-description">
                    <h4 className="product-price">$39.90</h4>
                    <p>Jeans midi cocktail dress</p>

                    <a href="#" className="add-to-cart-btn">
                      ADD TO CART
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetails;
