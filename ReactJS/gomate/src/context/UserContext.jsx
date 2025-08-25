import { createContext, useState } from "react";
const LoginContext = createContext();

const UserContext = ({ children }) => {
  const [token, setToken] = useState("");
  const [loadData, setLoadData] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [driverStatus, setDriverStatus] = useState("Active");
  return (
    <div>
      <LoginContext.Provider
        value={{
          token,
          setToken,
          loadData,
          setLoadData,
          isAdmin,
          setIsAdmin,
          driverStatus,
          setDriverStatus,
        }}
      >
        {children}
      </LoginContext.Provider>
    </div>
  );
};

export { UserContext, LoginContext };
