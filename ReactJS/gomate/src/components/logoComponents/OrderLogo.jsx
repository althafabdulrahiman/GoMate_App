import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../context/UserContext";
import OrderLogoData from "./OrderLogoData";

const OrderLogo = ({
  orders,
  setOrders,
  drivers,
  setDrivers,
  vehicles,
  setVehicles,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "25px",
        margin: "30px",
        alignItems: "flex-start",
        maxHeight: "500px", // limit the height of the container
        overflowY: "auto", // enable vertical scroll
        paddingRight: "10px", // keeps them aligned from top
      }}
    >
      {orders.map(
        (order) =>
          order.Status === "Active" && (
            <OrderLogoData
              key={order._id}
              order={order}
              setOrders={setOrders}
              drivers={drivers}
              setDrivers={setDrivers}
              vehicles={vehicles}
              setVehicles={setVehicles}
            />
          )
      )}
    </div>
  );
};
export default OrderLogo;
