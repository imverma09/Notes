import React, { useState ,} from 'react';
import { Link , useNavigate } from 'react-router-dom';

function Login() {
 const [loginData , setLoginData] = useState({email : "", password : "" })
 const [rememberMe , setRememberMe] = useState(false)
 const navigate = useNavigate()
  const handleSubmit = (e) => {
    loginData.rememberMe =rememberMe
    e.preventDefault();
    fetch('http://localhost:4000/login',{
      method : "POST",
      body : JSON.stringify(loginData),
      headers : {
        "Content-Type" : "application/json"
      } ,
      credentials : 'include'
    })
    .then(res => {
     if (res.ok){
     console.log('object')
      navigate('/')
     }
    })
    .then(data => console.log(data))
    .catch(err => console.log(err))
  };
function handleInput(e){
  const {id, value} =  e.target
  setLoginData({...loginData , [id] : value})
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
              value={ loginData.password}
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
              onChange={()=> setRememberMe(!rememberMe)}
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