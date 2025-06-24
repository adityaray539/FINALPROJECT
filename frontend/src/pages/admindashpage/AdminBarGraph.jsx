import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import axios from "axios";
import { toast } from "react-toastify";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7300",
  "#ff6384",
  "#36a2eb",
  "#cc65fe",
  "#ffce56",
]; // Different colors for categories

const AdminBarGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryRes = await axios.get("/api/v1/category/get-category");
        const productRes = await axios.get("/api/v1/product/get-product");

        if (categoryRes?.data?.success && productRes?.data?.success) {
          const categories = categoryRes.data.category;
          const products = productRes.data.products;

          // Mapping categories to count the number of products in each
          const categoryData = categories.map((category, index) => {
            const productCount = products.filter(
              (product) => product.category?._id === category._id
            ).length;
            return {
              name: category.name,
              Products: productCount,
              fill: COLORS[index % COLORS.length], // Assign different colors
            };
          });

          setData(categoryData);
        } else {
          toast.error("Failed to fetch category or product data");
        }
      } catch (error) {
        console.error("Error fetching data", error);
        toast.error("Something went wrong while fetching data");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-5 mt-5 shadow-lg rounded-lg bg-white">
      <h2 className="text-xl text-center font-bold mb-4 text-green-700">
        Category vs Product Count
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 2, left: 2, bottom: 5 }}
        >
          <XAxis dataKey="name" />
          <YAxis
            allowDecimals={false}
            tickCount={10}
            domain={[0, (dataMax) => Math.ceil(dataMax / 10) * 10]}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="Products" barSize={40}>
            {data.map((entry, index) => (
              <Bar key={index} dataKey="Products" fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdminBarGraph;
