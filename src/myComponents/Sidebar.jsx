// src/layouts/Sidebar.jsx
import { cn } from "@/lib/utils";
import { FileText, Layout, SettingsIcon, Users, X } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const menus = [
  {
    name: "Dashboard",
    path: "/",
    icon: <Layout size={20} />,
  },
  {
    name: "Connect",
    path: "/connect",
    icon: <Users size={20} />,
  },
  { name: "Report", path: "/report", icon: <FileText size={20} /> },
  { name: "Settings", path: "/settings", icon: <SettingsIcon size={20} /> },
];

const Sidebar = ({ isSidebarACtive, setIsSidebarActive }) => {
  const { pathname } = useLocation();
  return (
    <nav
      className={`${
        isSidebarACtive
          ? "translate-x-[0%] md:translate-x-0"
          : "translate-x-[-100%] md:translate-x-0"
      } md:w-64 bg-primary text-white p-4 md:rounded-se-[35px] z-20 fixed h-full md:h-screen w-full top-0 md:sticky`}
    >
      <div className="flex items-start justify-between">
        <h1 className="text-3xl font-bold md:text-center mb-5">Weather</h1>
        <div
          className="mt-3 md:hidden"
          onClick={() => setIsSidebarActive(false)}
        >
          <X />
        </div>
      </div>
      <ul className="flex flex-col gap-y-3 font-semibold">
        {menus.map((menu) => (
          <Link
            key={menu.name}
            to={menu.path}
            className={cn(
              "flex items-center gap-x-3 cursor-pointer transition-colors duration-300",
              pathname == menu.path && "text-primary"
            )}
          >
            {menu.icon}
            {menu.name}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
