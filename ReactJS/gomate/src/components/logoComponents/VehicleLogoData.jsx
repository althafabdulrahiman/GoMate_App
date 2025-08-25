// const VehicleLogoData = ({ vehicle }) => {
//   const handleDragStart = (e) => {
//     e.dataTransfer.setData("type", "vehicle");
//     e.dataTransfer.setData("vehicleId", vehicle._id);
//   };
//   return (
//     <div
//       draggable
//       onDragStart={handleDragStart}
//       style={{
//         backgroundColor: "#90EE90",
//         padding: "0",
//         margin: "0",
//         border: "1px solid #000",
//         borderRadius: "5px",
//       }}
//     >
//       <h4 style={{ fontSize: "10px" }}>🚗{vehicle.Name}</h4>
//     </div>
//   );
// };

import { useState } from "react";
import VehiclePopup from "../../Popup/VehiclePopup";

// export default VehicleLogoData;

const VehicleLogoData = ({ vehicle }) => {
  const vehicleId = vehicle._id;

  const [isPopup, setIsPopup] = useState(false);
  const handleDragStart = (e) => {
    e.dataTransfer.setData("vehicleId", vehicle._id);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      style={{
        backgroundColor: "#ADD8E6",
        padding: "1px",
        margin: "1px",
        border: "1px solid #000",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      <h4 style={{ fontSize: "10px" }} onClick={() => setIsPopup(true)}>
        🚗 {vehicle.Name}
      </h4>
      {isPopup && (
        <VehiclePopup vehicleId={vehicleId} setIsPopup={setIsPopup} />
      )}
    </div>
  );
};

export default VehicleLogoData;
