import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import { useCart } from "../context/Cart";
import DropIn from "braintree-web-drop-in-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //delete item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto mt-20 p-4">
        <h1 className="text-center text-2xl font-semibold bg-gray-100 p-4 rounded-lg shadow">
          {`Hello, ${auth?.token ? auth?.user?.name : "Guest"}`}
        </h1>
        <h4 className="text-center text-lg text-gray-700 mt-2">
          {cart?.length
            ? `You have ${cart.length} items in your cart ${
                auth?.token ? "" : "please login to checkout!"
              }`
            : "Your Cart Is Empty"}
        </h4>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {cart?.map((p) => (
              <div
                key={p._id}
                className="flex items-center bg-white p-4 rounded-lg shadow-md"
              >
                {/* Product Image */}
                <div className="w-32 h-32 flex-shrink-0">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="w-full h-full object-cover rounded-lg"
                    alt={p.name}
                  />
                </div>

                {/* Product Details */}
                <div className="ml-4 flex-grow !mx-10">
                  <h2 className="text-lg font-semibold">
                    <span className="text-green-500 text-xl">Name : </span>
                    {p.name}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    <span className="text-green-500 text-xl">
                      Description :{" "}
                    </span>
                    {p.description.substring(0, 70)}...
                  </p>
                  <h4 className="text-xl font-bold text-blue-600 mt-2">
                    <span className="text-green-500 text-xl ">Price : </span>₹
                    {p.price}
                  </h4>

                  {/* Action Buttons */}
                  <div className="mt-3 flex gap-3">
                    <button
                      className="px-4 py-2 bg-red-500 !text-white rounded-lg shadow hover:bg-red-600 cursor-pointer"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Section */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md h-fit">
            <h2 className="text-xl font-semibold border-b pb-2">
              Order Summary
            </h2>
            <div className="mt-4">
              <p className="text-lg font-medium">
                Total Items:{" "}
                <span className="font-semibold">{cart.length}</span>
              </p>
              <p className="text-lg font-medium">
                Current Address:{" "}
                <span className="font-semibold">{auth?.user?.address}</span>
              </p>
              <p className="text-lg font-medium">Total Price: {totalPrice()}</p>
            </div>

            {/* Checkout Button */}
            <button
              className="w-full mt-4 px-4 py-3 bg-green-500 !text-white text-lg rounded-lg shadow hover:bg-green-600 cursor-pointer"
              onClick={() =>
                auth?.token ? navigate("/checkout") : navigate("/login")
              }
            >
              {auth?.token ? "Proceed to Checkout" : "Login to Checkout"}
            </button>

            <div className="mt-2">
              {!clientToken || !auth?.token || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />

                  <button
                    className="w-full mt-4 px-4 py-3 bg-green-500 !text-white text-lg rounded-lg shadow hover:bg-green-600 cursor-pointer"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing ...." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
