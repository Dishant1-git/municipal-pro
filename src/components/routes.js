import { Route, Routes } from "react-router-dom"
import { Index } from "./landingpage"
import { Signup } from "./Signup"
import { Login } from "./login"
import { Postcom } from "./postcomplaint"
import { Usercomp } from "./showcomp"
import { Compadmin } from "./compadmin"
import { Compdetail } from "./compdetail"
import { Compassigned } from "./compassigned"
import { Compwoker } from "./workcomp"
import { Notassigned } from "./notassigned"
import { Assigned } from "./assignedwork"
import { Completed } from "./completed"

export const Routee=()=>{
    return(
        <>
        <Routes>
           <Route path="/" element={<Index/>}/>
           <Route path="/signup" element={<Signup/>}/>
           <Route path="/login" element={<Login/>}/>
           <Route path="/complaint" element={<Postcom/>}/>
           <Route path="/Compshow" element={<Usercomp/>}/>
           <Route path="/Compshowadmin" element={<Compadmin/>}/>
           <Route path="/detail" element={<Compdetail/>}/>
           <Route path="/workjob" element={<Compassigned/>}/>
           <Route path="/detailwork" element={<Compwoker/>}/>
           <Route path="/notassign" element={<Notassigned/>}/>
           <Route path="/assigned" element={<Assigned/>}/>
           <Route path="/completed-work" element={<Completed/>}/>
        </Routes>
        </>
    )
}