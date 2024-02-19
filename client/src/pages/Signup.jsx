import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AlertContext from '../context/Alert/AlertContext'


const Signup = () => {
  const [user, setUser] = useState({ name: "", password: "", email: "", cpassword: "" })
  const setAlerts = useContext(AlertContext);
  let navigate = useNavigate();
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {

    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        password: user.password
      }),
    });

    const json = await response.json();
    if (response.status === 200) {
      localStorage.setItem("authToken", json.authtoken)
      navigate("/")
      setAlerts({ type: "success", message: "Account Created" })
    }



  }
  return (
    <div className='flex justify-center items-center w-full h-screen bg-gray-500'>
      <div id="form-wrapper" className="bg-white rounded-lg w-[340px] p-6">
        <h1 className='text-center text-3xl font-bold'>Sign Up</h1>
        <p className="text-center mt-3 font-medium text-gray-500 text-md leading-6">
          Enter your information to create an account
        </p>
        <form className='mt-4' onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 mt-2 mb-1">
            <label htmlFor="name" className="text-base font-bold">Name</label>
            <input type="text" className="outline-none rounded-lg border-2 py-2 px-3 border-gray-200" id="name" name="name" placeholder='John Doe' onChange={onChange} />
          </div>
          <div className="form-group flex flex-col gap-2 mt-3 mb-1">
            <label htmlFor="email" className="text-base font-bold">Email address</label>
            <input type="email" className="outline-none rounded-lg border-2 py-2 px-3 border-gray-200" id="email" name='email' aria-describedby="emailHelp" placeholder='johndoe@example.com' onChange={onChange} />
          </div>
          <div className="form-group flex flex-col gap-2 mt-3 mb-1">
            <label htmlFor="password" className="text-base font-bold">Password</label>
            <input type="password" className="outline-none rounded-lg border-2 py-2 px-3 border-gray-200" id="password" name="password" placeholder='*********' onChange={onChange} />
          </div>
          <div className="flex flex-col gap-2 mt-3 mb-3">
            <label htmlFor="cpassword" className="text-base font-bold">Confirm Password</label>
            <input type="password" className="outline-none rounded-lg border-2 py-2 px-3 border-gray-200" id="cpassword" name="cpassword" placeholder='*********' onChange={onChange} />
          </div>
          <button disabled={user.name.length === 0 || user.email.length === 0 || user.password.length < 6 || user.password !== user.cpassword} type="submit" className="bg-black disabled:opacity-55 w-full rounded-md text-white text-base py-2 text-center">Submit</button>
        </form>
        <p className="text-center mt-3 font-medium">Already have an account? <ins><Link to="/login">Login</Link></ins></p>
      </div>
    </div>

  )
}

export default Signup