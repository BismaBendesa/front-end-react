import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'


const Navbar = () => {
  const [username , setUsername] = useState('');
  const {logout} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault()
    logout()
    navigate("/")
  }

  useEffect(() => {
    setUsername(localStorage.getItem("username") || 'guest');
  }, [])

  return (
    <div className='w-full flex align-center justify-between'>
      <h3>CRUD APPLICATION</h3>
      <p>Username = {username}</p>
      {username === 'guest' ? <Link to="/">Login</Link> : <button className='cursor-pointer font-bold bg-red-200 p-2'  onClick={handleLogout}>Logout</button>}
    </div>
  )
}

export default Navbar