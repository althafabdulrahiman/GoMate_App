import { UserContext } from "./context/UserContext";
import Loging from "./components/Loging";
import "../index.css";

function App() {
  return (
    <div>
      <UserContext>
        <Loging />
      </UserContext>
    </div>
  );
}

export default App;
