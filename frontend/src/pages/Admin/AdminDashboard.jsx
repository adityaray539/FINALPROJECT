import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import Layout from "./../../components/Layout/Layout";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="flex m-3 p-3">
        <div className="w-1/4 mt-16">
          <AdminMenu />
        </div>
        <div className="w-3/4 m-5 mt-16">
          <div className="w-3/4 p-3 bg-white border border-gray-300 rounded-md shadow-md text-center">
            <h1 className="text-lg font-semibold text-gray-800">
              Admin Name: {auth?.user?.name}
            </h1>
            <h1 className="text-lg font-semibold text-gray-800">
              Admin Email: {auth?.user?.email}
            </h1>
            <h1 className="text-lg font-semibold text-gray-800">
              Admin Contact: {auth?.user?.phone}
            </h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
