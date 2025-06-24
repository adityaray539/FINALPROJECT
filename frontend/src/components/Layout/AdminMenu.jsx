import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="flex flex-col">
          <h4>Admin Panel</h4>
          <NavLink
            to="/dashboard/admin/dashkpis"
            className="block px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-green-500 hover:text-white !my-2"
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-category"
            className="block px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-green-500 hover:text-white"
          >
            Create Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="block px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-green-500 hover:text-white mt-2"
          >
            Create Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
            className="block px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-green-500 hover:text-white mt-2"
          >
            Products
          </NavLink>
          <NavLink
            to="/dashboard/admin/orders"
            className="block px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-green-500 hover:text-white mt-2"
          >
            Orders
          </NavLink>
          {/* <NavLink
            to="/dashboard/admin/users"
            className="block px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-green-500 hover:text-white mt-2"
          >
            Users
          </NavLink> */}
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
