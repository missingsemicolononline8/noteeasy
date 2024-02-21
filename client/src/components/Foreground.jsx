import { Routes, Route, Outlet, } from "react-router-dom";

import Navbar from './Navbar';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import AlertState from '../context/Alert/AlertState';

const Foreground = () => {

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
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                </Routes>
            </AlertState>
        </div>

    )
}

export default Foreground;