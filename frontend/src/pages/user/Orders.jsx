import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { CheckCircle, XCircle } from "lucide-react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title="Orders | AgriVatika">
      <div className="flex flex-col md:flex-row m-5 gap-6 !mt-20">
        <div className="w-full md:w-1/4">
          <UserMenu />
        </div>
        <div className="w-full md:w-3/4">
          <h1 className="text-4xl font-bold text-center mb-8 text-green-600 underline">
            All Orders
          </h1>
          {orders.length === 0 ? (
            <p className="text-center text-gray-500">
              No orders found. Start shopping now!
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border border-gray-300 shadow-md rounded-xl overflow-hidden">
                <thead className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                  <tr>
                    <th className="p-4">#</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Buyer</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Payment</th>
                    <th className="p-4">Quantity</th>
                    <th className="p-4">Products</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o, i) => (
                    <tr
                      key={o._id}
                      className="text-center border-b transition-transform transform hover:scale-105 hover:bg-gray-100 border-gray-300"
                    >
                      <td className="p-4 font-semibold">{i + 1}</td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-white text-sm ${
                            o?.status === "Completed"
                              ? "bg-green-500"
                              : "bg-yellow-500"
                          }`}
                        >
                          {o?.status}
                        </span>
                      </td>
                      <td className="p-4 font-medium">{o?.buyer?.name}</td>
                      <td className="p-4 text-gray-500">
                        {moment(o?.createdAt).fromNow()}
                      </td>
                      <td className="p-4">
                        {o?.payment?.success ? (
                          <CheckCircle className="text-green-500" size={20} />
                        ) : (
                          <XCircle className="text-red-500" size={20} />
                        )}
                      </td>
                      <td className="p-4 font-semibold text-gray-700">
                        {o?.products?.length}
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col gap-2">
                          {o?.products?.map((p) => (
                            <div
                              key={p._id}
                              className="flex items-center bg-gray-50 p-3 rounded-lg shadow-sm border border-gray-200"
                            >
                              <img
                                src={`/api/v1/product/product-photo/${p._id}`}
                                alt={p.name}
                                className="w-16 h-16 object-cover rounded-lg mr-4"
                              />
                              <div>
                                <p className="font-semibold text-gray-800">
                                  {p.name}
                                </p>
                                <p className="text-green-600 font-bold">
                                  ₹{p.price}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
