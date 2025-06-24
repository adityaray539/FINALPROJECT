import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";
import { BiBox } from "react-icons/bi"; // Importing the product box icon

const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All Categories | AgriVatika"}>
      <h1 className="!mt-25 text-xl font-semibold text-center">
        All <span className="text-green-500 font-bold">Categories</span>
      </h1>
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((c) => (
            <div
              className="bg-green-300 shadow-lg rounded-lg p-6 flex flex-col items-center transition transform hover:scale-105 hover:shadow-xl"
              key={c._id}
            >
              <BiBox className="text-green-500 text-5xl mb-2" />{" "}
              {/* Product Box Icon */}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {c.name}
              </h3>
              <Link
                to={`/category/${c.slug}`}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Explore
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
