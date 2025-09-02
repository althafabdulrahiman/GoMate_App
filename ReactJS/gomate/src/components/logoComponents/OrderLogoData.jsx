// import { useContext, useEffect, useState } from "react";
// import { LoginContext } from "../../context/UserContext";

// const OrderLogoData = ({ order }) => {
//   const { token } = useContext(LoginContext);

//   const [driverId, setDriverId] = useState(null);
//   const [vehicleId, setVehicleId] = useState(null);
//   const [updatedOrder, setUpdatedOrder] = useState(null);

//   useEffect(() => {
//     try {
//       const fetchData = async () => {
//         const url = `http://localhost:3001/orders/getUpdatedOrder?id=${order._id}`;
//         const res = await fetch(url, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const data = await res.json();

//         // console.log("updated driver order:", data.data);
//         setUpdatedOrder(data.data[0]);
//       };
//       fetchData();
//     } catch (error) {
//       alert(`error occured:${error.message}`);
//     }
//   }, [order._id, token]);

//   console.log("setUpdatedOrder:", updatedOrder);

//   const handleDriverClick = async (e) => {
//     e.preventDefault();
//     if (!driverId) {
//       alert("Please enter a valid driver ID");
//       return;
//     }

//     const url = `http://localhost:3001/orders/updateOrder?id=${order._id}`;
//     const res = await fetch(url, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         driverId: driverId,
//       }),
//     });
//     console.log("setdriverId:", driverId);
//     setDriverId("");

//     const data = await res.json();
//     console.log("update Order:", data.data);

//     const url1 = `http://localhost:3001/orders/getUpdatedOrder?id=${order._id}`;
//     const res1 = await fetch(url1, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     const data1 = await res1.json();

//     // console.log("updated driver order:", data.data);
//     setUpdatedOrder(data1.data[0]);
//   };

//   const handleVehicleClick = async (e) => {
//     e.preventDefault();

//     if (!vehicleId) {
//       alert("Please enter a valid vehicle ID");
//       return;
//     }
//     const url = `http://localhost:3001/orders/updateOrder?id=${order._id}`;
//     const res = await fetch(url, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         vehicleId: vehicleId,
//       }),
//     });
//     console.log("setvehcileId:", vehicleId);

//     const data = await res.json();
//     console.log("update Order:", data.data);

//     const url1 = `http://localhost:3001/orders/getUpdatedOrder?id=${order._id}`;
//     const res1 = await fetch(url1, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     const data1 = await res1.json();

//     // console.log("updated driver order:", data.data);
//     setUpdatedOrder(data1.data[0]);
//     setVehicleId("");
//   };

//   return (
//     <div
//       style={{
//         backgroundColor: "#FFD700",
//         padding: "50px",
//         width: "250px",
//         borderRadius: "10px",
//         boxSizing: "border-box",
//       }}
//     >
//       <h6>{order.StartLocation}</h6> <h6>TO</h6> <h6>{order.DropLocation}</h6>
//       <h6>Driver:{updatedOrder?.Driver?.Name || "No driver assigned"}</h6>
//       <h6>vehicle:{updatedOrder?.Vehicle?.Name || "No vehicle assigned"}</h6>
//       DriverId:
//       <input
//         type="text"
//         value={driverId}
//         onChange={(e) => setDriverId(e.target.value)}
//       />
//       <button onClick={handleDriverClick}>save</button>
//       <br />
//       VehicleId:
//       <input
//         type="text"
//         value={vehicleId}
//         onChange={(e) => setVehicleId(e.target.value)}
//       />
//       <button onClick={handleVehicleClick}>save</button>
//       <div>
//         total cost:
//         {updatedOrder?.Driver?.Name &&
//           updatedOrder?.Vehicle?.Name &&
//           updatedOrder.Vehicle.PerKilometerRate * updatedOrder.Distance * 2 +
//             ((updatedOrder.Distance * 2) / 50) *
//               (updatedOrder.Driver.PerDayRate / 8)}
//       </div>
//     </div>
//   );
// };
// export default OrderLogoData;

//-------------------------------------------------------------------------------------------------

