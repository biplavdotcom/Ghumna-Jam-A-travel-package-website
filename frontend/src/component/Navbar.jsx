import { React, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import LogoImg from "../assets/ghumnajam1.png";
import { Button } from "@material-tailwind/react";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import ResponsiveMenu from "../component/Navbar/ResponsiveMenu";
const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <div className="sticky top-0 right-0 w-full bg-white text-black ">
        <div className="container py-3  sm:py-0 ">
          <div className="flex justify-between md:justify-center items-center space-x-8 sm:space-x-12 md:space-x-20">
            {/* Logo Section */}
            <div>
              <Link to="/">
                <img
                  src={LogoImg}
                  className="h-20 md:mr-12 md:h-24"
                  alt="logo"
                />
              </Link>
            </div>

            {/* Navigation Links (hidden in sm screens) */}
            <div className="hidden md:block">
              <ul className="flex items-center gap-4 sm:gap-6 md:gap-8">
                <li className="py-4">
                  <NavLink to="/">
                    <Button variant="text">Home</Button>
                  </NavLink>
                </li>
                <li className="py-4">
                  <NavLink to="/blogs">
                    <Button variant="text">Discover</Button>
                  </NavLink>
                </li>
                <li className="py-4">
                  <NavLink to="/places">
                    <Button variant="text">Places</Button>
                  </NavLink>
                </li>
                <li className="py-4">
                  <NavLink to="/contact">
                    <Button variant="text">Contact</Button>
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* Buttons and Mobile Menu */}
            <div className="flex items-center space-x-4 sm:space-x-6 md:space-x-8">
              {/* Register and Sign Up Buttons */}
              <div className="flex justify-between space-x-2 sm:space-x-4 md:space-x-6 ">
                <Button
                  variant="outlined"
                  rounded="full"
                  className="hidden md:flex p-2 sm:text-md sm:p-4"
                >
                  Register
                </Button>
                <Button
                  variant="gradient"
                  rounded="full"
                  className="hidden md:flex p-2 sm:text-md sm:p-4"
                >
                  Sign Up
                </Button>
              </div>

              {/* Mobile Menu Icon */}
              <div className="md:hidden block">
                {showMenu ? (
                  <HiMenuAlt1
                    onClick={toggleMenu}
                    className="cursor-pointer transition-all"
                    size={30}
                  />
                ) : (
                  <HiMenuAlt3
                    onClick={toggleMenu}
                    className="cursor-pointer transition-all"
                    size={30}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <ResponsiveMenu showMenu={showMenu} setShowMenu={setShowMenu} />
      </div>
    </>
  );
};
export default Navbar;
