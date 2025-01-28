import React, { useState } from "react";

const Flights = () => {
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    departureDate: "",
    returnDate: "",
    travelers: 1, // Default number of travelers
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Flight search submitted!");
    // Handle form submission logic here
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Find Flights</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* "From", "To", and "Number of Travelers" in one row for PC, single for mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Origin */}
          <div>
            <label htmlFor="origin" className="block text-sm font-medium">
              From
            </label>
            <input
              type="text"
              id="origin"
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              placeholder="Departure city"
              className="mt-2 p-3 w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Destination */}
          <div>
            <label htmlFor="destination" className="block text-sm font-medium">
              To
            </label>
            <input
              type="text"
              id="destination"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="Destination city"
              className="mt-2 p-3 w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Number of Travelers */}
          <div>
            <label htmlFor="travelers" className="block text-sm font-medium">
              Number of Travelers
            </label>
            <input
              type="number"
              id="travelers"
              name="travelers"
              value={formData.travelers}
              onChange={handleChange}
              min="1"
              className="mt-2 p-3 w-full border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* "Departure Date" and "Return Date" in one row for PC, single for mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Departure Date */}
          <div>
            <label htmlFor="departureDate" className="block text-sm font-medium">
              Departure Date
            </label>
            <input
              type="date"
              id="departureDate"
              name="departureDate"
              value={formData.departureDate}
              onChange={handleChange}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Return Date */}
          <div>
            <label htmlFor="returnDate" className="block text-sm font-medium">
              Return Date (optional)
            </label>
            <input
              type="date"
              id="returnDate"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleChange}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-4 text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-black text-white rounded-md w-full hover:shadow-lg"
          >
            Search Flights
          </button>
        </div>
      </form>
    </div>
  );
};

export default Flights;
