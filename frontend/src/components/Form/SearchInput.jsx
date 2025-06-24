import { useSearch } from "../../context/Search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data, keyword: "" });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form className="flex items-center" onSubmit={handleSubmit}>
        <div className="flex items-center border border-green-500 rounded-md overflow-hidden">
          <input
            type="search"
            className="flex-1 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Search"
            aria-label="Search"
            required
            value={values.keyword}
            onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          />
          <button className="px-4 py-2 bg-green-500 !text-white hover:bg-green-600 transition flex items-center cursor-pointer">
            <FiSearch className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchInput;
