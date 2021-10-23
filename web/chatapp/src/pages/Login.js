import { useCallback, useContext, useState } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import AlertContext from "../contexts/AlertContext";
import UserContext from "../contexts/UserContext";
import { ALERT_TYPES } from "../hooks/useAlert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, login } = useContext(UserContext);
  const { setAlert } = useContext(AlertContext);

  const handleLogin = useCallback(async () => {
    try {
      await login(email, password);
    } catch (e) {
      setAlert({ message: e.message, type: ALERT_TYPES.ERROR });
    }
  }, [email, password, login, setAlert]);

  return user ? (
    <Redirect to="/" />
  ) : (
    <table>
      <tbody>
        <tr>
          <td>
            <label htmlFor="email">Email:</label>
          </td>
          <td>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="none"
            />
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="password">Password:</label>
          </td>
          <td>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </td>
        </tr>
        <tr>
          <td>
            <Link to="/register">Sign Up</Link>
          </td>
          <td>
            <input type="button" id="login" value="Login" onClick={handleLogin} />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Login;
