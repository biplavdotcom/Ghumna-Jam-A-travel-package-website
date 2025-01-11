import { React, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import LogoImg from "../assets/ghumnajam1.png";
import { Button } from "@material-tailwind/react";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import ResponsiveMenu from "../component/Navbar/ResponsiveMenu";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <div className="sticky top-0 right-0 w-full bg-white text-black ">
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <Link to="/home" className="flex-shrink-0">
            <img src={LogoImg} className="h-20 md:h-24" alt="logo" />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <ul className="flex items-center gap-8">
              {["Home", "Discover", "Places", "Contact"].map((item, index) => (
                <li key={index} className="py-2 ">
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
            <NavLink to="/Register">
              <Button
                variant="outlined"
                rounded="full"
                size="lg"
                className="px-6 py-2"
              >
                Sign Up
              </Button>
            </NavLink>
            <NavLink to="/Login">
              <Button
                variant="gradient"
                rounded="full"
                size="lg"
                className="px-6 py-2"
              >
                Login
              </Button>
            </NavLink>
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
