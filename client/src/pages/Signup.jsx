import React, { useContext, useEffect, useReducer, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AlertContext from '../context/Alert/AlertContext'

const signUp = async ({ name, password, email }) => {
  const API_HOST = process.env.REACT_APP_API_HOST;
  const response = await fetch(`${API_HOST}/api/auth/createuser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      email,
      password
    }),
  });
  const data = await response.json();
  if (response.status !== 200) {
    throw new Error(JSON.stringify(data.message));
  }
  return data;
}

const signupReducer = (state, action) => {
  if (action.type === "input") {
    return {
      ...state,
      [action.name]: action.value
    }
  }

  else if (action.type === "submit") {
    return {
      ...state,
      err: null,
      submitting: true
    }
  }

  else if (action.type === "success") {
    localStorage.setItem("authToken", action.payload.response.authtoken)
    return {
      ...state,
      success: true
    }
  }

  else if (action.type === "error") {
    return {
      ...state,
      submitting: false,
      err: action.error
    }
  }
  else return state
}

const Signup = () => {
  const setAlerts = useContext(AlertContext);
  let navigate = useNavigate();

  const [{ name, password, email, cpassword, submitting, err, success }, dispatch] = useReducer(signupReducer, {
    name: "",
    password: "",
    email: "",
    cpassword: "",
    submitting: false,
    err: null,
    success: false
  })


  const handleSubmit = async (e) => {

    e.preventDefault();
    dispatch({ type: "submit" })

    try {
      const response = await signUp({ name, password, email })
      dispatch({ type: "success", payload: { response } })
    }
    catch (e) {
      dispatch({ type: "error", error: e.message });
    }

  }

  useEffect(() => {
    if (success) {
      setAlerts({ type: "success", message: "Account Created" })
      navigate("/")
    }
  }, [success])

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
            <input type="text" className="outline-none rounded-lg border-2 py-2 px-3 border-gray-200" id="name" name="name" placeholder='John Doe' onChange={(e) => dispatch({
              type: "input",
              name: "name",
              value: e.target.value
            })} />
          </div>
          <div className="form-group flex flex-col gap-2 mt-3 mb-1">
            <label htmlFor="email" className="text-base font-bold">Email address</label>
            <input type='email' className="outline-none rounded-lg border-2 py-2 px-3 border-gray-200" id="email" name='email' aria-describedby="emailHelp" placeholder='johndoe@example.com' onChange={(e) => dispatch({
              type: "input",
              name: "email",
              value: e.target.value
            })} />
          </div>
          <div className="form-group flex flex-col gap-2 mt-3 mb-1">
            <label htmlFor="password" className="text-base font-bold">Password</label>
            <input type="password" className="outline-none rounded-lg border-2 py-2 px-3 border-gray-200" id="password" name="password" placeholder='*********' onChange={(e) => dispatch({
              type: "input",
              name: "password",
              value: e.target.value
            })} />
          </div>
          <div className="flex flex-col gap-2 mt-3 mb-3">
            <label htmlFor="cpassword" className="text-base font-bold">Confirm Password</label>
            <input type="password" className="outline-none rounded-lg border-2 py-2 px-3 border-gray-200" id="cpassword" name="cpassword" placeholder='*********' onChange={(e) => dispatch({
              type: "input",
              name: "cpassword",
              value: e.target.value
            })} />
          </div>
          <button disabled={name.length === 0 || email.length === 0 || password.length < 6 || password !== cpassword || submitting} type="submit" className="bg-black disabled:opacity-55 w-full rounded-md text-white text-base py-2 text-center">Submit</button>
        </form>
        <p className="text-center mt-3 font-medium">Already have an account? <ins><Link to="/login">Login</Link></ins></p>
        {
          err && (typeof err === "object" ? err.map((e, index) => (
            <p key={e.message + index} className="text-red-500 text-center mt-3 font-medium">{e.msg}</p>
          )) : <p className="text-red-500 text-center mt-3 font-medium">{err}</p>
          )}
      </div>
    </div>

  )
}

export default Signup