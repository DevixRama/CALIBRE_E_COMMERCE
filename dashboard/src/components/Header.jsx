import React from "react";
import { useDispatch, useSelector } from "react-redux";
import avatar from "../assets/avatar.jpg";
import { Menu } from "lucide-react";
import { toggleNavbar } from "../store/slices/extraSlice";

const Header = () => {

  const { user } = useSelector(state => state.auth)

  const { openedComponent } = useSelector(state => state.extra)
  const dispatch = useDispatch()

  return (
    <header className="w-full flex items-center justify-between bg-white px-6 py-4 shadow-md">
      <div className="flex items-center gap-3">
        {/* <Menu className="size-6 text-purple-600 cursor-pointer" onClick={() => dispatch(toggleNavbar())} /> */}
        <h1 className="text-base font-bold">{openedComponent} / <span className="text-sm">{user?.name} </span> </h1>
      </div>
      <div className="flex items-center gap-3">
        <img src={user?.avatar?.url} alt={user?.name || avatar} className="w-10 h-10 rounded-full object-cover" />
        <p className="text-gray-700 font-medium">{user?.name}</p>
      </div>
    </header>
  );
};

export default Header;
