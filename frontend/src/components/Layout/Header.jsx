import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaHome,
  FaInfoCircle,
  FaQuestionCircle,
  FaSignInAlt,
  FaShoppingCart,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "./../../assets/agri2.png";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/Cart";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="shadow-md w-full fixed top-0 left-0 z-10 bg-white">
      <div className="py-4 px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src={logo}
            alt="AgriVatika Logo"
            className="w-10 h-10 object-contain"
          />
          <span className="ml-2 text-xl font-bold">AgriVatika</span>
        </div>

        {/* Desktop Menu */}
        <div className="md:flex hidden space-x-4">
          <SearchInput />
          <Link
            to="/"
            className="flex items-center font-semibold text-gray-700 hover:text-green-500"
          >
            <FaHome className="mr-2" /> Home
          </Link>
          <Link
            to="/about"
            className="flex items-center font-semibold text-gray-700 hover:text-green-500"
          >
            <FaInfoCircle className="mr-2" /> About
          </Link>

          <li className="relative group list-none mt-0.5">
            <Link
              className="flex items-center font-semibold px-4 py-2 text-gray-700 rounded-md cursor-pointer hover:text-green-600"
              to="/categories"
            >
              Categories
              <span className="ml-2 transition-transform duration-200 group-hover:rotate-180">
                ▼
              </span>
            </Link>
            <ul className="absolute hidden group-hover:block bg-white border rounded-md shadow-lg mt-2 w-48 list-none p-0">
              <li className="m-0 p-0">
                <Link
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  to="/categories"
                >
                  All Categories
                </Link>
              </li>
              {categories?.map((c) => (
                <li key={c.slug} className="m-0 p-0">
                  <Link
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    to={`/category/${c.slug}`}
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          <Link
            to="/help"
            className="flex items-center font-semibold text-gray-700 hover:text-green-500"
          >
            <FaQuestionCircle className="mr-2" /> Help
          </Link>
          {!auth.user ? (
            <Link
              to="/login"
              className="flex items-center font-semibold text-gray-700 hover:text-green-500"
            >
              <FaSignInAlt className="mr-2" /> Login
            </Link>
          ) : (
            <div className="relative">
              <button
                className="px-4 py-2 text-white bg-green-500 rounded-md flex items-center gap-2 hover:bg-green-600 transition duration-300"
                onClick={toggleDropdown}
              >
                {auth?.user?.name}
                <svg
                  className="w-4 h-4 transition-transform transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <ul className="absolute left-0 mt-2 w-48 bg-white shadow-md rounded-lg transition-all duration-300 z-50">
                  <li>
                    <NavLink
                      to={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                      className="block px-4 py-3 text-gray-700 hover:bg-blue-100 rounded-t-lg transition duration-200"
                      onClick={toggleDropdown}
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/login"
                      onClick={() => {
                        handleLogout();
                        toggleDropdown();
                      }}
                      className="block px-4 py-3 text-gray-700 hover:bg-red-100 rounded-b-lg transition duration-200"
                    >
                      Logout
                    </NavLink>
                  </li>
                </ul>
              )}
            </div>
          )}
          <Link
            to="/cart"
            className="flex items-center font-semibold text-gray-700 hover:text-green-500"
          >
            <FaShoppingCart className="mr-2" />
            <Badge count={cart?.length} offset={[10, -10]} showZero>
              Cart
            </Badge>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-gray-700 focus:outline-none"
          >
            <FaBars size={30} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col space-y-4 p-4 bg-white shadow-md">
          <SearchInput />
          <Link
            to="/"
            className="flex items-center text-gray-700 hover:text-green-500"
            onClick={toggleMenu}
          >
            <FaHome className="mr-2" /> Home
          </Link>
          <Link
            to="/about"
            className="flex items-center text-gray-700 hover:text-green-500"
            onClick={toggleMenu}
          >
            <FaInfoCircle className="mr-2" /> About
          </Link>

          <li className="relative list-none mt-0.5a">
            <button
              className="flex items-center font-semibold px-4 py-2 text-gray-700 rounded-md cursor-pointer hover:text-green-600 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              Categories
              <span
                className={`ml-2 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>
            <ul
              className={`absolute bg-white border rounded-md shadow-lg mt-2 w-48 list-none p-0 transition-opacity duration-200 ${
                isOpen ? "block" : "hidden"
              }`}
            >
              <li className="m-0 p-0">
                <Link
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  to="/categories"
                  onClick={() => setIsOpen(false)}
                >
                  All Categories
                </Link>
              </li>
              {categories?.map((c) => (
                <li key={c.slug} className="m-0 p-0">
                  <Link
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    to={`/category/${c.slug}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          <Link
            to="/help"
            className="flex items-center text-gray-700 hover:text-green-500"
            onClick={toggleMenu}
          >
            <FaQuestionCircle className="mr-2" /> Help
          </Link>
          {!auth.user ? (
            <Link
              to="/login"
              className="flex items-center text-gray-700 hover:text-green-500"
              onClick={toggleMenu}
            >
              <FaSignInAlt className="mr-2" /> Login
            </Link>
          ) : (
            <div className="relative">
              <button
                className="w-full text-left px-4 py-2 text-white bg-green-500 rounded-md flex items-center gap-2 hover:bg-green-600 transition duration-300"
                onClick={toggleDropdown}
              >
                {auth?.user?.name}
                <svg
                  className="w-4 h-4 transition-transform transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isDropdownOpen && (
                <ul className="mt-2 bg-white shadow-md rounded-lg transition-all duration-300 z-50">
                  <li>
                    <NavLink
                      to={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                      className="block px-4 py-3 text-gray-700 hover:bg-blue-100"
                      onClick={toggleDropdown}
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/login"
                      onClick={handleLogout}
                      className="block px-4 py-3 text-gray-700 hover:bg-red-100"
                    >
                      Logout
                    </NavLink>
                  </li>
                </ul>
              )}
            </div>
          )}
          <Link
            to="/cart"
            className="flex items-center text-gray-700 hover:text-green-500"
            onClick={toggleMenu}
          >
            <FaShoppingCart className="mr-2" /> Cart
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
