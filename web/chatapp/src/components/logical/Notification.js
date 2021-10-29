import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AlertContext from "../../contexts/AlertContext.js";
import Alert from "../visual/Alert.js";
import { ALERT_TYPES } from "../../hooks/useAlert.js";

const Notification = () => {
  const { alert, showAlert, setShowAlert } = useContext(AlertContext);
  const location = useLocation();
  const color = alert.type === ALERT_TYPES.ERROR ? "red" : alert.type === ALERT_TYPES.INFO ? "green" : "yellow";

  useEffect(() => {
    setShowAlert(true);
    const closeTimerID = setTimeout(() => {
      setShowAlert(false);
    }, 5000);
    return () => {
      clearTimeout(closeTimerID);
    };
  }, [alert, setShowAlert]);

  useEffect(() => {
    setShowAlert(false);
  }, [location, setShowAlert]);

  return showAlert ? <Alert message={alert.message} color={color} onClose={() => setShowAlert(false)} /> : "";
};

export default Notification;
