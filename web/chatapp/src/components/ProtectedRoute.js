import { useContext } from "react";
import { Redirect, Route } from "react-router";
import { UserContext } from "../contexts/UserContext";

const ProtectedRoute = ({ component: Component, exact, path, ...componentProps }) => {
  const { user, userLoading } = useContext(UserContext);
  return userLoading ? (
    "Loading"
  ) : user ? (
    <Route exact={exact} path={path}>
      <Component {...componentProps} />
    </Route>
  ) : (
    <Redirect to="/login" />
  );
};

export default ProtectedRoute;
