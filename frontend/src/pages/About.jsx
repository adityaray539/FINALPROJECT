import AboutPic from "./../assets/aboutSectionRight.jpg";
import { FaUsers, FaStore, FaShoppingCart, FaCity } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import CountUp from "react-countup";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const About = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/v1/contact", formData);
      alert("Message sent successfully");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      alert("Failed to send message");
    }
  };
  return (
    <>
      <Layout title={"About | Agrivatika"}>
        <div className="min-h-screen flex items-center justify-center p-4 mt-6">
          <div className=" p-8   max-w-4xl w-full flex flex-col md:flex-row items-center">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-5xl font-bold text-black-700 mb-4">
                Online <br /> <span className="text-green-500">Vegetable</span>
                <br /> and Fruit <br />
                Marketplace
              </h1>
              <p className="text-gray-600 mb-6">
                The Online Vegetable and Fruit Marketplace (VegFru) is a
                web-based platform that provides an easy and convenient way for
                customers to order fresh fruits and vegetables from nearby
                vendors. The platform is similar to Swiggy and Zomato, but it is
                focused on connecting customers with local vendors selling fresh
                produce.
              </p>
              <Link
                to={"/"}
                className="bg-green-600 !text-white px-6 py-2 cursor-pointer hover:bg-green-700 transition duration-300"
              >
                Order now
              </Link>
            </div>
            <div className="flex-1 mt-8 md:mt-0 md:ml-8">
              <img
                src={AboutPic}
                alt="VegFru Marketplace"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Second section start  */}

        <div className="min-h-screen flex flex-col items-center justify-center p-4 -mt-36">
          <div className="rounded-lg p-8 max-w-4xl w-full text-center">
            <h1 className="text-4xl font-bold text-black-700 mb-6">
              Our Impact in <span className="text-green-500">Numbers</span>
            </h1>
            <p className="text-gray-600 mb-8">
              Numbers don’t tell the whole story, but they do give us a good
              idea of the impact we’re making at VegFru. We’re thrilled to share
              some of our most impressive stats with you, including how many
              customers we’ve served, how many vendors we work with, and more.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-lg shadow-lg">
                <FaUsers className="text-5xl text-green-700 mx-auto" />
                {/* <h2 className="text-3xl font-bold text-green-700 mt-4">2.7K</h2> */}
                <h2 className="text-3xl font-bold text-green-700 mt-4">
                  <CountUp start={0} end={2700} duration={4.5} separator="," />
                </h2>
                <p className="text-gray-600 mt-2">Customers</p>
              </div>
              <div className="p-6 rounded-lg shadow-lg">
                <FaStore className="text-5xl text-green-700 mx-auto" />
                <h2 className="text-3xl font-bold text-green-700 mt-4">
                  <CountUp start={0} end={800} duration={4.5} separator="," />
                </h2>
                <p className="text-gray-600 mt-2">Vendors</p>
              </div>
              <div className="p-6 rounded-lg shadow-lg">
                <FaShoppingCart className="text-5xl text-green-700 mx-auto" />
                <h2 className="text-3xl font-bold text-green-700 mt-4">
                  <CountUp start={0} end={1400} duration={4.5} separator="," />
                </h2>
                <p className="text-gray-600 mt-2">Orders</p>
              </div>
              <div className="p-6 rounded-lg shadow-lg">
                <FaCity className="text-5xl text-green-700 mx-auto" />
                <h2 className="text-3xl font-bold text-green-700 mt-4">
                  <CountUp start={0} end={46} duration={4.5} separator="," />
                </h2>
                <p className="text-gray-600 mt-2">Cities</p>
              </div>
            </div>
          </div>
        </div>

        {/* Third section start  */}

        <div className="min-h-screen flex flex-col items-center justify-center p-4 -mt-52">
          <div className="rounded-lg p-8 max-w-4xl w-full text-center">
            <h1 className="text-4xl font-bold text-black-700 mb-6">
              What Our Customers{" "}
              <span className="text-green-500">Are Saying</span>
            </h1>
            <p className="text-gray-600 mb-8">
              We love hearing from our customers at AgriVatika, and we are
              grateful for the kind words and feedback we have received. Take a
              look at some of the glowing testimonials we have received from
              happy customers!
            </p>
            <hr className="w-40 border-t-4 border-green-500 rounded-2xl mx-auto my-4" />
          </div>
        </div>

        {/* fourth section start  */}
        <div className="bg-white py-10 px-4 -mt-60">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
              {/* First User */}
              <div className="p-6 rounded-lg shadow-lg bg-gray-50">
                <div className="flex justify-center">
                  <FaUserCircle className="text-green-500 text-6xl" />
                </div>
                <h3 className="text-lg font-semibold mt-4">Ramu</h3>
                <p className="text-gray-600 mt-2">
                  I have been using AgriVatika for a few months now, and I am
                  blown away by the quality of the produce and the convenience
                  of the service. It is so easy to place an order and have it
                  delivered right to my door. Highly recommend!
                </p>
                <a
                  href="#"
                  className="text-green-500 font-semibold mt-4 inline-block"
                >
                  Read More →
                </a>
              </div>

              {/* Second User */}
              <div className="p-6 rounded-lg shadow-lg bg-gray-50">
                <div className="flex justify-center">
                  <FaUserCircle className="text-green-500 text-6xl" />
                </div>
                <h3 className="text-lg font-semibold mt-4"> Ganesh</h3>
                <p className="text-gray-600 mt-2">
                  As a vendor, I can say that AgriVatika has been a game-changer
                  for my business. The platform is easy to use and customer
                  service is top-notch. I highly recommend it to any vendor
                  looking to expand their reach.
                </p>
                <a
                  href="#"
                  className="text-green-500 font-semibold mt-4 inline-block"
                >
                  Read More →
                </a>
              </div>

              {/* Third User */}
              <div className="p-6 rounded-lg shadow-lg bg-gray-50">
                <div className="flex justify-center">
                  <FaUserCircle className="text-green-500 text-6xl" />
                </div>
                <h3 className="text-lg font-semibold mt-4">Sibu</h3>
                <p className="text-gray-600 mt-2">
                  VegFru is a lifesaver for me. As someone who is always on the
                  go, it is hard to find time to shop for fresh produce. But
                  with AgriVatika, I can easily order what I need and have it
                  delivered right to my office or home.
                </p>
                <a
                  href="#"
                  className="text-green-500 font-semibold mt-4 inline-block"
                >
                  Read More →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* fivth section start   */}
        <div className="p-5 max-w-2xl mx-auto bg-gray-50 rounded-lg shadow-sm mt-20 mb-10">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center">
            Contact <span className="text-green-500">Us</span>
          </h2>
          <p className="text-gray-600 mb-6">
            We had love to hear from you! Fill out the form below and we will
            get back to you as soon as possible.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="flex-1">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                rows="4"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 cursor-pointer !text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Send
            </button>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default About;
