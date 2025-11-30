import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewProduct } from "../store/slices/productsSlice";
import { toggleCreateProductModal } from "../store/slices/extraSlice";
import { LoaderCircle } from "lucide-react";

const CreateProductModal = () => {
  const { loading } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Electronics",
    stock: "",
    images: [],
  });

  const categoryOptions = [
    "Electronics",
    "Fashion",
    "Home & Garden",
    "Sports",
    "Books",
    "Beauty",
    "Automotive",
    "Kids & Baby",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("stock", formData.stock);

    for (let i = 0; i < formData.images.length; i++) {
      data.append("images", formData.images[i]);
    }

    dispatch(createNewProduct(data));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl p-6 relative shadow-lg">
        <button onClick={() => dispatch(toggleCreateProductModal())} className="absolute top-4 right-4 text-gray-700 hover:text-red-500 text-2xl">×</button>

        <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">
          Create New Product
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Title" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="border rounded px-4 py-2 w-full" />

          <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="border rounded px-4 py-2 w-full">
            {categoryOptions.map((cat, idx) => (<option key={idx} value={cat}>{cat}</option>))}</select>

          <input type="number" placeholder="Price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="border rounded px-4 py-2 w-full" />

          <input type="number" placeholder="Stock" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} className="border rounded px-4 py-2 w-full" />
          <input type="file" multiple accept="image/*" onChange={(e) => setFormData({ ...formData, images: Array.from(e.target.files) })} className="border rounded px-4 py-2 col-span-1 md:col-span-2" />

          <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="border rounded px-4 py-2 col-span-1 md:col-span-2" rows={4}></textarea>
          <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded w-full col-span-1 md:col-span-2 flex items-center justify-center gap-2">
            {loading ? (
              <>
                <LoaderCircle className="w-6 h-6 animate-spin" />
                Creating...
              </>
            ) : (
              "Add New Product"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModal;