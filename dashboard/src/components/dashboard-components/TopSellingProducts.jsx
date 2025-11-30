import React from "react";
import { useSelector } from "react-redux";

const TopSellingProducts = () => {
  const { topSellingProducts } = useSelector((state) => state.admin);

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md overflow-x-auto">
      <h3 className="font-semibold mb-4 text-purple-700">Top Products List</h3>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-purple-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium">Image</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Title</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Category</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Total Sold</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Rating</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {topSellingProducts?.length > 0 ? (
            topSellingProducts.map((product, index) => (
              <tr key={index} className="hover:bg-purple-50">
                <td className="px-4 py-2">
                  <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                </td>
                <td className="px-4 py-2 text-gray-700">{product.name}</td>
                <td className="px-4 py-2 text-gray-700">{product.category}</td>
                <td className="px-4 py-2 font-semibold text-purple-700">{product.total_sold}</td>
                <td className="px-4 py-2 font-semibold text-purple-700">{product.ratings}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center text-gray-500 py-4">No top selling products found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TopSellingProducts;