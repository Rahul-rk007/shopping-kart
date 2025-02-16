import React from "react";
import "./OrderDetails.css";
import MyAccount from "../MyAccount";
import Product1 from "../../../assets/product-img/product-1.jpg";

const OrderDetails = () => {
  return (
    <MyAccount>
      
        <div className="ordrdetails-top-header">
          <h2 className="text-center ">Order Details</h2>
        </div>
        <div className="orderdetails-top-most-container">
          <div className="orderdetails-inner-container">
            <div className="ordrdetails-container mt-5">
              <div className="row orderdetails-top-box">
                {/* Order Info Section */}
                <div className="">
                  <h5 className="orderdetails-sub-header">Order Info</h5>
                  <p>Order number : 60235</p>
                  <p>Date : Los Angeles</p>
                  <p>Total : USD 2210</p>
                  <p>Payment method : Check payments</p>
                </div>

                {/* Shipping Address Section */}
                <div className="orderdetails-sub-box">
                  <h5 className="orderdetails-sub-header">Shipping Address</h5>
                  <p>Street : 56/8 </p>
                  <p>City : Los Angeles</p>
                  <p>Country : United States</p>
                  <p>Postcode : 36952</p>
                </div>
              </div>
              <h5 className="orderdetails-sub-header">User Info</h5>
              <div className="orderdetails-uderinfo-section">
                <div className="orderdetails-user-info-item">
                  User Name : john{" "}
                </div>
                <div className="orderdetails-user-info-item">
                  E-mail : john123@gmail.com
                </div>
                <div className="orderdetails-user-info-item">
                  Mobile No : 22233 45636
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
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array(3)
                      .fill()
                      .map((_, i) => (
                        <tr key={i}>
                          <td>
                            <img
                              src={Product1} // Replace with the actual image path
                              alt="Product Image"
                              style={{
                                width: "50px",
                                height: "50px",
                                marginRight: "10px",
                              }} // Adjust size as needed
                            />
                            Pixelstore fresh Blackberry
                          </td>
                          <td>x 02</td>
                          <td>$720.00</td>
                        </tr>
                      ))}
                    <tr>
                      <td colSpan="2" className="orderdetails-text-right">
                        SUBTOTAL
                      </td>
                      <td>$2160.00</td>
                    </tr>
                    <tr>
                      <td colSpan="2" className="orderdetails-text-right">
                        SHIPPING
                      </td>
                      <td> $50.00</td>
                    </tr>
                    <tr>
                      <td
                        colSpan="2"
                        className="orderdetails-text-right font-weight-bold"
                      >
                        TOTAL
                      </td>
                      <td className="orderdetails-font-weight-bold">
                        $2210.00
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      
    </MyAccount>
  );
};

export default OrderDetails;
