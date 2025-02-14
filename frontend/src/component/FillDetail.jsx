import React, { useState } from "react";
import { useSelector } from 'react-redux';
import api from '../services/api';
import backgroundImage from '../assets/formBg.jpg'; // Add this import


const UserForm = () => {
  // Get token directly from localStorage since that's where your API expects it
  const token = localStorage.getItem('token');
  
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    email: "",
    contactNumber: "",
    address: "",
    profilePicture: null,
    preferredPaymentMethod: "",
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (!token) {
        throw new Error('Please login first');
      }

      const formDataToSend = new FormData();
      
      // Map frontend field names to backend field names
      formDataToSend.append('first_name', formData.firstName);
      formDataToSend.append('middle_name', formData.middleName);
      formDataToSend.append('last_name', formData.lastName);
      formDataToSend.append('gender', formData.gender);
      formDataToSend.append('date_of_birth', formData.dateOfBirth);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('contact_number', formData.contactNumber);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('preferred_payment_method', formData.preferredPaymentMethod);
      
      if (formData.profilePicture) {
        formDataToSend.append('profile_picture', formData.profilePicture);
      }

      // Explicitly set the Authorization header
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Token ${token}` // Make sure to use 'Token' prefix as per your API setup
        }
      };

      const response = await api.post('/customer/', formDataToSend, config);

      // Show success message
      alert('Customer details saved successfully!');
      
      // Reset form
      setFormData({
        firstName: "",
        middleName: "",
        lastName: "",
        gender: "",
        dateOfBirth: "",
        email: "",
        contactNumber: "",
        address: "",
        profilePicture: null,
        preferredPaymentMethod: "",
      });
      setPreviewImage(null);

    } catch (error) {
      console.error('Error:', error);
      if (error.response?.status === 401) {
        alert('Please login first or your session has expired');
      } else {
        alert(error.response?.data?.detail || 'Failed to save customer details');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    
    if (name === 'profilePicture' && files[0]) {
      setFormData({ ...formData, [name]: files[0] });
      setPreviewImage(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8"
    style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,

    }}>
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="px-8 py-6 bg-gradient-to-r from-gray-900 to-black">
          <h2 className="text-3xl font-bold text-white">Fill your details</h2>
          <p className="mt-2 text-blue-100">Please provide your information below</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Name Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-black">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-black placeholder-gray-400"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-black">Middle Name</label>
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                placeholder="Middle Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-black placeholder-gray-400"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-black">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-black placeholder-gray-400"
              />
            </div>
          </div>

          {/* Gender and DOB Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-black">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-black"
              >
                <option value="" className="text-gray-400">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-black">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-black"
              />
            </div>
          </div>

          {/* Profile Picture Section */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-black">Profile Picture</label>
            <div className="flex items-center space-x-6">
              <div className="flex-1">
                <input
                  type="file"
                  name="profilePicture"
                  onChange={handleChange}
                  accept="image/*"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-black placeholder-gray-400"
                />
              </div>
              {previewImage && (
                <div className="flex-shrink-0">
                  <img
                    src={previewImage}
                    alt="Profile Preview"
                    className="w-24 h-24 object-cover rounded-full ring-4 ring-blue-100"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Payment Method Section */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-black">Preferred Payment Method</label>
            <select
              name="preferredPaymentMethod"
              value={formData.preferredPaymentMethod}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-black"
            >
              <option value="" className="text-gray-400">Select Payment Method</option>
              <option value="credit_card">Credit Card</option>
              <option value="debit_card">Debit Card</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="cash">Cash</option>
            </select>
          </div>

          {/* Contact Details Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-black border-b pb-2">Contact Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-black placeholder-gray-400"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black">Contact Number</label>
                <input
                  type="text"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="Contact Number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-black placeholder-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-black">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your full address"
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-black placeholder-gray-400"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-gradient-to-r from-gray-900 to-black text-white font-semibold py-3 px-4 rounded-lg hover:from-gray-700 hover:to-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg shadow-md ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Submit'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
