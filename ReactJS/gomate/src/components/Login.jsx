import { useContext, useEffect, useState } from "react";
import { LoginContext, UserContext } from "../context/UserContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setToken, setLoadData, setIsAdmin } = useContext(LoginContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === "admin" && password === "admin") {
      setIsAdmin(true);
    }

    try {
      const url = `http://localhost:3001/auth/login`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        alert("invalid username or password");
        setUsername("");
        setPassword("");
        return;
      }
      const data = await res.json();
      console.log("token", data);
      setToken(data.token);
      setLoadData(true);
    } catch (error) {
      alert("error occurred try again");
    }
  };

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div
        className="row w-100 justify-content-center align-items-center g-4"
        style={{ gap: "175px" }}
      >
        {/* Left Side - Login Form */}
        <div className="col-4 p-3">
          <h2 className="mb-4 text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 "
              style={{
                backgroundColor: "#FFD700",
                color: "black",
                border: "none",
              }}
            >
              Login
            </button>
          </form>
        </div>

        {/* Right Side - Image */}
        <div className="col-md-5">
          <img
            src="https://thumbs.dreamstime.com/b/geotag-sign-asphalt-road-vector-icon-get-taxi-moving-logo-178986617.jpg"
            alt="Taxi"
            className="img-fluid rounded "
            style={{ objectFit: "cover", height: "100%" }}
          />
        </div>
      </div>
    </div>

    // <div>
    //   <form onSubmit={handleSubmit}>
    //     <label>username</label>
    //     <input
    //       type="text"
    //       value={username}
    //       onChange={(e) => setUsername(e.target.value)}
    //     />
    //     <input
    //       type="password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //     <button type="submit">Login</button>
    //   </form>
    // </div>
  );
};
export default Login;
