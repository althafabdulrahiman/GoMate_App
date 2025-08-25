// const DriverLogoData = ({ driver }) => {
//   const handleDragStart = (e) => {
//     e.dataTransfer.setData("type", "driver");
//     e.dataTransfer.setData("driverId", driver._id);
//   };

import { useState } from "react";
import DriverPopup from "../../Popup/DriverPopup";

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
//       <h4 style={{ fontSize: "10px" }}>{driver.Name}</h4>
//     </div>
//   );
// };

// export default DriverLogoData;

const DriverLogoData = ({ driver, setDrivers }) => {
  const [isPopup, setIsPopup] = useState(false);
  const driverId = driver._id;
  const handleDragStart = (e) => {
    e.dataTransfer.setData("driverId", driver._id);
  };

  const handleSubmit = () => {
    setIsPopup(true);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      style={{
        backgroundColor: "#90EE90",
        padding: "1px",
        margin: "1px",
        border: "1px solid #000",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      <h4 style={{ fontSize: "10px" }} onClick={handleSubmit}>
        🧑 {driver.Name}
      </h4>
      {isPopup && <DriverPopup driverId={driverId} setIsPopup={setIsPopup} />}
    </div>
  );
};

export default DriverLogoData;
