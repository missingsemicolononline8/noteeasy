import React, { useContext, useEffect, useReducer, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AlertContext from '../context/Alert/AlertContext';

const signIn = async ({ email, password }) => {
    const API_HOST = process.env.REACT_APP_API_HOST;
    const response = await fetch(`${API_HOST}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        }),
    });

    const data = await response.json();
    if (response.status === 200) {
        return data;
    }

    throw new Error(JSON.stringify(data.message));

}

const signInReducer = (state, action) => {
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

const Login = () => {
    const setAlerts = useContext(AlertContext);
    let navigate = useNavigate();

    const [{ email, password, submitting, success, err }, dispatch] = useReducer(signInReducer, {
        email: "", password: "", submitting: false, success: false, err: false
    })

    const handleSubmit = async (e) => {

        e.preventDefault();
        dispatch({ type: "submit" })

        try {
            const response = await signIn({ email, password })
            dispatch({ type: "success", payload: { response } })
        }

        catch (e) {
            dispatch({ type: "error", error: JSON.parse(e.message) });
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
                <h1 className='text-center text-3xl font-bold'>Sign In</h1>
                <p className="text-center mt-3 font-medium text-gray-500 text-md leading-6">
                    Enter your credentials to access your account
                </p>
                <form className='mt-4' onSubmit={handleSubmit} >
                    <div className="flex flex-col gap-2 mt-2 mb-1">
                        <label htmlFor="email" className="text-base font-bold">Email address</label>
                        <input type="email" className="outline-none rounded-lg border-2 py-2 px-3 border-gray-200" id="email" name='email' aria-describedby="emailHelp" placeholder='johndoe@emaple.com' onChange={(e) => dispatch({
                            type: "input",
                            name: "email",
                            value: e.target.value
                        })} />
                    </div>
                    <div className="form-group flex flex-col gap-2 mt-3 mb-3">
                        <label htmlFor="password" className="text-base font-bold">Password</label>
                        <input type="password" className="outline-none rounded-lg border-2 py-2 px-3 border-gray-200" id="password" name="password" onChange={(e) => dispatch({
                            type: "input",
                            name: "password",
                            value: e.target.value
                        })} placeholder='*********' />
                    </div>
                    <button disabled={submitting} type="submit" className="bg-black w-full rounded-md text-white text-base py-2 text-center" >Sign In</button>
                </form>
                <p className="text-center mt-3 font-medium">Don't have an account? <ins><Link to="/signup">Sign Up</Link></ins></p>
                {
                    err && (typeof err === "object" ? err.map((e, index) => (
                        <p key={e.message + index} className="text-red-500 text-center mt-3 font-medium">{e.msg}</p>
                    )) : <p className="text-red-500 text-center mt-3 font-medium">{err}</p>
                    )}
            </div>
        </div>
    )
}

export default Login