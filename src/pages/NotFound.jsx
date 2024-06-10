import { Undo2 } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-secondary gap-4">
      <p className="text-3xl font-medium">404 | Page Not Found</p>
      <Link
        to={"/"}
        className="font-semibold flex gap-3 text-lg items-center border-b-2 border-gray-400 px-1"
      >
        <Undo2 size={20} />
        Return
      </Link>
    </div>
  );
};

export default NotFound;
