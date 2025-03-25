import React from "react";
import { Link, useLocation } from "react-router-dom";
import Layout from "../Layout/Layout";
import { toast } from "react-toastify";

const OrderSuccess = () => {
  const location = useLocation();
  const orderNumber = location.state?.orderNumber; // Get the order number from location state
  console.log(orderNumber);

  // Optionally, show a toast message if needed

  return (
    <Layout>
      <div className="order-success-area section_padding_100 bg-color">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8">
              <div className="order-success-message text-center">
                <h2>Order Placed Successfully!</h2>
                {orderNumber && <h3>Order Number: {orderNumber}</h3>}
                <p>
                  Thank you for your order! You can view your order details in
                  your account.
                </p>
                <Link to="/myaccount/myorders" className="btn btn-primary">
                  Go to My Orders
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderSuccess;
