import { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProdcut = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data.category);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = await axios.put(
        `/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.success("Product updated successfully");
        setTimeout(() => {
          navigate("/dashboard/admin/products");
        }, 2000);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //delete prodcut
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are you sure want to delete this product ?");
      if (!answer) return;
      const { data } = await axios.delete(
        `/api/v1/product/delete-product/${id}`
      );
      toast.success("Product deleted successfully");
      setTimeout(() => {
        navigate("/dashboard/admin/products");
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Dashbord - Create Product | AgriVatika"}>
      <div className="flex m-3 p-3">
        <div className="w-1/4 mt-16">
          <AdminMenu />
        </div>
        <div className="w-3/4 m-5 mt-16">
          <h1 className="text-center text-green-700 text-3xl font-semibold">
            ➡➡Update Product⬅⬅
          </h1>
          <div className="m-1 w-160">
            <label className="text-gray-700 font-bold whitespace-nowrap">
              Category:
            </label>
            <Select
              // bordered={false}
              placeholder="Select a category"
              size="large"
              showSearch
              className="mb-3 w-full border border-green-500 rounded-md p-2 focus:border-green-600"
              onChange={(value) => {
                setCategory(value);
              }}
              value={category}
            >
              {categories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>

            <div className="mb-3 mt-5">
              <label className="text-gray-700 font-bold whitespace-nowrap">
                Photo:
              </label>
              <label className="w-full border border-green-500 text-gray-500 hover:bg-green-500 hover:text-white px-4 py-2 rounded cursor-pointer text-center block">
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  className="cursor-pointer"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            <div className="mb-3">
              {photo ? (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product-photo"
                    height={"200px"}
                    className="w-80 h-48 object-cover mx-auto border border-gray-300 rounded-md shadow-md"
                  />
                </div>
              ) : (
                <div className="text-center">
                  <img
                    src={`/api/v1/product/product-photo/${id}`}
                    alt="product-photo"
                    height={"200px"}
                    className="w-80 h-48 object-cover mx-auto border border-gray-300 rounded-md shadow-md"
                  />
                </div>
              )}
            </div>
            <div className="mb-3">
              <label className="text-gray-700 font-bold whitespace-nowrap">
                Product Name:
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-grow  w-full px-4 py-2 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your product name"
              />
            </div>
            <div className="mb-3">
              <label className="text-gray-700 font-bold  whitespace-nowrap">
                Description:
              </label>
              <textarea
                type="text"
                value={description}
                placeholder="write a description"
                className="flex-grow  w-full px-4 py-2 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="text-gray-700 font-bold whitespace-nowrap">
                Price:
              </label>
              <input
                type="number"
                value={price}
                placeholder="Enter the Price"
                className="flex-grow  w-full px-4 py-2 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="text-gray-700 font-bold whitespace-nowrap">
                Quantity:
              </label>
              <input
                type="number"
                value={quantity}
                placeholder="Enter the Price"
                className="flex-grow w-full px-4 py-2 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="text-gray-700 font-bold whitespace-nowrap">
                Shipping:
              </label>
              <Select
                bordered={false}
                placeholder="Select Shipping "
                size="large"
                showSearch
                className="mb-3 w-full border border-green-500 rounded-md p-2 focus:border-green-600"
                onChange={(value) => {
                  setShipping(value);
                }}
                value={shipping ? "yes" : "No"}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>
            <div className="mb-3">
              <button
                className="bg-green-500 cursor-pointer !text-white py-2 px-4 rounded-md hover:bg-green-600 w-full sm:w-auto !mx-2"
                onClick={handleUpdate}
              >
                UPDATE PRODUCT
              </button>
              <button
                className="bg-red-500 cursor-pointer !text-white  py-2 px-4 rounded-md hover:bg-red-600 w-full sm:w-auto !mx-2 !my-2"
                onClick={handleDelete}
              >
                DELETE PRODUCT
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProdcut;
