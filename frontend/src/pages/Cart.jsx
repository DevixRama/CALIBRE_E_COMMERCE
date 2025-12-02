import { Plus, Minus, Trash2, ArrowRight, ShoppingCart } from "lucide-react"; import { Link, useNavigate } from "react-router-dom"; import { useDispatch, useSelector } from "react-redux"; import { removeFromCart, updateItemQuantity } from "../store/slices/cartSlice";

const Cart = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);
  const { authUser } = useSelector((state) => state.auth);

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) dispatch(removeFromCart(id));
    else dispatch(updateItemQuantity({ id, quantity }));
  };

  let total = 0; if (cart) total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  let cartItemsCount = 0; if (cart) {
    cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  return (<div className="p-6 min-h-screen max-w-6xl mx-auto">
    <h2 className="text-2xl font-bold text-purple-700 mb-4">Your Cart ({cartItemsCount})</h2>

    <div className="flex flex-col gap-4">

      {
        cart.length === 0 ?
          (
            <div className="flex flex-col justify-center items-center py-6 rounded-md gap-2 h-[60vh] bg-gray-50">
              <ShoppingCart className="w-10 h-10" />
              <p className="text-gray-700 text-xl font-medium">Your cart is empty</p>
              <p className="text-gray-500 text-sm">You haven’t added anything yet.</p>
              <Link to={"/products"} className="bg-purple-500 py-2 px-1 text-white rounded m-2 text-sm">Explore our products</Link>
            </div>
          )
          : (
            cart.map((item) => (<div key={item.product.id} className="flex items-center justify-between p-4 border rounded-md shadow-sm">
              <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate(`/product/${item.product.id}`)}>
                <img src={item.product.images[0].url} alt={item.product.name} className="w-16 h-16 rounded-md object-cover" />
                <div className="flex flex-col">
                  <p className="font-semibold">{item.product.name}</p>
                  <p className="text-purple-600 font-bold">${item.product.price}</p>
                </div></div><div className="flex items-center gap-3">
                <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-2 rounded-full border"><Minus size={16} /></button>
                <span className="font-semibold">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-2 rounded-full border"><Plus size={16} /></button>
                <button onClick={() => dispatch(removeFromCart(item.product.id))} className="p-2 text-red-500"><Trash2 size={18} /></button></div>

            </div>))


          )

      }


    </div>
    {cart.length > 0 &&
      <div className="flex items-center justify-between mt-6 p-4 border rounded-md shadow">
        <div className="flex flex-col gap-1">
          <p className="text-lg font-semibold">Subtotal: <span className="text-purple-700 font-bold">${total.toFixed(2)}</span></p>
          <p className="text-sm">Tax (18% included) : <span className="font-semibold">{total * 0.18}</span> </p>
          <p className="text-sm">Shipping: <span className="font-semibold">${total >= 50 ? "Free" : "2.00"}</span></p>
        </div>
        <Link to={authUser ? "/payment" : "/login"} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"><span>Checkout</span><ArrowRight size={18} /></Link>
      </div>
    }
  </div>);
};

export default Cart;
