import React, { useContext, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import AlertContext from '../context/Alert/AlertContext';


const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const {setAlerts} = useContext(AlertContext);
    let navigate  = useNavigate();
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
        if(response.status == 200) {
            localStorage.setItem("authToken",json.authtoken)
            navigate("/")
            setAlerts({type:"success",message:"Logged In"})
        }
        else {
            setAlerts({type:"error",message:"Invalid Credentials"})
        }
        
    }
    return (
        <div className='container mt-5'>
            <h2>Login to continue to Noteseasy</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" value={credentials.email} onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} value={credentials.password}/>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form></div>
    )
}

export default Login