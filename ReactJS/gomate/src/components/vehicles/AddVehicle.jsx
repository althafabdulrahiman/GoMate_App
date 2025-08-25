import { useContext, useState } from "react";
import { LoginContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const AddVehicle = () => {
  const { token } = useContext(LoginContext);
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [perKilometerRate, setPerKilometerRate] = useState("");
  const [type, setType] = useState("");
  const [passengerCapacity, setPassengerCapacity] = useState("");
  const [goodsCapacity, setGoodsCapacity] = useState("");
  const [purpose, setPurpose] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `http://localhost:3001/vehicles/add`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          Name: name,
          Model: model,
          RegistrationNumber: registrationNumber,
          PerKilometerRate: perKilometerRate,
          Type: type,
          PassengerCapacity: passengerCapacity || 0,
          GoodsCapacity: goodsCapacity || 0,
          Purpose: purpose,
          Status: status,
        }),
      });

      const data = await res.json();
      console.log("inserted vehicle:", data);

      navigate("/vehicles");
    } catch (error) {
      alert(`error:${error.message}`);
    }
  };

  return (
    <div className="container mt-4">
      <div className="p-2">
        <h6 className="text-warning fw-bold mb-2"> Add Vehicle</h6>
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
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="Model"
            required
          />

          <input
            className="form-control form-control-sm mb-2"
            type="text"
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
            placeholder="Reg. Number"
            required
          />

          {/* <input
          className="form-control form-control-sm mb-2"
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          placeholder="Type"
          required
        /> */}
          <select
            className="form-select form-select-sm mb-2"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="" disabled>
              Type
            </option>
            <option value="Car">Car</option>
            <option value="Pickup truck">Pickup truck</option>
            <option value="mini van">Mini Van</option>
            <option value="travaller">travaller</option>
            <option value="Bus">Bus</option>
            <option value="truck">truck</option>
          </select>

          {/* <input
            className="form-control form-control-sm mb-2"
            type="text"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder="Purpose"
            required
          /> */}

          <select 
          value={purpose}
          onChange={(e)=>setPurpose(e.target.value)}
          required
            className="form-select form-select-sm mb-2"
          >
            <option value="" disabled>Select Purpose</option>
            <option value="Passenger">Passenger</option>
            <option value="Goods">Goods</option>
            <option value="PassengerWithgoods">PassengerWithGoods</option>

            </select>
            {(purpose === "Passenger" || purpose === "PassengerWithgoods") && (<input
            className="form-control form-control-sm mb-2"
            type="number"
            value={passengerCapacity ?? ""}
            onChange={(e) => setPassengerCapacity(e.target.value)}
            placeholder="Passenger Cap."
            required
          />)
 }
{(purpose === "Goods" || purpose === "PassengerWithgoods") &&( <input
            className="form-control form-control-sm mb-2"
            type="number"
            value={goodsCapacity ?? ""}
            onChange={(e) => setGoodsCapacity(e.target.value)}
            placeholder="Goods Cap."
            required
          /> )}          
          

          <input
            className="form-control form-control-sm mb-2"
            type="number"
            value={perKilometerRate}
            onChange={(e) => setPerKilometerRate(e.target.value)}
            placeholder="Rate / Km"
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
export default AddVehicle;
