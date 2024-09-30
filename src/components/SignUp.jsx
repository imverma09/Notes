import React, { useState } from 'react';
import { Link } from 'react-router-dom';
function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-white rounded shadow-md p-4 md:p-6 lg:p-12 w-1/2 md:w-1/3 lg:w-1/4">
        <h2 className="text-3xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name*
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 pl-2 text-sm text-gray-700 border border-gray-200 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
              Phone Number*
            </label>
            <input
              type="tel"
              id="phoneNumber"
              required
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 pl-2 text-sm text-gray-700 border border-gray-200 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email*
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 pl-2 text-sm text-gray-700 border border-gray-200 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password*
            </label>
            <input
              type="password"
              id="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 pl-2 text-sm text-gray-700 border border-gray-200 rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign Up
          </button>
          <p className="text-sm text-gray-700 mt-2">
         <Link to="/login" className="text-blue-600 hover:text-blue-800">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;