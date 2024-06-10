import AppProvider from "@/lib/AppContext";
import Sidebar from "@/myComponents/Sidebar";
import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

const Layout = () => {
  return (
    <AppProvider>
      <div className="flex w-full h-full bg-red-100">
        <Sidebar />
        <main className="flex-grow p-4">
          <Outlet />
        </main>
      </div>
      <Toaster/>
    </AppProvider>
  );
};

export default Layout;
