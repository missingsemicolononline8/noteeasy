import { Routes, Route, Outlet, useNavigate, useLocation } from "react-router-dom";
import Navbar from './Navbar';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import AlertState from '../context/Alert/AlertState';
import { useEffect } from "react";
import ReactGA from 'react-ga4';
ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);

const Authcheck = ({ Comp }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('authToken')) {
            return navigate('/')
        }
    }, [])

    return !localStorage.getItem('authToken') && <Comp />
}

const Foreground = () => {

    const location = useLocation();
    useEffect(() => {
        ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search })
    }, [location]);

    return (
        <div className="z-10 relative h-screen flex flex-col">
            <AlertState>
                <Routes>
                    <Route path="/" element={<>
                        <Navbar />
                        <Outlet />
                    </>} >
                        <Route index element={<Home />} />
                    </Route>
                    <Route path="login" element={<Authcheck Comp={Login} />} />
                    <Route path="signup" element={<Authcheck Comp={Signup} />} />
                </Routes>
            </AlertState>
        </div>

    )
}

export default Foreground;