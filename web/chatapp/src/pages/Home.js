import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const Home = () => {
  const { user, logout } = useContext(UserContext);
  return (
    <div>
      <pre>{JSON.stringify(user, null, "\t")}</pre>
      <input type="button" id="logout" value="Logout" onClick={logout} />
    </div>
  );
};

export default Home;
