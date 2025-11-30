import React from "react";
import { useDispatch } from "react-redux";
import { toggleViewProductModal } from "../store/slices/extraSlice";

const ViewProductModal = ({ selectedProduct }) => {
  const dispatch = useDispatch();
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl p-6 overflow-y-auto h-full max-h-[55vh] relative">
        <button
          onClick={() => dispatch(toggleViewProductModal())}
          className="absolute top-4 right-4 text-gray-600 hover:text-purple-600 text-xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4 text-purple-700">{selectedProduct.title}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Images */}
          <div className="grid grid-cols-1 h-80 w-72 gap-3">
            {selectedProduct.images.map((img, idx) => (
              <img
                key={idx}
                src={img?.url}
                alt={`Product ${idx}`}
                className="w-full h-full object-contain rounded-lg border"
              />
            ))}
          </div>

          {/* Info */}
          <div className="space-y-2 text-gray-800">
            <p><strong>ID:</strong> {selectedProduct.id}</p>
            <p><strong>Description:</strong> {selectedProduct.description}</p>
            <p><strong>Category:</strong> {selectedProduct.category}</p>
            <p><strong>Price:</strong> Rs {selectedProduct.price.toLocaleString()}</p>
            <p><strong>Ratings:</strong> ⭐ {selectedProduct.ratings}</p>
            <p>
              <strong>Stock:</strong> {selectedProduct.stock > 0
                ? `In Stock (${selectedProduct.stock})`
                : "Out of Stock"}
            </p>
            <p>
              <strong>Created At:</strong> {new Date(selectedProduct.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProductModal;