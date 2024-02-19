import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
    <div className="container mt-5">
      <h2>Signup to continue to Noteseasy</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} />
        </div>
        <button disabled={user.name.length === 0 || user.email.length === 0 || user.password.length < 6 || user.password !== user.cpassword} type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>

  )
}

export default Signup