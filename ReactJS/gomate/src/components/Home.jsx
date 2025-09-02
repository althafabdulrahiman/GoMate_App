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
import { useState, useEffect, useContext,useRef } from "react";
import { LoginContext } from "../context/UserContext";


import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css
import "react-date-range/dist/theme/default.css";

const Home = () => {
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [orders, setOrders] = useState([]);
  const [allOrders,setAllOrders]=useState([])

const [dateRange, setDateRange] = useState(() => {
  const saved = localStorage.getItem("dateRange");
  if (saved) {
    const parsed = JSON.parse(saved);
    return [
      {
        startDate: new Date(parsed.startDate),
        endDate: new Date(parsed.endDate),
        key: "selection",
      },
    ];
  }
  return [
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ];
});

useEffect(() => {
  localStorage.setItem(
    "dateRange",
    JSON.stringify({
      startDate: dateRange[0].startDate,
      endDate: dateRange[0].endDate,
    })
  );
}, [dateRange]);

  
  const [showPicker, setShowPicker] = useState(false);

  const pickerRef=useRef(null)

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
const startDate = dateRange[0].startDate.toISOString();
const endDate = dateRange[0].endDate.toISOString();

      const url = `http://localhost:3001/orders/get?StartDate=${startDate}&EndDate=${endDate}`;
      const res = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const dt = await res.json();
      console.log("althaf orders:",dt.data)
      setOrders(dt.data);
    };

    const fetchAllOrders = async () => {
      const url = `http://localhost:3001/orders/get`;
      const res = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const dt = await res.json();
      setAllOrders(dt.data);
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
    fetchAllOrders();
  }, [token,dateRange]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setShowPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sortedOrders=[...orders].sort((a,b)=>
  {const aHasAssigned=a.Driver && a.Vehicle;
    const bHasAssigned=b.Driver && b.Vehicle;
    if(!aHasAssigned && bHasAssigned) return -1;
    if(aHasAssigned && !bHasAssigned) return 1;
    return 0;
  })

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
 <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "20px 30px 0 0",
          gap: "15px",
          position: "relative",
        }}
      >
        <button
          onClick={() => setShowPicker(!showPicker)}
          style={{
            padding: "10px 15px",
            borderRadius: "8px",
            border: "3px solid gray",
            background: "#faf5dcff",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {`From : ${dateRange[0].startDate.toLocaleDateString("en-GB")}   To: ${dateRange[0].endDate.toLocaleDateString("en-GB")}`}

        </button>

        {showPicker && (
          <div
            ref={pickerRef}
            style={{
              position: "absolute",
              top: "50px",
              right: "0",
              zIndex: 10,
              background: "#fff",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
            }}
          >
            <DateRange
              editableDateInputs={true}
              onChange={(item) => setDateRange([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={dateRange}
            />
          </div>
        )}
      </div>

      
      <div
        style={{
          display: "flex",
          marginTop: "5px",
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
          {/* <h6 style={{ textAlign: "center", marginBottom: "0px" }}>Orders</h6> */}
          {orders.length !== 0 ? (
            <h6 style={{ textAlign: "center", marginBottom: "0px" }}>
              Orders</h6>
          ) : (
            <h6 style={{ textAlign: "center", marginBottom: "0px", color: "red" }}>
              No orders available for the selected date range
            </h6>
          )}
          <OrderLogo
            sortedOrders={sortedOrders}
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
