import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import VehiclesData from "./VehiclesData";

const Vehicles = () => {
  const { token, isAdmin } = useContext(LoginContext);
  const [vehicles, setVehicles] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const url = `http://localhost:3001/vehicles/get`;
      const res = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const dt = await res.json();
      console.log("data:", dt.data);
      setVehicles(dt.data);
    };
    fetchData();
  }, []);

  const handleAdd = () => {
    navigate("/addVehicle");
  };

  const handleOnDelete = (deletedId) => {
    setVehicles((prev) => prev.filter((dr) => dr._id !== deletedId));
  };

  return (
    <div className="container mt-4">
      <h1 style={{ textAlign: "center", marginBottom: "25px", color: "gray" }}>
        Vehicles List
      </h1>
      {isAdmin && (
        <div className="mb-3 text-end">
          <button onClick={handleAdd} className="btn btn-warning">
            Add Vehicle
          </button>
        </div>
      )}

      <div className="table-responsive shadow rounded">
        <table
          className="table table-striped table-hover align-middle text-center small"
          style={{ tableLayout: "fixed" }} // keeps columns fixed width
        >
          <thead>
            <tr>
              <th style={{ backgroundColor: "#FFD700", color: "black" }}>
                Name
              </th>
              <th style={{ backgroundColor: "#FFD700", color: "black" }}>
                Model
              </th>
              <th style={{ backgroundColor: "#FFD700", color: "black" }}>
                Registration Number
              </th>
              <th style={{ backgroundColor: "#FFD700", color: "black" }}>
                Type
              </th>
              <th style={{ backgroundColor: "#FFD700", color: "black" }}>
                Purpose
              </th>
              <th style={{ backgroundColor: "#FFD700", color: "black" }}>
                Passenger Capacity
              </th>
              <th style={{ backgroundColor: "#FFD700", color: "black" }}>
                Goods Capacity (Tons)
              </th>
              <th style={{ backgroundColor: "#FFD700", color: "black" }}>
                Per Kilometer Rate
              </th>
              <th style={{ backgroundColor: "#FFD700", color: "black" }}>
                Status
              </th>
              {isAdmin && (
                <th style={{ backgroundColor: "#FFD700", color: "black" }}>
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <VehiclesData
                key={vehicle._id}
                vehicle={vehicle}
                handleOnDelete={handleOnDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Vehicles;
