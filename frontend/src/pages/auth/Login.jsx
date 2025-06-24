import Layout from "../../components/Layout/Layout";
import logo from "../../assets/agri2.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        setTimeout(() => navigate(location.state || "/"), 2000); // Delay navigation
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Login | Agrivatika"}>
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
          {/* Signup Text and Logo */}
          <div className="flex items-center justify-between mt-4">
            {/* Left: Signup Text */}
            <div>
              <h2 className="text-4xl font-bold">Login</h2>
              <p className="text-gray-600">
                or{" "}
                <Link
                  to="/register"
                  className="font-bold text-gray-500 hover:text-gray-600"
                >
                  create an account
                </Link>
                <div className="border-t-2 border-gray-900 mt-4 mb-4 rounded-md w-14"></div>
              </p>
            </div>
            {/* Right: Logo */}
            <div>
              <img
                src={logo}
                alt="Logo"
                className="h-20 w-20 object-cover rounded-md shadow-md"
              />
            </div>
          </div>

          {/* Login Form */}
          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="phone">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your phone number"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full cursor-pointer bg-green-500 !text-white py-2 px-4 rounded-md hover:bg-green-600"
            >
              Login
            </button>
            <button
              type="button"
              className="w-full !mt-2 cursor-pointer bg-red-500 !text-white py-2 px-4 rounded-md hover:bg-red-600"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
