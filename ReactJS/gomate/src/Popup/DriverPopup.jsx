import { useEffect, useState } from "react";
import { LoginContext } from "../context/UserContext";
import { useContext } from "react";

const DriverPopup = ({ driverId, setIsPopup }) => {
  const [driver, setDriver] = useState({});

  const { token } = useContext(LoginContext);

  useEffect(() => {
    const fetchCurrentOrder = async () => {
      const url = `http://localhost:3001/drivers/get?id=${driverId}`;
      const res = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const dt = await res.json();
      console.log("popup driver data:", dt.data);
      setDriver(dt.data);
    };

    fetchCurrentOrder();
  }, [driverId, token]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0px 6px 20px rgba(0,0,0,0.3)",
          width: "350px",
          maxWidth: "90%",
          fontFamily: "Arial, sans-serif",
          position: "relative",
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsPopup(false)}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "none",
            border: "none",
            fontSize: "20px",
            fontWeight: "bold",
            cursor: "pointer",
            color: "#888",
          }}
        >
          ×
        </button>

        {/* Title */}
        <h2 style={{ marginBottom: "15px", color: "#333" }}>Driver Details</h2>

        {/* Order Info */}
        <div style={{ textAlign: "left", fontSize: "14px", lineHeight: "1.6" }}>
          <p>
            <strong>Name:</strong> {driver.Name}
          </p>
          <p>
            <strong>Mobile:</strong> {driver.Mobile}
          </p>
          <p>
            <strong>License:</strong> {driver.License}
          </p>
          <p>
            <strong>PerDay Rate:</strong> {driver.PerDayRate}
          </p>
          <p>
            <strong>Overtime Rate:</strong> {driver.OvertimeRate}
          </p>
        </div>

        {/* Footer Buttons */}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            onClick={() => setIsPopup(false)}
            style={{
              backgroundColor: "#ff4d4f",
              color: "#fff",
              border: "none",
              padding: "10px 15px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverPopup;
