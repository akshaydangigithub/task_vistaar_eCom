import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { asyncsignoutadmin } from "../store/Actions/adminAction";

const AdminSidebar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();

  const sidebarLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      name: "Orders",
      path: "/admin/orders",
    },
    {
      name: "Products",
      path: "#",
      isDropdown: true,
      children: [
        {
          name: "Add Products",
          path: "/admin/product/add",
        },
        {
          name: "All Products",
          path: "/admin/product/all",
        },
      ],
    },
  ];

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const HandleLogout = () => {
    dispatch(asyncsignoutadmin());
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-center h-14 border-b border-gray-300">
        <h1 className="text-black font-semibold text-lg">Admin Panel</h1>
      </div>
      <div className="flex-grow overflow-y-auto">
        <ul className="flex flex-col py-4 space-y-1">
          {sidebarLinks.map((link, index) => (
            <li key={index}>
              {link.isDropdown ? (
                <>
                  <div
                    className={`px-6 py-3 flex items-center justify-between cursor-pointer text-gray-800 bg-gray-200  hover:bg-gray-300 transition-all `}
                    onClick={toggleDropdown}
                  >
                    <span className="flex-grow">{link.name}</span>
                    {dropdownOpen ? (
                      <MdKeyboardArrowUp className="text-xl" />
                    ) : (
                      <MdKeyboardArrowDown className="text-xl" />
                    )}
                  </div>
                  <ul
                    className={`overflow-hidden transition-all duration-300 ${
                      dropdownOpen ? "max-h-40" : "max-h-0"
                    }`}
                  >
                    {link.children.map((child, childIndex) => (
                      <li key={childIndex}>
                        <NavLink
                          to={child.path}
                          className="px-10 py-3 block bg-gray-200 hover:bg-gray-300 transition-all"
                        >
                          {child.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <NavLink
                  to={link.path}
                  className="px-6 py-3 flex items-center bg-gray-200  hover:bg-gray-300 transition-all"
                >
                  {link.name}
                </NavLink>
              )}
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

export default AdminSidebar;
