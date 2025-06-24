import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";

const Users = () => {
  return (
    <Layout title={"Dashbord - All Users | AgriVatika"}>
      <div className="flex m-3 p-3">
        <div className="w-1/4 mt-16">
          <AdminMenu />
        </div>
        <div className="w-3/4 m-5 mt-16">
          <h1>All users</h1>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
