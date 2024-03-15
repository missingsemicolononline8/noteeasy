
import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import AlertContext from '../context/Alert/AlertContext';

const Navbar = () => {
  const navigate = useNavigate();
  const setAlerts = useContext(AlertContext);
  const [userName, setUserName] = useState("");
  const API_HOST = process.env.REACT_APP_API_HOST;

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login')
    setAlerts({ type: "success", message: "Logged Out Successfully" })
  }

  useEffect(() => {

    const checkAuthToken = async () => {
      if (!localStorage.getItem('authToken')) {
        return navigate("/login")
      }
      const request = await fetch(`${API_HOST}/api/auth/getuser`, {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem('authToken'),
          "Content-Type": "application/json"
        }
      })

      if (!(request.ok)) {
        return handleLogout()
      }
      const user = await request.json();
      if (!user) {
        return handleLogout()
      }
      setUserName(user.name)
    }

    checkAuthToken()

  }, [])


  return (
    <nav className="py-2 px-4 border-b-2 flex justify-between items-center">
      <NavLink className="navbar-brand font-mono" to="/"><img src="./logo.png" className='w-48' alt={process.env.REACT_APP_NAME} /></NavLink>

      <ul className="list-none flex gap-3 items-center">
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
            <button className='w-10 h-10 rounded-full bg-slate-400 flex justify-center items-center text-white group-focus-within:pointer-events-none'>{userName[0]}</button>
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
