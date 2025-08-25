import { useContext, useState } from "react";
import { LoginContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const AddOrder = () => {
  const { token } = useContext(LoginContext);
  const [startLocation, setStartLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [passengersCount, setPassengersCount] = useState("");
  const [goodsWeight, setGoodsWeight] = useState("");
  const [distance, setDistance] = useState("");
  const [purpose, setPurpose] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `http://localhost:3001/orders/add`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          StartLocation: startLocation,
          DropLocation: dropLocation,
          StartDate: startDate,
          EndDate: endDate,
          ServiceType: serviceType,
          PassengersCount: passengersCount ||0,
          GoodsWeight: goodsWeight ||0,
          Distance: distance,
          Purpose: purpose,
          Status: status,
        }),
      });

      const data = await res.json();
      console.log("inserted Order:", data);

      navigate("/orders");
    } catch (error) {
      alert(`error:${error.message}`);
    }
  };
  const today = new Date();
  const minDate = new Date(today.getTime() + 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  return (
    <div className="p-2">
      <h6 className="text-warning fw-bold mb-2"> Add Order</h6>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control form-control-sm mb-2"
          type="text"
          value={startLocation}
          onChange={(e) => setStartLocation(e.target.value)}
          placeholder="Start Location"
          required
        />

        <input
          className="form-control form-control-sm mb-2"
          type="text"
          value={dropLocation}
          onChange={(e) => setDropLocation(e.target.value)}
          placeholder="Drop Location"
          required
        />

        <input
          className="form-control form-control-sm mb-2"
          type="date"
          value={startDate ?? ""}
          onChange={(e) => setStartDate(e.target.value)}
          min={minDate}
          placeholder="Start Date"
          required
        />

        <input
          className="form-control form-control-sm mb-2"
          type="date"
          value={endDate ?? ""}
          onChange={(e) => setEndDate(e.target.value)}
          min={startDate || minDate}
          placeholder="End Date"
          required
        />

        {/* <input
        className="form-control form-control-sm mb-2"
        type="text"
        value={serviceType}
        onChange={(e) => setServiceType(e.target.value)}
        placeholder="Service Type"
      /> */}
        <select
          className="form-select form-select-sm mb-2"
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
          required
        >
          <option value="">Select Service Type</option>
          <option value="Passenger">Passenger</option>
          <option value="Goods">Goods</option>
          <option value="PassengerWithGoods">Passenger With Goods</option>
        </select>

        {(serviceType === "Passenger" ||
          serviceType === "PassengerWithGoods") && (
          <input
            className="form-control form-control-sm mb-2"
            type="number"
            value={passengersCount ?? ""}
            onChange={(e) => setPassengersCount(e.target.value)}
            placeholder="Passengers Count"
            required
          />
        )}
        {(serviceType === "Goods" || serviceType === "PassengerWithGoods") && (
          <input
            className="form-control form-control-sm mb-2"
            type="number"
            value={goodsWeight ?? ""}
            onChange={(e) => setGoodsWeight(e.target.value)}
            placeholder="Goods Weight (in tons)"
            required
          />
        )}

        <input
          className="form-control form-control-sm mb-2"
          type="number"
          value={distance ?? ""}
          onChange={(e) => setDistance(e.target.value)}
          placeholder="Distance (in KM)"
          required
        />

        <input
          className="form-control form-control-sm mb-2"
          type="text"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          placeholder="Purpose"
          required
        />

        <select
          className="form-select form-select-sm mb-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="">Select Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button
          className="btn btn-sm btn-warning w-100 fw-bold"
          type="submit"
          // onClick={handleSubmit}
        >
          Save
        </button>
      </form>
    </div>
  );
};
export default AddOrder;
