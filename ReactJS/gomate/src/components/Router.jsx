import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Drivers from "./drivers/Drivers";
import Header from "./Nav";
import Vehicles from "./vehicles/Vehicles";
import AddDriver from "./drivers/AddDriver";
import UpdateDriver from "./drivers/UpdateDriver";
import AddVehicle from "./vehicles/AddVehicle";
import UpdateVehicle from "./vehicles/UpdateVehicle";
import Orders from "./orders/Orders";
import AddOrder from "./orders/AddOrder";
import UpdateOrder from "./orders/UpdateOrder";
import Login from "./Login";
// import Dashboard from "./Dashboard";

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route path="/drivers" element={<Drivers />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/addDriver" element={<AddDriver />} />
          <Route path="/updateDriver" element={<UpdateDriver />} />
          <Route path="/addVehicle" element={<AddVehicle />} />
          <Route path="/updateVehicle" element={<UpdateVehicle />} />
          <Route path="/addOrder" element={<AddOrder />} />
          <Route path="/updateOrder" element={<UpdateOrder />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default Router;
