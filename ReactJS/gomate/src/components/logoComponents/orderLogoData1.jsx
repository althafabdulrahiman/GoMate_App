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
import UseOrderHook from "../../CustomHooks/UseOrderHook";

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

  const { checkOrder, setCheckOrder } = UseOrderHook(token, order._id);

  const handleDrop = async (e) => {
    e.preventDefault();

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
    console.log("checked data:", dt.data);
    const drData = dt.data;

    if (checkOrder?.ServiceType === "Goods" && drData?.License === "LMV") {
      return alert("LMV driver cannot assign goods Order");
    }
    if (
      checkOrder?.ServiceType === "PassengerWithGoods" &&
      drData?.License === "LMV"
    ) {
      return alert("LMV Driver cannot assign Goods with Passenger Order");
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

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      style={{
        backgroundColor: "#FFD700",
        padding: "20px",
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
      <h6>{order.StartLocation}</h6>
      <h6>TO</h6>
      <h6>{order.DropLocation}</h6>

      <h6>
        Driver:{" "}
        {updatedOrder?.Driver?.Name || (
          <span style={{ color: "gray" }}>No driver assigned</span>
        )}{" "}
        {updatedOrder?.Driver && (
          <button
            onClick={unassignDriver}
            className="btn btn-outline-danger btn-sm"
          >
            <Trash size={14} />
          </button>
        )}
      </h6>

      <h6>
        Vehicle:{" "}
        {updatedOrder?.Vehicle?.Name || (
          <span style={{ color: "gray" }}>No vehicle assigned</span>
        )}{" "}
        {updatedOrder?.Vehicle && (
          <button
            onClick={unassignVehicle}
            className="btn btn-outline-danger btn-sm"
          >
            <Trash size={14} />
          </button>
        )}
      </h6>

      <div>
        Total Cost:{" "}
        {updatedOrder?.Driver?.Name &&
          updatedOrder?.Vehicle?.Name &&
          updatedOrder.Vehicle.PerKilometerRate * updatedOrder.Distance * 2 +
            ((updatedOrder.Distance * 2) / 50) *
              (updatedOrder.Driver.PerDayRate / 8)}
      </div>
    </div>
  );
};

export default OrderLogoData;
