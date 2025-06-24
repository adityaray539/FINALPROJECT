import { useSearch } from "../context/Search";
import Layout from "./../components/Layout/Layout";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart";
import { toast } from "react-toastify";

const Search = () => {
  const navigate = useNavigate();
  const [values, setValues] = useSearch();
  const [cart, setCart] = useCart();

  return (
    <Layout title={"Search results | AgriVatika"}>
      <div className="container mt-25">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="flex justify-center items-center">
            <div className="flex flex-wrap justify-center !mt-4">
              {values?.results.map((p) => (
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
