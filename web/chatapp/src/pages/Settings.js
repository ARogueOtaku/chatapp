import { useCallback, useContext } from "react";
import AlertContext from "../contexts/AlertContext";
import UserContext from "../contexts/UserContext";
import { ALERT_TYPES } from "../hooks/useAlert";

const Settings = () => {
  const { user, logout } = useContext(UserContext);
  const { setAlert } = useContext(AlertContext);

  const handleLogout = useCallback(async () => {
    try {
      await logout();
    } catch (e) {
      setAlert({ message: e.message, type: ALERT_TYPES.ERROR });
    }
  }, [logout, setAlert]);

  return (
    <div>
      <pre>{JSON.stringify(user, null, "\t")}</pre>
      <input type="button" id="logout" value="Logout" onClick={handleLogout} />
    </div>
  );
};

export default Settings;
