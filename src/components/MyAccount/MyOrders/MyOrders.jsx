import React, { useState } from "react";
import MyAccount from "../MyAccount";
import { Link } from "react-router-dom";
import "./MyOrders.css";

const MyOrders = () => {
  const ordersData = [
    { id: 1, date: "2023-10-01", status: "Shipped", amount: 100 },
    { id: 2, date: "2023-10-02", status: "Pending", amount: 50 },
    { id: 3, date: "2023-10-03", status: "Delivered", amount: 75 },
  ];

  const getOrderStatusClass = (status) => {
    const statusClass = "myorder-details-part2 ";
    switch (status) {
      case "Shipped":
        return statusClass + "status-shipped";
      case "Pending":
        return statusClass + "status-pending";
      case "Delivered":
        return statusClass + "status-delivered";
      default:
        return "myorder-details-part2";
    }
  };
  return (
    <MyAccount>
      <div>
        <div className="mt-5 align-items-center w-75 myorder-main-container">
          <h2 className="myorder-header">Your Orders</h2>
          <hr />
          {ordersData.map((order) => (
            <div
              key={order.id}
              onClick={() => handleOrderClick(order)}
              style={{ cursor: "pointer" }}
              className="myorder-container row mb-3" // Added row class for Bootstrap grid
            >
              <div className="myorder-details-part1 col-md-4">
                <div className="myorder-orderid d-flex justify-content-evenly">
                  <div className="font-weight-bold myorder-part1-box">
                    Order ID:{" "}
                  </div>
                  <div className="myorder-id">{`${order.id}`}</div>
                </div>
                <div className="myorder-orderid d-flex justify-content-evenly">
                  <div className="myorder-part1-box">Date: </div>
                  <div>{order.date}</div>
                </div>
              </div>
              <div
                className={`myorder-status  ${getOrderStatusClass(
                  order.status
                )}`}
              >
                {order.status}
              </div>
              <div className="myorder-details-part3 col-md-1">
                ${order.amount}
              </div>
              <div className="col-md-1">
                <button className="btn btn-primary myorder-arrow-btn">
                <Link to="/myaccount/orderdetails" className="">&gt;</Link>
                  
                </button>
              </div>
            </div>

          ))}
        </div>
      </div>
    </MyAccount>
  );
};

export default MyOrders;
