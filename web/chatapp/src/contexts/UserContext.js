import { createContext } from "react";
import useUser from "../hooks/useUser";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [user, userLoading, userError, login, logout, signup, verify] = useUser();

  return (
    <UserContext.Provider value={{ user, userLoading, userError, login, logout, signup, verify }}>
      {children}
    </UserContext.Provider>
  );
};
