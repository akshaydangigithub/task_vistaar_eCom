import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import UserSidebar from "../../components/UserSidebar";
import { useSelector } from "react-redux";

const UserLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { user } = useSelector((state) => state.user);

  // automatically close sidebar when screen size is less than 768px

  const handleWindowResize = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  };

  window.addEventListener("resize", handleWindowResize);

  return (
    <div className="flex h-screen">
      {/* User Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } transition-all shrink-0 duration-300 ease-out bg-gray-100`}
      >
        <UserSidebar />
      </div>

      {/* Content Area */}
      <div className="flex-grow overflow-y-auto">
        <div className="flex items-center justify-between px-3 h-14 border-b border-gray-300">
          <MdMenu
            className="cursor-pointer text-2xl"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          />
          <h1 className="text-md font-semibold mr-4">Hello {user?.name}</h1>
        </div>
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
