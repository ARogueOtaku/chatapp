import { UserContextProvider } from "./contexts/UserContext.js";
import { AlertContextProvider } from "./contexts/AlertContext.js";
import Login from "./pages/Login.js";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Settings from "./pages/Settings.js";
import Register from "./pages/Register.js";
import Verify from "./pages/Verify.js";
import ProtectedRoute from "./components/logical/ProtectedRoute.js";
import Notification from "./components/logical/Notification.js";

const App = () => {
  return (
    <UserContextProvider>
      <AlertContextProvider>
        <BrowserRouter>
          <Switch>
            <ProtectedRoute exact path="/" component={Settings} />
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
          <Notification />
        </BrowserRouter>
      </AlertContextProvider>
    </UserContextProvider>
  );
};

export default App;
