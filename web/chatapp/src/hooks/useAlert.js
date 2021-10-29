import { useState } from "react";

export const ALERT_TYPES = {
  ERROR: 1,
  INFO: 2,
  WARNING: 3,
};

const useAlert = () => {
  const [alert, setAlert] = useState({ message: "", type: ALERT_TYPES.INFO });
  const [showAlert, setShowAlert] = useState(false);
  return [alert, setAlert, showAlert, setShowAlert];
};

export default useAlert;
