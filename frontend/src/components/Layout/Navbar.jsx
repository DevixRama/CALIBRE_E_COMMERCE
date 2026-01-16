import { Menu, User, ShoppingCart, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleAuthPopup, toggleSidebar, toggleSearchBar, toggleCart } from "../../store/slices/popupSlice";


const Navbar = () => {

  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const { isSearchBarOpen } = useSelector((state) => state.popup);
  const cartItemsCount = cart ? cart.reduce((t, i) => t + i.quantity, 0) : 0;


  return (
<nav
  className="
    bg-white-50 mx-auto max-w-7xl flex items-center justify-between
    px-4 md:px-12 shadow-md h-20
    transition-[margin] duration-300 ease-out
    mb-4 md:mb-4
  "
  style={{ marginBottom: isSearchBarOpen ? "4rem" : "1rem" }}
>

      <div className="flex items-center gap-3 md:gap-8">
        <Menu onClick={() => dispatch(toggleSidebar())} className="w-5 h-5 md:w-6 md:h-6 cursor-pointer" />
      <h2 className="text-2xl md:text-4xl font-bold">Calibre</h2>
        {!isSearchBarOpen && < Search onClick={() => dispatch(toggleSearchBar())} className="w-5 h-5 md:w-6 md:h-6 cursor-pointer" />}
      </div>


      <div className="flex items-center gap-3 md:gap-8">
        <User onClick={() => dispatch(toggleAuthPopup())} className="w-6 h-6 cursor-pointer" />
        <div className="relative cursor-pointer" onClick={() => dispatch(toggleCart())}>
          <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 cursor-pointer" />
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
