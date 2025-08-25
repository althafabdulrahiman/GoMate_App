import { useContext } from "react";
import { LoginContext } from "../../context/UserContext";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const DriversData = ({ driver, handleOnDelete }) => {
  const { token, isAdmin, driverStatus } = useContext(LoginContext);

  const navigate = useNavigate();

  const handleRemove = async () => {
    try {
      const confirm = window.confirm("are you sure");

      if (!confirm) {
        return;
      }
      console.log("driver Id:", driver._id);
      const url = `http://localhost:3001/drivers/delete?id=${driver._id}`;
      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log("deleted data:", data.data);
      handleOnDelete(driver._id);
    } catch (error) {
      alert("error:", error.message);
    }
  };

  const handleUpdate = (e) => {
    console.log("updateID:", driver._id);
    navigate("/updateDriver", { state: { id: driver._id } });
  };

  return (
    <tr>
      <td>{driver.Name}</td>
      <td>{driver.Mobile}</td>
      <td>{driver.License}</td>
      <td>{driver.PerDayRate}</td>
      <td>{driver.OvertimeRate}</td>
      <td>{driver.Status}</td>
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
export default DriversData;
