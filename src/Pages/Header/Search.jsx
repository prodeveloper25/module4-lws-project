import { useContext } from "react";
import { LocationContext } from "../../context";
import { getLocationByName } from "../../data/locationData";
import { useDebounce } from "../../hooks";

const Search = () => {
  const { setSelectedLocation } = useContext(LocationContext);

  const doSearch = useDebounce((term) => {
    const fetchedLocation = getLocationByName(term);
    setSelectedLocation({ ...fetchedLocation });
  }, 1000);
  const handleInputChange = (e) => {
    const value = e.target.value;

    doSearch(value);
  };
  return (
    <form>
      <div className="flex items-center space-x-2 py-2 px-3 group focus-within:bg-black/30 transition-all border-b border-white/50 focus-within:border-b-0 focus-within:rounded-md">
        <input
          className="bg-transparent  placeholder:text-white text-white w-full text-xs md:text-base outline-none border-none"
          type="search"
          onChange={handleInputChange}
          placeholder="Search Location"
          required
        />
      </div>
    </form>
  );
};

export default Search;
