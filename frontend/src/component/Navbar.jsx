import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import LogoImg from "../assets/ghumnajam1.png";
import { Button } from "@material-tailwind/react";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import ResponsiveMenu from "../component/Navbar/ResponsiveMenu";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const toggleMenu = () => setShowMenu(!showMenu);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    dispatch(logout());
    setDropdownOpen(false); // Close dropdown on logout
  };

  return (
    <div className="sticky top-0 right-0 w-full bg-white text-black">
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <Link to="/">
            <img
              src={LogoImg}
              className="h-20 md:h-24 cursor-pointer"
              alt="logo"
            />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <ul className="flex items-center gap-8">
              {["Home", "Discover", "Places", "Contact"].map((item, index) => (
                <li key={index} className="py-2">
                  <NavLink to={`/${item.toLowerCase()}`}>
                    <Button variant="text" size="lg">
                      {item}
                    </Button>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Buttons Section */}
          <div className="hidden md:flex space-x-4">
            {!user ? ( // Check if user is logged in
              <>
                <NavLink to="/register">
                  <Button
                    variant="outlined"
                    rounded="full"
                    size="lg"
                    className="px-6 py-2"
                  >
                    Sign Up
                  </Button>
                </NavLink>
                <NavLink to="/login">
                  <Button
                    variant="gradient"
                    rounded="full"
                    size="lg"
                    className="px-6 py-2"
                  >
                    Login
                  </Button>
                </NavLink>
              </>
            ) : (
              <div className="relative flex items-center">
                <img
                  src={user.profile_picture} // Assuming user object has profilePicture
                  alt="Profile"
                  className="h-10 w-10 rounded-full mr-2"
                />
                <span className="mr-2">{user.first_name} {user.last_name}</span> {/* Assuming user object has first_name and last_name */}
                <button onClick={toggleDropdown} className="focus:outline-none">
                  ▼
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
                    <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</Link>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden block">
            {showMenu ? (
              <HiMenuAlt1
                onClick={toggleMenu}
                className="cursor-pointer transition-all"
                size={30}
                aria-label="Close menu"
              />
            ) : (
              <HiMenuAlt3
                onClick={toggleMenu}
                className="cursor-pointer transition-all"
                size={30}
                aria-label="Open menu"
              />
            )}
          </div>
        </div>
      </div>

      {/* Responsive Menu */}
      <ResponsiveMenu showMenu={showMenu} setShowMenu={setShowMenu} />
    </div>
  );
};

export default Navbar;
