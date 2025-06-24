import { FaUser, FaComment } from "react-icons/fa";
import TotalUser from "./TotalUser";

const AdminKPI = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 p-4">
      <div className="bg-green-500 text-white text-center p-6 rounded-lg shadow-md flex flex-col items-center justify-center h-32">
        <FaUser size={40} className="mb-2" />
        <h1 className="text-center text-2xl">Users</h1>
        <TotalUser />
      </div>

      <div className="bg-blue-500  text-white text-center p-6 rounded-lg shadow-md flex flex-col items-center justify-center h-32">
        Total Products <br /> <br /> 20
      </div>
      <div className="bg-teal-500 text-white text-center p-6 rounded-lg shadow-md flex flex-col items-center justify-center h-32">
        Revenue <br />
        <br />
        12000
      </div>
      <div className="bg-yellow-500  text-white text-center p-6 rounded-lg shadow-md flex flex-col items-center justify-center h-32">
        {/* <FaComment size={40} className="mb-2" /> */}
        <h1 className="text-center">Comments</h1>
        <h1>56</h1>
      </div>
    </div>
  );
};

export default AdminKPI;
