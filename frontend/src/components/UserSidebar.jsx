import React from "react";
import { NavLink } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { asyncsignoutuser } from "../store/Actions/userAction";

const UserSidebar = () => {
  const dispatch = useDispatch();

  const sidebarLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Dashboard",
      path: "/user/dashboard",
    },
  ];

  const HandleLogout = () => {
    dispatch(asyncsignoutuser());
  };
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-center h-14 border-b border-gray-300">
        <h1 className="text-black font-semibold text-lg">User Panel</h1>
      </div>
      <div className="flex-grow overflow-y-auto">
        <ul className="flex flex-col py-4 space-y-1">
          {sidebarLinks.map((link, index) => (
            <li key={index}>
              <NavLink
                to={link.path}
                className="px-6 py-3 flex items-center bg-gray-200  hover:bg-gray-300 transition-all"
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div
        onClick={HandleLogout}
        className="flex gap-3 items-center justify-center h-14 border-t text-black cursor-pointer border-gray-300"
      >
        <IoLogOutOutline className="text-xl" /> Logout
      </div>
    </div>
  );
};

export default UserSidebar;
