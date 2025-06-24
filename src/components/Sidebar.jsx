import React from "react";
import { FaTimes, FaUser, FaCog, FaRegLightbulb } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaFileContract } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden transition-opacity ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <nav
        className={`bg-gradient-to-b from-indigo-100 to-cyan-100 text-indigo-900 w-64 p-4 space-y-6 fixed top-[100px] left-0 h-min-screen z-40 transform transition-transform duration-300 ease-in-out 
          md:relative md:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between md:block">
          <div className="text-4xl font-bold mb-4 md:mb-8">
            <Link to="/" onClick={onClose}>
              Menu
            </Link>
          </div>
          <button
            className="md:hidden text-indigo-900"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <ul className="space-y-4">
          <li>
            <Link
              to="/lead-list"
              className="flex items-center text-2xl hover:border-b-blue-400 hover:border-b-2 gap-3 hover:text-indigo-600 transition-colors"
              onClick={onClose}
            >
              <FaRegLightbulb />
              Lead
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="flex items-center gap-3 hover:text-indigo-600 transition-colors text-2xl hover:border-b-blue-400 hover:border-b-2"
              onClick={onClose}
            >
              <FaMoneyBillTrendUp />
              Sales
            </Link>
          </li>
          <li>
            <Link
              to="/agent"
              className="flex items-center gap-3 hover:text-indigo-600 transition-colors text-2xl hover:border-b-blue-400 hover:border-b-2"
              onClick={onClose}
            >
              <FaUser />
              Agents
            </Link>
          </li>
          <li>
            <Link
              to="/report"
              className="flex items-center gap-3 hover:text-indigo-600 transition-colors text-2xl hover:border-b-blue-400 hover:border-b-2"
              onClick={onClose}
            >
              <FaFileContract />
              Report
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="flex items-center gap-3 hover:text-indigo-600 transition-colors text-2xl hover:border-b-blue-400 hover:border-b-2"
              onClick={onClose}
            >
              <FaCog />
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
