import { useState } from "react";
import { X, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleSearchBar } from "../../store/slices/popupSlice";

const SearchOverlay = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const { isSearchBarOpen } = useSelector((state) => state.popup);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      dispatch(toggleSearchBar());
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      <div className={`fixed inset-0 bg-black/50 transition-opacity ${isSearchBarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} z-40`} onClick={() => dispatch(toggleSearchBar())} />
      <div className={`fixed top-0 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${isSearchBarOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 pointer-events-none"} w-[95%] sm:w-[90%] md:w-[70%] lg:w-[50%] xl:w-[40%] bg-white text-gray-900 shadow-lg rounded z-50`}>
        <div className="flex items-center justify-between p-3 border-b border-gray-200">
          <h2 className="font-semibold text-lg">Search</h2>
          <button onClick={() => dispatch(toggleSearchBar())} className="p-1 rounded hover:bg-gray-100"><X className="w-5 h-5" /></button>
        </div>
        <div className="flex items-center p-3 gap-2">
          <input type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSearch()} className="flex-1 p-2 rounded border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button onClick={handleSearch} className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center"><Search className="w-5 h-5" /></button>
        </div>
      </div>
    </>
  );
};

export default SearchOverlay;
