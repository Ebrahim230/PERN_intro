import React, { useContext, useEffect, useRef, useState } from 'react';
import { MallContext } from '../context/MallContext';
import { Link, NavLink } from 'react-router-dom';
import { FaSearch, FaUser, FaShoppingCart, FaBars } from 'react-icons/fa'

const NavBar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [dropdown, setDropDown] = useState(false);
  const dropdownRef = useRef();
  const { setShowSearch, getCartCount, token, navigate, logoutUser } = useContext(MallContext);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropDown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return (
      () => {
        document.removeEventListener('mousedown', handleClickOutside);
      }
    )
  }, [])
  return (
    <div className='flex items-center justify-between py-3 font-medium relative px-0 sm:px-3'>
      <Link to='/' className='text-4xl text-indigo-800 font-bold'>EbMart</Link>
      {/* --------Desktop Menu---------- */}
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to='/' className='flex flex-col text-center gap-1 hover:text-indigo-600 font-bold text-md'>HOME</NavLink>
        <NavLink to='/collection' className='flex flex-col text-center gap-1 hover:text-indigo-600 font-bold text-md'>COLLECTION</NavLink>
        <NavLink to='/about' className='flex flex-col text-center gap-1 hover:text-indigo-600 font-bold text-md'>ABOUT</NavLink>
        <NavLink to='/contact' className='flex flex-col text-center gap-1 hover:text-indigo-600 font-bold text-md'>CONTACT</NavLink>
      </ul>
      {/* -------Right Icons-------- */}
      <div className="flex items-center gap-4 text-gray-700">
        <FaSearch
          onClick={() => setShowSearch(true)}
          className="w-5 h-5 cursor-pointer hover:text-indigo-600 transition-colors duration-200"
        />
        <div
          className="relative cursor-pointer hover:text-indigo-600 transition-colors duration-200"
          ref={dropdownRef}
          onMouseEnter={() => setDropDown(true)}
        >
          <FaUser
            className="w-5 h-5 cursor-pointer"
            onClick={() => {
              if (token) {
                setDropDown((prev) => !prev);
              } else {
                navigate('/login');
              }
            }}
          />
          {/* Optional dropdown menu */}
          {dropdown && token && (
            <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md p-2 text-sm text-gray-700">
              <button onClick={() => navigate('/profile')} className="block w-full text-left hover:text-indigo-600">
                My Profile
              </button>
              <button onClick={() => navigate('/orders')} className="block w-full text-left hover:text-indigo-600">
                Orders
              </button>
              <button onClick={logoutUser} className="block w-full text-left hover:text-indigo-600">
                Logout
              </button>
            </div>
          )}
        </div>
        <div className="relative cursor-pointer text-gray-700 hover:text-indigo-600 transition-colors duration-200">
          <FaShoppingCart
            className="w-6 h-6 sm:w-5 sm:h-5"
            onClick={() => {
              if (token) {
                navigate('/cart');
              } else {
                navigate('/login');
              }
            }}
          />
          <span
            className="absolute bottom-0 right-0 transform translate-x-1/3 translate-y-1/3 bg-indigo-600 text-white text-[10px] sm:text-[9px] font-semibold rounded-full min-w-[16px] h-[16px] flex items-center justify-center leading-none"
          >
            {getCartCount()}
          </span>
        </div>
        <FaBars
          className="w-6 h-6 sm:hidden cursor-pointer text-gray-700 hover:text-indigo-600 transition-colors duration-200"
          onClick={() => setMobileMenu((prev) => !prev)}
        />
      </div>
      {mobileMenu && (
        <ul className="sm:hidden absolute top-full left-0 w-full bg-white shadow-lg flex flex-col text-gray-700 z-40">
          <NavLink to="/" onClick={() => setMobileMenu(false)} className="block px-4 py-2 hover:text-indigo-600">HOME</NavLink>
          <NavLink to="/collection" onClick={() => setMobileMenu(false)} className="block px-4 py-2 hover:text-indigo-600">COLLECTION</NavLink>
          <NavLink to="/about" onClick={() => setMobileMenu(false)} className="block px-4 py-2 hover:text-indigo-600">ABOUT</NavLink>
          <NavLink to="/contact" onClick={() => setMobileMenu(false)} className="block px-4 py-2 hover:text-indigo-600">CONTACT</NavLink>
        </ul>
      )}
    </div>
  )
}

export default NavBar;