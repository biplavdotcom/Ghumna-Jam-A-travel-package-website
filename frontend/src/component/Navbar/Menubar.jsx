import React from "react";
import bed from "../../assets/pictures/bed.png";
import restro from "../../assets/pictures/restro.png";
import plane from "../../assets/pictures/airplane.png";
import packages from "../../assets/pictures/package.png";
import lens from "../../assets/pictures/lens-svgrepo-com.png";

const menuItems = [
  { label: "Hotels", icon: bed },
  { label: "Flights", icon: plane },
  { label: "Restaurants", icon: restro },
  { label: "Packages", icon: packages },
  
];

const Menubar = () => {
  return (
    <div className="flex flex-col items-center mt-8 md:mt-14 space-y-8">
      {/* Slider for Menu Items on Small Screens */}
      <div className="w-full overflow-x-auto md:overflow-visible">
        <div className="flex space-x-4 px-4 py-2 md:justify-center md:space-x-10 scrollbar-hide">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-md shadow-md hover:bg-gray-200 transition-all min-w-[120px] md:min-w-0"
            >
              <img src={item.icon} alt={item.label} className="h-6 w-6" />
              <span className="text-sm md:text-base">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Search Bar Section */}
      <form className="flex items-center border border-spacing-1 p-3 shadow-lg rounded-full w-10/12 md:w-8/12">
        <img src={lens} alt="Search" className="w-6 h-6" />
        <input
          placeholder="Places to go, hotels, flights ..."
          className="ml-3 w-full outline-none"
          type="text"
          aria-label="Search for places, hotels, or flights"
        />
      </form>
    </div>
  );
};

export default Menubar;
