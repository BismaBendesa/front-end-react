import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import defaultPP from "../assets/default-pp.jpg"


const Navbar = () => {
  const [username , setUsername] = useState('');
  const {logout} = useContext(AuthContext);
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false)

  const handleLogout = (e) => {
    e.preventDefault()
    logout()
    navigate("/")
  }

  const toggleDropdown = () => {
    setDropdown(prev => !prev)
  }

  useEffect(() => {
    setUsername(localStorage.getItem("username") || 'guest');
  }, [])

  return (
    <div className='wrapper w-full flex items-center justify-between '>
      <nav className='w-full max-w-[600px] flex items-center justify-between m-auto relative pt-2'>
        <h3 className='font-bold md:text-xl text-base'>TODO LIST APPLICATION 📝</h3>
        {/* dropdown */}
        <div className='flex gap-1 items-center cursor-pointer bg-white hover:bg-gray-100 p-2 rounded-full' onClick={toggleDropdown}>
          <img src={defaultPP} alt="default profile picture" className='max-w-[35px] rounded-full' />
          <p>{username}</p>
          <span className='text-xs'>▸</span>
        </div>

        {
          dropdown ? (
          <div className='dropdown py-2 shadow-md absolute top-14 right-0 bg-white border border-[#eaeaea] rounded-md'>
            <div className='py-2 px-8 w-full bg-white hover:bg-gray-100 cursor-pointer text-sm'><Link to="/profile">Profile</Link></div>
            <div className='py-2 px-8 w-full bg-white hover:bg-gray-100 cursor-pointer text-sm text-red-500' onClick={handleLogout}>Log Out</div>
          </div>
          ) : ("")
        }
      </nav>
    </div>
  )
}

export default Navbar