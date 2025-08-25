import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import DriversData from "./DriversData";

const Drivers = () => {
  const { token, isAdmin } = useContext(LoginContext);
  const [drivers, setDrivers] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const url = `http://localhost:3001/drivers/get`;
      const res = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const dt = await res.json();
      console.log("data:", dt.data);
      setDrivers(dt.data);
    };
    fetchData();
  }, []);

  const handleAdd = () => {
    navigate("/addDriver");
  };

  const handleOnDelete = (deletedId) => {
    setDrivers((prev) => prev.filter((dr) => dr._id !== deletedId));
  };

  return (
    <div className="container mt-4">
      <h1 style={{ textAlign: "center", marginBottom: "25px", color: "gray" }}>
        Drivers List
      </h1>
      {isAdmin && (
        <div className="mb-3 text-end">
          <button onClick={handleAdd} className="btn btn-warning">
            Add Driver
          </button>
        </div>
      )}

      <div className="table-responsive shadow rounded">
        <table className="table table-striped table-hover align-middle text-center small">
          <thead>
            <tr>
              <th style={{ backgroundColor: "#FFD700", color: "black" }}>
                Name
              </th>
              <th style={{ backgroundColor: "#FFD700", color: "black" }}>
                Mobile
              </th>
              <th style={{ backgroundColor: "#FFD700", color: "black" }}>
                License
              </th>
              <th style={{ backgroundColor: "#FFD700", color: "black" }}>
                Per Day Rate
              </th>
              <th style={{ backgroundColor: "#FFD700", color: "black" }}>
                Overtime Rate
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
            {drivers.map((driver) => (
              <DriversData
                key={driver._id}
                driver={driver}
                handleOnDelete={handleOnDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Drivers;
