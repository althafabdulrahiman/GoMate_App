import { useContext, useState } from "react";
import { LoginContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const AddDriver = () => {
  const { token } = useContext(LoginContext);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [license, setLicence] = useState("");
  const [perDayRate, setPerDayRate] = useState("");
  const [overtimeRate, setOvertimeRate] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `http://localhost:3001/drivers/add`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          Name: name,
          Mobile: mobile,
          PerDayRate: perDayRate,
          OvertimeRate: overtimeRate,
          License: license,
          Status: status,
        }),
      });

      const data = await res.json();
      console.log("inserted driver:", data);

      navigate("/drivers");
    } catch (error) {
      alert(`error:${error.message}`);
    }
  };

  return (
    <div className="container mt-4">
      <div className="p-2">
        <h6 className="text-warning fw-bold mb-2"> Add Driver</h6>
        <form onSubmit={handleSubmit}>
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
            // onClick={handleSubmit}
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};
export default AddDriver;
