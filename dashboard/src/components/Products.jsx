import React, { useState, useEffect } from "react";
import { LoaderCircle, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import CreateProductModal from "../modals/CreateProductModal";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import UpdateProductModal from "../modals/UpdateProductModal";
import ViewProductModal from "../modals/ViewProductModal";
import { deleteProduct, fetchAllProducts } from "../store/slices/productsSlice";
import { toggleCreateProductModal, toggleUpdateProductModal, toggleViewProductModal } from "../store/slices/extraSlice";

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [maxPage, setMaxPage] = useState(null);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const { isViewProductModalOpened, isCreateProductModalOpened, isUpdateProductModalOpened } = useSelector(state => state.extra);
  const { loading, products, totalProducts } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(fetchAllProducts(page));
  }, [dispatch, page]);

  useEffect(() => {
    if (totalProducts !== undefined) {
      const maxPage = Math.ceil(totalProducts / 10);
      setMaxPage(maxPage || 1);
    }
  }, [totalProducts]);

  useEffect(() => {
    if (maxPage && page > maxPage) setPage(maxPage);
  }, [maxPage, page]);



  return (
    <div className="max-h-screen px-12 py-3 w-full flex flex-col">
      <Header />

      <div className="p-6 w-full mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-purple-700">Products</h1>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl shadow hover:bg-purple-700 transition" onClick={()=> dispatch(toggleCreateProductModal())}>
            <Plus size={18} /> Add Product
          </button>
        </div>

        {/* <div className="bg-white p-4 rounded-xl shadow flex flex-wrap gap-4 items-end">
          <div className="flex flex-col w-40">
            <label className="text-sm font-semibold text-gray-600">Category</label>
            <select className="border p-2 rounded-lg">
              <option>All</option>
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Home</option>
            </select>
          </div>

          <div className="flex flex-col w-40">
            <label className="text-sm font-semibold text-gray-600">Price</label>
            <select className="border p-2 rounded-lg">
              <option>Any</option>
              <option>$0 - $50</option>
              <option>$50 - $200</option>
              <option>$200+</option>
            </select>
          </div>

          <div className="flex flex-col w-40">
            <label className="text-sm font-semibold text-gray-600">Stock</label>
            <select className="border p-2 rounded-lg">
              <option>Any</option>
              <option>In Stock</option>
              <option>Out of Stock</option>
            </select>
          </div>

          <div className="flex flex-col w-40">
            <label className="text-sm font-semibold text-gray-600">Rating</label>
            <select className="border p-2 rounded-lg">
              <option>Any</option>
              <option>1★ & up</option>
              <option>2★ & up</option>
              <option>3★ & up</option>
              <option>4★ & up</option>
            </select>
          </div>
        </div> */}

        <div className="bg-white rounded-xl h-[66vh] shadow p-4 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b text-left bg-gray-50">
                <th className="p-3">Image</th>
                <th className="p-3">Name</th>
                <th className="p-3">Price</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Rating</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-6"><LoaderCircle className="animate-spin mx-auto" /></td>
                </tr>
              ) : products && products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id} onClick={()=> {setSelectedProduct(product); dispatch(toggleViewProductModal())}} className="border-b hover:bg-gray-50 transition">
                    <td className="p-3"><img src={product.images?.[0]?.url} alt={product.name} className="w-16 h-16 object-cover rounded-lg" /></td>
                    <td className="p-3 font-semibold">{product.name}</td>
                    <td className="p-3 text-green-700 font-medium">${product.price}</td>
                    <td className="p-3">{product.stock}</td>
                    <td className="p-3">{product.ratings || "-"}</td>
                    <td className="p-3 flex gap-2">

                      <button className="px-3 py-1 text-green-600 bg-purple-50 rounded hover:scale-105 transition-all" onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); dispatch(toggleUpdateProductModal()) }}>Edit</button>
                      <button className="px-3 py-1 text-red-600 bg-purple-50 rounded hover:scale-105 transition-all" onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); dispatch(deleteProduct(product.id)); }}>{selectedProduct?.id === product.id &&  loading ? "Deleting..." : "Delete"}</button>

                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">No products found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center items-center gap-3 mt-2">
          <button disabled={page === 1} onClick={() => setPage(prev => prev - 1)} className="p-2 bg-purple-400 text-white rounded-full"><ChevronLeft /></button>
          <span className="font-semibold">{page} / {maxPage}</span>
          <button disabled={page === maxPage} onClick={() => setPage(prev => prev + 1)} className="p-2 bg-purple-400 text-white rounded-full"><ChevronRight /></button>
        </div>
      </div>

      {isViewProductModalOpened && <ViewProductModal selectedProduct={selectedProduct} />}
      {isCreateProductModalOpened && <CreateProductModal />}
      {isUpdateProductModalOpened && <UpdateProductModal selectedProduct={selectedProduct} />}
    </div>
  );
};

export default Products;
