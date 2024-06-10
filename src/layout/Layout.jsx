import AppProvider from "@/lib/AppContext";
import Sidebar from "@/myComponents/Sidebar";
import { Menu } from "lucide-react";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

const Layout = () => {
  const [isSidebarACtive, setIsSidebarActive] = useState(false);
  console.log("isSidebarActive", isSidebarACtive);
  return (
    <AppProvider>
      <div className="w-full min-h-full bg-red-100">
        <div className="px-4 pt-4 flex  items-center justify-between md:hidden">
          <h1 className="text-3xl font-bold">Weather</h1>
          <div onClick={() => setIsSidebarActive(true)}>
            <Menu />
          </div>
        </div>
        <div className="w-full min-h-full md:flex">
          <Sidebar
            isSidebarACtive={isSidebarACtive}
            setIsSidebarActive={setIsSidebarActive}
          />
          <main className="flex-grow p-4">
            <Outlet />
          </main>
        </div>
      </div>
      <Toaster />
    </AppProvider>
  );
};

export default Layout;
