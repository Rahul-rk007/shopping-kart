import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Cart.css";
import Layout from "../Layout/Layout";
import CartContext from "../../context/CartContext";
import { NavLink } from "react-router-dom";
import { clearCartApi } from "../../api/cartApi";
import { toast } from "react-toastify";

const Cart = () => {
  const { cart, removeFromCart, updateCart, setCart, getCart } =
    useContext(CartContext);
  const navigate = useNavigate(); // Create navigate function

  const [shippingMethod, setShippingMethod] = useState("personalPickup"); // Default shipping method
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0); // Discount amount

  const handleQuantityChange = (operation, productId) => {
    if (operation === "minus") {
      updateCart("decrease", productId);
    } else if (operation === "plus") {
      updateCart("increase", productId);
    }
  };

  useEffect(() => {
    getCart();
  }, [cart]);

  const clearCart = () => {
    clearCartApi()
      .then((res) => {
        setCart([]); // Clear the cart state in context
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error("Failed to clear cart. Please try again.");
      });
  };

  const handleShippingChange = (event) => {
    setShippingMethod(event.target.value);
  };

  const applyCoupon = () => {
    // Example: Apply a fixed discount for a specific coupon code
    if (couponCode === "COUPON20") {
      const subtotal = calculateSubtotal();
      const discountAmount = subtotal * 0.2; // 20% discount
      setDiscount(discountAmount);
      toast.success("Coupon applied successfully!");
    } else {
      toast.error("Invalid coupon code.");
    }
  };

  // Calculate subtotal
  const calculateSubtotal = () => {
    if (!Array.isArray(cart.products)) {
      return 0; // Return 0 if products is not an array
    }
    return cart.products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  };

  // Calculate total
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shippingCost =
      shippingMethod === "nextDay"
        ? 50
        : shippingMethod === "standard"
        ? 20
        : 0;
    return subtotal + shippingCost - discount;
  };

  const handleCheckout = () => {
    // Navigate to the checkout page with the applied coupon and shipping method
    navigate("/checkout", {
      state: {
        couponCode,
        shippingMethod,
        discount,
      },
    });
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
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.products && cart.products.length > 0 ? (
                      cart.products.map((item) => (
                        <tr key={item.product._id}>
                          <td className="cart_product_img d-flex align-items-center">
                            <a href="#">
                              <img src={item.image} alt="Product" />
                            </a>
                            <h6>{item.productName}</h6>
                          </td>
                          <td className="price">
                            <span>Rs. {item.price.toFixed(2)}</span>
                          </td>
                          <td className="qty">
                            <div className="quantity">
                              <span
                                className="qty-minus"
                                onClick={() =>
                                  handleQuantityChange(
                                    "minus",
                                    item.product._id
                                  )
                                }
                              >
                                <i
                                  className="fa fa-minus"
                                  aria-hidden="true"
                                ></i>
                              </span>
                              <input
                                type="number"
                                className="qty-text"
                                value={item.quantity}
                                readOnly
                              />
                              <span
                                className="qty-plus"
                                onClick={() =>
                                  handleQuantityChange("plus", item.product._id)
                                }
                              >
                                <i
                                  className="fa fa-plus"
                                  aria-hidden="true"
                                ></i>
                              </span>
                            </div>
                          </td>
                          <td className="total_price">
                            <span>
                              Rs. {(item.price * item.quantity).toFixed(2)}
                            </span>
                          </td>
                          <td className="action">
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => removeFromCart(item.product._id)}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
                          <h6>Your cart is empty.</h6>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="cart-footer d-flex mt-30">
                <div className="back-to-shop w-50">
                  <NavLink to="/products">Continue shopping</NavLink>
                </div>
                <div className="update-checkout w-50 text-right">
                  <button className="" onClick={clearCart}>
                    Empty cart
                  </button>
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
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    applyCoupon();
                  }}
                >
                  <input
                    type="text"
                    name="coupon"
                    placeholder="COUPON"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button className="btn-red" type="submit">
                    Apply
                  </button>
                </form>
                {discount > 0 && (
                  <div className="discount-info">
                    <p>Discount applied: Rs. {discount.toFixed(2)}</p>
                  </div>
                )}
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
                    name="shippingMethod"
                    value="nextDay"
                    className="custom-control-input"
                    checked={shippingMethod === "nextDay"}
                    onChange={handleShippingChange}
                  />
                  <label
                    className="custom-control-label d-flex align-items-center justify-content-between"
                    htmlFor="customRadio1"
                  >
                    <span>Expedited shipping</span>
                    <span>Rs. 100.00</span>
                  </label>
                  <small>(2-3 business days)</small>
                </div>

                <div className="custom-control custom-radio mb-30">
                  <input
                    type="radio"
                    id="customRadio2"
                    name="shippingMethod"
                    value="standard"
                    className="custom-control-input"
                    checked={shippingMethod === "standard"}
                    onChange={handleShippingChange}
                  />
                  <label
                    className="custom-control-label d-flex align-items-center justify-content-between"
                    htmlFor="customRadio2"
                  >
                    <span>Standard shipping</span>
                    <span>Rs. 50.00</span>
                  </label>
                  <small>(4-7 business days)</small>
                </div>

                <div className="custom-control custom-radio">
                  <input
                    type="radio"
                    id="customRadio3"
                    name="shippingMethod"
                    value="personalPickup"
                    className="custom-control-input"
                    checked={shippingMethod === "personalPickup"}
                    onChange={handleShippingChange}
                  />
                  <label
                    className="custom-control-label d-flex align-items-center justify-content-between"
                    htmlFor="customRadio3"
                  >
                    <span>Free shipping</span>
                    <span>Rs. 0.00</span>
                  </label>
                  <small>(7-15 business days)</small>
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
                    <span>Subtotal</span>{" "}
                    <span>Rs. {calculateSubtotal().toFixed(2)}</span>
                  </li>
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
                  {discount > 0 && (
                    <li>
                      <span>Discount</span>{" "}
                      <span>- Rs. {discount.toFixed(2)}</span>
                    </li>
                  )}
                  <li>
                    <span>
                      <strong>Total</strong>
                    </span>{" "}
                    <span>
                      <strong>Rs. {calculateTotal().toFixed(2)}</strong>
                    </span>
                  </li>
                </ul>
                <button
                  className="btn karl-checkout-btn btn-red"
                  onClick={handleCheckout} // Call handleCheckout on click
                >
                  Proceed to checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
