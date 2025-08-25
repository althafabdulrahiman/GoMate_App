// import DriverLogo from "./logoComponents/DriverLogo";
// import OrderLogo from "./logoComponents/OrderLogo";
// import VehicleLogo from "./logoComponents/VehicleLogo";
// import { useState, useEffect, useContext } from "react";
// import { LoginContext } from "../context/UserContext";

// const Home = () => {
//   const [drivers, setDrivers] = useState([]);
//   const [vehicles, setVehicles] = useState([]);
//   const [orders, setOrders] = useState([]);

//   const { token } = useContext(LoginContext);

//   useEffect(() => {
//     const fetchDriverData = async () => {
//       const url = `http://localhost:3001/drivers/getAvailable`;
//       const res = await fetch(url, {
//         method: "GET",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const dt = await res.json();
//       console.log("home driverdata:", dt.data);
//       setDrivers(dt.data);
//     };

//     const fetchOrderData = async () => {
//       const url = `http://localhost:3001/orders/get`;
//       const res = await fetch(url, {
//         method: "GET",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const dt = await res.json();
//       console.log("home orderdata:", dt.data);
//       setOrders(dt.data);
//     };

//     const fetchVehicleData = async () => {
//       const url = `http://localhost:3001/vehicles/getAvailable`;
//       const res = await fetch(url, {
//         method: "GET",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const dt = await res.json();
//       console.log("home vehicledata:", dt.data);
//       setVehicles(dt.data);
//     };
//     fetchDriverData();
//     fetchOrderData();
//     fetchVehicleData();
//   }, [token]);

//   return (
//     <div>
//       <div
//         style={{
//           height: "7px",
//           textAlign: "center",
//           color: "gray",
//           backgroundColor: "#FFD700",
//           boxShadow: "0 2px 6px rgba(0,0,0,0.5)",
//           position: "fixed",
//         }}
//       ></div>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-around",
//           alignItems: "center",
//           height: "250px",
//           margin: "30px",
//         }}
//       >
//         <div
//           style={{
//             backgroundColor: "#FFD700",
//             padding: "10px",
//             width: "250px",
//             borderRadius: "10px",
//             boxSizing: "border-box",
//             height: "200px", // fixed height
//             overflowY: "auto", // enables scroll when overflow
//             boxShadow: "0 2px 6px rgba(0,0,0,0.5)",
//             display: "flex",
//             flexDirection: "column",
//             gap: "5px",
//             border: "4px solid gray",
//           }}
//         >
//           <h6>Drivers</h6>
//           <div style={{ flex: 1 }}>
//             <DriverLogo drivers={drivers} setDrivers={setDrivers} />
//           </div>
//         </div>

//         <div
//           style={{
//             backgroundColor: "#FFD700",
//             padding: "10px",
//             width: "250px",
//             borderRadius: "10px",
//             boxSizing: "border-box",
//             height: "200px", // fixed height
//             overflowY: "auto",
//             boxShadow: "0 2px 6px rgba(0,0,0,0.5)",
//             display: "flex",
//             flexDirection: "column",
//             gap: "5px",
//             border: "4px solid gray",
//           }}
//         >
//           <h6>Vehicles</h6>
//           <div style={{ flex: 1 }}>
//             <VehicleLogo vehicles={vehicles} setVehicles={setVehicles} />
//           </div>
//         </div>
//       </div>
//       <div>
//         <h6 style={{ textAlign: "center" }}>Orders</h6>
//         <OrderLogo
//           orders={orders}
//           setOrders={setOrders}
//           drivers={drivers}
//           setDrivers={setDrivers}
//           vehicles={vehicles}
//           setVehicles={setVehicles}
//         />
//       </div>
//     </div>
//   );
// };
// export default Home;

import DriverLogo from "./logoComponents/DriverLogo";
import OrderLogo from "./logoComponents/OrderLogo";
import VehicleLogo from "./logoComponents/VehicleLogo";
import { useState, useEffect, useContext } from "react";
import { LoginContext } from "../context/UserContext";

const Home = () => {
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [orders, setOrders] = useState([]);

  const { token } = useContext(LoginContext);

  useEffect(() => {
    const fetchDriverData = async () => {
      const url = `http://localhost:3001/drivers/getAvailable`;
      const res = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const dt = await res.json();
      setDrivers(dt.data);
    };

    const fetchOrderData = async () => {
      const url = `http://localhost:3001/orders/get`;
      const res = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const dt = await res.json();
      setOrders(dt.data);
    };

    const fetchVehicleData = async () => {
      const url = `http://localhost:3001/vehicles/getAvailable`;
      const res = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const dt = await res.json();
      setVehicles(dt.data);
    };

    fetchDriverData();
    fetchOrderData();
    fetchVehicleData();
  }, [token]);

  return (
    <div>
      {/* Top yellow bar */}
      <div
        style={{
          height: "7px",
          textAlign: "center",
          color: "gray",
          backgroundColor: "#FFD700",
          boxShadow: "0 2px 6px rgba(0,0,0,0.5)",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
        }}
      ></div>

      {/* Main layout: Left (Drivers + Vehicles) | Right (Orders) */}
      <div
        style={{
          display: "flex",
          marginTop: "30px",
          padding: "20px",
          gap: "20px",
          alignItems: "flex-start",
        }}
      >
        {/* Left side: Drivers + Vehicles stacked */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "280px",
          }}
        >
          {/* Drivers card */}
          <div
            style={{
              backgroundColor: "#FFD700",
              padding: "10px",
              borderRadius: "10px",
              height: "200px",
              overflowY: "auto",
              boxShadow: "0 2px 6px rgba(0,0,0,0.5)",
              display: "flex",
              flexDirection: "column",
              border: "4px solid gray",
            }}
          >
            <h6>Drivers</h6>
            <div style={{ flex: 1 }}>
              <DriverLogo drivers={drivers} setDrivers={setDrivers} />
            </div>
          </div>

          {/* Vehicles card */}
          <div
            style={{
              backgroundColor: "#FFD700",
              padding: "10px",
              borderRadius: "10px",
              height: "200px",
              overflowY: "auto",
              boxShadow: "0 2px 6px rgba(0,0,0,0.5)",
              display: "flex",
              flexDirection: "column",
              border: "4px solid gray",
            }}
          >
            <h6>Vehicles</h6>
            <div style={{ flex: 1 }}>
              <VehicleLogo vehicles={vehicles} setVehicles={setVehicles} />
            </div>
          </div>
        </div>

        {/* Right side: Orders */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#fdf6e3",
            // padding: "20px",
            borderRadius: "10px",
            minHeight: "420px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.5)",
            border: "4px solid gray",
          }}
        >
          {/* <h6 style={{ textAlign: "center", marginBottom: "10px" }}>Orders</h6> */}
          <OrderLogo
            orders={orders}
            setOrders={setOrders}
            drivers={drivers}
            setDrivers={setDrivers}
            vehicles={vehicles}
            setVehicles={setVehicles}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
