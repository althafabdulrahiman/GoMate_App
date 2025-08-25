import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../context/UserContext";

const UpdateVehicle = () => {
  const location = useLocation();
  const id = location.state?.id;

  const navigate = useNavigate();

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

  const [vehicleData, setVehicleData] = useState({});

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const url = `http://localhost:3001/vehicles/get?id=${id}`;
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        console.log("update vehicle data:", data.data);
        setVehicleData(data.data);
      } catch (error) {
        alert(`error:${error.message}`);
      }
    };
    fetchVehicle();
  }, [id]);

  useEffect(() => {
    if (vehicleData.Name) {
      setName(vehicleData.Name);
    }
    if (vehicleData.Model) {
      setModel(vehicleData.Model);
    }
    if (vehicleData.RegistrationNumber) {
      setRegistrationNumber(vehicleData.RegistrationNumber);
    }
    if (vehicleData.Type) {
      setType(vehicleData.Type);
    }
    if (vehicleData.Purpose) {
      setPurpose(vehicleData.Purpose);
    }
    if (vehicleData.PassengerCapacity) {
      setPassengerCapacity(vehicleData.PassengerCapacity);
    }
    if (vehicleData.GoodsCapacity) {
      setGoodsCapacity(vehicleData.GoodsCapacity);
    }
    if (vehicleData.PerKilometerRate) {
      setPerKilometerRate(vehicleData.PerKilometerRate);
    }
    if (vehicleData.Status) {
      setStatus(vehicleData.Status);
    }
  }, [vehicleData]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const url = `http://localhost:3001/vehicles/update?id=${id}`;
    const res = await fetch(url, {
      method: "PUT",
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
        PassengerCapacity: passengerCapacity,
        GoodsCapacity: goodsCapacity,
        Purpose: purpose,
        Status: status,
      }),
    });

    const data = await res.json();
    console.log("after vehicle updation:", data);
    navigate("/vehicles");
  };

  return (
    <div className="container mt-4">
      <div className="p-2">
        <h6 className="text-warning fw-bold mb-2"> Update Vehicle</h6>
        <form onSubmit={handleUpdate}>
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
          

          {/* <input
            className="form-control form-control-sm mb-2"
            type="number"
            value={passengerCapacity}
            onChange={(e) => setPassengerCapacity(e.target.value)}
            placeholder="Passenger Cap."
            required
          />

          <input
            className="form-control form-control-sm mb-2"
            type="number"
            value={goodsCapacity}
            onChange={(e) => setGoodsCapacity(e.target.value)}
            placeholder="Goods Cap."
            required
          /> */}

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
            // onClick={handleUpdate}
            type="submit"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};
export default UpdateVehicle;
