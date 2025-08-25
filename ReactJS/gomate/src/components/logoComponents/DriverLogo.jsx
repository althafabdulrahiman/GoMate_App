import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../context/UserContext";
import DriversLogoData from "./DriversLogoData";

const DriverLogo = ({ drivers, setDrivers }) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "3px",
        flexWrap: "wrap",
      }}
    >
      {drivers.map(
        (driver) =>
          driver.Status === "Active" && (
            <DriversLogoData
              key={driver._id}
              driver={driver}
              setDrivers={setDrivers}
            />
          )
      )}
    </div>
  );
};
export default DriverLogo;
