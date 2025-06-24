import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";

const PageNotFound = () => {
  return (
    <Layout title={"Page Not Found | Agrivatika"}>
      <h1 className="text-center font-bold mt-20">404</h1>
      <h2 className="text-center font-semibold">Oops! Page Not Found</h2>
      <div className="flex justify-center mt-10">
        <Link to="/" className="border p-3 border-cyan-950">
          Go Back
        </Link>
      </div>
    </Layout>
  );
};

export default PageNotFound;
