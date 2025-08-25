import { useContext } from "react";
import { LoginContext } from "../../context/UserContext";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const VehiclesData = ({ vehicle, handleOnDelete }) => {
  const { token, isAdmin } = useContext(LoginContext);

  const navigate = useNavigate();

  const handleRemove = async () => {
    try {
      const confirm = window.confirm("are you sure");

      if (!confirm) {
        return;
      }
      console.log("vehicle Id:", vehicle._id);
      const url = `http://localhost:3001/vehicles/delete?id=${vehicle._id}`;
      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log("deleted vehicle data:", data.data);
      handleOnDelete(vehicle._id);
    } catch (error) {
      alert("error:", error.message);
    }
  };

  const handleUpdate = (e) => {
    console.log("updateID:", vehicle._id);
    navigate("/updateVehicle", { state: { id: vehicle._id } });
  };

  return (
    <tr>
      <td>{vehicle.Name}</td>
      <td>{vehicle.Model}</td>
      <td>{vehicle.RegistrationNumber}</td>
      <td>{vehicle.Type}</td>
      <td>{vehicle.Purpose}</td>
      <td>{vehicle.PassengerCapacity ?? 0}</td>
      <td>{vehicle.GoodsCapacity ?? 0}</td>

      <td>{vehicle.PerKilometerRate}</td>
      <td>{vehicle.Status}</td>

      {isAdmin && (
        <td>
          <button
            onClick={handleUpdate}
            className="btn btn-outline-secondary btn-sm me-1"
          >
            <PencilSquare size={18} />
          </button>
          <button
            onClick={handleRemove}
            className="btn btn-outline-danger btn-sm"
          >
            <Trash size={18} />
          </button>
        </td>
      )}
    </tr>
  );
};
export default VehiclesData;
