import { useRef } from "react"; import { ChevronLeft, ChevronRight, Star, ShoppingCart } from "lucide-react"; import { Link } from "react-router-dom"; import { useDispatch, useSelector } from "react-redux"; import { addToCart } from "../../store/slices/cartSlice";
import ProductCard from "../Products/ProductCard";

const ProductSlider = ({ title, products }) => {
  const scrollRef = useRef(null); const dispatch = useDispatch();

  const scroll = (direction) => { if (scrollRef.current) { const scrollAmount = 320; scrollRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" }); } };

  const handleAddToCart = (product, e) => { e.preventDefault(); e.stopPropagation(); dispatch(addToCart({ product, quantity: 1 })); };

  return (
    <section className="py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
        <div className="flex space-x-2">
          <button onClick={() => scroll("left")} className="p-2 bg-gray-100 rounded-full hover:bg-purple-100 transition"><ChevronLeft className="w-6 h-6 text-purple-600" /></button>
          <button onClick={() => scroll("right")} className="p-2 bg-gray-100 rounded-full hover:bg-purple-100 transition"><ChevronRight className="w-6 h-6 text-purple-600" /></button>
        </div>
      </div>

      <div ref={scrollRef} className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductSlider;
