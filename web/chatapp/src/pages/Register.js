import { useCallback, useContext, useState } from "react";
import { Redirect } from "react-router";
import AlertContext from "../contexts/AlertContext";
import UserContext from "../contexts/UserContext";
import { ALERT_TYPES } from "../hooks/useAlert";

const Register = () => {
  const { user, signup } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { setAlert } = useContext(AlertContext);

  const handleSignup = useCallback(async () => {
    try {
      await signup(email, password, name);
    } catch (e) {
      setAlert({ message: e.message, type: ALERT_TYPES.ERROR });
    }
  }, [email, password, name, signup, setAlert]);

  return user ? (
    <Redirect to="/" />
  ) : (
    <table>
      <tbody>
        <tr>
          <td>
            <label htmlFor="name">Name:</label>
          </td>
          <td>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="none"
            />
          </td>
        </tr>
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
          <td></td>
          <td>
            <input type="button" id="register" value="Register" onClick={handleSignup} />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Register;
