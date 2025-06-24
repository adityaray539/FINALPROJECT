import axios from "axios";
import Layout from "./../components/Layout/Layout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useCart } from "../context/Cart";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [cart, setCart] = useCart();
  const [relatedProducts, setRelatedProducts] = useState([]);
  //get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //get similar products
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-6 mt-10">
        {/* Product Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-white p-6 rounded-2xl shadow-lg">
          <div>
            <img
              src={`/api/v1/product/product-photo/${product._id}`}
              className="w-60 h-60 object-cover rounded-lg"
              alt={product.name}
            />
          </div>
          <div className="text-gray-800">
            <h1 className="text-center underline text-green-500 text-2xl">
              Product Details
            </h1>
            <h2 className="text-2xl font-semibold">
              <span className="text-green-500">Name:</span> {product.name}
            </h2>
            <h2 className="text-xl font-semibold">
              <span className="text-green-500">Category:</span>{" "}
              {product?.category?.name || "N/A"}
            </h2>
            <p className="text-lg text-gray-600 mt-2">
              <span className="text-green-500">Description:</span>
              {product.description}
            </p>
            <p className="text-xl font-bold text-blue-600 mt-4">
              <span className="text-green-500">Price:</span> ₹{product.price}
            </p>
            <button
              className="bg-green-600 !text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition duration-300 cursor-pointer flex items-center justify-center"
              onClick={() => {
                setCart([...cart, product]);
                localStorage.setItem(
                  "cart",
                  JSON.stringify([...cart, product])
                );
                toast.success("Item added to cart");
              }}
            >
              {" "}
              ADD TO CART &nbsp;
              <AiOutlineShoppingCart size={20} />
            </button>
          </div>
        </div>
        <hr />

        {/* Similar Products Section */}

        <div className="mt-10 text-center">
          <h3 className="text-3xl font-bold mb-4">
            Similar <span className="text-green-500">Products</span>
          </h3>
          {relatedProducts.length === 0 ? (
            <p className="text-gray-600">No similar products found.</p>
          ) : (
            <div className="flex flex-wrap justify-center gap-4">
              {relatedProducts.map((p) => (
                <div
                  key={p._id}
                  className="bg-white p-4 shadow-md rounded-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                >
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="w-full h-40 object-cover rounded-lg"
                    alt={p.name}
                  />
                  <h4 className="mt-2 font-medium text-gray-800 !my-2">
                    <span className="text-green-500">Name:</span> {p.name}
                  </h4>
                  <p className="text-lg text-gray-600 mt-2">
                    <span className="text-green-500">Description:</span>{" "}
                    {p.description}
                  </p>
                  <p className="text-blue-600 font-semibold">
                    <span className="text-green-500">Price:</span> ₹{p.price}
                  </p>
                  <button
                    className="bg-green-600 w-full !text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition duration-300 cursor-pointer flex items-center justify-center mt-2"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item added to cart");
                    }}
                  >
                    ADD TO CART &nbsp;
                    <AiOutlineShoppingCart size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
