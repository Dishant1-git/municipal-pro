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
    if (sessionStorage.getItem("info") !== null) {
      const userdata = (JSON.parse(sessionStorage.getItem("info")))
      dispatch(login(userdata))
    }
  }, [])


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

  // admin da password dsdo
  //Admin@123
  //  that means apka role ni set hora
  //but then fr header kida change hunda?
  useEffect(() => {
    console.log("type is", Role)
  }, [Role])
//mam 2 min
  // role wala tareeka better h
  // sidha role naal v same issue a


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
// wooooow sir tu c deepseek v fail krta
// ki logic a wah