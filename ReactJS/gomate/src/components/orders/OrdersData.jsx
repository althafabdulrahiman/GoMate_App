import { useContext } from "react";
import { LoginContext } from "../../context/UserContext";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const OrdersData = ({ order, handleOnDelete }) => {
  const { token } = useContext(LoginContext);

  const navigate = useNavigate();

  const handleRemove = async () => {
    try {
      const confirm = window.confirm("are you sure");

      if (!confirm) {
        return;
      }
      console.log("vehicle Id:", order._id);
      const url = `http://localhost:3001/orders/delete?id=${order._id}`;
      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log("deleted order data:", data.data);
      handleOnDelete(order._id);
    } catch (error) {
      alert("error:", error.message);
    }
  };

  const handleUpdate = (e) => {
    console.log("updateID:", order._id);
    navigate("/updateOrder", { state: { id: order._id } });
  };

  return (
    <tr>
      <td>{order.StartLocation}</td>
      <td>{order.DropLocation}</td>
      <td>{order.StartDate?.split("T")[0]}</td>
      <td>{order.EndDate?.split("T")[0]}</td>
      <td>{order.ServiceType}</td>
      <td>{order.PassengersCount}</td>
      <td>{order.GoodsWeight}</td>
      <td>{order.Distance}</td>
      <td>{order.Purpose}</td>
      <td>{order.Status}</td>

      <td>
        <button
          onClick={handleUpdate}
          className="btn btn-outline-secondary btn-sm me-1"
        >
          <PencilSquare size={14} />
        </button>
      </td>
      <td>
        <button
          onClick={handleRemove}
          className="btn btn-outline-danger btn-sm"
        >
          <Trash size={14} />
        </button>
      </td>
    </tr>
  );
};
export default OrdersData;
