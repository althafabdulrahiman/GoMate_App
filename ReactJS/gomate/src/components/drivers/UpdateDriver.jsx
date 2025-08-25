import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../context/UserContext";

const UpdateDriver = () => {
  const location = useLocation();
  const id = location.state?.id;

  const navigate = useNavigate();

  const { token } = useContext(LoginContext);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [license, setLicence] = useState("");
  const [perDayRate, setPerDayRate] = useState("");
  const [overtimeRate, setOvertimeRate] = useState("");
  const [status, setStatus] = useState("");

  const [driverData, setDriverData] = useState({});

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const url = `http://localhost:3001/drivers/get?id=${id}`;
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        console.log("update data:", data.data);
        setDriverData(data.data);
      } catch (error) {
        alert(`error:${error.message}`);
      }
    };
    fetchDrivers();
  }, [id]);

  useEffect(() => {
    if (driverData.Name) {
      setName(driverData.Name);
    }
    if (driverData.Mobile) {
      setMobile(driverData.Mobile);
    }
    if (driverData.License) {
      setLicence(driverData.License);
    }
    if (driverData.PerDayRate) {
      setPerDayRate(driverData.PerDayRate);
    }
    if (driverData.OvertimeRate) {
      setOvertimeRate(driverData.OvertimeRate);
    }
    if (driverData.Status) {
      setStatus(driverData.Status);
    }
  }, [driverData]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const url = `http://localhost:3001/drivers/update?id=${id}`;
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        Name: name || driverData.Name,
        Mobile: mobile || driverData.Mobile,
        PerDayRate: perDayRate || driverData.PerDayRate,
        OvertimeRate: overtimeRate || driverData.OvertimeRate,
        License: license || driverData.License,
        Status: status || driverData.Status,
      }),
    });

    const data = await res.json();
    console.log("after updation:", data);
    navigate("/drivers");
  };

  return (
    <div className="container mt-4">
      <div className="p-2">
        <h6 className="text-warning fw-bold mb-2"> Update Driver</h6>

        <input
          className="form-control form-control-sm mb-2"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />

        <input
          className="form-control form-control-sm mb-2"
          type="number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="Mobile"
          required
        />

        <select
          className="form-select form-select-sm mb-2"
          value={license}
          onChange={(e) => setLicence(e.target.value)}
          required
        >
          <option value="" disabled>
            License Type
          </option>
          <option value="LMV">LMV</option>
          <option value="HMV">HMV</option>
        </select>

        <input
          className="form-control form-control-sm mb-2"
          type="number"
          value={perDayRate}
          onChange={(e) => setPerDayRate(e.target.value)}
          placeholder="Per Day Rate"
          required
        />

        <input
          className="form-control form-control-sm mb-2"
          type="number"
          value={overtimeRate}
          onChange={(e) => setOvertimeRate(e.target.value)}
          placeholder="Overtime Rate"
          required
        />

        <select
          className="form-select form-select-sm mb-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="" disabled>
            Status
          </option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button
          className="btn btn-sm btn-warning w-100 fw-bold"
          onClick={handleUpdate}
        >
          Update
        </button>
      </div>
    </div>
  );
};
export default UpdateDriver;
