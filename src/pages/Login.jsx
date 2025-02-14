import React, { useContext, useState } from 'react'
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Login = () => {
  // credentials user
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {login} = useContext(AuthContext);
  const navigate = useNavigate();

  // handlelogin function
  const handleLogin = (e) => {
    // prevent from refreshing page
    e.preventDefault();

    // Static Login
    if (username === "Admin" && password === "adminpassword" || username === "User" && password === "userpassword"){
      login('fake-jwt-token', username)
      navigate("/home")
    } else {
      alert("Invalid Credentials!")
    }
  };

  return (
    <div className="wrapper bg-orange-50 w-screen h-screen pt-16">
      <div className='mx-auto pt-8 bg-white w-full max-w-[600px] flex flex-col items-center justify-center p-8'>
        {/* <Navbar /> */}
        <h1 className='text-xl font-bold text-center'>Login Page</h1>
        <p className='mt-2 text-gray-500 text-sm'>A simple todo list up using react.js</p>

        <form action="" className='px-auto mt-4 w-full'>
          <div className='flex flex-col gap-2'>
            <input className='border border-[#dadada] px-4 py-2 block w-full rounded-md' placeholder='Username' type="text" onChange={e => setUsername(e.target.value)} required />
            <input className='border border-[#dadada] px-4 py-2 block w-full rounded-md'  placeholder='Password' type="password" onChange={e => setPassword(e.target.value)} required/>
          </div>

          <button className='px-5 bg-blue-600 block py-2 w-full mt-6 rounded-sm text-blue-50 font-bold cursor-pointer' type="submit" onClick={handleLogin}>Login</button>
          <div className='flex gap-10 mt-8 justify-center'>
            <div>
              <p>👤: Admin</p>
              <p>🔑 : adminpassword</p>
            </div>
            <div>
              <p>👤 : User</p>
              <p>🔑 : userpassword</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login