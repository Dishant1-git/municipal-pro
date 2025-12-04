import { useState } from "react"
import { useDispatch } from "react-redux"
import { login } from "../reducer/userslice"
import { Navigate, useNavigate } from "react-router-dom"

export const Login=()=>{


const [email,setemail]=useState("")
const [pass,setpass]=useState("")


const dispatch=useDispatch()
const navigate=useNavigate()

const Log=async(e)=>{
    const data={email,pass}
e.preventDefault();
const res= await fetch("http://localhost:9000/api/login",{
    method:"POST",
    body:JSON.stringify(data),
    headers:{
        "content-type":"application/json;charset=UTF-8"
    }

})
if(res.ok){
    const result=await res.json()
    if(result.statuscode==1){
    
        alert("registered successfully")

        if(result.role.role=="admin"){
            alert("welcome admin")

            dispatch(login({userdata:result.memberdata,role:result.role.role}))
            sessionStorage.setItem("info",JSON.stringify(result.memberdata))
            sessionStorage.setItem("token",JSON.stringify(result.authtoken))
            navigate("/")
           
        }
        else if(result.role.role=="worker"){
            alert("welcome worker")
              navigate("/")
           
            dispatch(login({userdata:result.memberdata,role:result.role.role}))
            sessionStorage.setItem("info",JSON.stringify(result.memberdata))
            sessionStorage.setItem("token",JSON.stringify(result.authtoken)) 

        }
        else{
            alert("welcome user")
               navigate("/")
           
            dispatch(login({userdata:result.memberdata,role:result.role.role}))
            dispatch(login(result.memberdata))
            sessionStorage.setItem("info",JSON.stringify(result.memberdata))
            sessionStorage.setItem("token",JSON.stringify(result.authtoken))
        }
    }
    else if(result.statuscode==2) {
       alert("kindly request admin for activation your account")
    }
    else{
        alert("credentials dont match")
    }
  
}

}


    return(
        <>
 <div class="rts-breadcrumb-area">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="title-area-left center">
                        <span class="bg-title">Login</span>
                        <h1 class="title rts-text-anime-style-1">
                            Login
                        </h1>
                    </div>
                </div>
            </div>
        </div>
        <div class="shape-area">
            <img src="assets/images/about/shape/01.png" alt="shape" class="one"/>
            <img src="assets/images/about/shape/02.png" alt="shape" class="two"/>
            <img src="assets/images/about/shape/03.png" alt="shape" class="three"/>
        </div>
    </div>


    
    <div class="rts-contact-area-in-page" data-animation="fadeInUp" data-delay="0.2">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6">
                    <div class="contact-info-area-wrapper-p new">
                        <div class="single-contact-info">
                            <div class="icon">
                                <i class="fa-solid fa-phone-flip"></i>
                            </div>
                            <div class="info-wrapper">
                                <span>Call Us 24/7</span>
                                <a href="#">(+256) 2145.2156</a>
                            </div>
                        </div>
                        <div class="single-contact-info">
                            <div class="icon">
                                <i class="fa-solid fa-envelope"></i>
                            </div>
                            <div class="info-wrapper">
                                <span>Work with us</span>
                                <a href="#">info@Invena.com</a>
                            </div>
                        </div>
                        <div class="single-contact-info">
                            <div class="icon">
                                <i class="fa-solid fa-location-dot"></i>
                            </div>
                            <div class="info-wrapper">
                                <span>Our Location</span>
                                <a href="#">125 Town, United State</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="contact-form-p new">
                        <form     onSubmit={Log}>
                            <h4 class="title">Get In Touch</h4>
                          
                            <input type="email"  placeholder="Johndoe@gmail.com" onChange={(e)=>setemail(e.target.value)}/>
                            <input type="password"  placeholder="Password" onChange={(e)=>setpass(e.target.value)}/>
                        
                            

                            <button class="rts-btn btn-primary" type="submit">Login</button>
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>

        </>
    )
}