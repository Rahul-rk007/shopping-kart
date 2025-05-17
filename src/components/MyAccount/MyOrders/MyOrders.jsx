import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MyAccount from "../MyAccount";
import { Link } from "react-router-dom";
import { getOrderList } from "../../../api/myOrderListApi";
import "./MyOrders.css";

const MyOrders = () => {
  const { orderId } = useParams();
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrderList();
        setOrdersData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getOrderStatusClass = (status) => {
    const statusClass = "myorder-details-part2 ";
    switch (status) {
      case "Placed":
        return statusClass + "status-placed";
      case "Confirmed":
        return statusClass + "status-confirmed";
      case "Pending":
        return statusClass + "status-pending";
      case "Out for Delivery":
        return statusClass + "status-out-for-delivery";
      case "Delivered":
        return statusClass + "status-delivered";
      case "Shipped":
        return statusClass + "status-shipped";
      case "Returned":
        return statusClass + "status-returned";
      case "Cancelled":
        return statusClass + "status-Cancelled";
      case "Refunded":
        return statusClass + "status-refunded";
      default:
        return statusClass;
    }
  };

  const handleOrderClick = (order) => {
    console.log("Order clicked:", order);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <MyAccount>
      <div>
        <div className="mt-5 align-items-center w-75 myorder-main-container">
          <h2 className="myorder-header">Your Orders</h2>
          <hr />
          <div className="myorder-scroll-container">
            {ordersData.map((order, index) => (
              <div
                key={`${order.id}-${index}`}
                onClick={() => handleOrderClick(order)}
                style={{ cursor: "pointer" }}
                className="myorder-container row mb-3"
              >
                <div className="myorder-details-part1 col-md-4">
                  <div className="myorder-orderid d-flex justify-content-evenly">
                    <div className="font-weight-bold myorder-part1-box">
                      Order ID:{" "}
                    </div>
                    <div className="myorder-id">{`${order.orderNumber}`}</div>
                  </div>
                  <div className="myorder-orderid d-flex justify-content-evenly">
                    <div className="myorder-part1-box">Date: </div>
                    <div>{new Date(order.orderDate).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className={`myorder-status ${getOrderStatusClass(order.status)}`}>
                  {order.status}
                </div>
                <div className="myorder-details-part3 col-md-2">
                  Rs. {order.totalAmount}
                </div>
                <div className="col-md-1 myorder-details-part4">
                  <button className="btn myorder-arrow-btn">
                    <Link
                      to={`/myaccount/orderdetails/${order._id}`}
                      className="myorder-arrow-btn-link"
                    >
                      &gt;
                    </Link>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MyAccount>
  );
};

export default MyOrders;