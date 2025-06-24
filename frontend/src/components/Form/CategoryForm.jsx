const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <form className="mt-6 w-full" onSubmit={handleSubmit}>
      <div className="mb-4 flex flex-wrap w-full items-center gap-3">
        <label className="text-gray-700 font-bold text-lg sm:text-xl whitespace-nowrap">
          Create Category:
        </label>
        <input
          type="text"
          id="category"
          required
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="flex-grow min-w-[200px] sm:min-w-[300px] max-w-[600px] w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter new category"
        />
        <div className="w-full sm:w-auto flex justify-end">
          <button
            type="submit"
            className="bg-green-500 cursor-pointer !text-white py-2 px-4 rounded-md hover:bg-green-600 w-full sm:w-auto"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default CategoryForm;
