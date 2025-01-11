import React from "react";
import { NavLink } from "react-router-dom";
import LogoImg from "../../assets/ghumnajam1.png";
import { Button } from "@material-tailwind/react"; // Import Material Tailwind Button
import Login from "../Login";
import Register from "../Register";

const ResponsiveMenu = ({ showMenu, setShowMenu }) => {
  const navItems = [
    { label: "Home", to: "/home" },
    { label: "Discover", to: "/discover" },
    { label: "Places", to: "/places" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <div
      className={`${
        showMenu ? "left-0" : "-left-[100%]"
      } fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white dark:bg-gray-800 text-black dark:text-white transition-all duration-300 ease-in-out`}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-between px-6 py-4 bg-gray-100 dark:bg-gray-700">
        <div className="text-xl font-bold text-gray-800 dark:text-white">
          <div className="flex">
            <img src={LogoImg} alt="Logo" className="h-12" />
            <h1 className="m-2">Ghumna Jam</h1>
          </div>
        </div>
        <button
          onClick={() => setShowMenu(false)}
          className="text-2xl font-bold text-gray-500 dark:text-gray-400"
        >
          &times;
        </button>
      </div>

      {/* Navbar Items */}
      <div className="mt-6 ml-6 flex flex-col space-y-6 px-6">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            className={({ isActive }) =>
              `text-lg font-medium ${
                isActive
                  ? "text-gray-500 dark:text-gray-400"
                  : "hover:text-gray-700 dark:hover:text-gray-300"
              }`
            }
            onClick={() => setShowMenu(false)} // Close menu on item click
          >
            {item.label}
          </NavLink>
        ))}
      </div>

      {/* Buttons Section */}
      <div className="flex flex-col items-center space-y-4 px-6 mt-6">
        <NavLink to="/register">
          <Button
            variant="outlined"
            size="lg"
            className="w-full rounded-full text-black border-black"
            ripple={true}
          >
            Sign Up
          </Button>
        </NavLink>
        <NavLink to="/login">
          <Button
            variant="gradient"
            size="lg"
            className="w-full rounded-full"
            ripple={true}
          >
            Login
          </Button>
        </NavLink>
      </div>

      {/* Footer Section */}
      <div className="mb-6 px-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © 2025 Ghumna Jam. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default ResponsiveMenu;
