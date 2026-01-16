import React from "react";
import { Star, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product, e) => { e.preventDefault(); e.stopPropagation(); dispatch(addToCart({ product, quantity: 1 })); };

  return (
    <Link to={`/product/${product.id}`} onClick={() => scrollTo(0,0)} className="flex flex-col justify-around flex-shrink-0 w-[14rem] max-h-[18rem] bg-white border border-gray-200 rounded-md px-4 py-2 shadow-sm hover:shadow-md transition group">

      <div className="relative overflow-hidden rounded-lg mb-4">
        <img src={product.images[0]?.url} alt={product.name} className="w-full h-40 object-contain group-hover:scale-105 transition-transform duration-300" />

        <div className="absolute top-3 left-3 flex flex-col space-y-1">
          {new Date() - new Date(product.created_at) < 30 * 24 * 60 * 60 * 1000 && (<span className="px-2 py-1 bg-purple-600 text-white text-xs font-semibold rounded">NEW</span>)}
          {product.ratings >= 4.5 && (<span className="px-2 py-1 bg-gradient-to-r from-yellow-400 to-pink-500 text-white text-xs font-semibold rounded">TOP RATED</span>)}
        </div>

        <button onClick={(e) => handleAddToCart(product, e)} className="absolute bottom-3 right-3 p-2 bg-gray-100 rounded-full hover:bg-purple-100 opacity-0 group-hover:opacity-100 transition" disabled={product.stock === 0}><ShoppingCart className="w-5 h-5 text-purple-600" /></button>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">{product.name}</h3>

        <div className="hidden md:flex items-center space-x-1 mb-1">
          <div className="flex items-center">
            <Star className="text-yellow-400 w-5 fill-current" />
          </div>
          <span className="text-sm text-gray-500">({product.ratings})</span>
        </div>

        <div className="hidden md:flex items-center space-x-2"><span className="text-xl font-bold text-purple-600">₹{product.price}</span></div>

      </div>
      <div className="hidden md:inline" ><span className={`text-xs px-2 py-1 rounded ${product.stock > 5 ? "bg-green-100 text-green-600" : product.stock > 0 ? "bg-yellow-100 text-yellow-600" : "bg-red-100 text-red-600"}`}>{product.stock > 5 ? "In Stock" : product.stock > 0 ? "Limited Stock" : "Out of Stock"}</span></div>

    </Link>
  );
};

export default ProductCard;
