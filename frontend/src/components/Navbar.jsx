import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

import MainLogo from "../assets/mainlogo.svg";

const LoggedInNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full px-6 pt-6 pb-4 sm:px-8 sm:pt-8 sm:pb-5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link
            to="/user"
            className="text-purple-600 font-medium hover:underline"
          >
            <img
              src={MainLogo}
              alt="DeepRead AI Logo"
              className="h-6 w-auto sm:h-8"
            />
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden sm:flex items-center space-x-6 text-sm font-medium text-gray-700">
          <NavLink
            to="/user"
            end
            className={({ isActive }) =>
              `hover:text-purple-700 transition ${
                isActive ? "text-purple-700 font-semibold" : ""
              }`
            }
          >
            Analyze
          </NavLink>

          <NavLink
            to="/user/history"
            className={({ isActive }) =>
              `hover:text-purple-700 transition ${
                isActive ? "text-purple-700 font-semibold" : ""
              }`
            }
          >
            History
          </NavLink>
          <NavLink
            to="/user/profile"
            className={({ isActive }) =>
              `hover:text-purple-700 transition ${
                isActive ? "text-purple-700 font-semibold" : ""
              }`
            }
          >
            Profile
          </NavLink>
        </div>

        {/* Mobile Hamburger */}
        <div className="sm:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-purple-700 focus:outline-none"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden mt-4 absolute left-0 right-0 w-full z-50">
          <div className="bg-gradient-to-br from-white to-purple-50 shadow-xs rounded-b-md p-5 mx-4 space-y-4 border border-gray-200">
            <NavLink
              to="/user"
              end
              className="block text-sm text-purple-700 hover:underline"
              onClick={() => setMenuOpen(false)}
            >
              Analyze
            </NavLink>
            <NavLink
              to="/user/history"
              className="block text-sm text-purple-700 hover:underline"
              onClick={() => setMenuOpen(false)}
            >
              History
            </NavLink>
            <NavLink
              to="/user/profile"
              className="block text-sm text-purple-700 hover:underline"
              onClick={() => setMenuOpen(false)}
            >
              Profile
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default LoggedInNavbar;
