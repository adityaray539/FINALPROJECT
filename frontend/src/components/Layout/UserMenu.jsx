import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div>
      <div className="text-center">
        <div className="flex flex-col">
          <h4>Dashboard</h4>
          <NavLink
            to="/dashboard/user/profile"
            className="block px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-green-500 hover:text-white"
          >
            Profile
          </NavLink>
          <NavLink
            to="/dashboard/user/orders"
            className="block px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-green-500 hover:text-white mt-2"
          >
            Orders
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
