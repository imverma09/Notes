import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    password: '',
  });
  const [visibility , setVisibility] = useState(true)
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://notes-2-x7kd.onrender.com/sign',{
      method : "POST",
      body : JSON.stringify(formData),
      headers : {
        "Content-Type" : "application/json"
       },
       credentials : 'include' 
    })
    .then(res =>{
       const user =  res.json()
     if(res.ok) {
      localStorage.setItem("myID",user._id )
      navigate('/')
     }  
     return user
    })
    .then(data => console.log(data))
    .catch(err => console.log(err))
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (    
    <div className="bg-gray-50 p-8 rounded-lg shadow-md w-96 show ">
        <h1 className="text-2xl font-bold text-center mb-4">Create Account</h1>
        <p className="text-center mb-6">Already have an account? <Link to={'/login'} className="text-blue-500">Sign In</Link></p>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <input type="text" id='name'required placeholder="Name" onChange={handleChange} value={formData.name} className="w-full p-3 border border-gray-300 rounded-md" />
            </div>
            <div className="mb-4">
                <input type="email" id='email' required placeholder="Email" onChange={handleChange} value={formData.email} className="w-full p-3 border border-gray-300 rounded-md" />
            </div>
            <div className="mb-4">
                <input type="text" id='phoneNumber' required placeholder="Phone Number" onChange={handleChange} value={formData.phoneNumber} className="w-full p-3 border border-gray-300 rounded-md" />
            </div>
            <div className="mb-4 relative">
                <span className="material-symbols-outlined cursor-pointer absolute right-2 top-3" onClick={()=> setVisibility(!visibility)}> {visibility ? "visibility" : "visibility_off" }</span>
                <input type={visibility ? "password" : "text"} id='password' required placeholder="Password" onChange={handleChange} value={formData.password} className="w-full p-3 border border-gray-300 rounded-md" />
            </div>
            <div className="mb-4">
                <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-md">Sign Up</button>
            </div>
            {/* <div className="flex items-center">
                <input type="checkbox" id="terms" className="mr-2" />
                <label htmlFor="terms" className="text-sm">I have read and agree to the <a href="#" className="text-blue-500">Terms of Service</a></label>
            </div> */}
        </form>
    </div>
);
}

export default SignUp;