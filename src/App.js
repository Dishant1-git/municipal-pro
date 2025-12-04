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
const [type,settype]=useState()

const{LoggedIn,Role}=useSelector((state)=>{
return state.userslice
})
const dispatch=useDispatch()

useEffect(()=>{
  if(sessionStorage.getItem("info")!==null){
    const userdata=(JSON.parse(sessionStorage.getItem("info")))
    dispatch(login(userdata))
 
  }
},[])

useEffect(()=>{

  if(LoggedIn&& Role){
        if(Role=="admin"){
         
         
          settype("admin")
        }
        else if(Role=="worker"){
          settype("worker")
        }
        else{
          settype("user")
        }
  }
  else{
    settype("user")
   
  }
},[LoggedIn,Role])

const header=()=>{
if(type =="admin"){
  return <Admin/>
}
else if(type =="worker"){
  return <Worker/>
}
else{
  return <User/>
}
 
}


  return (
   <>
{
  header()
}
  <Routee/>
<Footer/>
   </>
  );
}

export default App;
