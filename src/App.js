import logo from './logo.svg';
import './App.css';
import { User } from './components/userheader';

import { Footer } from './components/footer';
import { Routee } from './components/routes';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './reducer/userslice';
import { Admin } from './components/admin';
import { Worker } from './components/workerh';

function App() {
  const [type, settype] = useState()

  const { LoggedIn, Role } = useSelector((state) => {
    return state.userslice
  })
  const dispatch = useDispatch()
  useEffect(() => {
    if (sessionStorage.getItem("info") !== null&& localStorage.getItem("token")!==null) {
      const userdata = (JSON.parse(sessionStorage.getItem("info")))
const token=localStorage.getItem("token")
const decode=JSON.parse(atob(token.split('.')[1]))
const role=decode.role

      dispatch(login(userdata,role))
    }
  }, [])
  useEffect(() => {
  // Get token from localStorage (where it actually is)
    const token = localStorage.getItem("token");
    
    // Get info from sessionStorage (where it actually is)
    const info = sessionStorage.getItem("info");
    
    console.log("Token exists:", !!token);
    console.log("Info exists:", !!info);
    
    if (token && info) {
      try {
        const userdata = JSON.parse(info);
        console.log("User data:", userdata);
        
        // Decode the token - FIXED VERSION
        // Token format: header.payload.signature
        const parts = token.split('.');
        console.log("Token parts:", parts.length);
        
        if (parts.length === 3) {
          // Decode the middle part (payload)
          const payload = parts[1];
          
          // atob expects base64, JWT uses base64url
          // Need to convert base64url to base64
          const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
          
          // Decode
          const decodedStr = atob(base64);
          console.log("Decoded string:", decodedStr);
          
          const decoded = JSON.parse(decodedStr);
          console.log("Decoded token:", decoded);
          
          const role = decoded.role;
          console.log("Extracted role:", role);
          
          // Dispatch with the role from token
          dispatch(login({
            name: userdata.name,
            role: role,  // This is "admin" from your token
            Email: userdata.email || "user@example.com"  // Add fallback if no email
          }));
          
          console.log("Login dispatched with role:", role);
        } else {
          console.error("Invalid token format");
        }
      } catch (error) {
        console.error("Error in auto-login:", error);
      }
    } else {
      console.log("No token or info found for auto-login");
    }
}, []);


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


  useEffect(() => {
    console.log("type is", Role)
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
