import { createContext } from "react";
import useAlert from "../hooks/useAlert";

const AlertContext = createContext(null);

export const AlertContextProvider = ({ children }) => {
  const [alert, setAlert, showAlert, setShowAlert] = useAlert();

  return <AlertContext.Provider value={{ alert, setAlert, showAlert, setShowAlert }}>{children}</AlertContext.Provider>;
};

export default AlertContext;
