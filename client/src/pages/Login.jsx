import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AlertContext from '../context/Alert/AlertContext';


const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const setAlerts = useContext(AlertContext);
    let navigate = useNavigate();
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password
            }),
        });

        const json = await response.json();
        if (response.status == 200) {
            localStorage.setItem("authToken", json.authtoken)
            navigate("/")
            setAlerts({ type: "success", message: "Logged In" })
        }
        else {
            setAlerts({ type: "error", message: "Invalid Credentials" })
        }

    }
    return (
        <div className='flex justify-center items-center w-full h-screen bg-gray-500'>
            <div id="form-wrapper" className="bg-white rounded-lg w-[340px] p-6">
                <h1 className='text-center text-3xl font-bold'>Sign In</h1>
                <p className="text-center mt-3 font-medium text-gray-500 text-md leading-6">
                    Enter your credentials to access your account
                </p>
                <form className='mt-4' onSubmit={handleSubmit} >
                    <div className="flex flex-col gap-2 mt-2 mb-1">
                        <label htmlFor="email" className="text-base font-bold">Email address</label>
                        <input type="email" className="outline-none rounded-lg border-2 py-2 px-3 border-gray-200" id="email" name='email' aria-describedby="emailHelp" value={credentials.email} placeholder='johndoe@emaple.com' onChange={onChange} />
                    </div>
                    <div className="form-group flex flex-col gap-2 mt-3 mb-3">
                        <label htmlFor="password" className="text-base font-bold">Password</label>
                        <input type="password" className="outline-none rounded-lg border-2 py-2 px-3 border-gray-200" id="password" name="password" onChange={onChange} value={credentials.password} placeholder='*********' />
                    </div>
                    <button type="submit" className="bg-black w-full rounded-md text-white text-base py-2 text-center" >Sign In</button>
                </form>
                <p className="text-center mt-3 font-medium">Don't have an account? <ins><Link to="/signup">Sign Up</Link></ins></p>
            </div>
        </div>
    )
}

export default Login