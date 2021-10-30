import { MdChat, MdSearch, MdSettings } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import NavLink from "../visual/NavLink";
import { useCallback, useContext } from "react";
import UserContext from "../../contexts/UserContext";
import AlertContext from "../../contexts/AlertContext";
import { ALERT_TYPES } from "../../hooks/useAlert";

const Layout = ({ children }) => {
  const {
    user: { name, email },
    userLoading,
    logout,
  } = useContext(UserContext);
  const { setAlert } = useContext(AlertContext);

  const handleLogout = useCallback(async () => {
    try {
      await logout();
    } catch (e) {
      setAlert({ message: e.message, type: ALERT_TYPES.ERROR });
    }
  }, [logout, setAlert]);

  return (
    <div className="w-full h-full flex">
      <nav className="xl:w-1/6 w-20 h-full flex flex-col bg-gray-800 text-white rounded-tr-2xl rounded-br-2xl ring-8 ring-gray-400 mr-4 overflow-hidden">
        <div className="w-full flex-grow flex flex-col">
          <NavLink route="/search" text="Search" icon={MdSearch} />
          <NavLink route="/chat" text="Chat" icon={MdChat} />
          <NavLink route="/friends" text="Friends" icon={FaUserFriends} />
          <NavLink route="/settings" text="Settings" icon={MdSettings} />
        </div>
        <div className="flex items-center justify-center bg-gray-900 text-white text-lg transition-colors w-full py-4 rounded-tr-2xl">
          <div className="flex-col ml-4 flex-grow xl:flex hidden">
            <strong>{name}</strong>
            <em className="text-xs">{email}</em>
          </div>
          <div
            className={`rounded-md xl:p-3 xl:mr-4 p-4 cursor-pointer hover:bg-white hover:text-gray-900 ${
              userLoading ? "opacity-30 pointer-events-none" : "opacity-100"
            }`}
            onClick={handleLogout}
          >
            <IoLogOut size="1.5rem" className="m-auto" />
          </div>
        </div>
      </nav>
      <div className="h-full flex-grow">{children}</div>
    </div>
  );
};

export default Layout;
