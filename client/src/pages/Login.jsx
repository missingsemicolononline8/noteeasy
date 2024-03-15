import React, { useContext, useEffect, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertContext from '../context/Alert/AlertContext';
import userReducer from '../reducers/LoginSignup'
import Form from '../components/Form';

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
    if (response.status !== 200) {
        throw new Error(JSON.stringify(data.message));
    }

    return data;

}

const Login = () => {
    const setAlerts = useContext(AlertContext);
    let navigate = useNavigate();

    const [{ email, password, submitting, success, err }, dispatch] = useReducer(userReducer, {
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
            setAlerts({ type: "success", message: "Successfully Logged In" })
            navigate("/")
        }
    }, [success])

    const fields = [
        {
            label: 'Email address',
            inputType: 'email',
            name: 'email',
            placeholder: 'johndoe@example.com',
            handleChange: (e) => dispatch({ type: "input", name: "email", value: e.target.value })
        },
        {
            label: 'Password',
            inputType: 'password',
            name: 'password',
            placeholder: '*********',
            handleChange: (e) => dispatch({ type: "input", name: "password", value: e.target.value })
        }
    ]

    return (
        <div className='flex justify-center items-center w-full h-screen bg-gray-500'>
            <Form title="Sign In" subtitle="Enter your credentials to access your account"  {...{ handleSubmit, fields, err }} isSubmitDisabled={submitting} redirectTxt="Don't have an account?" redirectAnchor="Sign Up" redirectLink="/signup" />
        </div>
    )
}

export default Login