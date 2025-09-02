import { Link } from "react-router-dom";
import { Navbar, Container, Nav, Dropdown, Button } from "react-bootstrap";
import { useContext } from "react";
import { LoginContext } from "../context/UserContext";

const Header = () => {
  const { setLoadData, setToken, setIsAdmin } = useContext(LoginContext);


  const handleLogout = (e) => {
  e.preventDefault();

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");

  const todayStr = `${yyyy}-${mm}-${dd}`; // "YYYY-MM-DD" format

  localStorage.setItem(
    "dateRange",
    JSON.stringify({
      startDate: todayStr,
      endDate: todayStr,
    })
  );

  setIsAdmin(false);
  setLoadData(false);
  setToken(" ");
};


  return (
    // <div
    //   className="d-flex flex-column p-3  text-white vh-100"
    //   style={{ width: "250px", backgroundColor: "gray" }}
    // >
    //   <ul className="nav nav-pills flex-column mb-auto">
    //     <li className="nav-item">
    //       <Link to="/" className="nav-link text-white">
    //         Home
    //       </Link>
    //     </li>
    //     <li>
    //       <Link to="/drivers" className="nav-link text-white">
    //         Drivers
    //       </Link>
    //     </li>
    //     <li>
    //       <Link to="/vehicles" className="nav-link text-white">
    //         Vehicles
    //       </Link>
    //     </li>
    //     <li>
    //       <Link to="/orders" className="nav-link text-white">
    //         Orders
    //       </Link>
    //     </li>
    //   </ul>
    // </div>

    // ---------------------------------------------------------------------------------------
    <nav
      className="navbar navbar-expand-lg  shadow-sm sticky-top"
      style={{ backgroundColor: "gray" }}
    >
      <div className="container">
        <Link
          className="navbar-brand fw-bold "
          style={{ color: "#FFD700" }}
          to="/"
        >
          <h1>GoMate</h1>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                className="nav-link fw-bold"
                style={{ color: "#FFD700"}}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link  fw-bold"
                style={{ color: "#FFD700" }}
                to="/drivers"
              >
                Drivers
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link  fw-bold"
                style={{ color: "#FFD700" }}
                to="/vehicles"
              >
                Vehicles
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link  fw-bold"
                style={{ color: "#FFD700" }}
                to="/orders"
              >
                Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link  "
                style={{ color: "#000000ff" ,marginRight:"-65px"}}
                to="/login"
                onClick={handleLogout}
              >
               <button style={{backgroundColor:"#052eb6ff",border:"none",borderRadius:"4px",padding:"5px",color:"white"}}>Logout</button> 
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    //--------------------------------------------------
  );
};
export default Header;
