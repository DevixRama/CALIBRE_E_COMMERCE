import React, { useEffect, useState } from "react";
import { Filter, Package, Truck, CheckCircle, XCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchMyOrders } from "../store/slices/orderSlice";

const Orders = () => {

  const [statusFilter, setStatusFilter] = useState("All");
  const { myOrders } = useSelector((state) => state.order);
  const { authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => { dispatch(fetchMyOrders()); }, [dispatch]);

  const filterOrders = myOrders?.filter((order) => statusFilter === "All" || order.order_status === statusFilter) || [];

  const statusArray = ["All", "Processing", "Shipped", "Delivered", "Cancelled"];

  const getStatusIcon = (status) => {
    switch (status) {
      case "Processing": return <Package className="w-5 h-5 text-yellow-500" />;
      case "Shipped": return <Truck className="w-5 h-5 text-blue-500" />;
      case "Delivered": return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "Cancelled": return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <Package className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Processing": return "bg-yellow-500/20 text-yellow-400";
      case "Shipped": return "bg-blue-500/20 text-blue-400";
      case "Delivered": return "bg-green-500/20 text-green-400";
      case "Cancelled": return "bg-red-500/20 text-red-400";
      default: return "bg-gray-500/20 text-gray-400";
    }
  };

  if (!authUser) { navigate("/products"); return null; }

  return (
    <div className="px-4 py-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-5">My Orders</h1>

      <div className="flex items-center gap-3 mb-6">
        <Filter className="w-5 h-5 text-gray-400" />
        <select className="border px-3 py-2 rounded-md" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          {statusArray.map((st) => (<option key={st} value={st}>{st}</option>))}
        </select>
      </div>

      <div className="flex flex-col gap-5">

        {
          filterOrders.length === 0
            ? (
              <div className="flex flex-col justify-center items-center py-6 h-[60vh] rounded-md gap-2 bg-gray-50">
                <Package className="w-10 h-10" />
                <p className="text-gray-500 text-2xl font-medium">No orders found.</p>
                <p className="text-gray-500 text-sm">No order with status "{statusFilter}" found.</p>
              </div>
            )
            : (
              filterOrders.map((order) => (
                <div key={order.id} className="border rounded-md p-4 shadow-sm flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">Order ID: {order.id}</p>
                    <p className="text-sm text-gray-400">Date: {new Date(order.created_at).toLocaleDateString()}</p>
                    <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${getStatusColor(order.order_status)}`}>{getStatusIcon(order.order_status)} {order.order_status}</span>
                  </div>

                  <div className="flex flex-col gap-3">
                    {order.order_items.map((item) => (
                      <div key={item.order_item_id} className="flex items-center gap-3 border p-3 rounded-md">
                        <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-md" />
                        <div className="flex flex-col">
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          <p className="text-sm text-gray-600">₹{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-3">
                    <p className="text-sm text-gray-500">Shipping To:</p>
                    <p className="text-sm">{order.shipping_info.full_name}, {order.shipping_info.address}, {order.shipping_info.city}, {order.shipping_info.state}, {order.shipping_info.country} - {order.shipping_info.pincode}</p>
                    <p className="text-sm text-gray-600">Phone: {order.shipping_info.phone}</p>
                  </div>

                  <div className="flex justify-end">
                    <p className="font-semibold">Total: ₹{order.total_price}</p>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t">
                    <button onClick={() => navigate(`/track/${order.id}`)} className="px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm">Track Order</button>

                    {order.order_status === "Delivered" && (
                      <>
                        <button onClick={() => navigate(`/product/${order.order_items[0]?.product_id}`)} className="px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm">Write Review</button>
                        <button onClick={() => navigate(`/product/${order.order_items[0]?.product_id}`)} className="px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm">Reorder</button>
                      </>
                    )}

                    {order.order_status === "Processing" && (
                      <button onClick={() => alert("Cancel Order Coming Soon")} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm">Cancel Order</button>
                    )}
                  </div>

                </div>
              ))
            )
        }

      </div>

    </div>
  );
};

export default Orders;
