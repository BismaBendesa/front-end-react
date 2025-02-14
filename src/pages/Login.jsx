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
    <div>
      <Navbar />
      <form action="">
        <h1 className='text-xl'>Login Page</h1>
        <input className='border border-[#cacaca] px-1 py-2 block' placeholder='Username' type="text" onChange={e => setUsername(e.target.value)} required />
        <input className='border border-[#cacaca] px-1 py-2 block'  placeholder='Password' type="password" onChange={e => setPassword(e.target.value)} required/>

        <p>Username : Admin</p>
        <p>password : adminpassword</p>
        <p>Username : User</p>
        <p>password : userpassword</p>
        <button className='px-5 bg-blue-200 block py-2' type="submit" onClick={handleLogin}>Login</button>
      </form>
    </div>
  )
}

export default Login