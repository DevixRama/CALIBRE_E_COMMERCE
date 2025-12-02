// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Loader } from "lucide-react";
// import Header from "./Header";
// import { deleteOrder, fetchAllOrders, updateOrderStatus } from "../store/slices/orderSlice";



// export default function Orders() {
//   const dispatch = useDispatch();
//   const { orders, laoding } = useSelector((state) => state.order);

//   const [selectStatus, setSelectStatus] = useState("");
//   const [filterByStatus, setFilterByStatus] = useState("All");
//   const [previewImage, setPreviewImage] = useState(null);
//   const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });

//   useEffect(() => {
//     dispatch(fetchAllOrders());
//   }, [dispatch]);

//   const handleStatusChange = (orderId, newStatus) => {
//     setSelectStatus(newStatus);
//     dispatch(updateOrderStatus({ orderId, status: newStatus }));
//   };

//   const filteredOrders =
//     filterByStatus === "All"
//       ? orders
//       : orders?.filter((order) => order.order_status === filterByStatus);

//   const handleConfirmDelete = () => {
//     dispatch(deleteOrder(deleteConfirm.id));
//     setDeleteConfirm({ open: false, id: null });
//   };

//   if (laoding) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//       <Loader className="size-10" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen p-4 bg-gray-50">
//     <Header />
//     <div className="max-w-7xl mx-auto mt-6">
//     <div className="flex items-center justify-between mb-4">
//     <h1 className="text-2xl font-semibold">Orders</h1>
//     <div className="flex items-center gap-3">
//     <select
//     className="border rounded px-3 py-1"
//     value={filterByStatus}
//     onChange={(e) => setFilterByStatus(e.target.value)}
//     >
//     <option>All</option>
//     <option>pending</option>
//     <option>processing</option>
//     <option>shipped</option>
//     <option>delivered</option>
//     <option>cancelled</option>
//     </select>
//     <button
//     className="px-3 py-1 border rounded"
//     onClick={() => dispatch(fetchAllOrders())}
//     >
//     Refresh
//     </button>
//     </div>
//     </div>

//     <div className="overflow-x-auto bg-white rounded shadow">
//     <table className="min-w-full divide-y">
//     <thead>
//     <tr>
//     <th className="px-4 py-2 text-left">Order ID</th>
//     <th className="px-4 py-2 text-left">Buyer</th>
//     <th className="px-4 py-2 text-left">Items</th>
//     <th className="px-4 py-2 text-left">Total</th>
//     <th className="px-4 py-2 text-left">Status</th>
//     <th className="px-4 py-2 text-left">Actions</th>
//     </tr>
//     </thead>
//     <tbody className="divide-y">
//     {filteredOrders?.length === 0 && (
//     <tr>
//     <td className="p-4 text-center" colSpan={6}>
//     No orders found.
//     </td>
//     </tr>
//     )}

//     {filteredOrders?.map((order) => (
//     <tr key={order.id}>
//     <td className="px-4 py-3 align-top">{order.id}</td>
//     <td className="px-4 py-3 align-top">{order.buyer_id || order.buyer || "-"}</td>
//     <td className="px-4 py-3 align-top">
//     {order.order_items?.map((item) => (
//     <div key={item.order_item_id} className="flex items-center gap-3 mb-2">
//     <img
//     alt={item.title}
//     src={item.image}
//     className="w-12 h-12 object-cover rounded cursor-pointer"
//     onClick={() => setPreviewImage(item.image)}
//     />
//     <div>
//     <div className="text-sm font-medium">{item.title}</div>
//     <div className="text-xs">Qty: {item.quantity}</div>
//     </div>
//     </div>
//     ))}
//     </td>
//     <td className="px-4 py-3 align-top">${order.total_price}</td>
//     <td className="px-4 py-3 align-top">
//     <select
//     className="border rounded px-2 py-1"
//     value={selectStatus === order.id ? selectStatus : order.order_status}
//     onChange={(e) => handleStatusChange(order.id, e.target.value)}
//     >
//     <option value="pending">pending</option>
//     <option value="processing">processing</option>
//     <option value="shipped">shipped</option>
//     <option value="delivered">delivered</option>
//     <option value="cancelled">cancelled</option>
//     </select>
//     </td>
//     <td className="px-4 py-3 align-top">
//     <div className="flex items-center gap-2">
//     <button
//     className="px-2 py-1 border rounded"
//     onClick={() => setDeleteConfirm({ open: true, id: order.id })}
//     >
//     Delete
//     </button>
//     <button
//     className="px-2 py-1 border rounded"
//     onClick={() => setPreviewImage(order.order_items?.[0]?.image || null)}
//     >
//     Preview
//     </button>
//     </div>
//     </td>
//     </tr>
//     ))}
//     </tbody>
//     </table>
//     </div>

//     </div>

//     {previewImage && (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
//     <div className="bg-white p-4 rounded max-w-lg w-full">
//     <div className="flex justify-end">
//     <button
//     className="px-2 py-1 border rounded"
//     onClick={() => setPreviewImage(null)}
//     >
//     Close
//     </button>
//     </div>
//     <img alt="preview" src={previewImage} className="w-full h-auto mt-2" />
//     </div>
//     </div>
//     )}

