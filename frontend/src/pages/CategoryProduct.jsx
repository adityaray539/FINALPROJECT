import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useCart } from "../context/Cart";
import { toast } from "react-toastify";

const CategoryProduct = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [cart, setCart] = useCart();
  const params = useParams();
  const navigate = useNavigate();

  const getProductByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProductByCat();
  }, [params?.slug]);

  return (
    <Layout>
      <div className="container">
        <h1 className="!mt-30 text-3xl text-center">
          <span className="font-bold text-green-500 text-3xl">Category:</span>{" "}
          {category?.name}
        </h1>
        <h1 className="text-center">
          {products?.length} results found related to{" "}
          <span className="text-green-500">{category?.name} ✅ </span>
        </h1>
      </div>

      <div className="flex flex-wrap justify-center items-center">
        {products?.map((p) => (
          // eslint-disable-next-line
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
                    localStorage.setItem("cart", JSON.stringify([...cart, p]));
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
    </Layout>
  );
};

export default CategoryProduct;
