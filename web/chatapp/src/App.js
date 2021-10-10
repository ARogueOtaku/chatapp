import { UserContextProvider } from "./contexts/UserContext.js";
import Login from "./pages/Login.js";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home.js";
import Register from "./pages/Register.js";
import Verify from "./pages/Verify.js";

const App = () => {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/verify">
            <Verify />
          </Route>
        </Switch>
      </BrowserRouter>
    </UserContextProvider>
  );
};

export default App;
