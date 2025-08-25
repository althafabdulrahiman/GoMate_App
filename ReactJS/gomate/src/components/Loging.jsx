import { useContext } from "react";
import { LoginContext } from "../context/UserContext";
import Login from "./Login";
import Router from "./Router";

const Loging = () => {
  const { loadData, isAdmin } = useContext(LoginContext);

  console.log("isadmin:", isAdmin);

  return <div>{loadData ? <Router /> : <Login />}</div>;
};

export default Loging;
