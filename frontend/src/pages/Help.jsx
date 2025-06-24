import Layout from "../components/Layout/Layout";

const Help = () => {
  return (
    <Layout title={"Help | Agrivatika"}>
      <div className="p-5 max-w-2xl mx-auto bg-gray-50 rounded-lg shadow-sm mt-30">
        <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center">
          Need <span className="text-green-500">Help?</span>
        </h2>
        <p className="text-gray-600 mb-6">
          We’re here to help! If you’re experiencing any issues or have any
          questions about using AgriVatika, check out our Help Center for
          answers to frequently asked questions.
        </p>

        <form>
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              rows="4"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 !text-white cursor-pointer py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Send
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Help;
