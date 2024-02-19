
import React, { useContext } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import AlertContext from '../context/Alert/AlertContext';



const Navbar = () => {
  const navigate = useNavigate();
  const setAlerts = useContext(AlertContext);
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login')
    setAlerts({ type: "success", message: "Logged Out Successfully" })
  }


  return (
    <nav className="py-2 px-4 border-b-2 flex justify-between items-center h-14">
      <NavLink className="navbar-brand font-mono" to="/">{process.env.REACT_APP_NAME}</NavLink>

      <ul className="list-none flex gap-3 items-center">
        <li className="nav-item pr-3">
          <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="about">About</NavLink>
        </li>


        {!localStorage.getItem("authToken") ?

          <>
            <li className="nav-item">
              <NavLink className="btn btn-primary mx-2" to="/signup" type="submit">Signup</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="btn btn-primary" to="/login" type="submit">Login</NavLink>
            </li>
          </>
          :
          <li className="group nav-items">
            <button className='w-10 h-10 rounded-full bg-slate-400 flex justify-center items-center text-white group-focus-within:pointer-events-none'>U</button>
            <div className="user-dropdown absolute top-12 right-4 rounded-xl shadow-md w-36 overflow-clip">
              <button className="btn hidden group-focus-within:block bg-white hover:bg-blue-500 hover:text-white p-3 w-full text-left" onClick={handleLogout}>Logout</button>
            </div>

          </li>
        }
      </ul>
    </nav>
  )
}

export default Navbar;
