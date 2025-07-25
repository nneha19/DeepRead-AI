import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

import MainLogo from "../../assets/mainlogo.svg";

const LandingNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full px-6 pt-6 pb-4 sm:px-8 sm:pt-8 sm:pb-5 ">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
           <Link to="/" className="text-purple-600 font-medium hover:underline">
         <img
            src={MainLogo}
            alt="DeepRead AI Logo"
            className="h-6 w-auto sm:h-8"
          />
      </Link>
        
        </div>

        {/* Desktop Links */}
        <div className="hidden sm:flex items-center space-x-4">
          <NavLink
            to="/login"
            className="text-sm text-purple-700 hover:underline"
          >
            Log In
          </NavLink>
          <NavLink
            to="/signup"
            className="bg-purple-700 text-white px-4 py-2 text-sm rounded-full hover:bg-purple-800 transition duration-200"
          >
            Sign Up
          </NavLink>
        </div>

        {/* Hamburger */}
        <div className="sm:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-purple-700 focus:outline-none"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="sm:hidden mt-4 absolute left-0 right-0 w-full z-50">
          <div className="bg-gradient-to-br from-white to-purple-50 shadow-xs rounded-b-md p-5 mx-4 space-y-4 border border-gray-200">
            <NavLink
              to="/login"
              className="block text-sm text-purple-700 hover:underline"
              onClick={() => setMenuOpen(false)}
            >
              Log In
            </NavLink>
            <NavLink
              to="/signup"
              className="block bg-purple-700 text-white px-4 py-2 text-sm rounded-md hover:bg-purple-800 transition duration-200"
              onClick={() => setMenuOpen(false)}
            >
              Sign Up
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default LandingNav;
