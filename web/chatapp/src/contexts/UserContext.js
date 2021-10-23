import { createContext } from "react";
import useUser from "../hooks/useUser";

const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [user, userLoading, login, logout, signup, verify] = useUser();

  return (
    <UserContext.Provider value={{ user, userLoading, login, logout, signup, verify }}>{children}</UserContext.Provider>
  );
};

export default UserContext;
