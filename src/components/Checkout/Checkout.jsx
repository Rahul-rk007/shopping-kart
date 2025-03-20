import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import "./Checkout.css";
import Layout from "../Layout/Layout";
import { Link } from "react-router-dom";
import { getAllShippingAddresses } from "../../api/shippingAddressApi"; // Import the API function
import { getCartApi } from "../../api/cartApi"; // Import the API function to get cart details

const Checkout = () => {
  const location = useLocation(); // Get location to access state
  const [selectedAddress, setSelectedAddress] = useState(""); // Initialize selectedAddress
  const [shippingAddresses, setShippingAddresses] = useState([]); // State to hold shipping addresses
  const [cartItems, setCartItems] = useState([]); // State to hold cart items
  const [discountAmount, setDiscountAmount] = useState(
    Number(localStorage.getItem("discount")) || 0
  ); // State to hold discount amount
  const [couponCode, setCouponCode] = useState(
    localStorage.getItem("couponCode") || ""
  ); // State to hold coupon code
  const [shippingMethod, setShippingMethod] = useState(
    localStorage.getItem("shippingMethod") || ""
  ); // State to hold shipping method

  useEffect(() => {
    const fetchShippingAddresses = async () => {
      try {
        const addresses = await getAllShippingAddresses();
        setShippingAddresses(addresses.data || []); // Set the fetched addresses to state
      } catch (error) {
        console.error("Failed to fetch shipping addresses:", error);
      }
    };

    const fetchCartDetails = async () => {
      try {
        const response = await getCartApi(); // Fetch cart details from the API
        setCartItems(response.data.products); // Set the fetched cart items to state
      } catch (error) {
        console.error("Failed to fetch cart details:", error);
      }
    };

    fetchShippingAddresses();
    fetchCartDetails();
  }, []);

  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shippingCost =
      shippingMethod === "nextDay"
        ? 100
        : shippingMethod === "standard"
        ? 50
        : 0;
    return subtotal - discountAmount + shippingCost; // Total = Subtotal - Discount + Shipping
  };

  return (
    <Layout>
      <div className="checkout_area section_padding_100 bg-color">
        <div className="container">
          <div className="row justify-content-around ">
            <div className="checkout-left-section">
              <div className="col-12 col-md-12">
                <div className="checkout_details_area mt-50 clearfix">
                  <div className="justify-content-between d-flex">
                    <div className="cart-page-heading">
                      <h5>Shipping Address</h5>
                      <p>Select Your Shipping Address</p>
                    </div>
                    <div className="d-flex justify-content-end ">
                      <Link
                        to="/myaccount/address"
                        className="btn btn-primary checkout-add-address-btn btn-red"
                      >
                        &#43; New Address
                      </Link>
                    </div>
                  </div>
                  <hr />
                  <form action="#" method="post">
                    <div className="row address-scrollable">
                      {shippingAddresses.map((address, index) => (
                        <div className="col-12 mb-3" key={index}>
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              id={`address_${index}`}
                              name="shippingAddress"
                              className="custom-control-input"
                              value={address.id}
                              checked={
                                selectedAddress === address.id?.toString()
                              }
                              onChange={handleAddressChange}
                            />
                            <label
                              className="custom-control-label mb-3"
                              htmlFor={`address_${index}`}
                            >
                              <strong>{address.fullName}</strong>
                              <br />
                              {`${address.address1} ${
                                address.address1 ? ", " + address.address1 : ""
                              }${
                                address.city
                                  ? ", " +
                                    address.city +
                                    " - " +
                                    address.zipCode
                                  : ""
                              }${
                                address.state
                                  ? ", " + address.state.stateName
                                  : ""
                              }${
                                address.country
                                  ? ", " + address.country.countryName
                                  : ""
                              }`}
                              <br />
                              Phone: {address.phoneNumber}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-5">
              <div className="order-details-confirmation">
                <div className="cart-page-heading">
                  <h5>Your Order</h5>
                  <p>The Details</p>
                </div>

                <ul className="order-details-form mb-4">
                  <li>
                    <span>Product</span> <span>Total</span>
                  </li>
                  {cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                      <li key={index}>
                        <span>{item.productName}</span>{" "}
                        <span>
                          Rs. {(item.price * item.quantity).toFixed(2)}
                        </span>
                      </li>
                    ))
                  ) : (
                    <li>
                      <span>No items in cart</span> <span>Rs. 0.00</span>
                    </li>
                  )}
                  <li>
                    <span>Subtotal</span>{" "}
                    <span>Rs. {calculateSubtotal().toFixed(2)}</span>
                  </li>
                  {discountAmount > 0 && (
                    <li>
                      <span>Discount</span>{" "}
                      <span>- Rs. {discountAmount.toFixed(2)}</span>
                    </li>
                  )}
                  <li>
                    <span>Shipping</span>{" "}
                    <span>
                      Rs.{" "}
                      {shippingMethod === "nextDay"
                        ? "100.00"
                        : shippingMethod === "standard"
                        ? "50.00"
                        : "0.00"}
                    </span>
                  </li>
                  <li>
                    <span>Total</span>{" "}
                    <span>Rs. {calculateTotal().toFixed(2)}</span>
                  </li>
                </ul>

                <div id="accordion" role="tablist" className="mb-4">
                  <div className="card">
                    <div className="card-header" role="tab" id="headingOne">
                      <h6 className="mb-0">
                        <a
                          data-toggle="collapse"
                          href="#collapseOne"
                          aria-expanded="false"
                          aria-controls="collapseOne"
                        >
                          <i className="fa fa-circle-o mr-3"></i>Paypal
                        </a>
                      </h6>
                    </div>

                    <div
                      id="collapseOne"
                      className="collapse"
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
                          <i className="fa fa-circle-o mr-3"></i>Cash on
                          delivery
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
                          tempore provident dignissimos.
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
                          <i className="fa fa-circle-o mr-3"></i>Credit card
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
                          delectus voluptate, vero vitae.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header" role="tab" id="headingFour">
                      <h6 className="mb-0">
                        <a
                          className="collapsed"
                          data-toggle="collapse"
                          href="#collapseFour"
                          aria-expanded="true"
                          aria-controls="collapseFour"
                        >
                          <i className="fa fa-circle-o mr-3"></i>Direct bank
                          transfer
                        </a>
                      </h6>
                    </div>
                    <div
                      id="collapseFour"
                      className="collapse show"
                      role="tabpanel"
                      aria-labelledby="headingFour"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Est cum autem eveniet saepe fugit, impedit
                          magni.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <a href="#" className="btn karl-checkout-btn btn-red">
                  Place Order
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
