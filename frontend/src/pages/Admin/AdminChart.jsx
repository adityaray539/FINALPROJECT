import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import AdminBarGraph from "../admindashpage/AdminBarGraph";
import AdminKPI from "../admindashpage/adminkpi";

const AdminChart = () => {
  return (
    <Layout title={"Dashbord & KPIs | AgriVatika"}>
      <div className="flex m-3 p-3">
        <div className="w-1/4 mt-16">
          <AdminMenu />
        </div>
        <div className="w-3/4 m-5 mt-16">
          <h1 className="text-center text-green-700 text-3xl font-semibold">
            ➡➡Dashbord & KPIs⬅⬅
          </h1>

          {/* admin KPI  */}
          <AdminKPI />

          {/* admin bargraph✅✅✅ */}
          <AdminBarGraph />
        </div>
      </div>
    </Layout>
  );
};

export default AdminChart;
