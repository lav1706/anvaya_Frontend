import React from "react";
import { FaBars } from "react-icons/fa";

const Navbar = ({ onMenuClick }) => {
  return (
    <div className="min-h-[100px] w-full flex justify-between items-center px-4 bg-gradient-to-r from-indigo-400 to-cyan-400 text-white fixed top-0 left-0 right-0 z-50">
      <div>
        <h1 className="text-5xl font-bold">Anvaya</h1>
      </div>
      <div className="flex items-center gap-4">
        <h2 className="text-3xl font-bold hidden md:block">
          Make Sales Easy...
        </h2>
        {/* Hamburger menu button only visible on mobile */}
        <button
          className="md:hidden p-2 rounded hover:bg-white hover:bg-opacity-20 transition"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <FaBars size={28} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
