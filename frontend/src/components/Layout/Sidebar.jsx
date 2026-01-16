import React from "react";
import { X, Home, Package, Info, HelpCircle, ShoppingCart, List, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../store/slices/popupSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.auth);
  const { isSidebarOpen } = useSelector((state) => state.popup);

  const menuItems = [
    { name: "Home", icon: Home, path: "/" },
    { name: "Products", icon: Package, path: "/products" },
    { name: "About", icon: Info, path: "/about" },
    { name: "FAQ", icon: HelpCircle, path: "/faq" },
    { name: "Contact", icon: Phone, path: "/contact" },
    { name: "Cart", icon: ShoppingCart, path: "/cart" },
    authUser && { name: "My Orders", icon: List, path: "/orders" },
  ];

  if (!isSidebarOpen) return null;

  return (
    <div className="fixed inset-0 z-10" onClick={() => dispatch(toggleSidebar())}>
      <div className={`absolute top-0 left-0 h-full w-44 md:w-64 shadow-lg transform transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} bg-white text-gray-900 z-50`} onClick={(e) => e.stopPropagation()} >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={() => dispatch(toggleSidebar())} className="p-1 rounded-md hover:bg-gray-100"><X className="w-5 h-5" /></button>
        </div>
        <nav className="flex flex-col p-4 space-y-2">
          {menuItems.filter(Boolean).map(({ name, icon: Icon, path }) => (
            <Link key={name} to={path} onClick={() => dispatch(toggleSidebar())} className="flex items-center gap-3 p-2 rounded-md border-r-2 hover:border-purple-700 hover:bg-gray-100">
              <Icon className={`w-5 h-5`} /><span className="font-medium">{name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
