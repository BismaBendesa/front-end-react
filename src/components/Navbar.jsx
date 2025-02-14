import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import defaultPP from "../assets/default-pp.jpg"


const Navbar = () => {
  const [username , setUsername] = useState('');
  const [name , setName] = useState(username);
  const {logout} = useContext(AuthContext);
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false)
  // overlay Profile
  const [overlayProfile, setOverlayProfile] = useState(false)

  const handleLogout = (e) => {
    e.preventDefault()
    logout()
    navigate("/")
  }

  const toggleDropdown = () => {
    setDropdown(prev => !prev)
  }

  // Overlay Profile
    const toggleOverlayProfile = () => {
      setOverlayProfile(prevOverlayProfile => !prevOverlayProfile)
    }
  
  // Overlay Profile
  const updateUsername = () => {
    localStorage.setItem('username', name)
    setUsername(name)
    setDropdown(prev => !prev)
    setOverlayProfile(prev => !prev)
  }

  useEffect(() => {
    setUsername(localStorage.getItem("username") || 'guest');
    setName(localStorage.getItem("username") || 'guest');
  }, [])

  return (
    <div className='wrapper w-full flex items-center justify-between'>
      <nav className='w-full max-w-[600px] flex items-center justify-between m-auto relative pt-2 px-8 md:px-0'>
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
            <div className='py-2 px-8 w-full bg-white hover:bg-gray-100 cursor-pointer text-sm' onClick={toggleOverlayProfile}>Profile</div>
            <div className='py-2 px-8 w-full bg-white hover:bg-gray-100 cursor-pointer text-sm text-red-500' onClick={handleLogout}>Log Out</div>
          </div>
          ) : ("")
        }
      </nav>

      { 
        overlayProfile && ( 
        <div className='overlay-wrapper fixed inset-0 bg-neutral-900/65' onClick={toggleOverlayProfile}>
          <div className="add-task-overlay w-full max-w-[400px] p-8 flex flex-col gap-4 bg-white border border-[#dadada] rounded-md mx-auto shadow-lg mt-12" onClick={(e) => e.stopPropagation()}> 
            <div className='flex justify-between items-center'>
              <h2 className='font-bold md:text-xl text-base'>Edit Username</h2>
              <span className='text-2xl px-2 text-red-500 cursor-pointer hover:bg-red-200' onClick={toggleOverlayProfile}>x</span>
            </div>
            <hr />
            <input type="text" placeholder='Edit Username' value={name} className='w-full rounded-md border border-[#dadada] py-1.5 px-4 md:text-base text-sm' onChange={e => setName(e.target.value)} />
            <button type='submit' className='bg-blue-600 font-bold text-blue-50 cursor-pointer w-full p-2 rounded-full shadow-md hover:bg-blue-400 hover:text-blue-50' onClick={updateUsername}>Confirm</button>
          </div>
        </div>
        )
      }
    </div>
  )
}

export default Navbar