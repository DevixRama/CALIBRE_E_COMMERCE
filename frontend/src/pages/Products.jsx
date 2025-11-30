import { useState, useEffect } from "react";
import { Search, Sparkles, Star, Filter } from "lucide-react";
import { categories } from "../data/products";
import ProductCard from "../components/Products/ProductCard";
import Pagination from "../components/Products/Pagination";
import AISearchModal from "../components/Products/AISearchModal";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchAllProducts } from "../store/slices/productSlice";
import { toggleAIModal } from "../store/slices/popupSlice";

const Products = () => {
  const { products, totalProducts } = useSelector((state) => state.product);

  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const searchedTerm = query.get("search");
  const searchedCategory = query.get("category");

  const [searchQuery, setSearchQuery] = useState(searchedTerm || "");
  const [selectedCategory, setSelectedCategory] = useState(searchedCategory || "");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [availability, setAvailability] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts({ category: selectedCategory, price: `${priceRange[0]} - ${priceRange[1]}`, search: searchQuery, ratings: selectedRating, availability: availability, page: currentPage }));
  }, [dispatch, selectedCategory, priceRange, searchQuery, selectedRating, availability, currentPage]);

  const totalPages = Math.ceil(totalProducts / 10);

  return (
    <>
      <div className="flex w-full h-full max-h-min flex-col md:flex-row gap-6 py-6 px-4">
        <aside className={`w-full md:w-1/4 p-4 rounded-2xl border border-gray-200 bg-white h-fit ${isMobileFilterOpen ? "block" : "hidden md:block"}`}>
          <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-semibold flex items-center gap-2"><Filter className="w-5 h-5" /> Filters</h2><button className="md:hidden text-sm text-purple-600" onClick={() => setIsMobileFilterOpen(false)}>Close</button></div>
          <div className="mb-6"><label className="block text-sm font-medium mb-2">Category</label><select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full p-2 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"><option value="">All</option>{categories.map((cat) => <option key={cat.id} value={cat.name}>{cat.name}</option>)}</select></div>
          <div className="mb-6"><label className="block text-sm font-medium mb-2">Price Range</label><div className="flex items-center gap-3"><input type="text" value={priceRange[0]} onChange={(e) => setPriceRange([e.target.value, priceRange[1]])} className="w-1/2 p-2 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none" placeholder="Min" /><span className="text-gray-500">-</span><input type="text" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], e.target.value])} className="w-1/2 p-2 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none" placeholder="Max" /></div></div>
          <div className="mb-6"><label className="block text-sm font-medium mb-2">Minimum Rating</label><div className="flex items-center gap-1">{[...Array(5)].map((_, i) => <Star key={i} onClick={() => setSelectedRating(selectedRating === i + 1 ? 0 : i + 1)} className={`w-5 h-5 cursor-pointer ${i + 1 <= selectedRating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />)}</div></div>
          <div className="mb-6"><label className="block text-sm font-medium mb-2">Availability</label><select value={availability} onChange={(e) => setAvailability(e.target.value)} className="w-full p-2 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"><option value="">All</option><option value="in-stock">In Stock</option><option value="limited">Limited</option><option value="out-of-stock">Out of Stock</option></select></div>
          <button onClick={() => setIsMobileFilterOpen(false)} className="w-full md:hidden py-2 bg-purple-600 text-white rounded-lg">Apply Filters</button>
        </aside>

        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Products</h1>
            <div className="flex items-center gap-4">
              <div className="relative w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search products..." className="w-full pl-10 pr-3 py-2 rounded-full bg-gray-100 border border-gray-300 outline-none" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setIsMobileFilterOpen(true)} className="md:hidden p-2 rounded-lg border bg-white shadow-sm"><Filter className="w-5 h-5" /></button>
              <button onClick={() => dispatch(toggleAIModal())} className="p-2 rounded-lg border bg-white shadow-sm flex items-center gap-2"><Sparkles className="w-5 h-5 text-purple-600" /> AI Search</button>
            </div>
          </div>


          <main className="flex-1 h-full overflow-y-scroll max-h-[70vh]">
            {products?.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="text-center text-gray-500 mt-10">No products found.</div>}
          </main>
          {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />}
        </div>


      </div>

      <AISearchModal />
    </>
  );
};

export default Products;
