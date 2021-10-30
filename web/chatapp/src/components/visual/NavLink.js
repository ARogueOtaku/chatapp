import { Link } from "react-router-dom";

const NavLink = ({ route, text, icon: Icon }) => {
  return (
    <Link
      to={route}
      className="flex items-center mx-3 mt-4 p-4 hover:bg-white hover:text-gray-800 text-lg rounded-lg transition-colors"
    >
      <Icon size="1.5rem" className="xl:mr-1 xl:ml-4 m-auto" />
      <span className="xl:inline ml-3 hidden">{text}</span>
    </Link>
  );
};

export default NavLink;
