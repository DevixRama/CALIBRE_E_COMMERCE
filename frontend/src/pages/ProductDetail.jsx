import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Star, ShoppingCart, Heart, Share2, Plus, Minus, Loader, HandCoins } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import ReviewsContainer from "../components/Products/ReviewsContainer";
import { fetchProductDetails } from "../store/slices/productSlice";
import { addToCart } from "../store/slices/cartSlice";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("Description")

  const { productDetails, loading, productReviews } = useSelector(state => state.product);
  const [selectImage, setSelectImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    dispatch(addToCart({ product: productDetails, quantity }));
    setQuantity(1)
  };


  const handleBuyNow = () => {
    dispatch(addToCart({ product: productDetails, quantity }))
    navigate("/payment")
  }


  const handleCopyURL = () => {
    const currentURL = window.location.href
    navigator.clipboard.writeText(currentURL).then(() => toast.success("URL copied", currentURL)).catch((err) => toast.error("Failed to copy", err))
  }


  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  if (loading || !productDetails?.name) return <div className="w-full h-[60vh] flex items-center justify-center"><Loader className="animate-spin" /></div>;

  return (
    <div className="w-full max-w-6xl mx-auto p-4 flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="w-full">
          <img src={productDetails.images?.[selectImage]?.url} alt={productDetails.name} className="max-w-5xl h-80 object-contain rounded-xl" />
          <div className="flex gap-2 mt-3">
            {productDetails.images?.map((img, idx) => (
              <img key={idx} src={img?.url} onClick={() => setSelectImage(idx)} className={`w-20 h-20 rounded-md object-cover cursor-pointer border ${selectImage === idx ? "border-black" : "border-transparent"}`} />
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col gap-4">
          <h1 className="text-3xl font-semibold">{productDetails.name}</h1>

          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span>{productDetails.ratings}</span>

            {new Date() - new Date(productDetails.created_at) < 30 * 24 * 60 * 60 * 1000 && (<span className="px-2 py-1 bg-purple-600 text-white text-xs font-semibold rounded">NEW</span>)}

            {productDetails.ratings >= 4.5 && (<span className="px-2 py-1 bg-gradient-to-r from-yellow-400 to-pink-500 text-white text-xs font-semibold rounded">TOP RATED</span>)}
          </div>

          <div>
            <span className={`text-xs px-2 py-1 rounded ${productDetails.stock > 5 ? "bg-green-100 text-green-600" : productDetails.stock > 0 ? "bg-yellow-100 text-yellow-600" : "bg-red-100 text-red-600"}`}>
              {productDetails.stock > 5 ? "In Stock" : productDetails.stock > 0 ? "Limited Stock" : "Out of Stock"}
            </span>
          </div>

          <p className="text-xl font-semibold">${productDetails.price}</p>

          <div className="flex items-center gap-3">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 border rounded-md"><Minus /></button>
            <span className="text-lg font-medium">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="p-2 border rounded-md"><Plus /></button>
          </div>

          <div className="flex gap-4">
            <button onClick={handleAddToCart} className="bg-black text-white p-3 rounded-md flex items-center gap-2 w-fit"><ShoppingCart /> Add to Cart</button>
            <button disabled={productDetails.stock === 0} onClick={handleBuyNow} className="bg-purple-800 text-white p-3 rounded-md flex items-center gap-2 w-fit"> <HandCoins /> buy now</button>
          </div>

          <div className="flex items-center gap-4 mt-2">
            <Heart className="cursor-pointer" />
            <Share2 onClick={handleCopyURL} className="cursor-pointer" />
          </div>
        </div>

      </div>

      <div className="w-full border-b flex gap-6">
        <button onClick={() => setActiveTab("Description")} className={`pb-2 ${activeTab === "Description" ? "border-b-2 border-black font-semibold" : "text-gray-500"}`}>Description</button>
        <button onClick={() => setActiveTab("Reviews")} className={`pb-2 ${activeTab === "Reviews" ? "border-b-2 border-black font-semibold" : "text-gray-500"}`}>Reviews</button>
      </div>

      {activeTab === "Description" && (<div className="text-gray-700 leading-relaxed">{productDetails.description}</div>)}

      {activeTab === "Reviews" && (<ReviewsContainer product={productDetails} productReviews={productReviews} />)}

    </div>
  );
};

export default ProductDetail;
