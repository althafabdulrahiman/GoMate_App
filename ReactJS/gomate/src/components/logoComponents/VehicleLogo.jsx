import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../context/UserContext";
import VehicleLogoData from "./VehicleLogoData";

const VehicleLogo = ({ vehicles, setVehicles }) => {
  return (
    <div style={{ display: "flex", gap: "3px", flexWrap: "wrap" }}>
      {vehicles.map(
        (vehicle) =>
          vehicle.Status === "Active" && (
            <VehicleLogoData key={vehicle._id} vehicle={vehicle} />
          )
      )}
    </div>
  );
};
export default VehicleLogo;
