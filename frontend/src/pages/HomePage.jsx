import { useEffect, useState } from "react";
import veg1 from "../assets/bg.png";
import logo from "../assets/agri2.png";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Button, Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart";
import { toast } from "react-toastify";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTotal();
  }, []);

  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (page == 1) return;
    loadMore();
  }, [page]);

  //filter be category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const texts = [
    "Shop local, eat fresh.",
    "Convenient,",
    "Reliable and delicious.",
    "Unexpected guests?",
  ];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Layout title={"AgriVatika | All Products - Best Offers"}>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-20">
        {/* Hero Section */}
        <header className="text-black py-10 sm:py-16">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-4">
            {/* Left Section - Text Content */}
            <div className="text-center md:text-left">
              <div className="flex justify-center md:justify-start">
                <img
                  src={logo}
                  alt="logo"
                  className="h-20 w-20 sm:h-28 sm:w-28 md:h-40 md:w-40"
                />
              </div>
              <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                {texts[currentTextIndex]}
              </h2>
              <p className="text-gray-500 mt-2 text-sm sm:text-base md:text-lg">
                Order vegetables & fruits from vendors near you.
              </p>
              <div className="mt-6 flex justify-center md:justify-start">
                <button className="bg-green-500 cursor-pointer !text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-all duration-300 transform hover:scale-105">
                  Get Started
                </button>
              </div>
            </div>

            {/* Right Section - Image */}
            <div className="w-full h-56 sm:h-72 md:h-80 rounded-lg shadow-lg overflow-hidden flex justify-center mt-10">
              <img
                src={veg1}
                alt="Vegetable Display"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </header>

        {/* show vegetables category */}
        <h1 className="text-4xl text-center font-bold">
          Today's{" "}
          <span className="text-green-500 font-bold">Fresh Vegitables</span>
        </h1>
        <br />
        <div className="flex">
          <div className="w-1/4">
            <h6 className="text-center">
              Filter By{" "}
              <span className="text-green-500 font-semibold">Category</span>{" "}
            </h6>
            <div className="flex flex-col space-y-2">
              {categories.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>

            {/* price filter  */}
            <h6 className="text-center mt-4">
              Filter By{" "}
              <span className="text-green-500 font-semibold">Price</span>
            </h6>
            <div className="flex flex-col space-y-2">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-600 !text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 !m-5 cursor-pointer"
              >
                RESET FILTER
              </button>
            </div>
          </div>
          <div className="w-3/4">
            <h1 className="text-center text-2xl font-bold underline">
              Our <span className="text-green-500 font-bold">Products</span>
            </h1>
            {/* {JSON.stringify(checked, null, 4)}
            {JSON.stringify(radio, null, 4)} */}
            <div className="flex flex-wrap">
              {products?.map((p) => (
                //eslint-disable-next-line
                <div className="bg-white shadow-lg rounded-lg overflow-hidden m-2">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="w-60 h-60 object-cover"
                    alt={p.name}
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <h5 className="text-lg font-semibold">{p.name}</h5>
                      <h5 className="text-lg font-semibold">₹:{p.price}</h5>
                    </div>
                    <p className="text-gray-600 w-56 truncate whitespace-normal">
                      {p.description.substring(0, 40)}....
                    </p>
                    <div className="flex justify-between items-center gap-4">
                      <button
                        className="bg-yellow-500 !text-white py-2 px-4 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300 cursor-pointer"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        More details
                      </button>
                      <button
                        className="bg-green-600 !text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition duration-300 cursor-pointer flex items-center justify-center"
                        onClick={() => {
                          setCart([...cart, p]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, p])
                          );
                          toast.success("Item added to cart");
                        }}
                      >
                        <AiOutlineShoppingCart size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="!m-20 p-3">
              {products && products.length < total && (
                <Button
                  className="!bg-green-600 !text-white py-2 px-4 rounded-lg !shadow-md hover:!bg-green-700 transition duration-300 cursor-pointer flex items-center justify-center"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "Loading..." : "Load More"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
