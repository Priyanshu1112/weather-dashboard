import Header from "@/myComponents/Header";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="w-full h-full pt-5">
      <Header />{children}
    </div>
  );
};

export default DashboardLayout;
