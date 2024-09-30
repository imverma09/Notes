import React, { useState } from 'react';
import { Link } from 'react-router-dom';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Login submitted:', email, password, rememberMe);
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-4 bg-white rounded shadow-md">
        <h2 className="text-3xl font-bold mb-4">Welcome back!</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            <span className="text-gray-700">Email*</span>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full p-2 pl-2 text-sm text-gray-700 border border-gray-300 rounded"
              placeholder="example@example.com"
            />
          </label>
          <label className="block mb-2">
            <span className="text-gray-700">Password*</span>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full p-2 pl-2 text-sm text-gray-700 border border-gray-300 rounded"
              placeholder="Password"
            />
          </label>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="mr-2"
            />
            <span className="text-gray-700">Remember me</span>
          </div>
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Login
          </button>
          <p className="text-sm text-gray-700 mt-2">
            Don't have an account? <Link to="/signUp" className="text-blue-600 hover:text-blue-800">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;