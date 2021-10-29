import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AlertContext from "../../contexts/AlertContext.js";
import Alert from "../visual/Alert.js";

const Notification = () => {
  const { alert, showAlert, setShowAlert } = useContext(AlertContext);
  const location = useLocation();

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

  return showAlert ? <Alert {...alert} onClose={() => setShowAlert(false)} /> : "";
};

export default Notification;
