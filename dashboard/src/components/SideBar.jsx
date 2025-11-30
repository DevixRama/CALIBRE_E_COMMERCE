// import React, { useEffect, useState } from "react";
// import {
//   Bell,
//   LayoutDashboard,
//   ListOrdered,
//   Package,
//   Users,
//   Menu,
//   User,
//   LogOut,
//   MoveLeft,
// } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { Navigate, useNavigate } from "react-router-dom";
// import { logout } from "../store/slices/authSlice";

// const SideBar = () => {

//   const [activeLink, setActiveLink] = useState(0)

//   const links = [
//     {
//       item: <LayoutDashboard />,
//       title: "Dashboard"
//     },
//     {
//       item: <ListOrdered />,
//       title: "Orders"
//     },
//     {
//       item: <Package />,
//       title: "Products"
//     },
//     {
//       item: <Users />,
//       title: "Users"
//     },
//     {
//       item: <User />,
//       title: "Profile"
//     },
//   ]

//   const { isNavbarOpened } = useSelector(state => state.extra)
//   const { isAuthenticated } = useSelector(state => state.auth)
//   const dispatch = useDispatch()

//   const handleLogout = () => {
//     dispatch(logout())
//   }

//   if (!isAuthenticated) {
//     return <Navigate to={'/login'} />
//   }

//   return <></>;
// };

// export default SideBar;





import React, { useEffect, useState } from "react";
import { Bell, LayoutDashboard, ListOrdered, Package, Users, Menu, User, LogOut, MoveLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { logout } from "../store/slices/authSlice";
import { toggleComponent, toggleNavbar } from "../store/slices/extraSlice";

const SideBar = () => {
  const [activeLink, setActiveLink] = useState(0);

  const links = [
    { item: <LayoutDashboard />, title: "Dashboard" },
    { item: <ListOrdered />, title: "Orders" },
    { item: <Package />, title: "Products" },
    { item: <Users />, title: "Users" },
    { item: <User />, title: "Profile" }
  ];

  const { isNavbarOpened } = useSelector(state => state.extra);
  const { isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => { dispatch(logout()); };

  if (!isAuthenticated) { return <Navigate to={'/login'} />; }

  return (
    <div className={`max-h-screen bg-purple-700 text-white transition-all duration-300 ${isNavbarOpened ? 'w-64' : 'w-20'} shadow-xl flex flex-col justify-between`}>
  <div>
    <div className="flex items-center justify-between p-4 border-b border-purple-500">
      {isNavbarOpened && <h1 className="text-xl font-bold"> Admin Panel </h1>}
      <button onClick={() => dispatch(toggleNavbar())} className="p-2 hover:bg-purple-600 rounded-xl"> <Menu /> </button>
    </div>
    <div className="flex flex-col mt-4 gap-2">
      {links.map((link, index) => (
        <button key={index} onClick={() => {setActiveLink(index); dispatch(toggleComponent(link.title))}} className={`flex items-center gap-3 p-3 w-full text-left rounded-xl transition-all duration-200 ${activeLink === index ? 'bg-purple-900' : 'hover:bg-purple-600'}`}>
          {link.item}
          {isNavbarOpened && <span className="text-sm">{link.title}</span>}
        </button>
      ))}
    </div>
  </div>
  <div className="w-full p-4 border-t border-purple-500">
    <button onClick={handleLogout} className="flex items-center gap-3 p-3 w-full rounded-xl hover:bg-purple-600 transition-all duration-200"> <LogOut /> {isNavbarOpened && <span> Logout </span>} </button>
  </div>
</div>

  );
};

export default SideBar;
