import { SettingsIcon } from "lucide-react";
import React from "react";

const Settings = () => {
  return (
    <div className="w-full h-full flex items-center justify-center gap-3 text-3xl font-medium">
      <SettingsIcon size={25} /> Settings
    </div>
  );
};

export default Settings;
