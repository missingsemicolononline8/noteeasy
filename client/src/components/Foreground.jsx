import { Routes, Route, } from "react-router-dom";

import Navbar from './Navbar';
import Home from '../pages/Home';
import About from '../pages/About';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import AlertState from '../context/Alert/AlertState';

const Foreground = () => {

    return (
        <div className="z-10 relative h-screen flex flex-col">
            <AlertState>
                <Navbar />
                <Routes>
                    <Route path="/" >
                        <Route index element={<Home />} />
                        <Route path="about" element={<About />} />
                        <Route path="login" element={<Login />} />
                        <Route path="signup" element={<Signup />} />
                    </Route>
                </Routes>
            </AlertState>
        </div>

    )
}

export default Foreground;