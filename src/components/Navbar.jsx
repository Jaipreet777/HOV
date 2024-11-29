import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/"); // Redirect to home after logout
  };

  const handleLoginNavigation = () => {
    navigate("/login"); // Navigate to login page
    setShowDropdown(false); // Close dropdown after navigating
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img className="w-36" src={assets.logo} alt="Brand Logo" />
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="hover:text-black">
          Home
        </NavLink>
        <NavLink to="/collection" className="hover:text-black">
          Collection
        </NavLink>
        <NavLink to="/about" className="hover:text-black">
          About
        </NavLink>
        <NavLink to="/contact" className="hover:text-black">
          Contact
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        <img
          onClick={() => console.log("Search clicked")}
          className="w-5 cursor-pointer"
          src={assets.search_icon}
          alt="Search Icon"
        />
        <div className="relative">
          <img
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-5 cursor-pointer"
            src={assets.profile_icon}
            alt="Profile Icon"
          />
          {showDropdown && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-48 p-4 z-50">
              {user ? (
                <div className="flex flex-col gap-3">
                  <p className="font-medium text-gray-700">
                    Hello, {user.displayName || "User"}!
                  </p>
                  <button
                    onClick={() => console.log("Navigate to Orders")}
                    className="text-sm text-left hover:text-black"
                  >
                    Orders
                  </button>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-left hover:text-black"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleLoginNavigation}
                  className="text-sm hover:text-black"
                >
                  Login
                </button>
              )}
            </div>
          )}
        </div>
        <Link to="/cart" className="relative">
          <img className="w-5" src={assets.cart_icon} alt="Cart Icon" />
          {/* <span className="absolute right-[-5px] bottom-[-5px] bg-black text-white text-xs w-4 h-4 flex items-center justify-center rounded-full"> */}
          {/* Add dynamic cart count */}
          {/* </span> */}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
