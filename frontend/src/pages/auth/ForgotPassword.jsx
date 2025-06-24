import Layout from "../../components/Layout/Layout";
import logo from "../../assets/agri2.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forgot-password", {
        email,
        newPassword,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setTimeout(() => navigate("/login"), 2000); // Delay navigation
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Forgot Password | AgriVatika"}>
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
          {/* Signup Text and Logo */}
          <div className="flex items-center justify-between mt-4">
            {/* Left: Signup Text */}
            <div>
              <h2 className="text-3xl font-bold">Reset Password</h2>
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
              <label className="block text-gray-700" htmlFor="answer">
                Your favourite vegetable
              </label>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                id="answer"
                required
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your favourite vegetable name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full cursor-pointer bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
            >
              Reset
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