//     {deleteConfirm.open && (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
//     <div className="bg-white p-6 rounded w-96">
//     <h3 className="text-lg font-semibold mb-4">Confirm delete</h3>
//     <p className="mb-4">Are you sure you want to delete this order?</p>
//     <div className="flex justify-end gap-3">
//     <button
//     className="px-3 py-1 border rounded"
//     onClick={() => setDeleteConfirm({ open: false, id: null })}
//     >
//     Cancel
//     </button>
//     <button
//     className="px-3 py-1 bg-red-600 text-white rounded"
//     onClick={handleConfirmDelete}
//     >
//     Delete
//     </button>
//     </div>
//     </div>
//     </div>
//     )}

//     </div>
//   );
// }




// Updated Orders component with shipping info added
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "lucide-react";
import Header from "./Header";
import { deleteOrder, fetchAllOrders, updateOrderStatus } from "../store/slices/orderSlice";

export default function Orders() {
  const dispatch = useDispatch();
  const { orders, laoding } = useSelector((state) => state.order);

  const [selectStatus, setSelectStatus] = useState("");
  const [filterByStatus, setFilterByStatus] = useState("All");
  const [previewImage, setPreviewImage] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const handleStatusChange = (orderId, newStatus) => {
    setSelectStatus(newStatus);
    dispatch(updateOrderStatus({ orderId, status: newStatus }));
  };

  const filteredOrders =
    filterByStatus === "All"
      ? orders
      : orders?.filter((order) => order.order_status === filterByStatus);

  const handleConfirmDelete = () => {
    dispatch(deleteOrder(deleteConfirm.id));
    setDeleteConfirm({ open: false, id: null });
  };

  if (laoding) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10" />
      </div>
    );
  }

  return (
    <div className="max-h-screen w-full px-12 py-3">
      <Header />
      <div className="max-w-7xl mx-auto mt-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Orders</h1>
          <div className="flex items-center gap-3">
            <select className="border rounded px-3 py-1" value={filterByStatus} onChange={(e) => setFilterByStatus(e.target.value)}>
              <option>All</option>
              <option>pending</option>
              <option>processing</option>
              <option>shipped</option>
              <option>delivered</option>
              <option>cancelled</option>
            </select>
            <button className="px-3 py-1 border rounded" onClick={() => dispatch(fetchAllOrders())}>
              Refresh
            </button>
          </div>
        </div>

        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full divide-y">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Order ID</th>
                <th className="px-4 py-2 text-left">Buyer</th>
                <th className="px-4 py-2 text-left">Shipping Info</th>
                <th className="px-4 py-2 text-left">Items</th>
                <th className="px-4 py-2 text-left">Total</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredOrders?.length === 0 && (
                <tr>
                  <td className="p-4 text-center" colSpan={7}>No orders found.</td>
                </tr>
              )}

              {filteredOrders?.map((order) => (
                <tr key={order.id}>
                  <td className="px-4 py-3 align-top">{order.id}</td>
                  <td className="px-4 py-3 align-top">{order.buyer_id || order.buyer || "-"}</td>
                  <td className="px-4 py-3 align-top">
                    <div className="text-sm">
                      <div>Name: {order.shipping_info?.name || "-"}</div>
                      <div>Email: {order.shipping_info?.email || "-"}</div>
                      <div>Phone: {order.shipping_info?.phone || "-"}</div>
                      <div>Address: {order.shipping_info?.address || "-"}</div>
                      <div>City: {order.shipping_info?.city || "-"}</div>
                      <div>State: {order.shipping_info?.state || "-"}</div>
                      <div>Postal: {order.shipping_info?.postal_code || "-"}</div>
                      <div>Country: {order.shipping_info?.country || "-"}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 align-top">
                    {order.order_items?.map((item) => (
                      <div key={item.order_item_id} className="flex items-center gap-3 mb-2">
                        <img alt={item.title} src={item.image} className="w-12 h-12 object-cover rounded cursor-pointer" onClick={() => setPreviewImage(item.image)} />
                        <div>
                          <div className="text-sm font-medium">{item.title}</div>
                          <div className="text-xs">Qty: {item.quantity}</div>
                        </div>
                      </div>
                    ))}
                  </td>
                  <td className="px-4 py-3 align-top">${order.total_price}</td>
                  <td className="px-4 py-3 align-top">
                    <select className="border rounded px-2 py-1" value={selectStatus === order.id ? selectStatus : order.order_status} onChange={(e) => handleStatusChange(order.id, e.target.value)}>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 align-top">
                    <div className="flex items-center gap-2">
                      <button className="px-2 py-1 border rounded" onClick={() => setDeleteConfirm({ open: true, id: order.id })}>Delete</button>
                      <button className="px-2 py-1 border rounded" onClick={() => setPreviewImage(order.order_items?.[0]?.image || null)}>Preview</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        
      </div>

      {previewImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white p-4 rounded max-w-lg w-full">
            <div className="flex justify-end">
              <button className="px-2 py-1 border rounded" onClick={() => setPreviewImage(null)}>Close</button>
            </div>
            <img alt="preview" src={previewImage} className="w-full h-auto mt-2" />
          </div>
        </div>
      )}

      {deleteConfirm.open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="text-lg font-semibold mb-4">Confirm delete</h3>
            <p className="mb-4">Are you sure you want to delete this order?</p>
            <div className="flex justify-end gap-3">
              <button className="px-3 py-1 border rounded" onClick={() => setDeleteConfirm({ open: false, id: null })}>Cancel</button>
              <button className="px-3 py-1 bg-purple-600 text-white rounded" onClick={handleConfirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
