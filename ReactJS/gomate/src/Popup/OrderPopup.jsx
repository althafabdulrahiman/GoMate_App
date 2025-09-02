// import { useEffect, useState } from "react";

// const OrderPopup = ({ orderId, setIsPopup, token }) => {
//   const [order, setOrder] = useState({});

//   useEffect(() => {
//     const fetchCurrentOrder = async () => {
//       const url = `http://localhost:3001/orders/get?id=${orderId}`;
//       const res = await fetch(url, {
//         method: "GET",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const dt = await res.json();
//       console.log("popup data:", dt.data);
//       setOrder(dt.data);
//     };

//     fetchCurrentOrder();
//   }, []);
//   return (
//     <div
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100%",
//         height: "100%",
//         backgroundColor: "rgba(0,0,0,0.4)",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         zIndex: 9999,
//       }}
//     >
//       <div
//         style={{
//           backgroundColor: "#fff",
//           padding: "20px",
//           borderRadius: "10px",
//           boxShadow: "0px 4px 8px rgba(0,0,0,0.3)",
//           width: "300px",
//           textAlign: "center",
//         }}
//       >
//         startLocation:{order.StartLocation}
//         endLocation:{order.DropLocation}
//         Distance:{order.Distance}
//         StartDate:{order.StartDate}
//         endDate:{order.EndDate}
//         Purpose:{order.Purpose}
//         ServiceType:{order.ServiceType}
//         {order.GoodsWeight > 0 ? (
//           <span>GoodsWeight:{order.GoodsWeight}</span>
//         ) : (
//           ""
//         )}
//         {order.PassengersCount > 0 ? (
//           <span>Passenger Count:{order.PassengersCount}</span>
//         ) : (
//           ""
//         )}
//         <button
//           style={{
//             backgroundColor: "#ff4d4f",
//             color: "white",
//             border: "none",
//             padding: "8px 12px",
//             borderRadius: "5px",
//             cursor: "pointer",
//           }}
//           onClick={() => setIsPopup(false)}
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OrderPopup;

import { useEffect, useState } from "react";

const OrderPopup = ({ orderId, setIsPopup, token }) => {
  const [order, setOrder] = useState({});

  useEffect(() => {
    const fetchCurrentOrder = async () => {
      const url = `http://localhost:3001/orders/get?id=${orderId}`;
      const res = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const dt = await res.json();
      console.log("popup order data:", dt.data);
      setOrder(dt.data);
    };

    fetchCurrentOrder();
  }, [orderId, token]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0px 6px 20px rgba(0,0,0,0.3)",
          width: "350px",
          maxWidth: "90%",
          fontFamily: "Arial, sans-serif",
          position: "relative",
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsPopup(false)}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "none",
            border: "none",
            fontSize: "20px",
            fontWeight: "bold",
            cursor: "pointer",
            color: "#888",
          }}
        >
          ×
        </button>

        {/* Title */}
        <h2 style={{ marginBottom: "15px", color: "#333" }}>Order Details</h2>

        {/* Order Info */}
        <div style={{ textAlign: "left", fontSize: "14px", lineHeight: "1.6" , color:"black"}}>
          <p>
            <strong>Start Location:</strong> {order.StartLocation}
          </p>
          <p>
            <strong>Drop Location:</strong> {order.DropLocation}
          </p>
          <p>
            <strong>Distance:</strong> {order.Distance} km
          </p>
          <p>
            <strong>Start Date:</strong> {order.StartDate}
          </p>
          <p>
            <strong>End Date:</strong> {order.EndDate}
          </p>
          <p>
            <strong>Purpose:</strong> {order.Purpose}
          </p>
          <p>
            <strong>Service Type:</strong> {order.ServiceType}
          </p>
          {order.GoodsWeight > 0 && (
            <p>
              <strong>Goods Weight:</strong> {order.GoodsWeight} ton
            </p>
          )}
          {order.PassengersCount > 0 && (
            <p>
              <strong>Passengers Count:</strong> {order.PassengersCount}
            </p>
          )}
        </div>

        {/* Footer Buttons */}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            onClick={() => setIsPopup(false)}
            style={{
              backgroundColor: "#ff4d4f",
              color: "#fff",
              border: "none",
              padding: "10px 15px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPopup;
