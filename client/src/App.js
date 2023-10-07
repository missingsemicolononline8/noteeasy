import './App.css';

import { Routes, Route, Outlet, BrowserRouter } from "react-router-dom";

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NotesState from './context/Notes/NotesState';
import Login from './components/Login';
import Signup from './components/Signup';
import AlertState from './context/Alert/AlertState';
import { useState, useEffect } from 'react';
import toastr from "toastr";

function App() {
  const [alerts, setAlerts] = useState(null);
  useEffect(() => {
    if(alerts) {
      
    toastr[alerts.type](alerts.message, null, {
        timeOut: 2000,
        progressBar: true,
      });

      setAlerts(null)
    }  
  }, [alerts])

  return (
    
      <AlertState value={{alerts,setAlerts}}>
      <NotesState>
        <Routes>
          <Route path="/" element={<>
            <Navbar />
            <div className="container">
            <Outlet />
            </div>
          </>}>
            <Route index element={<Home />} />
            <Route path="about"  element={<About />} />
            <Route path="login" element={<><Login/></>} />
            <Route path="signup" element={<><Signup/></>} />
          </Route>
        </Routes>
      </NotesState>
      </AlertState>
    
  )

}

function withRouter(passedC) {
  return <BrowserRouter>{passedC()}</BrowserRouter>
}

export default App;
