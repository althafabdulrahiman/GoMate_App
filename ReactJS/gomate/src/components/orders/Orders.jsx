import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import OrdersData from "./OrdersData";

const Orders = () => {
  const { token } = useContext(LoginContext);
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const url = `http://localhost:3001/orders/get`;
      const res = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const dt = await res.json();
      console.log("data:", dt.data);
      setOrders(dt.data);
    };
    fetchData();
  }, []);

  const handleAdd = () => {
    navigate("/addOrder");
  };

  const handleOnDelete = (deletedId) => {
    setOrders((prev) => prev.filter((dr) => dr._id !== deletedId));
  };

  return (
    <div className="container mt-4">
      <h1 style={{ textAlign: "center", marginBottom: "10px", color: "gray" }}>
        Orders List
      </h1>
      <div className="mb-3 text-end">
        <button onClick={handleAdd} className="btn btn-warning btn-sm">
          Add Order
        </button>
      </div>

      <div className="table-responsive shadow rounded">
        <table className="table table-striped table-hover table-sm align-middle text-center small">
          <thead>
            <tr>
              {[
                "Start Location",
                "End Location",
                "Start Date",
                "End Date",
                "Service Type",
                "Passenger Count",
                "Goods Weight (Tons)",
                "Distance (km)",
                "Purpose",
                "Status",
                "Actions",
                " ",
              ].map((header, index) => (
                <th
                  key={index}
                  style={{
                    backgroundColor: "#FFD700",
                    color: "black",
                    whiteSpace: "nowrap",
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <OrdersData
                key={order._id}
                order={order}
                handleOnDelete={handleOnDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Orders;
