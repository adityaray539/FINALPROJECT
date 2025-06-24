import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard | Agrivatika"}>
      <div className="flex m-3 p-3">
        <div className="w-1/4 mt-16">
          <UserMenu />
        </div>
        <div className="w-3/4 m-5 mt-16">
          <div className="w-3/4 p-3 bg-white border border-gray-300 rounded-md shadow-md text-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Name: {auth?.user?.name}
            </h2>
            <h2 className="text-lg font-semibold text-gray-800">
              Email: {auth?.user?.email}
            </h2>
            <h2 className="text-lg font-semibold text-gray-800">
              Contact: {auth?.user?.address}
            </h2>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
