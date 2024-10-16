import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import SignUp from './components/SignUp.jsx';
import Login from './components/Login.jsx';
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path :'/signUp',
        element :<SignUp/> 
    },
    {
        path : '/login' ,
        element : <Login/>
    }
])
ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
)