// import { useContext, useEffect, useState } from "react";
// import { LoginContext } from "../../context/UserContext";

// const OrderLogoData = ({ order }) => {
//   const { token } = useContext(LoginContext);

//   const [updatedOrder, setUpdatedOrder] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const url = `http://localhost:3001/orders/getUpdatedOrder?id=${order._id}`;
//         const res = await fetch(url, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const data = await res.json();
//         setUpdatedOrder(data.data[0]);
//       } catch (error) {
//         alert(`Error: ${error.message}`);
//       }
//     };

//     fetchData();
//   }, [order._id, token]);

//   const handleDrop = async (e) => {
//     e.preventDefault();
//     const droppedDriverId = e.dataTransfer.getData("driverId");
//     const droppedVehicleId = e.dataTransfer.getData("vehicleId");

//     let updatePayload = {};
//     if (droppedDriverId) updatePayload.driverId = droppedDriverId;
//     if (droppedVehicleId) updatePayload.vehicleId = droppedVehicleId;

//     if (Object.keys(updatePayload).length === 0) return;

//     try {
//       const url = `http://localhost:3001/orders/updateOrder?id=${order._id}`;
//       const res = await fetch(url, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(updatePayload),
//       });

//       await res.json();

//       // Fetch updated order again
//       const refreshedRes = await fetch(
//         `http://localhost:3001/orders/getUpdatedOrder?id=${order._id}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       const refreshedData = await refreshedRes.json();
//       setUpdatedOrder(refreshedData.data[0]);
//     } catch (err) {
//       console.error("Update failed:", err.message);
//     }
//   };

//   return (
//     <div
//       onDragOver={(e) => e.preventDefault()}
//       onDrop={handleDrop}
//       style={{
//         backgroundColor: "#FFD700",
//         padding: "50px",
//         width: "250px",
//         borderRadius: "10px",
//         boxSizing: "border-box",
//       }}
//     >
//       <h6>{order.StartLocation}</h6>
//       <h6>TO</h6>
//       <h6>{order.DropLocation}</h6>
//       <h6>Driver: {updatedOrder?.Driver?.Name || "No driver assigned"}</h6>
//       <h6>Vehicle: {updatedOrder?.Vehicle?.Name || "No vehicle assigned"}</h6>

//       <div>
//         Total Cost:
//         {updatedOrder?.Driver?.Name &&
//           updatedOrder?.Vehicle?.Name &&
//           updatedOrder.Vehicle.PerKilometerRate * updatedOrder.Distance * 2 +
//             ((updatedOrder.Distance * 2) / 50) *
//               (updatedOrder.Driver.PerDayRate / 8)}
//       </div>
//     </div>
//   );
// };

// export default OrderLogoData;

//------------------------------------------------------------------------------------------------------

import { PencilSquare, Trash } from "react-bootstrap-icons";

import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../context/UserContext";
import OrderPopup from "../../Popup/OrderPopup";
import { InfoCircle } from "react-bootstrap-icons"; // for info icon
// import UseOrderHook from "../../CustomHooks/UseOrderHook";

