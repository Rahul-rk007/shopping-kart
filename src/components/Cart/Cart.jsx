import React from "react";
import "./Cart.css";
import Layout from "../Layout/Layout";
import Product9 from "../../assets/product-img/product-9.jpg";

const Cart = () => {
  const handleQuantityChange = (operation) => {
    const qtyInput = document.getElementById("qty");
    let qty = parseInt(qtyInput.value, 10);
    if (operation === "minus" && qty > 1) {
      qtyInput.value = qty - 1;
    } else if (operation === "plus") {
      qtyInput.value = qty + 1;
    }
  };
  return (
    <Layout>
      <div className="cart_area section_padding_100 clearfix bg-color">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="cart-table clearfix">
                <table className="table table-responsive">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="cart_product_img d-flex align-items-center">
                        <a href="#">
                          <img src={Product9} alt="Product" />
                        </a>
                        <h6>Yellow Cocktail Dress</h6>
                      </td>
                      <td className="price">
                        <span>$49.88</span>
                      </td>
                      <td className="qty">
                        <div className="quantity">
                          <span
                            className="qty-minus"
                            onClick={() => handleQuantityChange("minus")}
                          >
                            <i className="fa fa-minus" aria-hidden="true"></i>
                          </span>
                          <input
                            type="number"
                            className="qty-text"
                            id="qty"
                            step="1"
                            min="1"
                            max="99"
                            name="quantity"
                            defaultValue="1"
                          />
                          <span
                            className="qty-plus"
                            onClick={() => handleQuantityChange("plus")}
                          >
                            <i className="fa fa-plus" aria-hidden="true"></i>
                          </span>
                        </div>
                      </td>
                      <td className="total_price">
                        <span>$49.88</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="cart-footer d-flex mt-30">
                <div className="back-to-shop w-50">
                  <a href="shop-grid-left-sidebar.html">Continue shopping</a>
                </div>
                <div className="update-checkout w-50 text-right">
                  <a href="#">Clear cart</a>
                  <a href="#">Update cart</a>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-md-6 col-lg-4">
              <div className="coupon-code-area mt-70">
                <div className="cart-page-heading">
                  <h5>Coupon code</h5>
                  <p>Enter your coupon code</p>
                </div>
                <form action="#">
                  <input type="search" name="search" placeholder="#569ab15" />
                  <button className="btn-red" type="submit">Apply</button>
                </form>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="shipping-method-area mt-70">
                <div className="cart-page-heading">
                  <h5>Shipping method</h5>
                  <p>Select the one you want</p>
                </div>

                <div className="custom-control custom-radio mb-30">
                  <input
                    type="radio"
                    id="customRadio1"
                    name="customRadio"
                    className="custom-control-input"
                  />
                  <label
                    className="custom-control-label d-flex align-items-center justify-content-between"
                    htmlFor="customRadio1"
                  >
                    <span>Next day delivery</span>
                    <span>$4.99</span>
                  </label>
                </div>

                <div className="custom-control custom-radio mb-30">
                  <input
                    type="radio"
                    id="customRadio2"
                    name="customRadio"
                    className="custom-control-input"
                  />
                  <label
                    className="custom-control-label d-flex align-items-center justify-content-between"
                    htmlFor="customRadio2"
                  >
                    <span>Standard delivery</span>
                    <span>$1.99</span>
                  </label>
                </div>

                <div className="custom-control custom-radio">
                  <input
                    type="radio"
                    id="customRadio3"
                    name="customRadio"
                    className="custom-control-input"
                  />
                  <label
                    className="custom-control-label d-flex align-items-center justify-content-between"
                    htmlFor="customRadio3"
                  >
                    <span>Personal Pickup</span>
                    <span>Free</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="cart-total-area mt-70">
                <div className="cart-page-heading">
                  <h5>Cart total</h5>
                  <p>Final info</p>
                </div>

                <ul className="cart-total-chart">
                  <li>
                    <span>Subtotal</span> <span>$59.90</span>
                  </li>
                  <li>
                    <span>Shipping</span> <span>Free</span>
                  </li>
                  <li>
                    <span>
                      <strong>Total</strong>
                    </span>{" "}
                    <span>
                      <strong>$59.90</strong>
                    </span>
                  </li>
                </ul>
                <a href="checkout.html" className="btn karl-checkout-btn btn-red">
                  Proceed to checkout
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
