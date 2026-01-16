import { Menu, User, ShoppingCart, Sun, Moon, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleAuthPopup, toggleSidebar, toggleSearchBar, toggleCart } from "../../store/slices/popupSlice";


const Navbar = () => {

  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const cartItemsCount = cart ? cart.reduce((t, i) => t + i.quantity, 0) : 0;


  return (
    <nav className="bg-white-50 mx-auto max-w-7xl flex items-center justify-between px-12 py-4 shadow-md mb-4 h-20">
      <div className="flex items-center gap-8">
        <Menu onClick={() => dispatch(toggleSidebar())} className="w-6 h-6 cursor-pointer" />
        <Search onClick={() => dispatch(toggleSearchBar())} className="w-6 h-6 cursor-pointer" />
      </div>

      <h2 className="text-4xl font-bold">Calibre</h2>

      <div className="flex items-center gap-8">
        <User onClick={() => dispatch(toggleAuthPopup())} className="w-6 h-6 cursor-pointer" />
        <div className="relative cursor-pointer" onClick={() => dispatch(toggleCart())}>
          <ShoppingCart className="w-6 h-6" />
          {cartItemsCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
              {cartItemsCount}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
