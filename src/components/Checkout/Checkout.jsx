import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import "./Checkout.css";
import Layout from "../Layout/Layout";
import { Link } from "react-router-dom";
import { getAllShippingAddresses } from "../../api/shippingAddressApi"; // Import the API function
import { getCartApi } from "../../api/cartApi"; // Import the API function to get cart details
import { checkout } from "../../api/orderApi";
import { toast } from "react-toastify";

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
  const [paymentMethod, setPaymentMethod] = useState("Cash on delivery"); // Default payment method
  const [phoneNumber, setPhoneNumber] = useState(""); // State to hold phone number

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
    const selectedId = event.target.value;

    const selectedAddress = shippingAddresses.find(
      (address) => address._id === selectedId
    );

    if (selectedAddress) {
      setSelectedAddress(selectedId);
      setPhoneNumber(selectedAddress.phoneNumber); // Set phone number from selected address
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
    return (subtotal - discountAmount + shippingCost).toFixed(2); // Total = Subtotal - Discount + Shipping
  };

  const handleCheckout = async () => {
    const subtotal = parseFloat(calculateSubtotal());
    const shippingCost =
      shippingMethod === "nextDay"
        ? 100
        : shippingMethod === "standard"
        ? 50
        : 0;

    const total = (subtotal - discountAmount + shippingCost).toFixed(2); // Total formatted to 2 decimal places

    if (!selectedAddress) {
      toast.error("Please select shipping address.");
    }

    const orderData = {
      shippingAddressId: selectedAddress, // Use the selected address ID
      paymentMethod: paymentMethod, // Payment method selected
      couponCode: couponCode, // Coupon code applied
      couponDetails:
        discountAmount > 0
          ? {
              value: discountAmount.toFixed(2), // Discount formatted to 2 decimal places
              type: "amount", // Assuming fixed amount discount
            }
          : null,
      phoneNumber: phoneNumber, // Use the phone number from state
      shippingMethod: shippingMethod, // Shipping method selected
      shippingCharges: shippingCost.toFixed(2), // Shipping charges formatted to 2 decimal places
      subtotal: subtotal.toFixed(2), // Subtotal formatted to 2 decimal places
      total: total, // Total already formatted
    };

    try {
      const response = await checkout(orderData); // Call the checkout API
      window.location.href = "/order-success";
    } catch (error) {
      console.error("Checkout failed:", error);
      toast.error(error);
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
                          <div className="custom-control custom-radio">
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
                      checked
                      onChange={() => setPaymentMethod("cash_on_delivery")} // Update state on change
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
                      onChange={() => setPaymentMethod("paypal")} // Update state on change
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
                      onChange={() => setPaymentMethod("credit_card")} // Update state on change
                    />
                    <label
                      className="form-check-label"
                      htmlFor="payment_credit_card"
                    >
                      Credit Card
                    </label>
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
