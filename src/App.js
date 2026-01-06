import logo from './logo.svg';
import './App.css';
import { User } from './components/userheader';

import { Footer } from './components/footer';
import { Routee } from './components/routes';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, Logout } from './reducer/userslice';
import { Admin } from './components/admin';
import { Worker } from './components/workerh';

function App() {
  const [type, settype] = useState()

  const { LoggedIn, Role } = useSelector((state) => {
    return state.userslice
  })
  const dispatch = useDispatch()

  useEffect(() => {
    let logoutTimer;
    const token = localStorage.getItem("token");
    const info = sessionStorage.getItem("info");
    
    if (token && info) {
      try {
        const userdata = JSON.parse(info);
        const parts = token.split('.');
        
        if (parts.length === 3) {
          const payload = parts[1];
          const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
          const decoded = JSON.parse(atob(base64));
          
          const currentTime = Date.now() / 1000;
          
          if (decoded.exp && decoded.exp < currentTime) {
            localStorage.removeItem("token");
            sessionStorage.removeItem("info");
            dispatch(Logout());
          } else {
            // Set up auto-logout timer
            if (decoded.exp) {
              const remainingTime = (decoded.exp - currentTime) * 1000;
              logoutTimer = setTimeout(() => {
                localStorage.removeItem("token");
                sessionStorage.removeItem("info");
                dispatch(Logout());
                alert("Your session has expired. You have been logged out.");
              }, remainingTime);
            }

            dispatch(login({
              name: userdata.name,
              role: decoded.role,
              Email: userdata.email || "user@example.com"
            }));
          }
        }
      } catch (error) {
        console.error("Error in auto-login/timeout setup:", error);
      }
    }

    return () => {
      if (logoutTimer) clearTimeout(logoutTimer);
    };
  }, [dispatch, LoggedIn]);


  useEffect(() => {
    if (Role === "admin") {
      settype("admin")
    }
    else if (Role === "worker") {
      settype("worker")
    }
    else {
      settype("user")
    }
  }, [Role])





  const header = () => {
    if (Role === "admin") {
      return <Admin />
    }
    else if (Role === "worker") {
      return <Worker />
    }
    else {
      return <User />
    }
  }

  return (
    <>
      {
        header()
      }
      <Routee />
      <Footer />
    </>
  );
}

export default App;
