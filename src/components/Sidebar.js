import React from 'react';
import { MdHome, MdSettings, MdPeople, MdLogout } from 'react-icons/md';

const Sidebar = () => {
  return (
    <div className="h-screen w-16 bg-gray-950 text-white flex flex-col absolute left-0 top-0">
      <div className="flex flex-col flex-grow">
        <a href="#" className="flex flex-col justify-center items-center px-3 py-2 hover:bg-gray-700">
          <MdHome size={24} className="" />
          <span className="text-xs">Home</span>
        </a>
        <a href="#" className="flex flex-col justify-center items-center px-3 py-2 hover:bg-gray-700">
          <MdPeople size={24} className="" />
          <span className="text-xs">Profile</span>
        </a>
        <a href="#" className="flex flex-col justify-center items-center px-3 py-2 hover:bg-gray-700">
          <MdSettings size={24} className="" />
          <span className="text-xs">Settings</span>
        </a>
        <a href="#" className="flex flex-col justify-center items-center px-3 py-2 hover:bg-gray-700 mt-auto">
          <MdLogout size={24} className="" />
          <span className="text-xs">Logout</span>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;