import { useState } from "react";

const Login = ({ login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
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
          <td></td>
          <td>
            <input
              type="button"
              id="login"
              value="Login"
              onClick={() => {
                login(email, password);
              }}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Login;
