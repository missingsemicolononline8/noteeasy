import React, { Suspense, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';

const API_HOST = process.env.REACT_APP_API_HOST;
const searchParams = new URLSearchParams(window.location.search);
const inviteeEmail = searchParams.get('user');
let route = null;

function wrapPromise(promise) {
    let status = 'pending'
    let response

    const suspender = promise.then(
        (res) => {
            status = 'success'
            response = res
        },
        (err) => {
            status = 'error'
            response = "error"
        },
    )

    const read = () => {
        switch (status) {
            case 'pending':
                throw suspender
            case 'error':
                throw response
            default:
                return response
        }
    }

    return read
}


if (!localStorage.getItem('authToken')) {
    const request = fetch(`${API_HOST}/api/auth/checkregistration`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: inviteeEmail })
    }).then(res => res.json()).then(res => res.route)

    route = wrapPromise(request)
}

const Invite = () => {

    const navigate = useNavigate()
    const redirectTo = useRef("");

    if (typeof route != "function") {
        redirectTo.current = "/"
    }
    else {
        redirectTo.current = (route() !== "error" ? `/${route()}` : "/") + `?email=${inviteeEmail}`
    }

    useEffect(() => {
        navigate(redirectTo.current)
    }, [])


    return <></>
}

export default () => {
    return <Suspense fallback={<h2>Loading...</h2>}><Invite /></Suspense>
}