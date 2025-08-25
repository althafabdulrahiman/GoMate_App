import Nav from "./Nav";

const Dashboard = ({ children }) => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Nav />
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
};
export default Dashboard;
