import { useState } from "react";
import { X, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleSearchBar } from "../../store/slices/popupSlice";



const SearchOverlay = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSearchBarOpen } = useSelector((state) => state.popup);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      dispatch(toggleSearchBar());
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  if (!isSearchBarOpen) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black opacity-60" onClick={() => dispatch(toggleSearchBar())}  >
      <div
        className={`
    absolute left-2/5 top-[88px] md:top-3.5 shadow rounded-full
    overflow-hidden bg-white
    transition-all duration-300 ease-out
    ${isSearchBarOpen ? "w-80 md:w-96 border" : "w-0 opacity-0 pointer-events-none"}
  `}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-1 px-1 py-1 md:py-2">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 min-w-0 bg-white text-black pl-2 outline-none"
          />
          <div className="w-px h-6 bg-gray-600" />
          <button onClick={() => { handleSearch(); }} className="bg-gray-600 text-white p-1.5 rounded-full">
            <Search className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

  );
};



export default SearchOverlay;
