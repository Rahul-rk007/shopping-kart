import React, { useState, useEffect } from "react";
import MyAccount from "../MyAccount";
import { useParams, useNavigate } from "react-router-dom";
import {
  getOrderDetails,
  cancelOrder,
  getUserProfile,
} from "../../../api/orderDetailsApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./orderDetails.css";

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [userData, setUserData] = useState(null); // State for user data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const data = await getOrderDetails(orderId);
        setOrderDetails(data); // Set the response directly
        console.log(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserProfile = async () => {
      try {
        const data = await getUserProfile();
        setUserData(data);
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
      }
    };

    fetchOrderDetails();
    fetchUserProfile(); // Call the function to fetch user data
  }, [orderId]);

  const handleCancelOrder = async () => {
    try {
      const response = await cancelOrder(orderId);
      toast.success(response.message);
      // Optionally navigate to another page after cancellation
      // navigate("/myaccount/myorders");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to cancel order");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Check if orderDetails is defined before destructuring
  if (!orderDetails) {
    return <div>No order details found.</div>;
  }

  const {
    products,
    shippingAddress,
    subTotal,
    totalAmount,
    quantity,
    total,
    paymentMethod,
    orderDate,
    orderNumber,
    phoneNumber,
    shippingCharges,
    couponCode,
    couponDetails,
  } = orderDetails;

  const floatVal = (value) => {
    return value.toFixed(2);
  };

  return (
    <MyAccount>
      <div className="ordrdetails-top-header">
        <h2 className="text-center">Order Details</h2>
      </div>
      <div className="orderdetails-top-most-container">
        <div className="orderdetails-inner-container">
          <div className="ordrdetails-container mt-5">
            <div className="row orderdetails-top-box">
              {/* Order Info Section */}
              <div>
                <h5 className="orderdetails-sub-header">Order Info</h5>
                <p>Order number: {orderNumber}</p>
                <p>Date: {new Date(orderDate).toLocaleDateString()}</p>
                <p>Total: Rs. {floatVal(totalAmount)}</p>
                <p>Payment method: {paymentMethod}</p>
              </div>

              {/* Shipping Address Section */}
              <div className="orderdetails-sub-box">
                <h5 className="orderdetails-sub-header">Shipping Address</h5>
                <p>Street: {shippingAddress.address1}</p>
                <p>City: {shippingAddress.city}</p>
                {/* <p>State: {shippingAddress.state}</p> */}
                <p>Postcode: {shippingAddress.zipCode}</p>
              </div>
            </div>
            <h5 className="orderdetails-sub-header">User Info</h5>
            <div className="orderdetails-uderinfo-section">
              <div className="orderdetails-user-info-item">
                User Name: {shippingAddress.fullName}
              </div>
              <div className="orderdetails-user-info-item">
                E-mail: {userData ? userData.email : "Loading..."}
              </div>
              <div className="orderdetails-user-info-item">
                Mobile No: {phoneNumber}
              </div>
            </div>

            {/* Order Details Section */}
            <div className="mt-5">
              <h5>Order Details</h5>
              <table className="table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th className="orderdetails-text-right">Price</th>
                    <th className="orderdetails-text-center">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={index}>
                      <td>
                        <img
                          src={product.ImageURLs[0]} // Use the first image URL
                          alt="Product Image"
                          style={{
                            height: "70px",
                            marginRight: "10px",
                          }}
                        />
                        {product.ProductName}
                      </td>
                      <td className="orderdetails-text-center">
                        {product.quantity} x
                      </td>
                      <td className="orderdetails-text-right">
                        {floatVal(product.price)}
                      </td>
                      <td className="orderdetails-text-right">
                        Rs. {floatVal(product.price * product.quantity)}
                      </td>
                    </tr>
                  ))}
                  {/* <td className="orderdetails-table "> */}
                    <tr>
                      <td colSpan="2"></td>
                      <td colSpan="1" className="orderdetails-text-right orderdetail-border-bottom">
                        SUBTOTAL
                      </td>
                      <td className="orderdetails-text-right orderdetail-border-bottom">
                        Rs. {floatVal(subTotal)}
                      </td>
                    </tr>
                    <tr>
                    <td colSpan="2" className="orderdetails-table"></td>
                      <td colSpan="1" className="orderdetails-text-right orderdetails-table  orderdetail-border-bottom">
                        SHIPPING
                      </td>
                      <td className="orderdetails-text-right orderdetails-table  orderdetail-border-bottom">
                        Rs. {floatVal(shippingCharges)}
                      </td>
                    </tr>
                    {couponCode !== "" && couponDetails && (
                      <tr>
                        <td colSpan="2" className="orderdetails-table "></td>
                        <td colSpan="1" className="orderdetails-text-right orderdetails-table">
                          COUPON
                        </td>
                        <td className="orderdetails-text-right orderdetails-table">
                          Rs. {floatVal(couponDetails.value)}
                        </td>
                      </tr>
                    )}
                  {/* </td> */}
                  <tr>
                    <td
                      colSpan="3"
                      className="orderdetails-text-right font-weight-bold"
                    >
                      TOTAL
                    </td>
                    <td className="orderdetails-font-weight-bold orderdetails-text-right">
                      Rs. {floatVal(totalAmount)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Cancel Order Button */}
            <div className="text-center mt-4">
              <button
                className="btn btn-danger btn-red"
                onClick={handleCancelOrder}
              >
                Cancel Order
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </MyAccount>
  );
};

export default OrderDetails;
