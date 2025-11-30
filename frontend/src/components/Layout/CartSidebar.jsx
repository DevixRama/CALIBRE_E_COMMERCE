import { X, Plus, Minus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateItemQuantity } from "../../store/slices/cartSlice";
import { toggleCart } from "../../store/slices/popupSlice";

const CartSidebar = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const { isCartOpen } = useSelector((state) => state.popup);

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) dispatch(removeFromCart(id));
    else dispatch(updateItemQuantity({ id, quantity }));
  };

  const total = cart.reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0);

  return (
    <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl border-l transform transition-transform duration-300 z-50 ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Your Cart</h2>
        <button onClick={() => dispatch(toggleCart())}><X className="w-5 h-5" /></button>
      </div>
      <div className="flex flex-col gap-3 p-4 overflow-y-auto h-[calc(100%-160px)]">
        {cart && cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center mt-10 gap-4">
            <p className="text-sm text-gray-500">Your cart is empty</p>
            <Link to="/products" onClick={() => dispatch(toggleCart())} className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded hover:opacity-90 transition">Browse Products</Link>
          </div>
        ) : (
          cart.map((item) => (
            <div key={item.product.id} className="flex items-center justify-between gap-3 border-b pb-3">
              <img src={item.product.images[0].url} alt={item.product.name} className="w-16 h-16 object-cover rounded" />
              <div className="flex-1">
                <h3 className="text-sm font-medium">{item.product.name}</h3>
                <p className="text-sm text-gray-600">${Number(item.product.price).toFixed(2)}</p>
                <div className="flex items-center gap-2 mt-1">
                  <button disabled={item.quantity === 1} onClick={() => updateQuantity(item.product.id, item.quantity - 1)}><Minus className="w-4 h-4" /></button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}><Plus className="w-4 h-4" /></button>
                </div>
              </div>
              <button onClick={() => dispatch(removeFromCart(item.product.id))}><Trash2 className="w-4 h-4 text-red-500" /></button>
            </div>
          ))
        )}
      </div>
      <div className="p-4 border-t">
        <div className="flex justify-between mb-3">
          <span className="font-bold">Total:</span>
          <span className="font-semibold">${total.toFixed(2)}</span>
        </div>
        <Link to="/cart" onClick={() => dispatch(toggleCart())} className="block w-full text-center bg-blue-600 text-white py-2 rounded hover:opacity-90 transition">View Cart & Checkout</Link>
      </div>
    </div>
  );
};

export default CartSidebar;
