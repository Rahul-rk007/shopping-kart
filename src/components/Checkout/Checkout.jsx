// Checkout.js

import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "./Checkout.css";
import Layout from "../Layout/Layout";
import { getAllShippingAddresses } from "../../api/shippingAddressApi";
import { getCartApi } from "../../api/cartApi";
import { createPayPalPayment } from "../../api/checkoutApi"; // Import the new API functions
import { checkout } from "../../api/orderApi";
import { toast } from "react-toastify";

const Checkout = () => {
  const location = useLocation();
  const [selectedAddress, setSelectedAddress] = useState("");
  const [shippingAddresses, setShippingAddresses] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [discountAmount, setDiscountAmount] = useState(
    Number(localStorage.getItem("discount")) || 0
  );
  const [couponCode, setCouponCode] = useState(
    localStorage.getItem("couponCode") || ""
  );
  const [shippingMethod, setShippingMethod] = useState(
    localStorage.getItem("shippingMethod") || ""
  );
  const [paymentMethod, setPaymentMethod] = useState("cash_on_delivery");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    const fetchShippingAddresses = async () => {
      try {
        const addresses = await getAllShippingAddresses();
        setShippingAddresses(addresses.data || []);
      } catch (error) {
        console.error("Failed to fetch shipping addresses:", error);
      }
    };

    const fetchCartDetails = async () => {
      try {
        const response = await getCartApi();
        setCartItems(response.data.products);
      } catch (error) {
        console.error("Failed to fetch cart details:", error);
      }
    };

    fetchShippingAddresses();
    fetchCartDetails();
  }, []);

  const handleAddressChange = (event) => {
    const selectedId = event.target.value;
    const selectedAddress = shippingAddresses.find(
      (address) => address._id === selectedId
    );

    if (selectedAddress) {
      setSelectedAddress(selectedId);
      setPhoneNumber(selectedAddress.phoneNumber);
    }
  };

  const calculateSubtotal = () => {
    return cartItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const calculateTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());
    const shippingCost =
      shippingMethod === "nextDay"
        ? 100
        : shippingMethod === "standard"
        ? 50
        : 0;
    return (subtotal - discountAmount + shippingCost).toFixed(2);
  };
  const handleCheckout = async () => {
    const subtotal = parseFloat(calculateSubtotal());
    const shippingCost =
      shippingMethod === "nextDay"
        ? 100
        : shippingMethod === "standard"
        ? 50
        : 0;
  
    // const total = (subtotal - discountAmount + shippingCost).toFixed(2);
    const total = (subtotal - discountAmount + shippingCost).toFixed(2).toString();
  
    if (!selectedAddress) {
      toast.error("Please select a shipping address.");
      return;
    }
  
    // Handle PayPal payment
    if (paymentMethod === "paypal") {
      try {
        const paymentData = await createPayPalPayment(total);
        console.log("Payment Data:", paymentData); // Log the payment data for debugging
      
        // Check if paymentData and paymentData.links are defined
        if (paymentData && paymentData.links) {
          const approvalUrl = paymentData.links.find(
            (link) => link.rel === "approval_url"
          )?.href; // Use optional chaining to avoid errors
            console.log(approvalUrl);
          if (approvalUrl) {
            window.location.href = approvalUrl; // Redirect to PayPal
          } else {
            toast.error("Approval URL not found in payment data.");
          }
        } else {
          toast.error("Invalid payment data received.");
        }
      } catch (error) {
        toast.error("Error creating PayPal payment. Please try again later.");
        console.error("PayPal Payment Error:", error);
      }
      return; // Exit function after redirection
    }
  
    // Proceed with normal checkout API call for other payment methods
    const orderData = {
      shippingAddressId: selectedAddress,
      paymentMethod: paymentMethod,
      couponCode: couponCode,
      couponDetails:
        discountAmount > 0
          ? {
              value: discountAmount.toFixed(2),
              type: "amount",
            }
          : null,
      phoneNumber: phoneNumber,
      shippingMethod: shippingMethod,
      shippingCharges: shippingCost.toFixed(2),
      subtotal: subtotal.toFixed(2),
      total: total,
    };
  
    try {
      const response = await checkout(orderData);
      window.location.href = "/order-success"; // Redirect on success
    } catch (error) {
      console.error("Checkout failed:", error);
      toast.error("Checkout process failed. Please try again later.");
    }
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
                          <div className="custom-control custom-radio address-box">
                            <input
                              type="radio"
                              id={`address_${index}`}
                              name="shippingAddress"
                              className="custom-control-input"
                              value={address._id}
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
                        <span>
                          <img
                            className=""
                            src={item.image}
                            alt={item.productName}
                          />
                          {item.productName}
                        </span>{" "}
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
                    <span>Subtotal</span> <span>Rs. {calculateSubtotal()}</span>
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
                    <span>Total</span> <span>Rs. {calculateTotal()}</span>
                  </li>
                </ul>

                <div
                  id="accordion"
                  role="tablist"
                  className="mb-4 payment-section"
                >
                  <div className="payment-section-label">Payment Method</div>
                  <div className="payment-method">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="payment_cod"
                      checked={paymentMethod === "cash_on_delivery"}
                      onChange={() => setPaymentMethod("cash_on_delivery")}
                    />
                    <label className="form-check-label" htmlFor="payment_cod">
                      Cash on delivery
                    </label>
                  </div>
                  <div className="payment-method">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="payment_paypal"
                      checked={paymentMethod === "paypal"}
                      onChange={() => setPaymentMethod("paypal")}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="payment_paypal"
                    >
                      Paypal
                    </label>
                  </div>
                  <div className="payment-method">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="payment_credit_card"
                      checked={paymentMethod === "credit_card"}
                      onChange={() => setPaymentMethod("credit_card")}
                    />
                    {/* <label
                      className="form-check-label"
                      htmlFor="payment_credit_card"
                    >
                      Credit Card
                    </label> */}
                  </div>
                </div>

                <button
                  href="#"
                  className="btn karl-checkout-btn btn-red"
                  onClick={handleCheckout}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;


