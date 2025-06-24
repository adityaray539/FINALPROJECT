import axios from "axios";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout title={"Dashbord - All Product | AgriVatika"}>
      <div className="flex m-3 p-3">
        <div className="w-1/4 mt-16">
          <AdminMenu />
        </div>
        <div className="w-3/4 m-5 mt-16">
          <h1 className="text-center text-green-700 text-3xl font-semibold">
            ➡➡All Products List⬅⬅
          </h1>
          <div className="flex flex-wrap">
            {products?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/product/${p.slug}`}
                className="block m-2 w-60"
              >
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
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
                    <p className="text-gray-600">{p.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
