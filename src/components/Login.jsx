import React, { useState, } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
   const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [rememberMe, setRememberMe] = useState(false)
  const navigate = useNavigate()
    // let BACKEND_API = "http://localhost:4000"
  let BACKEND_API = "https://notes-2-x7kd.onrender.com"
  const handleSubmit =  async(e) => {
    loginData.rememberMe = rememberMe
    e.preventDefault();
    try {   
      setLoading(true)
     const res = await fetch(`${BACKEND_API}/login`, {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include'
      })
      const user = await res.json()
      if(res.ok) {
       localStorage.setItem("myID",user._id )
       navigate('/')
      }else{
      alert(user?.error);
      }
    } catch(err){
      console.log(err) ;
    }finally{
      setLoading(false)
    }
  };
  function handleInput(e) {
    const { id, value } = e.target
    setLoginData({ ...loginData, [id]: value })
  }

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-4 bg-white rounded shadow-md">
        <h2 className="text-3xl font-bold mb-4">Welcome back!</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            <span className="text-gray-700">Email*</span>
            <input
              type="email"
              value={loginData.email}
              required
              id="email"
              onChange={handleInput}
              className="block w-full p-2 pl-2 text-sm text-gray-700 border border-gray-300 rounded"
              placeholder="example@example.com"
            />
          </label>
          <label className="block mb-2">
            <span className="text-gray-700">Password*</span>
            <input
              type="password"
              value={loginData.password}
              required
              onChange={handleInput}
              id='password'
              className="block w-full p-2 pl-2 text-sm text-gray-700 border border-gray-300 rounded"
              placeholder="Password"
            />
          </label>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id='rememberMe'
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="mr-2"
            />
            <span className="text-gray-700">Remember me</span>
          </div>
          <button
      type="submit"
     
      disabled={loading}
      className="flex justify-center items-center gap-1 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded w-full active:scale-95 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {loading ? (
        <>
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          Loading...
        </>
      ) : (
        "Login"
      )}
    </button>
          {/* <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Login
          </button> */}
          <p className="text-sm text-gray-700 mt-2">
            Don't have an account? <Link to="/signUp" className="text-blue-600 hover:text-blue-800">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;