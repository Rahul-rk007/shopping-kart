import React, { useState } from "react";
import "./Checkout.css";
import Layout from "../Layout/Layout";
import { Link } from "react-router-dom";

const Checkout = () => {
  const [selectedAddress, setSelectedAddress] = useState("");

  const shippingAddresses = [
    {
      id: 1,
      name: "John Doe",
      address: "123 Main St, Springfield, USA",
      phone: "123-456-7890",
    },
    {
      id: 2,
      name: "Jane Smith",
      address: "456 Elm St, Springfield, USA",
      phone: "987-654-3210",
    },
    {
      id: 3,
      name: "Alice Johnson",
      address: "789 Oak St, Springfield, USA",
      phone: "555-555-5555",
    },
    {
      id: 1,
      name: "John Doe",
      address: "123 Main St, Springfield, USA",
      phone: "123-456-7890",
    },
  ];

  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);
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
                      {shippingAddresses.map((address) => (
                        <div className="col-12 mb-3" key={address.id}>
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              id={`address_${address.id}`}
                              name="shippingAddress"
                              className="custom-control-input"
                              value={address.id}
                              checked={
                                selectedAddress === address.id.toString()
                              }
                              onChange={handleAddressChange}
                            />
                            <label
                              className="custom-control-label mb-3"
                              htmlFor={`address_${address.id}`}
                            >
                              <strong>{address.name}</strong>
                              <br />
                              {address.address}
                              <br />
                              Phone: {address.phone}
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
                  <li>
                    <span>Cocktail Yellow dress</span> <span>Rs. 59.90</span>
                  </li>
                  <li>
                    <span>Subtotal</span> <span>Rs. 59.90</span>
                  </li>
                  <li>
                    <span>Shipping</span> <span>Free</span>
                  </li>
                  <li>
                    <span>Total</span> <span>Rs. 59.90</span>
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

                <a
                  href="#"
                  className="btn karl-checkout-btn btn-red"
                >
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
