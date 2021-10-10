import { useContext } from "react";
import { Redirect } from "react-router";
import { UserContext } from "../contexts/UserContext";

const Home = () => {
  const { user, logout, userLoading } = useContext(UserContext);
  return userLoading ? (
    "Loading"
  ) : user ? (
    <div>
      <pre>{JSON.stringify(user, null, "\t")}</pre>
      <input type="button" id="logout" value="Logout" onClick={logout} />
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

export default Home;
