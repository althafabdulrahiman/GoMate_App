import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../context/UserContext";

const UpdateOrder = () => {
  const location = useLocation();
  const id = location.state?.id;

  const navigate = useNavigate();

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

  const [orderData, setOrderData] = useState({});

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const url = `http://localhost:3001/orders/get?id=${id}`;
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        console.log("update vehicle data:", data.data);
        setOrderData(data.data);
      } catch (error) {
        alert(`error:${error.message}`);
      }
    };
    fetchOrder();
  }, [id]);

  useEffect(() => {
    if (orderData.StartLocation) {
      setStartLocation(orderData.StartLocation);
    }
    if (orderData.DropLocation) {
      setDropLocation(orderData.DropLocation);
    }
    if (orderData.StartDate) {
      setStartDate(orderData.StartDate);
    }
    if (orderData.EndDate) {
      setEndDate(orderData.EndDate);
    }
    if (orderData.ServiceType) {
      setServiceType(orderData.ServiceType);
    }
    if (orderData.PassengersCount) {
      setPassengersCount(orderData.PassengersCount);
    }
    if (orderData.GoodsWeight) {
      setGoodsWeight(orderData.GoodsWeight);
    }
    if (orderData.Distance) {
      setDistance(orderData.Distance);
    }
    if (orderData.Purpose) {
      setPurpose(orderData.Purpose);
    }
    if (orderData.Status) {
      setStatus(orderData.Status);
    }
  }, [orderData]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const url = `http://localhost:3001/orders/update?id=${id}`;
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        StartLocation: startLocation || orderData.StartLocation,
        DropLocation: dropLocation || orderData.DropLocation,
        StartDate: startDate || orderData.StartDate,
        EndDate: endDate || orderData.EndDate,
        ServiceType: serviceType || orderData.ServiceType,
        PassengersCount: passengersCount || orderData.PassengersCount,
        GoodsWeight: goodsWeight || orderData.GoodsWeight,
        Distance: distance || orderData.Distance,
        Purpose: purpose || orderData.Purpose,
        Status: status || orderData.Status,
      }),
    });

    const data = await res.json();
    console.log("after order updation:", data);
    navigate("/orders");
  };

  const today = new Date();
  const minDate = new Date(today.getTime() + 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  return (
    <div className="p-2">
      <h6 className="text-warning fw-bold mb-2"> Update Order</h6>
      <form onSubmit={handleUpdate}>
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
          placeholder="Start Date"
          min={minDate}
        />

        <input
          className="form-control form-control-sm mb-2"
          type="date"
          value={endDate ?? ""}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="End Date"
          min={startDate || minDate}
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
            placeholder="Goods Weight"
            required
          />
        )}
        <input
          className="form-control form-control-sm mb-2"
          type="number"
          value={distance ?? ""}
          onChange={(e) => setDistance(e.target.value)}
          placeholder="Distance"
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
          // onClick={handleUpdate}
          type="submit"
        >
          Update
        </button>
      </form>
    </div>
  );
};
export default UpdateOrder;