const OrderLogoData = ({
  order,
  setOrders,
  drivers,
  setDrivers,
  vehicles,
  setVehicles,
}) => {
  const { token, setDriverStatus } = useContext(LoginContext);
  const [updatedOrder, setUpdatedOrder] = useState(null);
  const orderId = order._id;

  // const [checkOrder, setCheckOrder] = UseOrderHook(token, order._id);
  const [checkOrder, setCheckOrder] = useState(null);

  const isPastOrder =updatedOrder && new Date(updatedOrder.EndDate).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);

  const [isPopup, setIsPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `http://localhost:3001/orders/getUpdatedOrder?id=${order._id}`;
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setUpdatedOrder(data.data[0]);
        console.log("updated Order:", updatedOrder);
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    };
    fetchData();
    const fetchCurrentOrder = async () => {
      const url = `http://localhost:3001/orders/get?id=${order._id}`;
      const res = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const dt = await res.json();
      console.log("checked . data:", dt.data);
      setCheckOrder(dt.data);
    };

    fetchCurrentOrder();
  }, [order._id, token]);

  const handleDrop = async (e) => {
    e.preventDefault();

     if (isPastOrder) {
    alert("Cannot assign drivers/vehicles to past orders");
    return;
  }
    // setDriverStatus("Inactive");

    const droppedDriverId = e.dataTransfer.getData("driverId");
    const droppedVehicleId = e.dataTransfer.getData("vehicleId");

    let updatePayload = {};
    if (droppedDriverId && !updatedOrder?.Driver?._id)
      updatePayload.driverId = droppedDriverId;
    if (droppedVehicleId && !updatedOrder?.Vehicle?._id)
      updatePayload.vehicleId = droppedVehicleId;

    if (Object.keys(updatePayload).length === 0) {
      console.warn("Driver/vehicle already assigned. Cannot assign again.");
      return;
    }

    const url = `http://localhost:3001/drivers/get?id=${updatePayload.driverId}`;
    const res = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const dt = await res.json();
    console.log("checked driver data:", dt.data);
    const drData = dt.data;

    console.log("license:", drData?.License);

    const url1 = `http://localhost:3001/vehicles/get?id=${updatePayload.vehicleId}`;
    const res1 = await fetch(url1, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const dt1 = await res1.json();
    console.log("checked vehicle data:", dt1.data);
    const vhData = dt1.data;

    // console.log("license:", drData?.License);

    if (
      (checkOrder?.ServiceType === "Goods" ||
        checkOrder?.ServiceType === "PassengerWithGoods" ||
        checkOrder?.PassengersCount > 6) &&
      drData?.License === "LMV"
    ) {
      return alert("LMV drivers cannot assign this orders");
    }

    if (checkOrder?.PassengersCount > vhData?.PassengerCapacity) {
      return alert("Less passenger capacity");
    }
    if (checkOrder?.GoodsWeight > vhData?.GoodsCapacity) {
      return alert("Less Goods capacity");
    }

    try {
      const url = `http://localhost:3001/orders/updateOrder?id=${order._id}`;
      const res = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatePayload),
      });

      const result = await res.json();

      const refreshedRes = await fetch(
        `http://localhost:3001/orders/getUpdatedOrder?id=${order._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const refreshedData = await refreshedRes.json();
      const updated = refreshedData.data[0];
      setUpdatedOrder(updated);
      console.log("updated Order1:", updatedOrder);

      if (droppedDriverId) {
        console.log("droppedDriverId:", droppedDriverId);

        setDrivers((prev) => prev.filter((d) => d._id !== droppedDriverId));
      }

      if (droppedVehicleId) {
        setVehicles((prev) => prev.filter((v) => v._id !== droppedVehicleId));
      }
    } catch (err) {
      console.error("Update failed:", err.message);
    }
  };

  const unassignDriver = async () => {
    if (!updatedOrder?.Driver?._id) return;

    const driverToRestore = updatedOrder.Driver;

    try {
      const url = `http://localhost:3001/orders/updateOrder?id=${order._id}`;
      const res = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ driverId: null }),
      });

      await res.json();

      setDrivers((prev) => [...prev, driverToRestore]);

      const refreshedRes = await fetch(
        `http://localhost:3001/orders/getUpdatedOrder?id=${order._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const refreshedData = await refreshedRes.json();
      setUpdatedOrder(refreshedData.data[0]);
      console.log("updated Order2:", updatedOrder);
    } catch (err) {
      console.error("Unassign failed:", err.message);
    }
  };

  const unassignVehicle = async () => {
    if (!updatedOrder?.Vehicle?._id) return;

    const vehicleToRestore = updatedOrder.Vehicle;

    try {
      const url = `http://localhost:3001/orders/updateOrder?id=${order._id}`;
      const res = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ vehicleId: null }),
      });

      await res.json();

      setVehicles((prev) => [...prev, vehicleToRestore]);

      const refreshedRes = await fetch(
        `http://localhost:3001/orders/getUpdatedOrder?id=${order._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const refreshedData = await refreshedRes.json();
      setUpdatedOrder(refreshedData.data[0]);
      console.log("updated Order3:", updatedOrder);
    } catch (err) {
      console.error("Unassign failed:", err.message);
    }
  };

  const handleButton = () => {
    setIsPopup(true);
  };

  const start = new Date(updatedOrder?.StartDate);
  const end = new Date(updatedOrder?.EndDate);
  const diffMs = end - start + 1;
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  const overtimeHour = Math.max(
    Math.ceil((updatedOrder?.Distance * 2 - diffDays * 400) / 50),
    0
  );
  const driverCost = Math.max(
    diffDays * (updatedOrder?.Driver?.PerDayRate ?? 0) +
      overtimeHour * (updatedOrder?.Driver?.OvertimeRate ?? 0),
    0
  );
  const vehicleCost =
    updatedOrder?.Vehicle?.Name &&
    updatedOrder?.Vehicle?.PerKilometerRate * (updatedOrder?.Distance * 2);

  const totalCost = (driverCost ?? 0) + (vehicleCost ?? 0);

  useEffect(() => {
  if (!updatedOrder) return;

  // If order is expired and has driver/vehicle assigned
  const needsUnassign =
    isPastOrder && (updatedOrder.Driver?._id || updatedOrder.Vehicle?._id);

  if (!needsUnassign) return;

  const unassignExpiredOrder = async () => {
    let payload = {};
    if (updatedOrder.Driver?._id) payload.driverId = null;
    if (updatedOrder.Vehicle?._id) payload.vehicleId = null;

    try {
      await fetch(`http://localhost:3001/orders/updateOrder?id=${order._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      // Restore driver/vehicle to lists if needed
      if (updatedOrder.Driver?._id) setDrivers((prev) => [...prev, updatedOrder.Driver]);
      if (updatedOrder.Vehicle?._id)
        setVehicles((prev) => [...prev, updatedOrder.Vehicle]);

      // Refresh order
      const refreshedRes = await fetch(
        `http://localhost:3001/orders/getUpdatedOrder?id=${order._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const refreshedData = await refreshedRes.json();
      setUpdatedOrder(refreshedData.data[0]);
    } catch (err) {
      console.error("Automatic unassign failed:", err.message);
    }
  };

  unassignExpiredOrder();
}, [updatedOrder, order._id, token]);


  return (
    // <div
    //   onDragOver={(e) => e.preventDefault()}
    //   onDrop={handleDrop}
    //   style={{
    //     backgroundColor: "#FFD700",
    //     padding: "20px",
    //     width: "250px",
    //     height: "250px", // fixed height
    //     overflowY: "auto", // scroll inside instead of expanding
    //     borderRadius: "10px",
    //     boxSizing: "border-box",
    //     boxShadow: "0 2px 6px rgba(0,0,0,0.5)",
    //     border: "4px solid gray",
    //     flex: "0 0 calc(25% - 20px)",
    //   }}
    // >
    //   <h6>{order.StartLocation}</h6>
    //   <h6>TO</h6>
    //   <h6>
    //     {order.DropLocation}{" "}
    //     <button
    //       style={{
    //         backgroundColor: "gray",
    //         color: "#FFD700",
    //         border: "4px solid gray",
    //         borderRadius: "5px",
    //       }}
    //       onClick={handleButton}
    //     >
    //       More
    //     </button>
    //   </h6>
    //   <h6>
    //     Driver:{" "}
    //     {updatedOrder?.Driver?.Name || (
    //       <span style={{ color: "gray" }}>No driver assigned</span>
    //     )}{" "}
    //     {updatedOrder?.Driver && (
    //       <button
    //         onClick={unassignDriver}
    //         className="btn btn-outline-danger btn-sm"
    //       >
    //         <Trash size={14} />
    //       </button>
    //     )}
    //   </h6>

    //   <h6>
    //     Vehicle:{" "}
    //     {updatedOrder?.Vehicle?.Name || (
    //       <span style={{ color: "gray" }}>No vehicle assigned</span>
    //     )}{" "}
    //     {updatedOrder?.Vehicle && (
    //       <button
    //         onClick={unassignVehicle}
    //         className="btn btn-outline-danger btn-sm"
    //       >
    //         <Trash size={14} />
    //       </button>
    //     )}
    //   </h6>

    //   <div>
    //     Days:{diffDays} <br />
    //     Overtime Hour:{overtimeHour}
    //     <br />
    //     Driver Cost:{driverCost}
    //     <br />
    //     Vehicle Cost:{""}
    //     {vehicleCost}
    //     <br />
    //     Total Cost: {totalCost}
    //     {/* {updatedOrder?.Driver?.Name &&
    //       updatedOrder?.Vehicle?.Name &&
    //       updatedOrder.Vehicle.PerKilometerRate * updatedOrder.Distance * 2 +
    //         ((updatedOrder.Distance * 2) / 50) *
    //           (updatedOrder.Driver.PerDayRate / 8)} */}
    //   </div>
    //   {isPopup && (
    //     <OrderPopup orderId={orderId} setIsPopup={setIsPopup} token={token} />
    //   )}
    // </div>

    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      style={{
        // backgroundColor: "#FFD700",
        backgroundColor:updatedOrder?.Driver?.Name && updatedOrder?.Vehicle?.Name ? "green" : "Red",
        color:"white",
        padding: "12px",
        width: "250px",
        height: "250px", // fixed height
        overflowY: "auto", // scroll inside instead of expanding
        borderRadius: "10px",
        boxSizing: "border-box",
        boxShadow: "0 2px 6px rgba(0,0,0,0.5)",
        border: "4px solid gray",
        flex: "0 0 calc(25% - 20px)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "0.85rem",
          flexWrap: "wrap",
        }}
      >
        <h6 className="fw-bold mb-0">{order.StartLocation}</h6>

        <h6 className="mb-0" style={{fontWeight:"bold",color:"#ffd700"}}>To</h6>

        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <h6 className="fw-bold mb-0">{order.DropLocation}</h6>
          <button
            style={{
              backgroundColor: "gray",
              color: "white",
              border: "none",
              borderRadius: "50%",
              padding: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={handleButton}
          >
            <InfoCircle size={12} />
          </button>
        </div>
      </div>

      <hr
        style={{
          border: "none",
          borderTop: "1px solid #888",
          margin: "6px 0",
        }}
      />

      <h6 className="mb-2" style={{ fontSize: "0.85rem" ,}}>
        Driver:{" "}
        {updatedOrder?.Driver?.Name || (
          <span style={{ color: "#ffd700" }}>No driver assigned</span>
        )}{" "}
        {updatedOrder?.Driver && (
          <button
            onClick={unassignDriver}
            className="btn btn-outline-danger btn-sm"
            style={{ padding: "2px 5px" ,backgroundColor:"#ffd700",color:"black"}}
          >
            <Trash size={14} />
          </button>
        )}
      </h6>

      <h6 className="mb-2" style={{ fontSize: "0.85rem" }}>
        Vehicle:{" "}
        {updatedOrder?.Vehicle?.Name || (
          <span style={{ color: "#ffd700" }}>No vehicle assigned</span>
        )}{" "}
        {updatedOrder?.Vehicle && (
          <button
            onClick={unassignVehicle}
            className="btn btn-outline-danger btn-sm"
            style={{ padding: "2px 5px",backgroundColor:"#ffd700",color:"black" }}
          >
            <Trash size={14} />
          </button>
        )}
      </h6>

      <div style={{ fontSize: "0.8rem", borderTop: "1px solid #3838362a" }}>
        {/* Days: {diffDays} <br />
        Overtime Hour: {overtimeHour} <br />
        Driver Cost:
        <span style={{ color: "#0066ffff", fontWeight: "500" }}>
          {driverCost}
        </span>
        <br />
        Vehicle Cost:
        <span style={{ color: "#0066ffff", fontWeight: "500" }}>
          {vehicleCost}
        </span>
        <br /> */}
        Total Cost:{" "}
        <span style={{ color: "#ffd700", fontWeight: "600" }}>{totalCost}</span>
      </div>

      {isPopup && (
        <OrderPopup orderId={orderId} setIsPopup={setIsPopup} token={token} />
      )}
    </div>
  );
};

export default OrderLogoData;
