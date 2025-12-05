import { useState } from "react"

export const Signup=()=>{

const [name,setname]=useState("")
const [email,setemail]=useState("")
const [pass,setpass]=useState("")
const [cpass,setcpass]=useState("")



const Signup=async(e)=>{
    const data={name,email,pass}
e.preventDefault();
const res= await fetch("http://localhost:9000/api/signup",{
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
    }
    else {
       alert("email already exists")
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
                        <span class="bg-title">Signup</span>
                        <h1 class="title rts-text-anime-style-1">
                          Signup
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
                        <form     onSubmit={Signup}>
                            <h4 class="title">Get In Touch</h4>
                            <input name="name" id="name" type="text" placeholder="Your Name" onChange={(e)=>setname(e.target.value)}/>
                            <input type="email" name="email" id="email" placeholder="Johndoe@gmail.com" onChange={(e)=>setemail(e.target.value)}/>
                            <input type="password" id="email" placeholder="Password" onChange={(e)=>setpass(e.target.value)}/>
                            <input type="password"  id="email" placeholder="Confirm Password"onChange={(e)=>setcpass(e.target.value)}/>
                            

                            <button class="rts-btn btn-primary" type="submit">Signup</button>
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>

        </>
    )
}