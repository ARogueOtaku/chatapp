import { useContext } from "react";
import { Redirect, Route } from "react-router";
import UserContext from "../../contexts/UserContext";
import Layout from "./Layout";

const ProtectedRoute = ({ component: Component, exact, path, ...componentProps }) => {
  const { user } = useContext(UserContext);
  return user ? (
    <Route exact={exact} path={path}>
      <Layout>
        <Component {...componentProps} />
      </Layout>
    </Route>
  ) : (
    <Redirect to="/login" />
  );
};

export default ProtectedRoute;
