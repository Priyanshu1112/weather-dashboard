// src/layouts/Sidebar.jsx
import { cn } from "@/lib/utils";
import { FileText, Layout, SettingsIcon, Users } from "lucide-react";
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

const Sidebar = () => {
  const { pathname } = useLocation();
  return (
    <nav className="w-64 bg-primary text-white p-4 rounded-se-[35px]">
      <h1 className="text-3xl font-bold text-center mb-5">Weather</h1>
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
