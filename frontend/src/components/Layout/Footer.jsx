import { Link } from "react-router-dom";
import { FaLinkedin, FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-gray-700 text-white py-8 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center md:text-left">
        {/* Column 1 - Company */}
        <div>
          <h4 className="text-lg font-semibold mb-3 underline">Author</h4>
          <p>Aditya Kumar Ray</p>
          <p>Full Stack Developer</p>
          <p>Data Analyst</p>
          <form className="flex items-center">
            <div className="flex items-center border border-green-500 rounded-md overflow-hidden">
              <input
                type="email"
                className="flex-1 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your email"
                required
              />
              <button className="px-4 py-2 bg-green-500 !text-white hover:bg-green-600 transition flex items-center cursor-pointer">
                <FaPaperPlane className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>

        {/* Column 2 - Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3 underline">ABOUT US</h4>
          <ul>
            <li>
              <Link to="/" className="hover:text-gray-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-gray-400">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-gray-400">
                Products
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gray-400">
                About
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-gray-400">
                Services
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gray-400">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3 - Support */}
        <div>
          <h4 className="text-lg font-semibold mb-3 underline">Support</h4>
          <ul>
            <li>
              <Link to="/faq" className="hover:text-gray-400">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/help" className="hover:text-gray-400">
                Help Center
              </Link>
            </li>
            <li>
              <Link to="/support" className="hover:text-gray-400">
                Customer Support
              </Link>
            </li>
            <li>
              <Link to="/policy" className="hover:text-gray-400">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-gray-400">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-gray-400">
                Talk to client
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-center text-center">
          <h4 className="text-lg font-semibold mb-3 underline">
            Social Platform
          </h4>
          <ul className="space-y-2">
            <li>
              <Link
                to="/linkedin"
                className="flex items-center gap-2 hover:text-gray-400"
              >
                <FaLinkedin /> LinkedIn
              </Link>
            </li>
            <li>
              <Link
                to="/instagram"
                className="flex items-center gap-2 hover:text-gray-400"
              >
                <FaInstagram /> Instagram
              </Link>
            </li>
            <li>
              <Link
                to="/facebook"
                className="flex items-center gap-2 hover:text-gray-400"
              >
                <FaFacebook /> Facebook
              </Link>
            </li>
            <li>
              <Link
                to="/twitter"
                className="flex items-center gap-2 hover:text-gray-400"
              >
                <FaTwitter /> Twitter
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center text-sm text-gray-400 mt-6 border-t border-gray-700 pt-4">
        <p>&copy; {new Date().getFullYear()} Aditya. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
