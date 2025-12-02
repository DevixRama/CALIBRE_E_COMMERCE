import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postReview, deleteReview } from "../../store/slices/productSlice";
import { Star } from "lucide-react";

const ReviewsContainer = ({ product, productReviews }) => {
  const { authUser } = useSelector((state) => state.auth);
  const { isPostingReview, isReviewDeleting } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  const handleReviewSubmit = (e) => {

    e.preventDefault();
    const data = new FormData();
    data.append("rating", rating);
    data.append("comment", comment);

    dispatch(postReview({ productId: product.id, review: data }));
    setComment("");
    setRating(1);
  };

  return (
    <div className="mt-10 p-6 rounded-md border border-gray-300 shadow-sm">
      <h3 className="text-2xl font-semibold mb-6">Customer Reviews</h3>

      {productReviews && productReviews.length > 0 ? (
        <div className="space-y-4 mb-8">
          {productReviews.map((review) => (
            <div key={review.review_id} className="p-2 border rounded-md">
              <div className="flex items-center space-x-4 mb-4">
                <img src={review.reviewer?.avatar?.url || "/avatar.jpg"} alt={review?.reviewer?.name || "User"} className="w-10 h-10 rounded-full object-cover" />
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-1">
                    <h4 className="text-sm font-semibold">{review?.reviewer?.name || "Anonymous"}</h4>
                    <span className="text-sm text-gray-500">#{review.review_id}</span>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < Math.floor(review.rating) ? "text-yellow-400 fill-current" : "text-gray-400"}`} />
                    ))}
                  </div>
                </div>

                {authUser?.id === review.reviewer?.id && (
                  <button onClick={() => dispatch(deleteReview({ productId: product.id, reviewId: review.review_id }))} className=" flex items-center px-2 py-1 text-sm font-medium rounded border text-red-600 hover:text-red-700 transition-all">
                    {isReviewDeleting ? (<><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /><span className="ml-2">Deleting...</span></>) : (<span>Delete Review</span>)}
                  </button>
                )}

              </div>

              <p className="text-sm text-gray-700 mb-2">{review.comment}</p>

            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 mb-8">No reviews yet. Be the first to review this product!</p>
      )}

      {authUser ? (
        <form onSubmit={handleReviewSubmit} className="space-y-4">
          <div className="flex items-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} onClick={() => setRating(i + 1)} className={`w-5 h-5 cursor-pointer ${i < rating ? "text-yellow-400 fill-current" : "text-gray-400 hover:text-yellow-400"}`} />
            ))}
          </div>

          <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write your review..." className="w-full p-3 rounded-md border border-gray-300 resize-none focus:outline-none" rows="4" required></textarea>

          <button type="submit" disabled={isPostingReview || !comment.trim()} className="w-full py-3 rounded font-semibold text-white bg-purple-800 hover:bg-purple-900 transition disabled:opacity-50 disabled:cursor-not-allowed">
            {isPostingReview ? "Submitting..." : "Post Review"}
          </button>
        </form>
      ) : (
        <p className="text-gray-600 text-sm">Please Sign-in to post review.</p>
      )}
    </div>
  );
};

export default ReviewsContainer;
